import { Model } from 'keras'
import flatten from 'lodash/flatten'
import padStart from 'lodash/padStart'
import times from 'async/times'
import each from 'async/each'
import queue from 'async/queue'
import indices_char from '../../data/hip_hop/hip_hop_1_128_indices_char'
import char_indices from '../../data/hip_hop/hip_hop_1_128_char_indices'
import sampling from '../sampling'
import uniq from '../utils/uniq'

/**
 * Suggestion predict module
 * @param  {String} text      [description]
 * @param  {Int} maxlen    [description]
 * @param  {Obj} filepaths [description]
 */

export class Cricket {

  constructor(maxlen, filepaths, indices) {
    this.maxlen = maxlen
    this.text = ''
    this.words = []
    this.message = ''
    this.ready = false
    this.model = new Model({ filepaths })
  }

  _retrieveFromModel(data, temp, count) {

    const p = new Promise((resolve, reject) => {
      this.model.predict({
          input: data
        })
        .then((res) => {
          sample(res.output, temp, count)
            .then(resolve)
            .catch(reject)
        }).catch(reject)
    })

    return p
  }

  _search(text, temp, count) {
    let word = ''
    count = count ? count : 1

    const p = new Promise((resolve, reject) => {
      const iterator = (text, i) => {
        const data = parseText(text, this.maxlen)
        this._retrieveFromModel(data, temp, count)
          .then((chArr) => {
            i += 1
            if (count > 1)
              return resolve(chArr)
            word += chArr[0]
            text += word
            if (chArr[0] === ' ') { //still need to handle seperators
              word = word.slice(0, -1)
              return resolve(word);
            }
            return iterator(text);
          }).catch(reject)
      }

      iterator(text, 0)
    })

    return p;
  }

  _generate() {
    this.words = []
    const text = this.text

    const wordQ = queue((task, cb) => {
      this._search(task.text, task.temp)
        .then((word) => {
          this.words.push(task.char + word)
          cb()
        }).catch(cb)
    }, 1)

    const p = new Promise((resolve, reject) => {
      wordQ.drain = () => {
        resolve(this.words)
      }
      wordQ.error(reject)
    })

    this._search(text, 0.2, 5)
      .then((chars) => {
        chars = uniq(chars)
        const texts = chars.map(char => {
            return {
              char,
              text: char.replace(/^/, text),
              temp: 0.2
            };
          }) // prepend text
        texts.forEach(text => wordQ.push(text))
      }).catch(console.warn)

    return p;
  }

  predict(text) {
    this.text = padStart(text.toLowerCase(), this.maxlen)

    const p = new Promise((resolve, reject) => {
      this.model.ready()
        .then(() => {
          this.ready = true
          this._generate()
            .then(resolve)
            .catch(reject)
        })
        .catch(reject)
    })
    return p;
  }

  print(seed, count) {
    let text = seed

    const prom = new Promise((resolve, reject) => {
      const itr = (txt, n, max) => {
        this._retrieveFromModel(parseText(txt, this.maxlen), 0.2, 1)
          .then((char) => {
            txt += char[0]
            if (n >= max)
              return resolve(txt)
            n += 1
            return itr(txt, n, max)
          })
          .catch(reject)
      }
      this.model.ready()
        .then(() => {
          itr(text, 0, count)
        })
        .catch(reject)
    })
    return prom;
  }
}

const parseText = (text, max) => {
  text = text.split('')
  let data = text.slice(Math.max(text.length - max, 1))
  let index_size = Object.keys(char_indices).length
  let x = new Array(max).fill(0).map(row => new Array(index_size).fill(0)) // [40][57]
  data.forEach((v, i) => {
    x[i][char_indices[v]] = 1.0
  })
  const f = new Float32Array(flatten(x))
  return f
}

const sample = (preds, temp, count) => {

  preds = preds.map(n => Math.log(n) / temp)
  const exp_preds = preds.map(Math.exp)

  preds = exp_preds.map(n => {
      return n / exp_preds.reduce((a, b) => {
        return a + b
      }, 0)
    }) //sum

  const p = new Promise((resolve, reject) => {
    times(count, (n, next) => {
      let probas = sampling().Multinomial(1, preds)
      probas = probas.draw()
      next(null, probas.indexOf(Math.max(...probas)))
    }, (err, arr) => {
      if (err)
        reject(err)
      arr = arr.map(c => indices_char[c])
      resolve(arr)
    })
  })

  return p;
}