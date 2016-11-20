import { inject } from 'aurelia-framework'

export class Home {

  constructor() {
    this.start = 'It is going to be a very long day if we keep arguing and he has to seek his way beyond '
    this.message = ''
  }

  attached() {
    this.message = this.start
  }
}