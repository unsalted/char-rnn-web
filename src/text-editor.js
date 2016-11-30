import { inject } from 'aurelia-framework'
import { avatars } from 'data/avatars'
import { Cricket } from 'resources/utils/cricket'

//@inject(Suggestions)
export class TextEditor {

  constructor() {
    this.start = 'and he has to seek his way beyond '
  }

  avatarNameService = new AvatarNameSuggestionService()
  avatar = ""

  editorTitleEvent = e => {
    if (e.which === 13)
      e.preventDefault()
  }

  detatched() {
    this.editorTitle.removeEventListener('keypress', this.editorTitleEvent)
  }

  attached() {
    this.editorTitle.addEventListener('keypress', this.editorTitleEvent)
  }
}

export class AvatarNameSuggestionService {
  suggest(value) {
    if (value === '') {
      return Promise.resolve([]);
    }
    value = value.toLowerCase();
    const suggestions = avatars.filter(x => x.name.toLowerCase().indexOf(value) === 0)
      .map(x => x.name);
    return Promise.resolve(suggestions);
  }
  
  getName(suggestion) {
    return suggestion;
  }
}