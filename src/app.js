import { inject } from 'aurelia-framework'
import { Model } from 'keras'
import weblas from 'weblas'
import flatten from 'lodash/flatten'
import times from 'async/times'
import each from 'async/each'
import queue from 'async/queue'
import indices_char from 'data/indices_char'
import char_indices from 'data/char_indices'
import sampling from 'resources/sampling'

@inject(weblas)

export class App {
  constructor(weblas) {
    this.weblas = weblas
    this.maxlen = 40
    this.start = 'It is going to be a very long day if we keep arguing and he has to seek his way beyond '
    this.words = []
    this.message = this.start
    this.ready = false
  }
  model = new Model({
      filepaths: {
        model: 'src/data/char_rnn_1.json',
        weights: 'src/data/char_rnn_20_weights.buf',
        metadata: 'src/data/char_rnn_20_metadata.json'
      }
    })
    /*
    def sample(preds, temperature=1.0):
      # helper function to sample an index from a probability array
      preds = np.asarray(preds).astype('float64')
      preds = np.log(preds) / temperature
      exp_preds = np.exp(preds)
      preds = exp_preds / np.sum(exp_preds)
      probas = np.random.multinomial(1, preds, 1)
      return np.argmax(probas)
      */

  _parseText(text, max) {
    text = text.split('')
    let data = text.slice(Math.max(text.length - max, 1))
    let x = new Array(max).fill(0).map(row => new Array(57).fill(0)) // [40][57]
    data.forEach((v, i) => { x[i][char_indices[v]] = 1.0 })
    const f = new Float32Array(flatten(x))
    return f
  }

  uniq(a) {
    return Array.from(new Set(a))
  }

  _sample(preds, temp, count) {
    let t0 = performance.now()
    preds = preds.map(n => { return (Math.log(n) / temp) })
    const exp_preds = preds.map(Math.exp)
    preds = exp_preds.map(n => { return n / exp_preds.reduce((a, b) => { return a + b }, 0) }) //sum
    const p = new Promise((resolve, reject) => {
      times(count, (n, next) => {
        let probas = sampling().Multinomial(1, preds)
        probas = probas.draw()
        next(null, probas.indexOf(Math.max(...probas)))
      }, (err, arr) => {
        if (err)
          reject(err)
        arr = arr.map(c => indices_char[c])
        console.info(`sample time ${ performance.now() - t0 }`)
        resolve(arr)
      })
    });
    return p;
  }


  _predict(data, temp, count) {
    let t0 = performance.now()
    const p = new Promise((resolve, reject) => {
      this.model.predict({ input: data })
        .then((res) => {
          this._sample(res.output, temp, count).then(resolve)
          console.info(`predict time ${ performance.now() - t0 }`)
        }).catch(reject)
    })
    return p;
  }

  _textPredict(text, temp, count) {
    let word = ''
    count = count ? count : 1
    let p = new Promise((resolve, reject) => {
      const iterator = (text, i) => {
        const data = this._parseText(text, this.maxlen)
        this._predict(data, temp, count)
          .then((chArr) => {
            i += 1
            if (count > 1)
              return resolve(chArr)
            word += chArr[0]
            text += word
            if (chArr[0] === ' ') //still need to handle seperators
              return resolve(word);

            return iterator(text);
          }).catch(reject)
      }
      iterator(text, 0)
    })
    return p;
  }

  getWords() {
    this.words = []
    let t1 = performance.now()
    const text = this.start
    const queT1 = performance.now()
    const wordQ = queue((task, cb) => {
      this._textPredict(task.text, task.temp)
        .then((word) => {
          this.words.push(task.char + word)
          cb()
        }).catch(cb)
    }, 1)

    this._textPredict(text, 1, 5)
      .then((chars) => {
        console.info(`letters ${chars} ${ performance.now() - t1 }ms`)
        chars = this.uniq(chars)
        const texts = chars.map(char => { return { char, text: char.replace(/^/, text), temp: 0.2 }; }) // prepend text
        texts.forEach(text => wordQ.push(text))
      }).catch(console.warn)
  }


  attached() {

    this.model.ready()
      .then(() => {
        this.ready = true
        this.getWords()
      })
      .catch(err => {
        console.info(err, 'err')
      })
  }
}