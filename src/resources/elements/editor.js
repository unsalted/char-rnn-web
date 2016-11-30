import { bindable } from 'aurelia-framework';
import debounce from 'lodash/debounce'
import CodeMirror from 'codemirror'
import { Cricket } from '../utils/cricket'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/addon/display/placeholder'
import 'codemirror/addon/hint/show-hint'

export class Editor {
  @bindable text

  constructor() {

    CodeMirror.registerHelper("hint", "anyword", (editor, callback, options) => {
      let pos = new Position(editor)
      let list = options && options.words || false
      console.log(list, 'list')
      if (!options.words) {
        const getSuggestions = debounce( () => { 
          this.text = editor.doc.getValue()

          this.cricket.predict(this.text)
              .then((list) => {
                return { list: list, from: CodeMirror.Pos(pos.cur.line, pos.start), to: CodeMirror.Pos(pos.cur.line, pos.end) } 
              })
        }, 100, { trailing: true })
        getSuggestions()
      }
      return {list, from: CodeMirror.Pos(pos.cur.line, pos.start), to: CodeMirror.Pos(pos.cur.line, pos.end) };
    })

    this.cm = {}
    this.cricket = new Cricket(40, {
      model: '/src/data/hip_hop/hip_hop.json',
      weights: '/src/data/hip_hop/hip_hop_1_128_char_rnn_best_weights.buf',
      metadata: '/src/data/hip_hop/hip_hop_1_128_char_rnn_best_metadata.json'
    })

  }

  set cmTextarea(value) {
    this.cm = CodeMirror.fromTextArea(value, this.editorOptions);
    CodeMirror.hint.FromList = ['bad boy']
    this.cm.on('keypress', (instance, event) => {
      if (event.charCode === 32) {
        // updateList(instance, event);
        this.text = this.cm.doc.getValue();
        const getSuggestions = debounce(() => {
          this.cricket.predict(this.text)
            .then(words => { /* this.cm.showHint({ words }); */ console.log(words) })
            .catch(console.error)
        }, 400, { trailing: true })
        getSuggestions()
      }
    })
  }

  editorOptions = {
    lineNumbers: false,
    mode: 'markdown',
    extraKeys: { 'Ctrl-Space': 'autocomplete' },
    theme: 'default',
    lineWrapping: true,
    hintOptions: { aync: true, completeSingle: false },
    foldGutter: false,
    placeholder: 'Start writing'
  }

  attached() {
    this.cricket.print('what in the world do you think you are doing with your life', 250)
    .then(console.log)
    .catch(console.error)

  }

  valueChanged(newValue, oldValue) {

  }
}

class Position {
  constructor(editor, w) {
    const word = w || /[\w$]+/g
    const cur = editor.getCursor()
    const curLine = editor.getLine(cur.line)
    let start = cur.ch
    let end = start

    while (end < curLine.length && word.test(curLine.charAt(end))) ++end;
    while (start && word.test(curLine.charAt(start - 1))) --start;
    let curWord = start != end && curLine.slice(start, end)

    this.start = start
    this.end = end
    this.cur = cur
  }
}

/*
$scope.codemirrorLoaded = function(_editor){
      //_editor.registerHelper('hint', 'myAuto', provideAutocompletions);
          let cm = _editor.constructor;
          $scope.cm = _editor.constructor;


       ;

        cm.registerHelper('hint', 'anyword', function(editor) {

            let cur = editor.getCursor(); 
            let end = cur.ch, start = end;

            return {'list': ['starting', 'now'], from: cm.Pos(cur.line, start), to: cm.Pos(cur.line, end)};
        });
        $scope.orig = $scope.cm.hint.anyword;
    };


    $scope.getAuthors = function(val) {
      val = val.toLowerCase();
      return  normApi.Entities({indexes: 'lyrics_v2', method: 'suggest', size:8, query: val})
      .$promise
      .then(function(response) {
        return response.hits;
      });
    };


    $scope.cm.hint.anyword = function() {
            let inner = {'list': [], from: $scope.cm.Pos(cur.line, start), to: $scope.cm.Pos(cur.line, end)};
            inner.list = completion;
            return inner;
          };

          if($scope.toggleAutocomplete){
            return $scope.cm.showHint(editor);
          } else { 
            return;
          } 



 */