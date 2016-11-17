// discrete.js
// Sample from discrete distributions.

export default function() {

  // Utility functions
  const _sum = (a, b) => {
    return a + b
  }

  const _fillArrayWithNumber = (size, num) => {
    // thanks be to stackOverflow... this is a beautiful one-liner
    return Array.apply(null, Array(size)).map(Number.prototype.valueOf, num);
  }

  const _rangeFunc = upper => {
      let i = 0
      let out = []
      while (i < upper) out.push(i++)
      return out
    }
    // Prototype function
  const _samplerFunction = size => {
      if (!Number.isInteger(size) || size < 0) {
        throw new Error("Number of samples must be a non-negative integer.")
      }
      if (!this.draw) {
        throw new Error("Distribution must specify a draw function.")
      }
      let result = []
      while (size--) {
        result.push(this.draw())
      }
      return result
    }
    // Prototype for discrete distributions
  let _samplerPrototype = {
    sample: _samplerFunction
  }

  const Bernoulli = p => {

    let result = Object.create(_samplerPrototype)

    result.draw = function() {
      return (Math.random() < p) ? 1 : 0
    }

    return result
  }

  const Discrete = probs => { // probs should be an array of probabilities. (they get normalized automagically) //

    let result = Object.create(_samplerPrototype)
    let k = probs.length

    result.draw = () => {
      let i, p
      for (let i = 0; i < k; i++) {
        p = probs[i] / probs.slice(i).reduce(_sum, 0) // this is the (normalized) head of a slice of probs
        if (Bernoulli(p).draw()) return i // using the truthiness of a Bernoulli draw
      }
      return k - 1
    }

    return result
  }

  const Multinomial = (n, probs) => {

    let result = Object.create(_samplerPrototype)
    let k = probs.length
    let disc = Discrete(probs)

    result.draw = () => {
      let draw_result = _fillArrayWithNumber(k, 0),
        i = n
      while (i--) {
        draw_result[disc.draw()] += 1
      }
      return draw_result
    }

    return result
  }


  return {
    _fillArrayWithNumber: _fillArrayWithNumber, // REMOVE EVENTUALLY - this is just so the Array.prototype mod can work
    _rangeFunc: _rangeFunc,
    Bernoulli: Bernoulli,
    Discrete: Discrete,
    Multinomial: Multinomial
  }
}