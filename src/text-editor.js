import { inject } from 'aurelia-framework'
import CodeMirror from 'codemirror'
import { avatars } from 'data/avatars'

export class TextEditor {

  constructor() {
    this.start = 'It is going to be a very long day if we keep arguing and he has to seek his way beyond '
  }

  avatarNameService = new AvatarNameSuggestionService()
  avatar = ""

  editorOptions = {
    lineNumbers: false,
    mode: 'markdown',
    extraKeys: { 'Ctrl-Space': 'autocomplete' },
    theme: 'default',
    lineWrapping: true,
    hintOptions: { aync: true, completeSingle: false },
    foldGutter: false
  }

  editorTitleEvent = e => {
    if (e.which === 13)
      e.preventDefault()
  }

  detatched() {
    this.editorTitle.removeEventListener('keypress', this.editorTitleEvent)
  }

  attached() {
    this.cm = CodeMirror(this.cmEditor, this.editorOptions)
    this.cm.configure
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