import { inject } from 'aurelia-framework'
import { Cricket } from 'resources/utils/cricket'
import queue from 'async/queue'

export class Home {

  constructor() {
    this.start = 'It is going to be a very long day if we keep arguing and he has to seek his way beyond '
    this.message = ''
    this.msgArray = new Array()
  }

  attached() {
    const start = 'Hello from Norm, this is my West Coast hip-hop model: '
    this.message = start
    this.msgArray.push(start)
    this.cricket = new Cricket(40, {
      model: 'src/data/hip_hop/hip_hop.json',
      weights: 'src/data/hip_hop/hip_hop_1_128_char_rnn_best_weights.buf',
      metadata: 'src/data/hip_hop/hip_hop_1_128_char_rnn_best_metadata.json'
    })

    const msgQ = queue((task, cb) => {
      console.log(task)
      this.cricket.print(task.text, 2)
        .then((txt) => {
          this.msgArray.push(txt.slice(task.text.length))
          console.log(this.msgArray, 'test')
          task.n += 1
          if(task.n <= 100)
            setTimeout(() => {
              msgQ.push({ text: txt, n: task.n })
            }, 50)
          return cb(null, txt)
        })
        .catch(cb)
    }, 1)



    setTimeout(() => {
      msgQ.push({text: start, n: 0})
    }, 400)

  }

}