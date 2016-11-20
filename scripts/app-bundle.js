define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;

      config.title = 'Aurelia';
      config.map([{ route: ['', 'home'], name: 'Hello', moduleId: 'home' }, { route: 'editor', name: 'Editor', moduleId: 'text-editor' }]);
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('home',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Home = exports.Home = function () {
    function Home() {
      _classCallCheck(this, Home);

      this.start = 'It is going to be a very long day if we keep arguing and he has to seek his way beyond ';
      this.message = '';
    }

    Home.prototype.attached = function attached() {
      this.message = this.start;
    };

    return Home;
  }();
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('text-editor',['exports', 'aurelia-framework', 'codemirror', 'data/avatars'], function (exports, _aureliaFramework, _codemirror, _avatars) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AvatarNameSuggestionService = exports.TextEditor = undefined;

  var _codemirror2 = _interopRequireDefault(_codemirror);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var TextEditor = exports.TextEditor = function () {
    function TextEditor() {
      _classCallCheck(this, TextEditor);

      this.avatarNameService = new AvatarNameSuggestionService();
      this.avatar = "";
      this.editorOptions = {
        lineNumbers: false,
        mode: 'markdown',
        extraKeys: { 'Ctrl-Space': 'autocomplete' },
        theme: 'default',
        lineWrapping: true,
        hintOptions: { aync: true, completeSingle: false },
        foldGutter: false
      };

      this.editorTitleEvent = function (e) {
        if (e.which === 13) e.preventDefault();
      };

      this.start = 'It is going to be a very long day if we keep arguing and he has to seek his way beyond ';
    }

    TextEditor.prototype.detatched = function detatched() {
      this.editorTitle.removeEventListener('keypress', this.editorTitleEvent);
    };

    TextEditor.prototype.attached = function attached() {
      this.cm = (0, _codemirror2.default)(this.cmEditor, this.editorOptions);
      this.cm.configure;
      this.editorTitle.addEventListener('keypress', this.editorTitleEvent);
    };

    return TextEditor;
  }();

  var AvatarNameSuggestionService = exports.AvatarNameSuggestionService = function () {
    function AvatarNameSuggestionService() {
      _classCallCheck(this, AvatarNameSuggestionService);
    }

    AvatarNameSuggestionService.prototype.suggest = function suggest(value) {
      if (value === '') {
        return Promise.resolve([]);
      }
      value = value.toLowerCase();
      var suggestions = _avatars.avatars.filter(function (x) {
        return x.name.toLowerCase().indexOf(value) === 0;
      }).map(function (x) {
        return x.name;
      });
      return Promise.resolve(suggestions);
    };

    AvatarNameSuggestionService.prototype.getName = function getName(suggestion) {
      return suggestion;
    };

    return AvatarNameSuggestionService;
  }();
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('resources/sampling',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function () {
    var _this = this;

    var _sum = function _sum(a, b) {
      return a + b;
    };

    var _fillArrayWithNumber = function _fillArrayWithNumber(size, num) {
      return Array.apply(null, Array(size)).map(Number.prototype.valueOf, num);
    };

    var _rangeFunc = function _rangeFunc(upper) {
      var i = 0;
      var out = [];
      while (i < upper) {
        out.push(i++);
      }return out;
    };

    var _samplerFunction = function _samplerFunction(size) {
      if (!Number.isInteger(size) || size < 0) {
        throw new Error("Number of samples must be a non-negative integer.");
      }
      if (!_this.draw) {
        throw new Error("Distribution must specify a draw function.");
      }
      var result = [];
      while (size--) {
        result.push(_this.draw());
      }
      return result;
    };

    var _samplerPrototype = {
      sample: _samplerFunction
    };

    var Bernoulli = function Bernoulli(p) {

      var result = Object.create(_samplerPrototype);

      result.draw = function () {
        return Math.random() < p ? 1 : 0;
      };

      return result;
    };

    var Discrete = function Discrete(probs) {

      var result = Object.create(_samplerPrototype);
      var k = probs.length;

      result.draw = function () {
        var i = void 0,
            p = void 0;
        for (var _i = 0; _i < k; _i++) {
          p = probs[_i] / probs.slice(_i).reduce(_sum, 0);
          if (Bernoulli(p).draw()) return _i;
        }
        return k - 1;
      };

      return result;
    };

    var Multinomial = function Multinomial(n, probs) {

      var result = Object.create(_samplerPrototype);
      var k = probs.length;
      var disc = Discrete(probs);

      result.draw = function () {
        var draw_result = _fillArrayWithNumber(k, 0),
            i = n;
        while (i--) {
          draw_result[disc.draw()] += 1;
        }
        return draw_result;
      };

      return result;
    };

    return {
      _fillArrayWithNumber: _fillArrayWithNumber,
      _rangeFunc: _rangeFunc,
      Bernoulli: Bernoulli,
      Discrete: Discrete,
      Multinomial: Multinomial
    };
  };
});
define('data/avatars',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var avatars = exports.avatars = [{ name: "Beyonce" }, { name: "Rhianna" }, { name: "John Legend" }, { name: "William Shakespeare" }, { name: "James Joyce" }, { name: "Javascript" }];
});
define('data/char_indices',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = { "_": 26, "3": 13, "c": 29, "7": 17, "9": 19, "1": 11, "2": 12, "s": 45, "y": 51, "[": 24, "ä": 53, "o": 41, "é": 55, "6": 16, "ë": 56, "\"": 3, "t": 46, "p": 42, "f": 32, "w": 49, "n": 40, "k": 37, "a": 27, "4": 14, "]": 25, "j": 36, "m": 39, "5": 15, "z": 52, ":": 20, "d": 30, ")": 6, "0": 10, "=": 22, "?": 23, ";": 21, "!": 2, "l": 38, "'": 4, "g": 33, "e": 31, "æ": 54, "q": 43, "b": 28, "v": 48, "h": 34, "\n": 0, ".": 9, ",": 7, "-": 8, "8": 18, "(": 5, "u": 47, "i": 35, "x": 50, "r": 44, " ": 1 };
});
define('data/indices_char',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    "0": "\n",
    "1": " ",
    "2": "!",
    "3": "\"",
    "4": "'",
    "5": "(",
    "6": ")",
    "7": ",",
    "8": "-",
    "9": ".",
    "10": "0",
    "11": "1",
    "12": "2",
    "13": "3",
    "14": "4",
    "15": "5",
    "16": "6",
    "17": "7",
    "18": "8",
    "19": "9",
    "20": ":",
    "21": ";",
    "22": "=",
    "23": "?",
    "24": "[",
    "25": "]",
    "26": "_",
    "27": "a",
    "28": "b",
    "29": "c",
    "30": "d",
    "31": "e",
    "32": "f",
    "33": "g",
    "34": "h",
    "35": "i",
    "36": "j",
    "37": "k",
    "38": "l",
    "39": "m",
    "40": "n",
    "41": "o",
    "42": "p",
    "43": "q",
    "44": "r",
    "45": "s",
    "46": "t",
    "47": "u",
    "48": "v",
    "49": "w",
    "50": "x",
    "51": "y",
    "52": "z",
    "53": "ä",
    "54": "æ",
    "55": "é",
    "56": "ë"
  };
});
define('resources/elements/autocomplete',['exports', 'aurelia-binding', 'aurelia-templating', 'aurelia-dependency-injection', 'aurelia-pal'], function (exports, _aureliaBinding, _aureliaTemplating, _aureliaDependencyInjection, _aureliaPal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Autocomplete = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

  var nextID = 0;

  var Autocomplete = exports.Autocomplete = (_dec = (0, _aureliaDependencyInjection.inject)(Element), _dec2 = (0, _aureliaTemplating.bindable)({ defaultBindingMode: _aureliaBinding.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
    function Autocomplete(element) {
      _classCallCheck(this, Autocomplete);

      _initDefineProp(this, 'service', _descriptor, this);

      _initDefineProp(this, 'value', _descriptor2, this);

      _initDefineProp(this, 'placeholder', _descriptor3, this);

      _initDefineProp(this, 'delay', _descriptor4, this);

      this.id = nextID++;
      this.expanded = false;

      _initDefineProp(this, 'inputValue', _descriptor5, this);

      this.updatingInput = false;
      this.suggestions = [];
      this.index = -1;
      this.suggestionsUL = null;
      this.userInput = '';

      this.element = element;
    }

    Autocomplete.prototype.display = function display(name) {
      this.updatingInput = true;
      this.inputValue = name;
      this.updatingInput = false;
    };

    Autocomplete.prototype.getName = function getName(suggestion) {
      if (suggestion == null) {
        return '';
      }
      return this.service.getName(suggestion);
    };

    Autocomplete.prototype.collapse = function collapse() {
      this.expanded = false;
      this.index = -1;
    };

    Autocomplete.prototype.select = function select(suggestion) {
      this.value = suggestion;
      var name = this.getName(this.value);
      this.userInput = name;
      this.display(name);
      this.collapse();
    };

    Autocomplete.prototype.valueChanged = function valueChanged() {
      this.select(this.value);
    };

    Autocomplete.prototype.inputValueChanged = function inputValueChanged(value) {
      var _this = this;

      if (this.updatingInput) {
        return;
      }
      this.userInput = value;
      if (value === '') {
        this.value = null;
        this.collapse();
        return;
      }
      this.service.suggest(value).then(function (suggestions) {
        var _suggestions;

        _this.index = -1;
        (_suggestions = _this.suggestions).splice.apply(_suggestions, [0, _this.suggestions.length].concat(suggestions));
        if (suggestions.length === 1) {
          _this.select(suggestions[0]);
        } else if (suggestions.length === 0) {
          _this.collapse();
        } else {
          _this.expanded = true;
        }
      });
    };

    Autocomplete.prototype.scroll = function scroll() {
      var ul = this.suggestionsUL;
      var li = ul.children.item(this.index === -1 ? 0 : this.index);
      if (li.offsetTop + li.offsetHeight > ul.offsetHeight) {
        ul.scrollTop += li.offsetHeight;
      } else if (li.offsetTop < ul.scrollTop) {
        ul.scrollTop = li.offsetTop;
      }
    };

    Autocomplete.prototype.keydown = function keydown(key) {
      if (!this.expanded) {
        return true;
      }

      if (key === 40) {
        if (this.index < this.suggestions.length - 1) {
          this.index++;
          this.display(this.getName(this.suggestions[this.index]));
        } else {
          this.index = -1;
          this.display(this.userInput);
        }
        this.scroll();
        return;
      }

      if (key === 38) {
        if (this.index === -1) {
          this.index = this.suggestions.length - 1;
          this.display(this.getName(this.suggestions[this.index]));
        } else if (this.index > 0) {
          this.index--;
          this.display(this.getName(this.suggestions[this.index]));
        } else {
          this.index = -1;
          this.display(this.userInput);
        }
        this.scroll();
        return;
      }

      if (key === 27) {
        this.display(this.userInput);
        this.collapse();
        return;
      }

      if (key === 13) {
        if (this.index >= 0) {
          this.select(this.suggestions[this.index]);
        }
        return;
      }

      return true;
    };

    Autocomplete.prototype.blur = function blur() {
      this.select(this.value);
      this.element.dispatchEvent(_aureliaPal.DOM.createCustomEvent('blur'));
    };

    Autocomplete.prototype.suggestionClicked = function suggestionClicked(suggestion) {
      this.select(suggestion);
    };

    Autocomplete.prototype.focus = function focus() {
      this.element.firstElementChild.focus();
    };

    return Autocomplete;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'service', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec2], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'placeholder', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return '';
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'delay', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return 300;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'inputValue', [_aureliaBinding.observable], {
    enumerable: true,
    initializer: function initializer() {
      return '';
    }
  })), _class2)) || _class);
});
define('resources/elements/editor',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Editor = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _desc, _value, _class, _descriptor;

  var Editor = exports.Editor = (_class = function () {
    function Editor() {
      _classCallCheck(this, Editor);

      _initDefineProp(this, 'value', _descriptor, this);
    }

    Editor.prototype.valueChanged = function valueChanged(newValue, oldValue) {};

    return Editor;
  }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'value', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
});
define('resources/elements/scramble',['exports', 'aurelia-framework', '../utils/ease', 'requestanimationframe'], function (exports, _aureliaFramework, _ease) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Scramble = undefined;

  var _ease2 = _interopRequireDefault(_ease);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _desc, _value, _class, _descriptor, _descriptor2;

  var Scramble = exports.Scramble = (_class = function () {
    function Scramble() {
      _classCallCheck(this, Scramble);

      _initDefineProp(this, 'duration', _descriptor, this);

      _initDefineProp(this, 'text', _descriptor2, this);

      this.animationID = undefined;
      this.targetText = '';
      this.chars = ['&blk14;', '&blk12;', '&block;', '&brvbar;', '&boxdl;', '&frasl;', '&bsol; ', '&gt;', '&lt;'];
      this.then = 0;
      this.frames = 0;
      this.frame = 0;
      this.from = [];
      this.to = [];
      this.reverse = false;
      this.fps = 1000 / 30;
    }

    Scramble.prototype.startAnimation = function startAnimation(from, to, frames) {
      this.then = Date.now();
      this.from = from;
      this.to = to;
      this.frames = frames;
      if (!this.animationID) {
        this.animationID = requestAnimationFrame(this.scrambleAnimation.bind(this));
      }
    };

    Scramble.prototype.stopAnimation = function stopAnimation(text) {
      if (this.animationID) {
        console.log(this.animationID);
        cancelAnimationFrame(this.animationID);
        this.targetText = text ? text : this.text;
        this.animationID = undefined;
      }
    };

    Scramble.prototype.scrambleAnimation = function scrambleAnimation() {
      this.animationID = requestAnimationFrame(this.scrambleAnimation.bind(this));
      var now = void 0,
          elapsed = void 0,
          sin = void 0,
          threshold = void 0,
          i = void 0,
          chars = void 0;
      now = Date.now();
      elapsed = now - this.then;
      if (elapsed > this.fps) {
        sin = _ease2.default.inOutSine(this.frame, 0, 1, this.frames);
        threshold = this.reverse ? 1 - sin : sin;
        this.then = now - elapsed % this.fps;
        this.frame += 1;

        for (i = this.from.length - 1; i >= 0; i--) {
          if (Math.random() > threshold) {
            this.from[i] = this.chars[Math.floor(Math.random() * this.chars.length)];
          } else {
            this.from[i] = this.to[i];
          }
        }
        this.targetText = this.from.join('');
      }
    };

    Scramble.prototype.fromToAnimation = function fromToAnimation(from, to) {
      var _this = this;

      var dur = this.duration / 2;
      var fromArr = from.split('');
      var fromLength = fromArr.length;
      var toArr = Array.apply(null, Array(fromLength));
      var frames = dur / this.fps;
      this.reverse = true;
      this.startAnimation(fromArr, toArr, frames);

      setTimeout(function () {
        _this.stopAnimation();

        toArr = to.split('');
        fromLength = fromArr.length;
        fromArr = Array.apply(null, Array(fromLength));
        _this.startAnimation(fromArr, toArr, frames);

        setTimeout(function () {
          _this.stopAnimation(to);
        }, dur);
      }, dur);
    };

    Scramble.prototype.toAnimation = function toAnimation(to) {
      var _this2 = this;

      var dur = this.duration;
      var toArr = to.split('');
      var fromArr = Array.apply(null, Array(toArr.length));
      var frames = dur / this.fps;

      this.startAnimation(fromArr, toArr, frames);
      setTimeout(function () {
        _this2.stopAnimation(to);
      }, dur);
    };

    Scramble.prototype.attached = function attached() {
      if (!this.animationID && this.targetText) this.toAnimation(this.targetText);
    };

    Scramble.prototype.textChanged = function textChanged(newText, oldText) {
      if (newText && oldText && newText !== oldText) this.fromToAnimation(newText, oldText);else this.toAnimation(newText);
    };

    return Scramble;
  }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'duration', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'text', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
});
define('resources/elements/suggestions',['exports', 'aurelia-framework', 'keras', 'weblas', 'lodash/flatten', 'async/times', 'async/each', 'async/queue', '../../data/indices_char', '../../data/char_indices', '../sampling', '../utils/uniq'], function (exports, _aureliaFramework, _keras, _weblas, _flatten, _times, _each, _queue, _indices_char, _char_indices, _sampling, _uniq) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Suggestions = undefined;

  var _weblas2 = _interopRequireDefault(_weblas);

  var _flatten2 = _interopRequireDefault(_flatten);

  var _times2 = _interopRequireDefault(_times);

  var _each2 = _interopRequireDefault(_each);

  var _queue2 = _interopRequireDefault(_queue);

  var _indices_char2 = _interopRequireDefault(_indices_char);

  var _char_indices2 = _interopRequireDefault(_char_indices);

  var _sampling2 = _interopRequireDefault(_sampling);

  var _uniq2 = _interopRequireDefault(_uniq);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

  var Suggestions = exports.Suggestions = (_dec = (0, _aureliaFramework.inject)(_weblas2.default), _dec(_class = (_class2 = function () {
    function Suggestions(weblas) {
      _classCallCheck(this, Suggestions);

      _initDefineProp(this, 'text', _descriptor, this);

      _initDefineProp(this, 'suggestions', _descriptor2, this);

      _initDefineProp(this, 'selected', _descriptor3, this);

      this.model = new _keras.Model({
        filepaths: {
          model: 'src/data/char_rnn_1.json',
          weights: 'src/data/char_rnn_80_weights.buf',
          metadata: 'src/data/char_rnn_80_metadata.json'
        }
      });

      this.weblas = weblas;
      this.maxlen = 40;
      this.start = 'It is going to be a very long day if we keep arguing and he has to seek his way beyond ';
      this.words = [];
      this.message = '';
      this.ready = false;
    }

    Suggestions.prototype._parseText = function _parseText(text, max) {
      text = text.split('');
      var data = text.slice(Math.max(text.length - max, 1));
      var x = new Array(max).fill(0).map(function (row) {
        return new Array(57).fill(0);
      });
      data.forEach(function (v, i) {
        x[i][_char_indices2.default[v]] = 1.0;
      });
      var f = new Float32Array((0, _flatten2.default)(x));
      return f;
    };

    Suggestions.prototype._sample = function _sample(preds, temp, count) {
      var t0 = performance.now();

      preds = preds.map(function (n) {
        return Math.log(n) / temp;
      });

      var exp_preds = preds.map(Math.exp);

      preds = exp_preds.map(function (n) {
        return n / exp_preds.reduce(function (a, b) {
          return a + b;
        }, 0);
      });

      var p = new Promise(function (resolve, reject) {
        (0, _times2.default)(count, function (n, next) {
          var probas = (0, _sampling2.default)().Multinomial(1, preds);
          probas = probas.draw();
          next(null, probas.indexOf(Math.max.apply(Math, probas)));
        }, function (err, arr) {
          if (err) reject(err);
          arr = arr.map(function (c) {
            return _indices_char2.default[c];
          });
          console.info('sample time ' + (performance.now() - t0));
          resolve(arr);
        });
      });

      return p;
    };

    Suggestions.prototype._predict = function _predict(data, temp, count) {
      var _this = this;

      var t0 = performance.now();

      var p = new Promise(function (resolve, reject) {
        _this.model.predict({
          input: data
        }).then(function (res) {
          _this._sample(res.output, temp, count).then(resolve);
          console.info('predict time ' + (performance.now() - t0));
        }).catch(reject);
      });

      return p;
    };

    Suggestions.prototype._textPredict = function _textPredict(text, temp, count) {
      var _this2 = this;

      var word = '';
      count = count ? count : 1;

      var p = new Promise(function (resolve, reject) {
        var iterator = function iterator(text, i) {
          var data = _this2._parseText(text, _this2.maxlen);
          _this2._predict(data, temp, count).then(function (chArr) {
            i += 1;
            if (count > 1) return resolve(chArr);
            word += chArr[0];
            text += word;
            if (chArr[0] === ' ') return resolve(word);

            return iterator(text);
          }).catch(reject);
        };

        iterator(text, 0);
      });
      return p;
    };

    Suggestions.prototype.getWords = function getWords() {
      var _this3 = this;

      this.words = [];
      var t1 = performance.now();
      var text = this.start;
      var queT1 = performance.now();

      var wordQ = (0, _queue2.default)(function (task, cb) {
        _this3._textPredict(task.text, task.temp).then(function (word) {
          _this3.words.push(task.char + word);
          cb();
        }).catch(cb);
      }, 1);

      this._textPredict(text, 0.5, 5).then(function (chars) {
        console.info('letters ' + chars + ' ' + (performance.now() - t1) + 'ms');
        chars = (0, _uniq2.default)(chars);
        var texts = chars.map(function (char) {
          return {
            char: char,
            text: char.replace(/^/, text),
            temp: 0.5
          };
        });
        texts.forEach(function (text) {
          return wordQ.push(text);
        });
      }).catch(console.warn);
    };

    Suggestions.prototype.attached = function attached() {
      var _this4 = this;

      this.model.ready().then(function () {
        _this4.ready = true;
        _this4.getWords();
      }).catch(console.warn);
    };

    Suggestions.prototype.valueChanged = function valueChanged(newValue, oldValue) {};

    return Suggestions;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'text', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'suggestions', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'selected', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('resources/utils/ease',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    inOutSine: function inOutSine(t, b, c, d) {
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    }
  };
});
define('resources/utils/index',['exports', './uniq', './ease'], function (exports, _uniq, _ease) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Utils = undefined;

  var _uniq2 = _interopRequireDefault(_uniq);

  var _ease2 = _interopRequireDefault(_ease);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Utils = exports.Utils = function Utils() {
    _classCallCheck(this, Utils);

    this.uniq = _uniq2.default;
    this.ease = _ease2.default;
  };
});
define('resources/utils/uniq',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (a) {
    return Array.from(new Set(a));
  };
});
define('lodash/flatten',['require','exports','module','./_baseFlatten'],function (require, exports, module) {var baseFlatten = require('./_baseFlatten');

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

module.exports = flatten;

});

define('lodash/_baseFlatten',['require','exports','module','./_arrayPush','./_isFlattenable'],function (require, exports, module) {var arrayPush = require('./_arrayPush'),
    isFlattenable = require('./_isFlattenable');

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;

});

define('lodash/_arrayPush',['require','exports','module'],function (require, exports, module) {/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;

});

define('lodash/_isFlattenable',['require','exports','module','./_Symbol','./isArguments','./isArray'],function (require, exports, module) {var Symbol = require('./_Symbol'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray');

/** Built-in value references. */
var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;

});

define('lodash/_Symbol',['require','exports','module','./_root'],function (require, exports, module) {var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

});

define('lodash/_root',['require','exports','module','./_freeGlobal'],function (require, exports, module) {var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

});

define('lodash/_freeGlobal',['require','exports','module'],function (require, exports, module) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

});

define('lodash/isArguments',['require','exports','module','./_baseIsArguments','./isObjectLike'],function (require, exports, module) {var baseIsArguments = require('./_baseIsArguments'),
    isObjectLike = require('./isObjectLike');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;

});

define('lodash/_baseIsArguments',['require','exports','module','./_baseGetTag','./isObjectLike'],function (require, exports, module) {var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;

});

define('lodash/_baseGetTag',['require','exports','module','./_Symbol','./_getRawTag','./_objectToString'],function (require, exports, module) {var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  value = Object(value);
  return (symToStringTag && symToStringTag in value)
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

});

define('lodash/_getRawTag',['require','exports','module','./_Symbol'],function (require, exports, module) {var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

});

define('lodash/_objectToString',['require','exports','module'],function (require, exports, module) {/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

});

define('lodash/isObjectLike',['require','exports','module'],function (require, exports, module) {/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

});

define('lodash/isArray',['require','exports','module'],function (require, exports, module) {/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

});

define('async/times',['require','exports','module','./timesLimit','./internal/doLimit'],function (require, exports, module) {'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _timesLimit = require('./timesLimit');

var _timesLimit2 = _interopRequireDefault(_timesLimit);

var _doLimit = require('./internal/doLimit');

var _doLimit2 = _interopRequireDefault(_doLimit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Calls the `iteratee` function `n` times, and accumulates results in the same
 * manner you would use with [map]{@link module:Collections.map}.
 *
 * @name times
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.map]{@link module:Collections.map}
 * @category Control Flow
 * @param {number} n - The number of times to run the function.
 * @param {Function} iteratee - The function to call `n` times. Invoked with the
 * iteration index and a callback (n, next).
 * @param {Function} callback - see {@link module:Collections.map}.
 * @example
 *
 * // Pretend this is some complicated async factory
 * var createUser = function(id, callback) {
 *     callback(null, {
 *         id: 'user' + id
 *     });
 * };
 *
 * // generate 5 users
 * async.times(5, function(n, next) {
 *     createUser(n, function(err, user) {
 *         next(err, user);
 *     });
 * }, function(err, users) {
 *     // we should now have 5 users
 * });
 */
exports.default = (0, _doLimit2.default)(_timesLimit2.default, Infinity);
module.exports = exports['default'];
});

define('async/timesLimit',['require','exports','module','./mapLimit','lodash/_baseRange'],function (require, exports, module) {'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = timeLimit;

var _mapLimit = require('./mapLimit');

var _mapLimit2 = _interopRequireDefault(_mapLimit);

var _baseRange = require('lodash/_baseRange');

var _baseRange2 = _interopRequireDefault(_baseRange);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The same as [times]{@link module:ControlFlow.times} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name timesLimit
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.times]{@link module:ControlFlow.times}
 * @category Control Flow
 * @param {number} count - The number of times to run the function.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {Function} iteratee - The function to call `n` times. Invoked with the
 * iteration index and a callback (n, next).
 * @param {Function} callback - see [async.map]{@link module:Collections.map}.
 */
function timeLimit(count, limit, iteratee, callback) {
  (0, _mapLimit2.default)((0, _baseRange2.default)(0, count, 1), limit, iteratee, callback);
}
module.exports = exports['default'];
});

