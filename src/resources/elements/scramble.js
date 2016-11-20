import { bindable } from 'aurelia-framework'
import ease from '../utils/ease'
import 'requestanimationframe'

export class Scramble {
  @bindable duration
  @bindable text

  animationID = undefined
  targetText = ''
  chars = ['&blk14;', '&blk12;', '&block;', '&brvbar;', '&boxdl;', '&frasl;', '&bsol; ', '&gt;', '&lt;']
  then = 0 
  frames = 0 
  frame = 0 
  from = []
  to = []
  reverse = false
  fps = 1000 / 30

  startAnimation(from, to, frames) {
    this.then = Date.now();
    this.from = from
    this.to = to
    this.frames = frames
    if (!this.animationID) {
      this.animationID = requestAnimationFrame(this.scrambleAnimation.bind(this))
    }
  }

  stopAnimation(text) {
    if (this.animationID) {
      console.log(this.animationID)
      cancelAnimationFrame(this.animationID);
      this.targetText = text ? text : this.text
      this.animationID = undefined
    }
  }

    /**
     * scramble text animation loop d
     */
  scrambleAnimation() {
    this.animationID = requestAnimationFrame(this.scrambleAnimation.bind(this))
    let now, elapsed, sin, threshold, i, chars;
    now = Date.now();
    elapsed = now - this.then
    if (elapsed > this.fps) {
      // becaue of sine reverse on fromTo not neccessary - fucking clever I know.
      sin = ease.inOutSine(this.frame, 0, 1, this.frames)
      threshold = this.reverse ? 1 - sin : sin
      this.then = now - (elapsed % this.fps);
      this.frame += 1

      for (i = this.from.length - 1; i >= 0; i--) {
        if (Math.random() > threshold) {
          this.from[i] = this.chars[Math.floor(Math.random() * this.chars.length)]
        } else {
          this.from[i] = this.to[i]
        }
      }
      this.targetText = this.from.join('')
    }
  }
    /**
     * fromToAnimation animate from one string to another jumbling in the middle
     * @param  {string} from fromText
     * @param  {string} to   toText
     */
  fromToAnimation(from, to) {
    let dur = this.duration / 2
    let fromArr = from.split('')
    let fromLength = fromArr.length
    let toArr = Array.apply(null, Array(fromLength))
    let frames = dur / this.fps
    this.reverse = true
    this.startAnimation(fromArr, toArr, frames)
    // time transition
    setTimeout(() => {
      this.stopAnimation()
      //reset
      toArr = to.split('')
      fromLength = fromArr.length
      fromArr = Array.apply(null, Array(fromLength))
      this.startAnimation(fromArr, toArr, frames)
      //kill
      setTimeout(() => {
        this.stopAnimation(to)
      }, dur)

    }, dur)
  }

  /**
   * toAnimation – animate from scramble text to clear string
   * @param  {string} to toText
   */
  toAnimation(to) {
    let dur = this.duration
    let toArr = to.split('')
    let fromArr = Array.apply(null, Array(toArr.length))
    let frames = dur / this.fps
      //init
    this.startAnimation(fromArr, toArr, frames)
    setTimeout(() => {
      this.stopAnimation(to)
    }, dur);
  }

  attached() {
    if (!this.animationID && this.targetText)
      this.toAnimation(this.targetText)
  }


  textChanged(newText, oldText) {
    if (newText && oldText && newText !== oldText)
      this.fromToAnimation(newText, oldText)
    else
      this.toAnimation(newText)
  }
}