define('async/mapLimit',['require','exports','module','./internal/doParallelLimit','./internal/map'],function (require, exports, module) {'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _doParallelLimit = require('./internal/doParallelLimit');

var _doParallelLimit2 = _interopRequireDefault(_doParallelLimit);

var _map = require('./internal/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The same as [`map`]{@link module:Collections.map} but runs a maximum of `limit` async operations at a time.
 *
 * @name mapLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.map]{@link module:Collections.map}
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {Function} iteratee - A function to apply to each item in `coll`.
 * The iteratee is passed a `callback(err, transformed)` which must be called
 * once it has completed with an error (which can be `null`) and a transformed
 * item. Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Results is an array of the
 * transformed items from the `coll`. Invoked with (err, results).
 */
exports.default = (0, _doParallelLimit2.default)(_map2.default);
module.exports = exports['default'];
});

define('async/internal/doParallelLimit',['require','exports','module','./eachOfLimit'],function (require, exports, module) {'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = doParallelLimit;

var _eachOfLimit = require('./eachOfLimit');

var _eachOfLimit2 = _interopRequireDefault(_eachOfLimit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function doParallelLimit(fn) {
    return function (obj, limit, iteratee, callback) {
        return fn((0, _eachOfLimit2.default)(limit), obj, iteratee, callback);
    };
}
module.exports = exports['default'];
});

define('async/internal/eachOfLimit',['require','exports','module','lodash/noop','./once','./iterator','./onlyOnce','./breakLoop'],function (require, exports, module) {'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _eachOfLimit;

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _once = require('./once');

var _once2 = _interopRequireDefault(_once);

var _iterator = require('./iterator');

var _iterator2 = _interopRequireDefault(_iterator);

var _onlyOnce = require('./onlyOnce');

var _onlyOnce2 = _interopRequireDefault(_onlyOnce);

var _breakLoop = require('./breakLoop');

var _breakLoop2 = _interopRequireDefault(_breakLoop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _eachOfLimit(limit) {
    return function (obj, iteratee, callback) {
        callback = (0, _once2.default)(callback || _noop2.default);
        if (limit <= 0 || !obj) {
            return callback(null);
        }
        var nextElem = (0, _iterator2.default)(obj);
        var done = false;
        var running = 0;

        function iterateeCallback(err, value) {
            running -= 1;
            if (err) {
                done = true;
                callback(err);
            } else if (value === _breakLoop2.default || done && running <= 0) {
                done = true;
                return callback(null);
            } else {
                replenish();
            }
        }

        function replenish() {
            while (running < limit && !done) {
                var elem = nextElem();
                if (elem === null) {
                    done = true;
                    if (running <= 0) {
                        callback(null);
                    }
                    return;
                }
                running += 1;
                iteratee(elem.value, elem.key, (0, _onlyOnce2.default)(iterateeCallback));
            }
        }

        replenish();
    };
}
module.exports = exports['default'];
});

define('lodash/noop',['require','exports','module'],function (require, exports, module) {/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;

});

define('async/internal/once',['require','exports','module'],function (require, exports, module) {"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = once;
function once(fn) {
    return function () {
        if (fn === null) return;
        var callFn = fn;
        fn = null;
        callFn.apply(this, arguments);
    };
}
module.exports = exports["default"];
});

define('async/internal/iterator',['require','exports','module','lodash/isArrayLike','./getIterator','lodash/keys'],function (require, exports, module) {'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = iterator;

var _isArrayLike = require('lodash/isArrayLike');

var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

var _getIterator = require('./getIterator');

var _getIterator2 = _interopRequireDefault(_getIterator);

var _keys = require('lodash/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createArrayIterator(coll) {
    var i = -1;
    var len = coll.length;
    return function next() {
        return ++i < len ? { value: coll[i], key: i } : null;
    };
}

function createES2015Iterator(iterator) {
    var i = -1;
    return function next() {
        var item = iterator.next();
        if (item.done) return null;
        i++;
        return { value: item.value, key: i };
    };
}

function createObjectIterator(obj) {
    var okeys = (0, _keys2.default)(obj);
    var i = -1;
    var len = okeys.length;
    return function next() {
        var key = okeys[++i];
        return i < len ? { value: obj[key], key: key } : null;
    };
}

function iterator(coll) {
    if ((0, _isArrayLike2.default)(coll)) {
        return createArrayIterator(coll);
    }

    var iterator = (0, _getIterator2.default)(coll);
    return iterator ? createES2015Iterator(iterator) : createObjectIterator(coll);
}
module.exports = exports['default'];
});

define('lodash/isArrayLike',['require','exports','module','./isFunction','./isLength'],function (require, exports, module) {var isFunction = require('./isFunction'),
    isLength = require('./isLength');

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;

});

define('lodash/isFunction',['require','exports','module','./_baseGetTag','./isObject'],function (require, exports, module) {var baseGetTag = require('./_baseGetTag'),
    isObject = require('./isObject');

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;

});

define('lodash/isObject',['require','exports','module'],function (require, exports, module) {/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

});

define('lodash/isLength',['require','exports','module'],function (require, exports, module) {/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

});

define('async/internal/getIterator',['require','exports','module'],function (require, exports, module) {'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (coll) {
    return iteratorSymbol && coll[iteratorSymbol] && coll[iteratorSymbol]();
};

var iteratorSymbol = typeof Symbol === 'function' && Symbol.iterator;

module.exports = exports['default'];
});

define('lodash/keys',['require','exports','module','./_arrayLikeKeys','./_baseKeys','./isArrayLike'],function (require, exports, module) {var arrayLikeKeys = require('./_arrayLikeKeys'),
    baseKeys = require('./_baseKeys'),
    isArrayLike = require('./isArrayLike');

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;

});

define('lodash/_arrayLikeKeys',['require','exports','module','./_baseTimes','./isArguments','./isArray','./isBuffer','./_isIndex','./isTypedArray'],function (require, exports, module) {var baseTimes = require('./_baseTimes'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isBuffer = require('./isBuffer'),
    isIndex = require('./_isIndex'),
    isTypedArray = require('./isTypedArray');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;

});

define('lodash/_baseTimes',['require','exports','module'],function (require, exports, module) {/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;

});

define('lodash/isBuffer',['require','exports','module','./_root','./stubFalse'],function (require, exports, module) {var root = require('./_root'),
    stubFalse = require('./stubFalse');

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

});

define('lodash/stubFalse',['require','exports','module'],function (require, exports, module) {/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

});

define('lodash/_isIndex',['require','exports','module'],function (require, exports, module) {/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;

});

define('lodash/isTypedArray',['require','exports','module','./_baseIsTypedArray','./_baseUnary','./_nodeUtil'],function (require, exports, module) {var baseIsTypedArray = require('./_baseIsTypedArray'),
    baseUnary = require('./_baseUnary'),
    nodeUtil = require('./_nodeUtil');

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;

});

define('lodash/_baseIsTypedArray',['require','exports','module','./_baseGetTag','./isLength','./isObjectLike'],function (require, exports, module) {var baseGetTag = require('./_baseGetTag'),
    isLength = require('./isLength'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;

});

define('lodash/_baseUnary',['require','exports','module'],function (require, exports, module) {/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;

});

define('lodash/_nodeUtil',['require','exports','module','./_freeGlobal'],function (require, exports, module) {var freeGlobal = require('./_freeGlobal');

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

});

define('lodash/_baseKeys',['require','exports','module','./_isPrototype','./_nativeKeys'],function (require, exports, module) {var isPrototype = require('./_isPrototype'),
    nativeKeys = require('./_nativeKeys');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;

});

define('lodash/_isPrototype',['require','exports','module'],function (require, exports, module) {/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;

});

define('lodash/_nativeKeys',['require','exports','module','./_overArg'],function (require, exports, module) {var overArg = require('./_overArg');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;

});

define('lodash/_overArg',['require','exports','module'],function (require, exports, module) {/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

});

define('async/internal/onlyOnce',['require','exports','module'],function (require, exports, module) {"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = onlyOnce;
function onlyOnce(fn) {
    return function () {
        if (fn === null) throw new Error("Callback was already called.");
        var callFn = fn;
        fn = null;
        callFn.apply(this, arguments);
    };
}
module.exports = exports["default"];
});

define('async/internal/breakLoop',['require','exports','module'],function (require, exports, module) {"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// A temporary value used to identify if the loop should be broken.
// See #1064, #1293
exports.default = {};
module.exports = exports["default"];
});

define('async/internal/map',['require','exports','module','lodash/noop','./once'],function (require, exports, module) {'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _asyncMap;

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _once = require('./once');

var _once2 = _interopRequireDefault(_once);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncMap(eachfn, arr, iteratee, callback) {
    callback = (0, _once2.default)(callback || _noop2.default);
    arr = arr || [];
    var results = [];
    var counter = 0;

    eachfn(arr, function (value, _, callback) {
        var index = counter++;
        iteratee(value, function (err, v) {
            results[index] = v;
            callback(err);
        });
    }, function (err) {
        callback(err, results);
    });
}
module.exports = exports['default'];
});

define('lodash/_baseRange',['require','exports','module'],function (require, exports, module) {/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeCeil = Math.ceil,
    nativeMax = Math.max;

/**
 * The base implementation of `_.range` and `_.rangeRight` which doesn't
 * coerce arguments.
 *
 * @private
 * @param {number} start The start of the range.
 * @param {number} end The end of the range.
 * @param {number} step The value to increment or decrement by.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Array} Returns the range of numbers.
 */
function baseRange(start, end, step, fromRight) {
  var index = -1,
      length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
      result = Array(length);

  while (length--) {
    result[fromRight ? length : ++index] = start;
    start += step;
  }
  return result;
}

module.exports = baseRange;

});

define('async/internal/doLimit',['require','exports','module'],function (require, exports, module) {"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = doLimit;
function doLimit(fn, limit) {
    return function (iterable, iteratee, callback) {
        return fn(iterable, limit, iteratee, callback);
    };
}
module.exports = exports["default"];
});

define('async/each',['require','exports','module','./eachOf','./internal/withoutIndex'],function (require, exports, module) {'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eachLimit;

var _eachOf = require('./eachOf');

var _eachOf2 = _interopRequireDefault(_eachOf);

var _withoutIndex = require('./internal/withoutIndex');

var _withoutIndex2 = _interopRequireDefault(_withoutIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Applies the function `iteratee` to each item in `coll`, in parallel.
 * The `iteratee` is called with an item from the list, and a callback for when
 * it has finished. If the `iteratee` passes an error to its `callback`, the
 * main `callback` (for the `each` function) is immediately called with the
 * error.
 *
 * Note, that since this function applies `iteratee` to each item in parallel,
 * there is no guarantee that the iteratee functions will complete in order.
 *
 * @name each
 * @static
 * @memberOf module:Collections
 * @method
 * @alias forEach
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {Function} iteratee - A function to apply to each item
 * in `coll`. The iteratee is passed a `callback(err)` which must be called once
 * it has completed. If no error has occurred, the `callback` should be run
 * without arguments or with an explicit `null` argument. The array index is not
 * passed to the iteratee. Invoked with (item, callback). If you need the index,
 * use `eachOf`.
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 * @example
 *
 * // assuming openFiles is an array of file names and saveFile is a function
 * // to save the modified contents of that file:
 *
 * async.each(openFiles, saveFile, function(err){
 *   // if any of the saves produced an error, err would equal that error
 * });
 *
 * // assuming openFiles is an array of file names
 * async.each(openFiles, function(file, callback) {
 *
 *     // Perform operation on file here.
 *     console.log('Processing file ' + file);
 *
 *     if( file.length > 32 ) {
 *       console.log('This file name is too long');
 *       callback('File name too long');
 *     } else {
 *       // Do work to process file here
 *       console.log('File processed');
 *       callback();
 *     }
 * }, function(err) {
 *     // if any of the file processing produced an error, err would equal that error
 *     if( err ) {
 *       // One of the iterations produced an error.
 *       // All processing will now stop.
 *       console.log('A file failed to process');
 *     } else {
 *       console.log('All files have been processed successfully');
 *     }
 * });
 */
function eachLimit(coll, iteratee, callback) {
  (0, _eachOf2.default)(coll, (0, _withoutIndex2.default)(iteratee), callback);
}
module.exports = exports['default'];
});

define('async/eachOf',['require','exports','module','lodash/isArrayLike','./eachOfLimit','./internal/doLimit','lodash/noop','./internal/once','./internal/onlyOnce'],function (require, exports, module) {'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (coll, iteratee, callback) {
    var eachOfImplementation = (0, _isArrayLike2.default)(coll) ? eachOfArrayLike : eachOfGeneric;
    eachOfImplementation(coll, iteratee, callback);
};

var _isArrayLike = require('lodash/isArrayLike');

var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

var _eachOfLimit = require('./eachOfLimit');

var _eachOfLimit2 = _interopRequireDefault(_eachOfLimit);

var _doLimit = require('./internal/doLimit');

var _doLimit2 = _interopRequireDefault(_doLimit);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _once = require('./internal/once');

var _once2 = _interopRequireDefault(_once);

var _onlyOnce = require('./internal/onlyOnce');

var _onlyOnce2 = _interopRequireDefault(_onlyOnce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eachOf implementation optimized for array-likes
function eachOfArrayLike(coll, iteratee, callback) {
    callback = (0, _once2.default)(callback || _noop2.default);
    var index = 0,
        completed = 0,
        length = coll.length;
    if (length === 0) {
        callback(null);
    }

    function iteratorCallback(err) {
        if (err) {
            callback(err);
        } else if (++completed === length) {
            callback(null);
        }
    }

    for (; index < length; index++) {
        iteratee(coll[index], index, (0, _onlyOnce2.default)(iteratorCallback));
    }
}

// a generic version of eachOf which can handle array, object, and iterator cases.
var eachOfGeneric = (0, _doLimit2.default)(_eachOfLimit2.default, Infinity);

/**
 * Like [`each`]{@link module:Collections.each}, except that it passes the key (or index) as the second argument
 * to the iteratee.
 *
 * @name eachOf
 * @static
 * @memberOf module:Collections
 * @method
 * @alias forEachOf
 * @category Collection
 * @see [async.each]{@link module:Collections.each}
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {Function} iteratee - A function to apply to each
 * item in `coll`. The `key` is the item's key, or index in the case of an
 * array. The iteratee is passed a `callback(err)` which must be called once it
 * has completed. If no error has occurred, the callback should be run without
 * arguments or with an explicit `null` argument. Invoked with
 * (item, key, callback).
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 * @example
 *
 * var obj = {dev: "/dev.json", test: "/test.json", prod: "/prod.json"};
 * var configs = {};
 *
 * async.forEachOf(obj, function (value, key, callback) {
 *     fs.readFile(__dirname + value, "utf8", function (err, data) {
 *         if (err) return callback(err);
 *         try {
 *             configs[key] = JSON.parse(data);
 *         } catch (e) {
 *             return callback(e);
 *         }
 *         callback();
 *     });
 * }, function (err) {
 *     if (err) console.error(err.message);
 *     // configs is now a map of JSON data
 *     doSomethingWith(configs);
 * });
 */
module.exports = exports['default'];
});

define('async/eachOfLimit',['require','exports','module','./internal/eachOfLimit'],function (require, exports, module) {'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eachOfLimit;

var _eachOfLimit2 = require('./internal/eachOfLimit');

var _eachOfLimit3 = _interopRequireDefault(_eachOfLimit2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The same as [`eachOf`]{@link module:Collections.eachOf} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name eachOfLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.eachOf]{@link module:Collections.eachOf}
 * @alias forEachOfLimit
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {Function} iteratee - A function to apply to each
 * item in `coll`. The `key` is the item's key, or index in the case of an
 * array. The iteratee is passed a `callback(err)` which must be called once it
 * has completed. If no error has occurred, the callback should be run without
 * arguments or with an explicit `null` argument. Invoked with
 * (item, key, callback).
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 */
function eachOfLimit(coll, limit, iteratee, callback) {
  (0, _eachOfLimit3.default)(limit)(coll, iteratee, callback);
}
module.exports = exports['default'];
});

define('async/internal/withoutIndex',['require','exports','module'],function (require, exports, module) {"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _withoutIndex;
function _withoutIndex(iteratee) {
    return function (value, index, callback) {
        return iteratee(value, callback);
    };
}
module.exports = exports["default"];
});

define('async/queue',['require','exports','module','./internal/queue'],function (require, exports, module) {'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (worker, concurrency) {
  return (0, _queue2.default)(function (items, cb) {
    worker(items[0], cb);
  }, concurrency, 1);
};

var _queue = require('./internal/queue');

var _queue2 = _interopRequireDefault(_queue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/**
 * A queue of tasks for the worker function to complete.
 * @typedef {Object} QueueObject
 * @memberOf module:ControlFlow
 * @property {Function} length - a function returning the number of items
 * waiting to be processed. Invoke with `queue.length()`.
 * @property {boolean} started - a boolean indicating whether or not any
 * items have been pushed and processed by the queue.
 * @property {Function} running - a function returning the number of items
 * currently being processed. Invoke with `queue.running()`.
 * @property {Function} workersList - a function returning the array of items
 * currently being processed. Invoke with `queue.workersList()`.
 * @property {Function} idle - a function returning false if there are items
 * waiting or being processed, or true if not. Invoke with `queue.idle()`.
 * @property {number} concurrency - an integer for determining how many `worker`
 * functions should be run in parallel. This property can be changed after a
 * `queue` is created to alter the concurrency on-the-fly.
 * @property {Function} push - add a new task to the `queue`. Calls `callback`
 * once the `worker` has finished processing the task. Instead of a single task,
 * a `tasks` array can be submitted. The respective callback is used for every
 * task in the list. Invoke with `queue.push(task, [callback])`,
 * @property {Function} unshift - add a new task to the front of the `queue`.
 * Invoke with `queue.unshift(task, [callback])`.
 * @property {Function} saturated - a callback that is called when the number of
 * running workers hits the `concurrency` limit, and further tasks will be
 * queued.
 * @property {Function} unsaturated - a callback that is called when the number
 * of running workers is less than the `concurrency` & `buffer` limits, and
 * further tasks will not be queued.
 * @property {number} buffer - A minimum threshold buffer in order to say that
 * the `queue` is `unsaturated`.
 * @property {Function} empty - a callback that is called when the last item
 * from the `queue` is given to a `worker`.
 * @property {Function} drain - a callback that is called when the last item
 * from the `queue` has returned from the `worker`.
 * @property {Function} error - a callback that is called when a task errors.
 * Has the signature `function(error, task)`.
 * @property {boolean} paused - a boolean for determining whether the queue is
 * in a paused state.
 * @property {Function} pause - a function that pauses the processing of tasks
 * until `resume()` is called. Invoke with `queue.pause()`.
 * @property {Function} resume - a function that resumes the processing of
 * queued tasks when the queue is paused. Invoke with `queue.resume()`.
 * @property {Function} kill - a function that removes the `drain` callback and
 * empties remaining tasks from the queue forcing it to go idle. Invoke with `queue.kill()`.
 */

/**
 * Creates a `queue` object with the specified `concurrency`. Tasks added to the
 * `queue` are processed in parallel (up to the `concurrency` limit). If all
 * `worker`s are in progress, the task is queued until one becomes available.
 * Once a `worker` completes a `task`, that `task`'s callback is called.
 *
 * @name queue
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Function} worker - An asynchronous function for processing a queued
 * task, which must call its `callback(err)` argument when finished, with an
 * optional `error` as an argument.  If you want to handle errors from an
 * individual task, pass a callback to `q.push()`. Invoked with
 * (task, callback).
 * @param {number} [concurrency=1] - An `integer` for determining how many
 * `worker` functions should be run in parallel.  If omitted, the concurrency
 * defaults to `1`.  If the concurrency is `0`, an error is thrown.
 * @returns {module:ControlFlow.QueueObject} A queue object to manage the tasks. Callbacks can
 * attached as certain properties to listen for specific events during the
 * lifecycle of the queue.
 * @example
 *
 * // create a queue object with concurrency 2
 * var q = async.queue(function(task, callback) {
 *     console.log('hello ' + task.name);
 *     callback();
 * }, 2);
 *
 * // assign a callback
 * q.drain = function() {
 *     console.log('all items have been processed');
 * };
 *
 * // add some items to the queue
 * q.push({name: 'foo'}, function(err) {
 *     console.log('finished processing foo');
 * });
 * q.push({name: 'bar'}, function (err) {
 *     console.log('finished processing bar');
 * });
 *
 * // add some items to the queue (batch-wise)
 * q.push([{name: 'baz'},{name: 'bay'},{name: 'bax'}], function(err) {
 *     console.log('finished processing item');
 * });
 *
 * // add some items to the front of the queue
 * q.unshift({name: 'bar'}, function (err) {
 *     console.log('finished processing bar');
 * });
 */
});

define('async/internal/queue',['require','exports','module','lodash/_baseIndexOf','lodash/isArray','lodash/noop','lodash/_baseRest','./onlyOnce','./setImmediate','./DoublyLinkedList'],function (require, exports, module) {'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = queue;

var _baseIndexOf = require('lodash/_baseIndexOf');

var _baseIndexOf2 = _interopRequireDefault(_baseIndexOf);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _baseRest = require('lodash/_baseRest');

var _baseRest2 = _interopRequireDefault(_baseRest);

var _onlyOnce = require('./onlyOnce');

var _onlyOnce2 = _interopRequireDefault(_onlyOnce);

var _setImmediate = require('./setImmediate');

var _setImmediate2 = _interopRequireDefault(_setImmediate);

var _DoublyLinkedList = require('./DoublyLinkedList');

var _DoublyLinkedList2 = _interopRequireDefault(_DoublyLinkedList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function queue(worker, concurrency, payload) {
    if (concurrency == null) {
        concurrency = 1;
    } else if (concurrency === 0) {
        throw new Error('Concurrency must not be zero');
    }

    function _insert(data, insertAtFront, callback) {
        if (callback != null && typeof callback !== 'function') {
            throw new Error('task callback must be a function');
        }
        q.started = true;
        if (!(0, _isArray2.default)(data)) {
            data = [data];
        }
        if (data.length === 0 && q.idle()) {
            // call drain immediately if there are no tasks
            return (0, _setImmediate2.default)(function () {
                q.drain();
            });
        }

        for (var i = 0, l = data.length; i < l; i++) {
            var item = {
                data: data[i],
                callback: callback || _noop2.default
            };

            if (insertAtFront) {
                q._tasks.unshift(item);
            } else {
                q._tasks.push(item);
            }
        }
        (0, _setImmediate2.default)(q.process);
    }

    function _next(tasks) {
        return (0, _baseRest2.default)(function (args) {
            workers -= 1;

            for (var i = 0, l = tasks.length; i < l; i++) {
                var task = tasks[i];
                var index = (0, _baseIndexOf2.default)(workersList, task, 0);
                if (index >= 0) {
                    workersList.splice(index);
                }

                task.callback.apply(task, args);

                if (args[0] != null) {
                    q.error(args[0], task.data);
                }
            }

            if (workers <= q.concurrency - q.buffer) {
                q.unsaturated();
            }

            if (q.idle()) {
                q.drain();
            }
            q.process();
        });
    }

    var workers = 0;
    var workersList = [];
    var q = {
        _tasks: new _DoublyLinkedList2.default(),
        concurrency: concurrency,
        payload: payload,
        saturated: _noop2.default,
        unsaturated: _noop2.default,
        buffer: concurrency / 4,
        empty: _noop2.default,
        drain: _noop2.default,
        error: _noop2.default,
        started: false,
        paused: false,
        push: function (data, callback) {
            _insert(data, false, callback);
        },
        kill: function () {
            q.drain = _noop2.default;
            q._tasks.empty();
        },
        unshift: function (data, callback) {
            _insert(data, true, callback);
        },
        process: function () {
            while (!q.paused && workers < q.concurrency && q._tasks.length) {
                var tasks = [],
                    data = [];
                var l = q._tasks.length;
                if (q.payload) l = Math.min(l, q.payload);
                for (var i = 0; i < l; i++) {
                    var node = q._tasks.shift();
                    tasks.push(node);
                    data.push(node.data);
                }

                if (q._tasks.length === 0) {
                    q.empty();
                }
                workers += 1;
                workersList.push(tasks[0]);

                if (workers === q.concurrency) {
                    q.saturated();
                }

                var cb = (0, _onlyOnce2.default)(_next(tasks));
                worker(data, cb);
            }
        },
        length: function () {
            return q._tasks.length;
        },
        running: function () {
            return workers;
        },
        workersList: function () {
            return workersList;
        },
        idle: function () {
            return q._tasks.length + workers === 0;
        },
        pause: function () {
            q.paused = true;
        },
        resume: function () {
            if (q.paused === false) {
                return;
            }
            q.paused = false;
            var resumeCount = Math.min(q.concurrency, q._tasks.length);
            // Need to call q.process once per concurrent
            // worker to preserve full concurrency after pause
            for (var w = 1; w <= resumeCount; w++) {
                (0, _setImmediate2.default)(q.process);
            }
        }
    };
    return q;
}
module.exports = exports['default'];
});

define('lodash/_baseIndexOf',['require','exports','module','./_baseFindIndex','./_baseIsNaN','./_strictIndexOf'],function (require, exports, module) {var baseFindIndex = require('./_baseFindIndex'),
    baseIsNaN = require('./_baseIsNaN'),
    strictIndexOf = require('./_strictIndexOf');

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

module.exports = baseIndexOf;

});

define('lodash/_baseFindIndex',['require','exports','module'],function (require, exports, module) {/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;

});

define('lodash/_baseIsNaN',['require','exports','module'],function (require, exports, module) {/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

module.exports = baseIsNaN;

});

define('lodash/_strictIndexOf',['require','exports','module'],function (require, exports, module) {/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = strictIndexOf;

});

define('lodash/_baseRest',['require','exports','module','./identity','./_overRest','./_setToString'],function (require, exports, module) {var identity = require('./identity'),
    overRest = require('./_overRest'),
    setToString = require('./_setToString');

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;

});

define('lodash/identity',['require','exports','module'],function (require, exports, module) {/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

});

define('lodash/_overRest',['require','exports','module','./_apply'],function (require, exports, module) {var apply = require('./_apply');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;

});

define('lodash/_apply',['require','exports','module'],function (require, exports, module) {/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;

});

define('lodash/_setToString',['require','exports','module','./_baseSetToString','./_shortOut'],function (require, exports, module) {var baseSetToString = require('./_baseSetToString'),
    shortOut = require('./_shortOut');

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;

});

define('lodash/_baseSetToString',['require','exports','module','./constant','./_defineProperty','./identity'],function (require, exports, module) {var constant = require('./constant'),
    defineProperty = require('./_defineProperty'),
    identity = require('./identity');

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;

});

define('lodash/constant',['require','exports','module'],function (require, exports, module) {/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;

});

define('lodash/_defineProperty',['require','exports','module','./_getNative'],function (require, exports, module) {var getNative = require('./_getNative');

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;

});

define('lodash/_getNative',['require','exports','module','./_baseIsNative','./_getValue'],function (require, exports, module) {var baseIsNative = require('./_baseIsNative'),
    getValue = require('./_getValue');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;

});

define('lodash/_baseIsNative',['require','exports','module','./isFunction','./_isMasked','./isObject','./_toSource'],function (require, exports, module) {var isFunction = require('./isFunction'),
    isMasked = require('./_isMasked'),
    isObject = require('./isObject'),
    toSource = require('./_toSource');

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;

});

define('lodash/_isMasked',['require','exports','module','./_coreJsData'],function (require, exports, module) {var coreJsData = require('./_coreJsData');

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;

});

define('lodash/_coreJsData',['require','exports','module','./_root'],function (require, exports, module) {var root = require('./_root');

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;

});

define('lodash/_toSource',['require','exports','module'],function (require, exports, module) {/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;

});

define('lodash/_getValue',['require','exports','module'],function (require, exports, module) {/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;

});

define('lodash/_shortOut',['require','exports','module'],function (require, exports, module) {/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;

});

define('async/internal/setImmediate',['require','exports','module','lodash/_baseRest'],function (require, exports, module) {'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasNextTick = exports.hasSetImmediate = undefined;
exports.fallback = fallback;
exports.wrap = wrap;

var _baseRest = require('lodash/_baseRest');

var _baseRest2 = _interopRequireDefault(_baseRest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasSetImmediate = exports.hasSetImmediate = typeof setImmediate === 'function' && setImmediate;
var hasNextTick = exports.hasNextTick = typeof process === 'object' && typeof process.nextTick === 'function';

function fallback(fn) {
    setTimeout(fn, 0);
}

function wrap(defer) {
    return (0, _baseRest2.default)(function (fn, args) {
        defer(function () {
            fn.apply(null, args);
        });
    });
}

var _defer;

if (hasSetImmediate) {
    _defer = setImmediate;
} else if (hasNextTick) {
    _defer = process.nextTick;
} else {
    _defer = fallback;
}

exports.default = wrap(_defer);
});

define('async/internal/DoublyLinkedList',['require','exports','module'],function (require, exports, module) {"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = DLL;
// Simple doubly linked list (https://en.wikipedia.org/wiki/Doubly_linked_list) implementation
// used for queues. This implementation assumes that the node provided by the user can be modified
// to adjust the next and last properties. We implement only the minimal functionality
// for queue support.
function DLL() {
    this.head = this.tail = null;
    this.length = 0;
}

function setInitial(dll, node) {
    dll.length = 1;
    dll.head = dll.tail = node;
}

DLL.prototype.removeLink = function (node) {
    if (node.prev) node.prev.next = node.next;else this.head = node.next;
    if (node.next) node.next.prev = node.prev;else this.tail = node.prev;

    node.prev = node.next = null;
    this.length -= 1;
    return node;
};

DLL.prototype.empty = DLL;

DLL.prototype.insertAfter = function (node, newNode) {
    newNode.prev = node;
    newNode.next = node.next;
    if (node.next) node.next.prev = newNode;else this.tail = newNode;
    node.next = newNode;
    this.length += 1;
};

DLL.prototype.insertBefore = function (node, newNode) {
    newNode.prev = node.prev;
    newNode.next = node;
    if (node.prev) node.prev.next = newNode;else this.head = newNode;
    node.prev = newNode;
    this.length += 1;
};

DLL.prototype.unshift = function (node) {
    if (this.head) this.insertBefore(this.head, node);else setInitial(this, node);
};

DLL.prototype.push = function (node) {
    if (this.tail) this.insertAfter(this.tail, node);else setInitial(this, node);
};

DLL.prototype.shift = function () {
    return this.head && this.removeLink(this.head);
};

DLL.prototype.pop = function () {
    return this.tail && this.removeLink(this.tail);
};
module.exports = exports["default"];
});

define('text!about.html', ['module'], function(module) { module.exports = ""; });
define('text!styles/app.css', ['module'], function(module) { module.exports = "html {\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n}\nbody {\n  margin: 0;\n  font-size: 16px;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n}\nh1,\nh2,\nh3,\nh4,\np,\nblockquote,\nfigure,\nol,\nul {\n  margin: 0;\n  padding: 0;\n}\nmain,\nli {\n  display: block;\n}\nh1,\nh2,\nh3,\nh4 {\n  font-size: inherit;\n}\nstrong {\n  font-weight: bold;\n}\na,\nbutton {\n  color: inherit;\n  -webkit-transition: 0.3s;\n  transition: 0.3s;\n}\na {\n  text-decoration: none;\n}\nbutton {\n  overflow: visible;\n  border: 0;\n  font: inherit;\n  -webkit-font-smoothing: inherit;\n  letter-spacing: inherit;\n  background: none;\n  cursor: pointer;\n}\n-moz-focus-inner {\n  padding: 0;\n  border: 0;\n}\nfocus {\n  outline: 0px solid transparent;\n}\n:focus {\n  outline: 0px solid transparent;\n}\nimg {\n  max-width: 100%;\n  height: auto;\n  border: 0;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ninput,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  font-family: inherit;\n}\n[contentEditable=true]:empty:not(:focus):before {\n  content: attr(placeholder);\n}\nhtml {\n  font-family: 'Space Mono', Menlo, Monaco, Consolas, \"Courier New\", monospace;\n  font-weight: 300;\n  color: #3a3c83;\n  font-size: 16px;\n  line-height: 1.75em;\n}\n@media (min-width: 600px) {\n  html {\n    font-size: calc( 16px + (32 - 16) * ((100vw - 600px) / (1200 - 600)) );\n  }\n}\n@media (min-width: 1200px) {\n  html {\n    font-size: 32px;\n  }\n}\np,\nblockquote,\npre,\naddress,\ndl,\nol,\nul,\ntable {\n  margin-bottom: 1.75em;\n}\nh1,\nh2,\nh3,\nh4,\nh5 {\n  font-family: 'Space Mono', Menlo, Monaco, Consolas, \"Courier New\", monospace;\n  font-weight: 500;\n  color: #3a3c83;\n  clear: both;\n}\nh1 {\n  font-size: 37.13918660312081px;\n  margin-top: 0;\n  line-height: 1.1em;\n  margin-bottom: 0.25em;\n}\n@media (min-width: 600px) {\n  h1 {\n    font-size: calc( 37.13918660312081px + (74.27837320624162 - 37.13918660312081) * ((100vw - 600px) / (1200 - 600)) );\n  }\n}\n@media (min-width: 1200px) {\n  h1 {\n    font-size: 74.27837320624162px;\n  }\n}\nh2 {\n  font-size: 31.382671211473443px;\n  margin-top: 0;\n  line-height: 1.2em;\n  margin-bottom: 0.25em;\n}\n@media (min-width: 600px) {\n  h2 {\n    font-size: calc( 31.382671211473443px + (62.76534242294689 - 31.382671211473443) * ((100vw - 600px) / (1200 - 600)) );\n  }\n}\n@media (min-width: 1200px) {\n  h2 {\n    font-size: 62.76534242294689px;\n  }\n}\nh3 {\n  font-size: 26.518406633189034px;\n  margin-top: 0;\n  line-height: 1.3em;\n  margin-bottom: 0.25em;\n}\n@media (min-width: 600px) {\n  h3 {\n    font-size: calc( 26.518406633189034px + (53.03681326637807 - 26.518406633189034) * ((100vw - 600px) / (1200 - 600)) );\n  }\n}\n@media (min-width: 1200px) {\n  h3 {\n    font-size: 53.03681326637807px;\n  }\n}\nh4 {\n  font-size: 22.408095398395087px;\n  margin-top: 0;\n  line-height: 1.4em;\n  margin-bottom: 0.25em;\n}\n@media (min-width: 600px) {\n  h4 {\n    font-size: calc( 22.408095398395087px + (44.816190796790174 - 22.408095398395087) * ((100vw - 600px) / (1200 - 600)) );\n  }\n}\n@media (min-width: 1200px) {\n  h4 {\n    font-size: 44.816190796790174px;\n  }\n}\nh5 {\n  font-size: 18.934875927090765px;\n  margin-top: 0;\n  line-height: 1.5em;\n  margin-bottom: 0.25em;\n}\n@media (min-width: 600px) {\n  h5 {\n    font-size: calc( 18.934875927090765px + (37.86975185418153 - 18.934875927090765) * ((100vw - 600px) / (1200 - 600)) );\n  }\n}\n@media (min-width: 1200px) {\n  h5 {\n    font-size: 37.86975185418153px;\n  }\n}\nh6 {\n  font-size: 16px;\n  margin-top: 0;\n  line-height: 1.6em;\n  margin-bottom: 0.25em;\n}\n@media (min-width: 600px) {\n  h6 {\n    font-size: calc( 16px + (32 - 16) * ((100vw - 600px) / (1200 - 600)) );\n  }\n}\n@media (min-width: 1200px) {\n  h6 {\n    font-size: 32px;\n  }\n}\na {\n  color: #3a3c83;\n  text-decoration: underline;\n}\na:hover {\n  color: #ff0070;\n}\n/*doc\n---\ntitle: Cetered Container\nname: container\ncategory:\n  - Structure\n---\n\nDescription.\n\n```html_example\n<section class=\"container\">This is a centered container block</section>\n```\n*/\n.container {\n  width: auto;\n  max-width: 70em;\n  float: none;\n  display: block;\n  margin-right: auto;\n  margin-left: auto;\n  padding-left: 1rem;\n  padding-right: 1rem;\n  float: left;\n  clear: none;\n  text-align: inherit;\n  width: 100%;\n  margin-left: 0%;\n  margin-right: 3%;\n}\n.container::after {\n  content: '';\n  display: table;\n  clear: both;\n}\n.container::after {\n  content: '';\n  display: table;\n  clear: both;\n}\n.container:last-child {\n  margin-right: 0%;\n}\n/*doc\n---\ntitle: Main button\nname: button\ncategory:\n  - Elements\n---\n\nDescription.\n\n```html_example\n<button>Main</button>\n```\n*/\nbutton {\n  padding: 0 0.5em;\n  height: 2em;\n  line-height: 1em;\n  background-color: #ff0070;\n  font-weight: bold;\n  color: #fff;\n}\nbutton:hover {\n  background-color: #ff4d9b;\n}\n"; });
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./styles/app.css\"></require>\n  <require from=\"./styles/nav.css\"></require>\n  <require from=\"./resources/elements/scramble\"></require>\n  <nav class=\"navbar\" role=\"navigation\">\n    <ul class=\"nav-list\">\n      <li><a href=\"#/about\"><scramble text=\"About\" duration=\"400\"></scramble></a></li>\n      <li><a href=\"#\"><scramble text=\"Norm\" duration=\"400\"></scramble></a></li>\n      <li><a href=\"#/editor\"><scramble text=\"Editor\" duration=\"400\"></scramble></a></li>\n    </ul>\n  </nav>\n  <router-view></router-view>\n</template>\n"; });
define('text!styles/autocomplete.css', ['module'], function(module) { module.exports = "autocomplete {\n  display: inline-block;\n}\nautocomplete input {\n  width: 100%;\n  box-sizing: border-box;\n  border: none;\n}\nautocomplete .suggestions {\n  list-style-type: none;\n  cursor: default;\n  padding: 0;\n  margin: 0;\n  border: 1px solid #ccc;\n  background: #fff;\n  box-shadow: -1px 1px 3px rgba(0,0,0,0.1);\n  position: absolute;\n  z-index: 9999;\n  max-height: 15rem;\n  overflow: hidden;\n  overflow-y: auto;\n  box-sizing: border-box;\n}\nautocomplete .suggestion {\n  padding: 0 0.3rem;\n  line-height: 1.5rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  color: #333;\n}\nautocomplete .suggestionhover,\nautocomplete .suggestion.selected {\n  background: #f0f0f0;\n}\n"; });
define('text!home.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./resources/elements/scramble\"></require>\n  <require from=\"./styles/home.css\"></require>\n  <main id=\"home\">\n    <header class=\"container\">\n      <h1>Norm is a modular text-suggestion system.</h1>\n    </header>\n    <section class=\"container\">\n      <p>${message}</p>\n      <button type=\"button\" click.delegate=\"getWords()\">Refresh words</button>\n      <ul>\n        <li repeat.for=\"word of words\"><scramble text.bind=\"word\" duration=\"400\"></scramble></li>\n      </ul>\n    </section>\n  </main>\n</template>"; });
define('text!styles/base.css', ['module'], function(module) { module.exports = "/* \n  http://jaydenseric.com/blog/forget-normalize-or-resets-lay-your-own-css-foundation\n*/\nhtml {\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n}\nbody {\n  margin: 0;\n  font-size: 16px;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n}\nh1,\nh2,\nh3,\nh4,\np,\nblockquote,\nfigure,\nol,\nul {\n  margin: 0;\n  padding: 0;\n}\nmain,\nli {\n  display: block;\n}\nh1,\nh2,\nh3,\nh4 {\n  font-size: inherit;\n}\nstrong {\n  font-weight: bold;\n}\na,\nbutton {\n  color: inherit;\n  -webkit-transition: 0.3s;\n  transition: 0.3s;\n}\na {\n  text-decoration: none;\n}\nbutton {\n  overflow: visible;\n  border: 0;\n  font: inherit;\n  -webkit-font-smoothing: inherit;\n  letter-spacing: inherit;\n  background: none;\n  cursor: pointer;\n}\n-moz-focus-inner {\n  padding: 0;\n  border: 0;\n}\nfocus {\n  outline: 0px solid transparent;\n}\n:focus {\n  outline: 0px solid transparent;\n}\nimg {\n  max-width: 100%;\n  height: auto;\n  border: 0;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ninput,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  font-family: inherit;\n}\n[contentEditable=true]:empty:not(:focus):before {\n  content: attr(placeholder);\n}\n"; });
define('text!text-editor.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"codemirror/lib/codemirror.css\"></require>\n  <require from=\"resources/elements/autocomplete\"></require>\n  <require from=\"styles/text-editor.css\"></require>\n  <main id=\"text-editor\">\n  <section class=\"text-editor-container\">\n    <div class=\"text-editor-title\">\n      <h5 contenteditable=\"true\" placeholder=\"Title\" ref=\"editorTitle\"></h5>\n    </div>\n    <label class=\"text-editor-avatar\">\n      <autocomplete dely=\"300\" placeholder=\"Beyonce\" value.bind=\"avatar\" service.bind=\"avatarNameService\"></autocomplete>\n    </label>\n  </section>\n  <section class=\"text-editor-container\">\n    <figure class=\"cm-editor\" ref=\"cmEditor\">\n    </figure>\n  </section>\n</template>"; });
define('text!styles/home.css', ['module'], function(module) { module.exports = "#home header {\n  margin: 1rem 0;\n}\n"; });
define('text!resources/elements/autocomplete.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../../styles/autocomplete.css\"></require>\n  <input type=\"text\" autocomplete=\"off\"\n         aria-autocomplete=\"list\"\n         aria-expanded.bind=\"expanded\"\n         aria-owns.one-time=\"'au-autocomplate-' + id + '-suggestions'\"\n         aria-activedescendant.bind=\"index >= 0 ? 'au-autocomplate-' + id + '-suggestion-' + index : ''\"\n         id.one-time=\"'au-autocomplete-' + id\"\n         placeholder.bind=\"placeholder\"\n         value.bind=\"inputValue & debounce:delay\"\n         keydown.delegate=\"keydown($event.which)\"\n         blur.trigger=\"blur()\">\n  <ul class=\"suggestions\" role=\"listbox\"\n      if.bind=\"expanded\"\n      id.one-time=\"'au-autocomplate-' + id + '-suggestions'\"\n      ref=\"suggestionsUL\">\n    <li repeat.for=\"suggestion of suggestions\" \n        id.one-time=\"'au-autocomplate-' + id + '-suggestion-' + $index\"\n        role=\"option\"\n        class-name.bind=\"($index === index ? 'selected' : '') + ' suggestion'\"\n        mousedown.delegate=\"suggestionClicked(suggestion)\">\n      <template replaceable part=\"suggestion\">\n        ${suggestion}\n      </template>\n    </li>\n  </ul>\n</template>"; });
define('text!styles/nav.css', ['module'], function(module) { module.exports = "nav {\n  width: auto;\n  max-width: 60em;\n  float: none;\n  display: block;\n  margin-right: auto;\n  margin-left: auto;\n  padding-left: 0;\n  padding-right: 0;\n}\nnav::after {\n  content: '';\n  display: table;\n  clear: both;\n}\nnav ul.nav-list {\n  list-style-type: none;\n}\nnav ul.nav-list li {\n  float: left;\n  clear: none;\n  text-align: inherit;\n  width: 31.33333333333333%;\n  margin-left: 0%;\n  margin-right: 3%;\n  display: inline-block;\n}\nnav ul.nav-list li::after {\n  content: '';\n  display: table;\n  clear: both;\n}\nnav ul.nav-list li:last-child {\n  margin-right: 0%;\n}\nnav ul.nav-list li a {\n  display: block;\n  text-align: center;\n  font-size: 14.201156945318074px;\n  margin-top: 1.84844094752817em;\n  line-height: 2.218129137033805em;\n  margin-bottom: 0.369688189505634em;\n  padding-top: 0;\n  margin-top: 0 !important;\n}\n@media (min-width: 600px) {\n  nav ul.nav-list li a {\n    font-size: calc( 14.201156945318074px + (23.668594908863454 - 14.201156945318074) * ((100vw - 600px) / (1140 - 600)) );\n  }\n}\n@media (min-width: 1140px) {\n  nav ul.nav-list li a {\n    font-size: 23.668594908863454px;\n    margin-top: 1.84844094752817em;\n    line-height: 2.218129137033805em;\n    margin-bottom: 0.369688189505634em;\n  }\n}\n"; });
define('text!resources/elements/editor.html', ['module'], function(module) { module.exports = "<template>\n  <h1>${value}</h1>\n</template>"; });
define('text!resources/elements/scramble.html', ['module'], function(module) { module.exports = "<template>\n  <span innerHtml.bind=\"targetText\"></span>\n</template>"; });
define('text!styles/text-editor.css', ['module'], function(module) { module.exports = "#text-editor {\n  margin-top: 1rem;\n}\n.text-editor-container {\n  width: auto;\n  max-width: 60em;\n  float: none;\n  display: block;\n  margin-right: auto;\n  margin-left: auto;\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n.text-editor-container::after {\n  content: '';\n  display: table;\n  clear: both;\n}\n.text-editor-title {\n  float: left;\n  clear: none;\n  text-align: inherit;\n  width: 65.66666666666666%;\n  margin-left: 0%;\n  margin-right: 3%;\n}\n.text-editor-title::after {\n  content: '';\n  display: table;\n  clear: both;\n}\n.text-editor-title:last-child {\n  margin-right: 0%;\n}\n.text-editor-title h5 {\n  border: none;\n  font-weight: bold;\n}\n.text-editor-title h5::before {\n  color: #c7c8e6;\n}\n.text-editor-avatar {\n  float: left;\n  clear: none;\n  text-align: inherit;\n  width: 31.33333333333333%;\n  margin-left: 0%;\n  margin-right: 3%;\n}\n.text-editor-avatar::after {\n  content: '';\n  display: table;\n  clear: both;\n}\n.text-editor-avatar:last-child {\n  margin-right: 0%;\n}\n.text-editor-avatar autocomplete {\n  width: 100%;\n  display: block;\n}\n.text-editor-avatar autocomplete input {\n  font-size: 1em;\n  border-right: 1px solid #3a3c83;\n  border-left: 1px solid #3a3c83;\n  padding: 0 0.2em;\n  height: 1.4em;\n}\n.cm-editor .CodeMirror {\n  font-size: 1em;\n  line-height: 1.43em;\n}\n.cm-editor .CodeMirror .CodeMirror-linenumber {\n  color: #000;\n}\n.cm-editor .CodeMirror .CodeMirror-linenumber:nth-of-type(4) {\n  color: blu1;\n}\n"; });
define('text!resources/elements/suggestions.html', ['module'], function(module) { module.exports = "<template>\n  <h1>${value}</h1>\n</template>"; });
define('text!styles/typography.css', ['module'], function(module) { module.exports = "html {\n  font-family: 'Space Mono', Menlo, Monaco, Consolas, \"Courier New\", monospace;\n  font-weight: 300;\n  color: #3a3c83;\n  font-size: 16px;\n  line-height: 1.75em;\n}\n@media (min-width: 600px) {\n  html {\n    font-size: calc( 16px + (32 - 16) * ((100vw - 600px) / (1200 - 600)) );\n  }\n}\n@media (min-width: 1200px) {\n  html {\n    font-size: 32px;\n  }\n}\np,\nblockquote,\npre,\naddress,\ndl,\nol,\nul,\ntable {\n  margin-bottom: 1.75em;\n}\nh1,\nh2,\nh3,\nh4,\nh5 {\n  font-family: 'Space Mono', Menlo, Monaco, Consolas, \"Courier New\", monospace;\n  font-weight: 500;\n  color: #3a3c83;\n  clear: both;\n}\nh1 {\n  font-size: 37.13918660312081px;\n  margin-top: 0;\n  line-height: 1.1em;\n  margin-bottom: 0.25em;\n}\n@media (min-width: 600px) {\n  h1 {\n    font-size: calc( 37.13918660312081px + (74.27837320624162 - 37.13918660312081) * ((100vw - 600px) / (1200 - 600)) );\n  }\n}\n@media (min-width: 1200px) {\n  h1 {\n    font-size: 74.27837320624162px;\n  }\n}\nh2 {\n  font-size: 31.382671211473443px;\n  margin-top: 0;\n  line-height: 1.2em;\n  margin-bottom: 0.25em;\n}\n@media (min-width: 600px) {\n  h2 {\n    font-size: calc( 31.382671211473443px + (62.76534242294689 - 31.382671211473443) * ((100vw - 600px) / (1200 - 600)) );\n  }\n}\n@media (min-width: 1200px) {\n  h2 {\n    font-size: 62.76534242294689px;\n  }\n}\nh3 {\n  font-size: 26.518406633189034px;\n  margin-top: 0;\n  line-height: 1.3em;\n  margin-bottom: 0.25em;\n}\n@media (min-width: 600px) {\n  h3 {\n    font-size: calc( 26.518406633189034px + (53.03681326637807 - 26.518406633189034) * ((100vw - 600px) / (1200 - 600)) );\n  }\n}\n@media (min-width: 1200px) {\n  h3 {\n    font-size: 53.03681326637807px;\n  }\n}\nh4 {\n  font-size: 22.408095398395087px;\n  margin-top: 0;\n  line-height: 1.4em;\n  margin-bottom: 0.25em;\n}\n@media (min-width: 600px) {\n  h4 {\n    font-size: calc( 22.408095398395087px + (44.816190796790174 - 22.408095398395087) * ((100vw - 600px) / (1200 - 600)) );\n  }\n}\n@media (min-width: 1200px) {\n  h4 {\n    font-size: 44.816190796790174px;\n  }\n}\nh5 {\n  font-size: 18.934875927090765px;\n  margin-top: 0;\n  line-height: 1.5em;\n  margin-bottom: 0.25em;\n}\n@media (min-width: 600px) {\n  h5 {\n    font-size: calc( 18.934875927090765px + (37.86975185418153 - 18.934875927090765) * ((100vw - 600px) / (1200 - 600)) );\n  }\n}\n@media (min-width: 1200px) {\n  h5 {\n    font-size: 37.86975185418153px;\n  }\n}\nh6 {\n  font-size: 16px;\n  margin-top: 0;\n  line-height: 1.6em;\n  margin-bottom: 0.25em;\n}\n@media (min-width: 600px) {\n  h6 {\n    font-size: calc( 16px + (32 - 16) * ((100vw - 600px) / (1200 - 600)) );\n  }\n}\n@media (min-width: 1200px) {\n  h6 {\n    font-size: 32px;\n  }\n}\n"; });
define('text!styles/variables.css', ['module'], function(module) { module.exports = ""; });
//# sourceMappingURL=app-bundle.js.map