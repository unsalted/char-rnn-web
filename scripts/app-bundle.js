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
define('home',['exports', 'aurelia-framework', 'resources/utils/cricket', 'async/queue'], function (exports, _aureliaFramework, _cricket, _queue) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  var _queue2 = _interopRequireDefault(_queue);

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

  var Home = exports.Home = function () {
    function Home() {
      _classCallCheck(this, Home);

      this.start = 'It is going to be a very long day if we keep arguing and he has to seek his way beyond ';
      this.message = '';
      this.msgArray = new Array();
    }

    Home.prototype.attached = function attached() {
      var _this = this;

      var start = 'Hello from Norm, this is my West Coast hip-hop model: ';
      this.message = start;
      this.msgArray.push(start);
      this.cricket = new _cricket.Cricket(40, {
        model: 'src/data/hip_hop/hip_hop.json',
        weights: 'src/data/hip_hop/hip_hop_1_128_char_rnn_best_weights.buf',
        metadata: 'src/data/hip_hop/hip_hop_1_128_char_rnn_best_metadata.json'
      });

      var msgQ = (0, _queue2.default)(function (task, cb) {
        console.log(task);
        _this.cricket.print(task.text, 2).then(function (txt) {
          _this.msgArray.push(txt.slice(task.text.length));
          console.log(_this.msgArray, 'test');
          task.n += 1;
          if (task.n <= 100) setTimeout(function () {
            msgQ.push({ text: txt, n: task.n });
          }, 50);
          return cb(null, txt);
        }).catch(cb);
      }, 1);

      setTimeout(function () {
        msgQ.push({ text: start, n: 0 });
      }, 400);
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
define('text-editor',['exports', 'aurelia-framework', 'data/avatars', 'resources/utils/cricket'], function (exports, _aureliaFramework, _avatars, _cricket) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AvatarNameSuggestionService = exports.TextEditor = undefined;

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

      this.editorTitleEvent = function (e) {
        if (e.which === 13) e.preventDefault();
      };

      this.start = 'and he has to seek his way beyond ';
    }

    TextEditor.prototype.detatched = function detatched() {
      this.editorTitle.removeEventListener('keypress', this.editorTitleEvent);
    };

    TextEditor.prototype.attached = function attached() {
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
define('data/avatars',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var avatars = exports.avatars = [{ name: "Beyonce" }, { name: "Rhianna" }, { name: "John Legend" }, { name: "John Smith" }, { name: "William Shakespeare" }, { name: "James Joyce" }, { name: "Javascript" }];
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
define('data/graphicdesign/graphicdesign_char_indices',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    "和": 349,
    "到": 345,
    "§": 44,
    "": 419,
    "能": 398,
    "j": 21,
    "ß": 66,
    "⌅": 259,
    "└": 268,
    "2": 4,
    "→": 224,
    "⃝": 216,
    "»": 61,
    "∪": 249,
    "↱": 226,
    "ć": 92,
    "◙": 288,
    "з": 149,
    "➔": 300,
    "̃": 127,
    "굴": 415,
    "ģ": 98,
    "等": 393,
    "ı": 100,
    "ي": 182,
    "˚": 122,
    "才": 368,
    "η": 133,
    "ツ": 322,
    " ": 0,
    "ç": 74,
    "и": 150,
    "是": 375,
    "¥": 42,
    "▸": 284,
    "⤾": 305,
    "设": 402,
    "平": 362,
    "⊍": 252,
    "微": 363,
    "优": 339,
    "⇒": 234,
    "—": 192,
    "â": 69,
    "‑": 190,
    "ǆ": 116,
    "д": 146,
    "к": 151,
    "ī": 99,
    "›": 207,
    "虑": 400,
    "а": 142,
    "е": 147,
    "с": 158,
    "☛": 294,
    "ĝ": 97,
    "体": 341,
    "ü": 89,
    "␣": 265,
    "都": 409,
    "л": 152,
    "˘": 121,
    "7": 9,
    "¬": 48,
    "в": 144,
    "b": 13,
    "⊔": 253,
    "⅔": 221,
    "◣": 289,
    "ῶ": 186,
    "'": 1,
    "ř": 108,
    "š": 110,
    "‘": 193,
    "ž": 114,
    "╚": 274,
    "∧": 247,
    "ú": 88,
    "¦": 43,
    "⚙": 298,
    "ﷺ": 421,
    "。": 311,
    "╣": 277,
    "⎇": 263,
    "字": 355,
    "í": 79,
    "跨": 403,
    "£": 40,
    "集": 411,
    "ņ": 105,
    "1": 3,
    "г": 145,
    "就": 359,
    "═": 270,
    "•": 200,
    "中": 334,
    "ة": 170,
    "̌": 129,
    "림": 416,
    "➜": 301,
    "←": 222,
    "ѻ": 167,
    "ô": 84,
    "”": 196,
    "⭾": 310,
    "︎": 423,
    "软": 404,
    "l": 23,
    "ē": 94,
    "为": 335,
    "タ": 320,
    "ê": 77,
    "æ": 73,
    "神": 391,
    "ä": 71,
    "楷": 382,
    "̄": 128,
    "т": 159,
    " ": 187,
    "ц": 163,
    "ク": 317,
    "½": 63,
    "一": 330,
    "◤": 290,
    "خ": 173,
    "°": 51,
    "最": 378,
    "·": 58,
    "ð": 81,
    "q": 28,
    "ł": 103,
    "ま": 314,
    "ح": 172,
    "∊": 239,
    "ñ": 82,
    "⏎": 264,
    "们": 338,
    "因": 350,
    "☞": 295,
    "ë": 78,
    "ļ": 102,
    "¶": 57,
    "h": 19,
    "м": 153,
    "↹": 230,
    "á": 68,
    "3": 5,
    "├": 269,
    "⤿": 306,
    "ó": 83,
    "ě": 96,
    "≥": 251,
    "宋": 356,
    "a": 12,
    "y": 36,
    "₹": 211,
    "„": 197,
    "朝": 380,
    "➤": 303,
    "，": 425,
    "¹": 59,
    "4": 6,
    "黑": 414,
    "⅓": 220,
    "č": 93,
    "х": 162,
    "⋮": 257,
    "₃": 209,
    "图": 352,
    "ʼ": 119,
    "╝": 275,
    "f": 17,
    "√": 245,
    "国": 351,
    "p": 27,
    "細": 394,
    "ッ": 321,
    "↑": 223,
    "般": 399,
    "リ": 328,
    "考": 396,
    "∑": 242,
    "⇧": 236,
    "⃗": 214,
    "版": 386,
    "ǎ": 117,
    "↵": 228,
    "τ": 140,
    "ا": 168,
    "│": 267,
    "π": 138,
    "˝": 124,
    "ﬁ": 420,
    "ö": 85,
    "╗": 273,
    "后": 348,
    "计": 401,
    "6": 8,
    "б": 143,
    "e": 16,
    "9": 11,
    "μ": 136,
    "⃞": 217,
    "⃔": 212,
    "に": 313,
    "显": 376,
    "u": 32,
    "θ": 134,
    "k": 22,
    "↓": 225,
    "¤": 41,
    "ュ": 327,
    "è": 75,
    "╠": 276,
    "–": 191,
    "或": 365,
    "∀": 237,
    "⇑": 233,
    "у": 160,
    "«": 47,
    "€": 210,
    "п": 156,
    "د": 174,
    "س": 176,
    "宮": 357,
    "择": 369,
    "¾": 64,
    "页": 412,
    "ą": 91,
    "较": 405,
    "÷": 86,
    "ж": 148,
    "ō": 106,
    "바": 417,
    "å": 72,
    "w": 34,
    "ź": 112,
    "可": 346,
    "ш": 164,
    "ь": 165,
    "↷": 229,
    "′": 205,
    "↻": 231,
    "d": 15,
    "站": 392,
    " ": 38,
    "∐": 241,
    " ": 203,
    "5": 7,
    "⩂": 307,
    "ἀ": 184,
    "✔": 299,
    "v": 33,
    "˛": 123,
    "⇐": 232,
    " ": 188,
    "書": 377,
    "先": 342,
    "ネ": 324,
    "¢": 39,
    "×": 65,
    "▲": 282,
    "★": 291,
    "ŗ": 107,
    "─": 266,
    "­": 49,
    "我": 364,
    "╩": 279,
    "ω": 141,
    "⌥": 261,
    "¼": 62,
    "示": 390,
    "ï": 80,
    "く": 312,
    "ῖ": 185,
    "″": 206,
    "ゴ": 318,
    "有": 379,
    "s": 30,
    "正": 383,
    "网": 395,
    "⊕": 254,
    "フ": 325,
    "治": 385,
    "ə": 118,
    "²": 53,
    "⌘": 260,
    "ς": 139,
    "o": 26,
    "µ": 56,
    "ل": 178,
    "他": 337,
    "◘": 287,
    "و": 181,
    "塚": 353,
    "者": 397,
    "り": 315,
    "…": 201,
    "台": 347,
    "的": 388,
    "⃛": 215,
    "c": 14,
    "±": 52,
    "小": 358,
    "る": 316,
    "ø": 87,
    "z": 37,
    "⌃": 258,
    "é": 76,
    "�": 428,
    "−": 243,
    "g": 18,
    "я": 166,
    "m": 24,
    "ķ": 101,
    "其": 343,
    "雅": 410,
    "ι": 135,
    "i": 20,
    "新": 372,
    "易": 374,
    "ū": 111,
    "’": 194,
    "ر": 175,
    "ℝ": 218,
    "à": 67,
    "ν": 137,
    "マ": 326,
    "ż": 113,
    "╦": 278,
    "о": 155,
    "n": 25,
    "̑": 130,
    "：": 427,
    "‡": 199,
    "明": 373,
    "会": 340,
    "ب": 169,
    "手": 367,
    "层": 360,
    "‱": 204,
    "好": 354,
    "α": 131,
    "t": 31,
    "↲": 227,
    "两": 332,
    "™": 219,
    "r": 29,
    "⇥": 235,
    "人": 336,
    "⍈": 262,
    "这": 406,
    "∞": 246,
    "目": 389,
    "∘": 244,
    "シ": 319,
    "☆": 292,
    "ع": 177,
    "用": 387,
    "⩏": 309,
    "ę": 95,
    "➡": 302,
    "文": 371,
    "ー": 329,
    "탕": 418,
    "´": 55,
    "ф": 161,
    "©": 46,
    "＋": 424,
    " ": 189,
    "م": 179,
    "̂": 126,
    "╔": 272,
    "®": 50,
    "通": 408,
    "比": 384,
    "́": 125,
    "丁": 331,
    "р": 157,
    "◍": 286,
    "▶": 283,
    "⋓": 256,
    "ã": 70,
    "☒": 293,
    "☺": 296,
    "∏": 240,
    "δ": 132,
    "ń": 104,
    "⊻": 255,
    "╬": 280,
    "x": 35,
    "\u2028": 202,
    "ſ": 115,
    "户": 366,
    "“": 195,
    "○": 285,
    "0": 2,
    "ˆ": 120,
    "8": 10,
    "³": 54,
    "ن": 180,
    "常": 361,
    "ā": 90,
    "≈": 250,
    "个": 333,
    "⩌": 308,
    "體": 413,
    "∨": 248,
    "▧": 281,
    "†": 198,
    "¨": 45,
    "⃕": 213,
    "效": 370,
    "௵": 183,
    "♨": 297,
    "ت": 171,
    "﷽": 422,
    "ś": 109,
    "选": 407,
    "ニ": 323,
    "写": 344,
    "º": 60,
    "н": 154,
    "∃": 238,
    "果": 381,
    "⤻": 304,
    "－": 426,
    "║": 271,
    "⁄": 208
  };
});
define('data/graphicdesign/graphicdesign_indices_char',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    "0": " ",
    "1": "'",
    "2": "0",
    "3": "1",
    "4": "2",
    "5": "3",
    "6": "4",
    "7": "5",
    "8": "6",
    "9": "7",
    "10": "8",
    "11": "9",
    "12": "a",
    "13": "b",
    "14": "c",
    "15": "d",
    "16": "e",
    "17": "f",
    "18": "g",
    "19": "h",
    "20": "i",
    "21": "j",
    "22": "k",
    "23": "l",
    "24": "m",
    "25": "n",
    "26": "o",
    "27": "p",
    "28": "q",
    "29": "r",
    "30": "s",
    "31": "t",
    "32": "u",
    "33": "v",
    "34": "w",
    "35": "x",
    "36": "y",
    "37": "z",
    "38": " ",
    "39": "¢",
    "40": "£",
    "41": "¤",
    "42": "¥",
    "43": "¦",
    "44": "§",
    "45": "¨",
    "46": "©",
    "47": "«",
    "48": "¬",
    "49": "­",
    "50": "®",
    "51": "°",
    "52": "±",
    "53": "²",
    "54": "³",
    "55": "´",
    "56": "µ",
    "57": "¶",
    "58": "·",
    "59": "¹",
    "60": "º",
    "61": "»",
    "62": "¼",
    "63": "½",
    "64": "¾",
    "65": "×",
    "66": "ß",
    "67": "à",
    "68": "á",
    "69": "â",
    "70": "ã",
    "71": "ä",
    "72": "å",
    "73": "æ",
    "74": "ç",
    "75": "è",
    "76": "é",
    "77": "ê",
    "78": "ë",
    "79": "í",
    "80": "ï",
    "81": "ð",
    "82": "ñ",
    "83": "ó",
    "84": "ô",
    "85": "ö",
    "86": "÷",
    "87": "ø",
    "88": "ú",
    "89": "ü",
    "90": "ā",
    "91": "ą",
    "92": "ć",
    "93": "č",
    "94": "ē",
    "95": "ę",
    "96": "ě",
    "97": "ĝ",
    "98": "ģ",
    "99": "ī",
    "100": "ı",
    "101": "ķ",
    "102": "ļ",
    "103": "ł",
    "104": "ń",
    "105": "ņ",
    "106": "ō",
    "107": "ŗ",
    "108": "ř",
    "109": "ś",
    "110": "š",
    "111": "ū",
    "112": "ź",
    "113": "ż",
    "114": "ž",
    "115": "ſ",
    "116": "ǆ",
    "117": "ǎ",
    "118": "ə",
    "119": "ʼ",
    "120": "ˆ",
    "121": "˘",
    "122": "˚",
    "123": "˛",
    "124": "˝",
    "125": "́",
    "126": "̂",
    "127": "̃",
    "128": "̄",
    "129": "̌",
    "130": "̑",
    "131": "α",
    "132": "δ",
    "133": "η",
    "134": "θ",
    "135": "ι",
    "136": "μ",
    "137": "ν",
    "138": "π",
    "139": "ς",
    "140": "τ",
    "141": "ω",
    "142": "а",
    "143": "б",
    "144": "в",
    "145": "г",
    "146": "д",
    "147": "е",
    "148": "ж",
    "149": "з",
    "150": "и",
    "151": "к",
    "152": "л",
    "153": "м",
    "154": "н",
    "155": "о",
    "156": "п",
    "157": "р",
    "158": "с",
    "159": "т",
    "160": "у",
    "161": "ф",
    "162": "х",
    "163": "ц",
    "164": "ш",
    "165": "ь",
    "166": "я",
    "167": "ѻ",
    "168": "ا",
    "169": "ب",
    "170": "ة",
    "171": "ت",
    "172": "ح",
    "173": "خ",
    "174": "د",
    "175": "ر",
    "176": "س",
    "177": "ع",
    "178": "ل",
    "179": "م",
    "180": "ن",
    "181": "و",
    "182": "ي",
    "183": "௵",
    "184": "ἀ",
    "185": "ῖ",
    "186": "ῶ",
    "187": " ",
    "188": " ",
    "189": " ",
    "190": "‑",
    "191": "–",
    "192": "—",
    "193": "‘",
    "194": "’",
    "195": "“",
    "196": "”",
    "197": "„",
    "198": "†",
    "199": "‡",
    "200": "•",
    "201": "…",
    "202": "\u2028",
    "203": " ",
    "204": "‱",
    "205": "′",
    "206": "″",
    "207": "›",
    "208": "⁄",
    "209": "₃",
    "210": "€",
    "211": "₹",
    "212": "⃔",
    "213": "⃕",
    "214": "⃗",
    "215": "⃛",
    "216": "⃝",
    "217": "⃞",
    "218": "ℝ",
    "219": "™",
    "220": "⅓",
    "221": "⅔",
    "222": "←",
    "223": "↑",
    "224": "→",
    "225": "↓",
    "226": "↱",
    "227": "↲",
    "228": "↵",
    "229": "↷",
    "230": "↹",
    "231": "↻",
    "232": "⇐",
    "233": "⇑",
    "234": "⇒",
    "235": "⇥",
    "236": "⇧",
    "237": "∀",
    "238": "∃",
    "239": "∊",
    "240": "∏",
    "241": "∐",
    "242": "∑",
    "243": "−",
    "244": "∘",
    "245": "√",
    "246": "∞",
    "247": "∧",
    "248": "∨",
    "249": "∪",
    "250": "≈",
    "251": "≥",
    "252": "⊍",
    "253": "⊔",
    "254": "⊕",
    "255": "⊻",
    "256": "⋓",
    "257": "⋮",
    "258": "⌃",
    "259": "⌅",
    "260": "⌘",
    "261": "⌥",
    "262": "⍈",
    "263": "⎇",
    "264": "⏎",
    "265": "␣",
    "266": "─",
    "267": "│",
    "268": "└",
    "269": "├",
    "270": "═",
    "271": "║",
    "272": "╔",
    "273": "╗",
    "274": "╚",
    "275": "╝",
    "276": "╠",
    "277": "╣",
    "278": "╦",
    "279": "╩",
    "280": "╬",
    "281": "▧",
    "282": "▲",
    "283": "▶",
    "284": "▸",
    "285": "○",
    "286": "◍",
    "287": "◘",
    "288": "◙",
    "289": "◣",
    "290": "◤",
    "291": "★",
    "292": "☆",
    "293": "☒",
    "294": "☛",
    "295": "☞",
    "296": "☺",
    "297": "♨",
    "298": "⚙",
    "299": "✔",
    "300": "➔",
    "301": "➜",
    "302": "➡",
    "303": "➤",
    "304": "⤻",
    "305": "⤾",
    "306": "⤿",
    "307": "⩂",
    "308": "⩌",
    "309": "⩏",
    "310": "⭾",
    "311": "。",
    "312": "く",
    "313": "に",
    "314": "ま",
    "315": "り",
    "316": "る",
    "317": "ク",
    "318": "ゴ",
    "319": "シ",
    "320": "タ",
    "321": "ッ",
    "322": "ツ",
    "323": "ニ",
    "324": "ネ",
    "325": "フ",
    "326": "マ",
    "327": "ュ",
    "328": "リ",
    "329": "ー",
    "330": "一",
    "331": "丁",
    "332": "两",
    "333": "个",
    "334": "中",
    "335": "为",
    "336": "人",
    "337": "他",
    "338": "们",
    "339": "优",
    "340": "会",
    "341": "体",
    "342": "先",
    "343": "其",
    "344": "写",
    "345": "到",
    "346": "可",
    "347": "台",
    "348": "后",
    "349": "和",
    "350": "因",
    "351": "国",
    "352": "图",
    "353": "塚",
    "354": "好",
    "355": "字",
    "356": "宋",
    "357": "宮",
    "358": "小",
    "359": "就",
    "360": "层",
    "361": "常",
    "362": "平",
    "363": "微",
    "364": "我",
    "365": "或",
    "366": "户",
    "367": "手",
    "368": "才",
    "369": "择",
    "370": "效",
    "371": "文",
    "372": "新",
    "373": "明",
    "374": "易",
    "375": "是",
    "376": "显",
    "377": "書",
    "378": "最",
    "379": "有",
    "380": "朝",
    "381": "果",
    "382": "楷",
    "383": "正",
    "384": "比",
    "385": "治",
    "386": "版",
    "387": "用",
    "388": "的",
    "389": "目",
    "390": "示",
    "391": "神",
    "392": "站",
    "393": "等",
    "394": "細",
    "395": "网",
    "396": "考",
    "397": "者",
    "398": "能",
    "399": "般",
    "400": "虑",
    "401": "计",
    "402": "设",
    "403": "跨",
    "404": "软",
    "405": "较",
    "406": "这",
    "407": "选",
    "408": "通",
    "409": "都",
    "410": "雅",
    "411": "集",
    "412": "页",
    "413": "體",
    "414": "黑",
    "415": "굴",
    "416": "림",
    "417": "바",
    "418": "탕",
    "419": "",
    "420": "ﬁ",
    "421": "ﷺ",
    "422": "﷽",
    "423": "︎",
    "424": "＋",
    "425": "，",
    "426": "－",
    "427": "：",
    "428": "�"
  };
});
define('data/hip_hop/hip_hop_1_128_char_indices',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    " ": 0,
    "'": 1,
    "0": 2,
    "1": 3,
    "2": 4,
    "3": 5,
    "4": 6,
    "5": 7,
    "6": 8,
    "7": 9,
    "8": 10,
    "9": 11,
    "a": 12,
    "b": 13,
    "c": 14,
    "d": 15,
    "e": 16,
    "f": 17,
    "g": 18,
    "h": 19,
    "i": 20,
    "j": 21,
    "k": 22,
    "l": 23,
    "m": 24,
    "n": 25,
    "o": 26,
    "p": 27,
    "q": 28,
    "r": 29,
    "s": 30,
    "t": 31,
    "u": 32,
    "v": 33,
    "w": 34,
    "x": 35,
    "y": 36,
    "z": 37,
    "": 38,
    "": 39,
    "": 40,
    "": 41,
    "": 42,
    "": 43,
    "": 44,
    "": 45,
    " ": 46,
    "¡": 47,
    "©": 48,
    "­": 49,
    "°": 50,
    "´": 51,
    "·": 52,
    "½": 53,
    "¿": 54,
    "×": 55,
    "ß": 56,
    "à": 57,
    "á": 58,
    "â": 59,
    "ã": 60,
    "ä": 61,
    "å": 62,
    "æ": 63,
    "ç": 64,
    "è": 65,
    "é": 66,
    "ê": 67,
    "ë": 68,
    "ì": 69,
    "í": 70,
    "î": 71,
    "ï": 72,
    "ñ": 73,
    "ò": 74,
    "ó": 75,
    "ô": 76,
    "õ": 77,
    "ö": 78,
    "ù": 79,
    "ú": 80,
    "û": 81,
    "ü": 82,
    "ā": 83,
    "ă": 84,
    "ć": 85,
    "č": 86,
    "ğ": 87,
    "ı": 88,
    "ō": 89,
    "ő": 90,
    "ş": 91,
    "š": 92,
    "ž": 93,
    "̆": 94,
    "̇": 95,
    "а": 96,
    "б": 97,
    "в": 98,
    "г": 99,
    "д": 100,
    "е": 101,
    "и": 102,
    "й": 103,
    "к": 104,
    "л": 105,
    "м": 106,
    "н": 107,
    "о": 108,
    "п": 109,
    "р": 110,
    "с": 111,
    "т": 112,
    "у": 113,
    "х": 114,
    "ш": 115,
    "ы": 116,
    "ь": 117,
    "ю": 118,
    "я": 119,
    "ӡ": 120,
    "ף": 121,
    "׭": 122,
    "ײ": 123,
    "ڊ": 124,
    "ڢ": 125,
    "ڣ": 126,
    "ڬ": 127,
    "ڮ": 128,
    "گ": 129,
    "ڰ": 130,
    "ڲ": 131,
    "ڴ": 132,
    "ڶ": 133,
    "ۭ": 134,
    "۴": 135,
    " ": 136,
    " ": 137,
    "​": 138,
    "–": 139,
    "—": 140,
    "‘": 141,
    "’": 142,
    "“": 143,
    "”": 144,
    "•": 145,
    "…": 146,
    "\u2028": 147,
    "′": 148,
    "″": 149,
    "€": 150,
    "℗": 151,
    "❤": 152,
    "️": 153,
    "﻿": 154,
    "𝐉": 155,
    "𝐋": 156,
    "𝐎": 157,
    "𝐝": 158,
    "𝐞": 159,
    "𝐠": 160,
    "𝐡": 161,
    "𝐧": 162,
    "𝐨": 163,
    "🐭": 164,
    "😭": 165
  };
});
define('data/hip_hop/hip_hop_1_128_indices_char',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    "0": " ",
    "1": "'",
    "10": "8",
    "100": "д",
    "101": "е",
    "102": "и",
    "103": "й",
    "104": "к",
    "105": "л",
    "106": "м",
    "107": "н",
    "108": "о",
    "109": "п",
    "11": "9",
    "110": "р",
    "111": "с",
    "112": "т",
    "113": "у",
    "114": "х",
    "115": "ш",
    "116": "ы",
    "117": "ь",
    "118": "ю",
    "119": "я",
    "12": "a",
    "120": "ӡ",
    "121": "ף",
    "122": "׭",
    "123": "ײ",
    "124": "ڊ",
    "125": "ڢ",
    "126": "ڣ",
    "127": "ڬ",
    "128": "ڮ",
    "129": "گ",
    "13": "b",
    "130": "ڰ",
    "131": "ڲ",
    "132": "ڴ",
    "133": "ڶ",
    "134": "ۭ",
    "135": "۴",
    "136": " ",
    "137": " ",
    "138": "​",
    "139": "–",
    "14": "c",
    "140": "—",
    "141": "‘",
    "142": "’",
    "143": "“",
    "144": "”",
    "145": "•",
    "146": "…",
    "147": "\u2028",
    "148": "′",
    "149": "″",
    "15": "d",
    "150": "€",
    "151": "℗",
    "152": "❤",
    "153": "️",
    "154": "﻿",
    "155": "𝐉",
    "156": "𝐋",
    "157": "𝐎",
    "158": "𝐝",
    "159": "𝐞",
    "16": "e",
    "160": "𝐠",
    "161": "𝐡",
    "162": "𝐧",
    "163": "𝐨",
    "164": "🐭",
    "165": "😭",
    "17": "f",
    "18": "g",
    "19": "h",
    "2": "0",
    "20": "i",
    "21": "j",
    "22": "k",
    "23": "l",
    "24": "m",
    "25": "n",
    "26": "o",
    "27": "p",
    "28": "q",
    "29": "r",
    "3": "1",
    "30": "s",
    "31": "t",
    "32": "u",
    "33": "v",
    "34": "w",
    "35": "x",
    "36": "y",
    "37": "z",
    "38": "",
    "39": "",
    "4": "2",
    "40": "",
    "41": "",
    "42": "",
    "43": "",
    "44": "",
    "45": "",
    "46": " ",
    "47": "¡",
    "48": "©",
    "49": "­",
    "5": "3",
    "50": "°",
    "51": "´",
    "52": "·",
    "53": "½",
    "54": "¿",
    "55": "×",
    "56": "ß",
    "57": "à",
    "58": "á",
    "59": "â",
    "6": "4",
    "60": "ã",
    "61": "ä",
    "62": "å",
    "63": "æ",
    "64": "ç",
    "65": "è",
    "66": "é",
    "67": "ê",
    "68": "ë",
    "69": "ì",
    "7": "5",
    "70": "í",
    "71": "î",
    "72": "ï",
    "73": "ñ",
    "74": "ò",
    "75": "ó",
    "76": "ô",
    "77": "õ",
    "78": "ö",
    "79": "ù",
    "8": "6",
    "80": "ú",
    "81": "û",
    "82": "ü",
    "83": "ā",
    "84": "ă",
    "85": "ć",
    "86": "č",
    "87": "ğ",
    "88": "ı",
    "89": "ō",
    "9": "7",
    "90": "ő",
    "91": "ş",
    "92": "š",
    "93": "ž",
    "94": "̆",
    "95": "̇",
    "96": "а",
    "97": "б",
    "98": "в",
    "99": "г"
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
      this.deleteing = false;
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

      if (this.deleteing) {
        this.userInput = value;
        this.value = value;
        this.deleteing = false;
        return;
      }
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
      if (key == 8) {
        this.deleteing = true;
        return true;
      }

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
define('resources/elements/editor',['exports', 'aurelia-framework', 'lodash/debounce', 'codemirror', '../utils/cricket', 'codemirror/mode/markdown/markdown', 'codemirror/addon/display/placeholder', 'codemirror/addon/hint/show-hint'], function (exports, _aureliaFramework, _debounce, _codemirror, _cricket) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Editor = undefined;

  var _debounce2 = _interopRequireDefault(_debounce);

  var _codemirror2 = _interopRequireDefault(_codemirror);

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

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

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
      var _this = this;

      _classCallCheck(this, Editor);

      _initDefineProp(this, 'text', _descriptor, this);

      this.editorOptions = {
        lineNumbers: false,
        mode: 'markdown',
        extraKeys: { 'Ctrl-Space': 'autocomplete' },
        theme: 'default',
        lineWrapping: true,
        hintOptions: { aync: true, completeSingle: false },
        foldGutter: false,
        placeholder: 'Start writing'
      };


      _codemirror2.default.registerHelper("hint", "anyword", function (editor, callback, options) {
        var pos = new Position(editor);
        var list = options && options.words || false;
        console.log(list, 'list');
        if (!options.words) {
          var getSuggestions = (0, _debounce2.default)(function () {
            _this.text = editor.doc.getValue();

            _this.cricket.predict(_this.text).then(function (list) {
              return { list: list, from: _codemirror2.default.Pos(pos.cur.line, pos.start), to: _codemirror2.default.Pos(pos.cur.line, pos.end) };
            });
          }, 100, { trailing: true });
          getSuggestions();
        }
        return { list: list, from: _codemirror2.default.Pos(pos.cur.line, pos.start), to: _codemirror2.default.Pos(pos.cur.line, pos.end) };
      });

      this.cm = {};
      this.cricket = new _cricket.Cricket(40, {
        model: '/src/data/hip_hop/hip_hop.json',
        weights: '/src/data/hip_hop/hip_hop_1_128_char_rnn_best_weights.buf',
        metadata: '/src/data/hip_hop/hip_hop_1_128_char_rnn_best_metadata.json'
      });
    }

    Editor.prototype.attached = function attached() {
      this.cricket.print('what in the world do you think you are doing with your life', 250).then(console.log).catch(console.error);
    };

    Editor.prototype.valueChanged = function valueChanged(newValue, oldValue) {};

    _createClass(Editor, [{
      key: 'cmTextarea',
      set: function set(value) {
        var _this2 = this;

        this.cm = _codemirror2.default.fromTextArea(value, this.editorOptions);
        _codemirror2.default.hint.FromList = ['bad boy'];
        this.cm.on('keypress', function (instance, event) {
          if (event.charCode === 32) {
            _this2.text = _this2.cm.doc.getValue();
            var getSuggestions = (0, _debounce2.default)(function () {
              _this2.cricket.predict(_this2.text).then(function (words) {
                console.log(words);
              }).catch(console.error);
            }, 400, { trailing: true });
            getSuggestions();
          }
        });
      }
    }]);

    return Editor;
  }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'text', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);

  var Position = function Position(editor, w) {
    _classCallCheck(this, Position);

    var word = w || /[\w$]+/g;
    var cur = editor.getCursor();
    var curLine = editor.getLine(cur.line);
    var start = cur.ch;
    var end = start;

    while (end < curLine.length && word.test(curLine.charAt(end))) {
      ++end;
    }while (start && word.test(curLine.charAt(start - 1))) {
      --start;
    }var curWord = start != end && curLine.slice(start, end);

    this.start = start;
    this.end = end;
    this.cur = cur;
  };
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
define('resources/utils/cricket',['exports', 'keras', 'lodash/flatten', 'lodash/padStart', 'async/times', 'async/each', 'async/queue', '../../data/hip_hop/hip_hop_1_128_indices_char', '../../data/hip_hop/hip_hop_1_128_char_indices', '../sampling', '../utils/uniq'], function (exports, _keras, _flatten, _padStart, _times, _each, _queue, _hip_hop_1_128_indices_char, _hip_hop_1_128_char_indices, _sampling, _uniq) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Cricket = undefined;

  var _flatten2 = _interopRequireDefault(_flatten);

  var _padStart2 = _interopRequireDefault(_padStart);

  var _times2 = _interopRequireDefault(_times);

  var _each2 = _interopRequireDefault(_each);

  var _queue2 = _interopRequireDefault(_queue);

  var _hip_hop_1_128_indices_char2 = _interopRequireDefault(_hip_hop_1_128_indices_char);

  var _hip_hop_1_128_char_indices2 = _interopRequireDefault(_hip_hop_1_128_char_indices);

  var _sampling2 = _interopRequireDefault(_sampling);

  var _uniq2 = _interopRequireDefault(_uniq);

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

  var Cricket = exports.Cricket = function () {
    function Cricket(maxlen, filepaths, indices) {
      _classCallCheck(this, Cricket);

      this.maxlen = maxlen;
      this.text = '';
      this.words = [];
      this.message = '';
      this.ready = false;
      this.model = new _keras.Model({ filepaths: filepaths });
    }

    Cricket.prototype._retrieveFromModel = function _retrieveFromModel(data, temp, count) {
      var _this = this;

      var p = new Promise(function (resolve, reject) {
        _this.model.predict({
          input: data
        }).then(function (res) {
          sample(res.output, temp, count).then(resolve).catch(reject);
        }).catch(reject);
      });

      return p;
    };

    Cricket.prototype._search = function _search(text, temp, count) {
      var _this2 = this;

      var word = '';
      count = count ? count : 1;

      var p = new Promise(function (resolve, reject) {
        var iterator = function iterator(text, i) {
          var data = parseText(text, _this2.maxlen);
          _this2._retrieveFromModel(data, temp, count).then(function (chArr) {
            i += 1;
            if (count > 1) return resolve(chArr);
            word += chArr[0];
            text += word;
            if (chArr[0] === ' ') {
              word = word.slice(0, -1);
              return resolve(word);
            }
            return iterator(text);
          }).catch(reject);
        };

        iterator(text, 0);
      });

      return p;
    };

    Cricket.prototype._generate = function _generate() {
      var _this3 = this;

      this.words = [];
      var text = this.text;

      var wordQ = (0, _queue2.default)(function (task, cb) {
        _this3._search(task.text, task.temp).then(function (word) {
          _this3.words.push(task.char + word);
          cb();
        }).catch(cb);
      }, 1);

      var p = new Promise(function (resolve, reject) {
        wordQ.drain = function () {
          resolve(_this3.words);
        };
        wordQ.error(reject);
      });

      this._search(text, 0.2, 5).then(function (chars) {
        chars = (0, _uniq2.default)(chars);
        var texts = chars.map(function (char) {
          return {
            char: char,
            text: char.replace(/^/, text),
            temp: 0.2
          };
        });
        texts.forEach(function (text) {
          return wordQ.push(text);
        });
      }).catch(console.warn);

      return p;
    };

    Cricket.prototype.predict = function predict(text) {
      var _this4 = this;

      this.text = (0, _padStart2.default)(text.toLowerCase(), this.maxlen);

      var p = new Promise(function (resolve, reject) {
        _this4.model.ready().then(function () {
          _this4.ready = true;
          _this4._generate().then(resolve).catch(reject);
        }).catch(reject);
      });
      return p;
    };

    Cricket.prototype.print = function print(seed, count) {
      var _this5 = this;

      var text = seed;

      var prom = new Promise(function (resolve, reject) {
        var itr = function itr(txt, n, max) {
          _this5._retrieveFromModel(parseText(txt, _this5.maxlen), 0.2, 1).then(function (char) {
            txt += char[0];
            if (n >= max) return resolve(txt);
            n += 1;
            return itr(txt, n, max);
          }).catch(reject);
        };
        _this5.model.ready().then(function () {
          itr(text, 0, count);
        }).catch(reject);
      });
      return prom;
    };

    return Cricket;
  }();

  var parseText = function parseText(text, max) {
    text = text.split('');
    var data = text.slice(Math.max(text.length - max, 1));
    var index_size = Object.keys(_hip_hop_1_128_char_indices2.default).length;
    var x = new Array(max).fill(0).map(function (row) {
      return new Array(index_size).fill(0);
    });
    data.forEach(function (v, i) {
      x[i][_hip_hop_1_128_char_indices2.default[v]] = 1.0;
    });
    var f = new Float32Array((0, _flatten2.default)(x));
    return f;
  };

  var sample = function sample(preds, temp, count) {

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
          return _hip_hop_1_128_indices_char2.default[c];
        });
        resolve(arr);
      });
    });

    return p;
  };
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

define('lodash/padStart',['require','exports','module','./_createPadding','./_stringSize','./toInteger','./toString'],function (require, exports, module) {var createPadding = require('./_createPadding'),
    stringSize = require('./_stringSize'),
    toInteger = require('./toInteger'),
    toString = require('./toString');

/**
 * Pads `string` on the left side if it's shorter than `length`. Padding
 * characters are truncated if they exceed `length`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to pad.
 * @param {number} [length=0] The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padded string.
 * @example
 *
 * _.padStart('abc', 6);
 * // => '   abc'
 *
 * _.padStart('abc', 6, '_-');
 * // => '_-_abc'
 *
 * _.padStart('abc', 3);
 * // => 'abc'
 */
function padStart(string, length, chars) {
  string = toString(string);
  length = toInteger(length);

  var strLength = length ? stringSize(string) : 0;
  return (length && strLength < length)
    ? (createPadding(length - strLength, chars) + string)
    : string;
}

module.exports = padStart;

});

define('lodash/_createPadding',['require','exports','module','./_baseRepeat','./_baseToString','./_castSlice','./_hasUnicode','./_stringSize','./_stringToArray'],function (require, exports, module) {var baseRepeat = require('./_baseRepeat'),
    baseToString = require('./_baseToString'),
    castSlice = require('./_castSlice'),
    hasUnicode = require('./_hasUnicode'),
    stringSize = require('./_stringSize'),
    stringToArray = require('./_stringToArray');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeCeil = Math.ceil;

/**
 * Creates the padding for `string` based on `length`. The `chars` string
 * is truncated if the number of characters exceeds `length`.
 *
 * @private
 * @param {number} length The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padding for `string`.
 */
function createPadding(length, chars) {
  chars = chars === undefined ? ' ' : baseToString(chars);

  var charsLength = chars.length;
  if (charsLength < 2) {
    return charsLength ? baseRepeat(chars, length) : chars;
  }
  var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
  return hasUnicode(chars)
    ? castSlice(stringToArray(result), 0, length).join('')
    : result.slice(0, length);
}

module.exports = createPadding;

});

define('lodash/_baseRepeat',['require','exports','module'],function (require, exports, module) {/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeFloor = Math.floor;

/**
 * The base implementation of `_.repeat` which doesn't coerce arguments.
 *
 * @private
 * @param {string} string The string to repeat.
 * @param {number} n The number of times to repeat the string.
 * @returns {string} Returns the repeated string.
 */
function baseRepeat(string, n) {
  var result = '';
  if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
    return result;
  }
  // Leverage the exponentiation by squaring algorithm for a faster repeat.
  // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
  do {
    if (n % 2) {
      result += string;
    }
    n = nativeFloor(n / 2);
    if (n) {
      string += string;
    }
  } while (n);

  return result;
}

module.exports = baseRepeat;

});

define('lodash/_baseToString',['require','exports','module','./_Symbol','./_arrayMap','./isArray','./isSymbol'],function (require, exports, module) {var Symbol = require('./_Symbol'),
    arrayMap = require('./_arrayMap'),
    isArray = require('./isArray'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;

});

define('lodash/_arrayMap',['require','exports','module'],function (require, exports, module) {/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

});

define('lodash/isSymbol',['require','exports','module','./_baseGetTag','./isObjectLike'],function (require, exports, module) {var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;

});

define('lodash/_castSlice',['require','exports','module','./_baseSlice'],function (require, exports, module) {var baseSlice = require('./_baseSlice');

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}

module.exports = castSlice;

});

define('lodash/_baseSlice',['require','exports','module'],function (require, exports, module) {/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;

});

define('lodash/_hasUnicode',['require','exports','module'],function (require, exports, module) {/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

module.exports = hasUnicode;

});

define('lodash/_stringSize',['require','exports','module','./_asciiSize','./_hasUnicode','./_unicodeSize'],function (require, exports, module) {var asciiSize = require('./_asciiSize'),
    hasUnicode = require('./_hasUnicode'),
    unicodeSize = require('./_unicodeSize');

/**
 * Gets the number of symbols in `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the string size.
 */
function stringSize(string) {
  return hasUnicode(string)
    ? unicodeSize(string)
    : asciiSize(string);
}

module.exports = stringSize;

});

define('lodash/_asciiSize',['require','exports','module','./_baseProperty'],function (require, exports, module) {var baseProperty = require('./_baseProperty');

/**
 * Gets the size of an ASCII `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */
var asciiSize = baseProperty('length');

module.exports = asciiSize;

});

define('lodash/_baseProperty',['require','exports','module'],function (require, exports, module) {/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

});

define('lodash/_unicodeSize',['require','exports','module'],function (require, exports, module) {/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Gets the size of a Unicode `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */
function unicodeSize(string) {
  var result = reUnicode.lastIndex = 0;
  while (reUnicode.test(string)) {
    ++result;
  }
  return result;
}

module.exports = unicodeSize;

});

define('lodash/_stringToArray',['require','exports','module','./_asciiToArray','./_hasUnicode','./_unicodeToArray'],function (require, exports, module) {var asciiToArray = require('./_asciiToArray'),
    hasUnicode = require('./_hasUnicode'),
    unicodeToArray = require('./_unicodeToArray');

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

module.exports = stringToArray;

});

define('lodash/_asciiToArray',['require','exports','module'],function (require, exports, module) {/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

module.exports = asciiToArray;

});

define('lodash/_unicodeToArray',['require','exports','module'],function (require, exports, module) {/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

module.exports = unicodeToArray;

});

define('lodash/toInteger',['require','exports','module','./toFinite'],function (require, exports, module) {var toFinite = require('./toFinite');

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

module.exports = toInteger;

});

define('lodash/toFinite',['require','exports','module','./toNumber'],function (require, exports, module) {var toNumber = require('./toNumber');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

module.exports = toFinite;

});

define('lodash/toNumber',['require','exports','module','./isObject','./isSymbol'],function (require, exports, module) {var isObject = require('./isObject'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;

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

define('lodash/toString',['require','exports','module','./_baseToString'],function (require, exports, module) {var baseToString = require('./_baseToString');

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;

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

define('lodash/debounce',['require','exports','module','./isObject','./now','./toNumber'],function (require, exports, module) {var isObject = require('./isObject'),
    now = require('./now'),
    toNumber = require('./toNumber');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;

});

define('lodash/now',['require','exports','module','./_root'],function (require, exports, module) {var root = require('./_root');

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;

});

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"), require("../xml/xml"), require("../meta"));
  else if (typeof define == "function" && define.amd) // AMD
    define('codemirror/mode/markdown/markdown',["../../lib/codemirror", "../xml/xml", "../meta"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.defineMode("markdown", function(cmCfg, modeCfg) {

  var htmlMode = CodeMirror.getMode(cmCfg, "text/html");
  var htmlModeMissing = htmlMode.name == "null"

  function getMode(name) {
    if (CodeMirror.findModeByName) {
      var found = CodeMirror.findModeByName(name);
      if (found) name = found.mime || found.mimes[0];
    }
    var mode = CodeMirror.getMode(cmCfg, name);
    return mode.name == "null" ? null : mode;
  }

  // Should characters that affect highlighting be highlighted separate?
  // Does not include characters that will be output (such as `1.` and `-` for lists)
  if (modeCfg.highlightFormatting === undefined)
    modeCfg.highlightFormatting = false;

  // Maximum number of nested blockquotes. Set to 0 for infinite nesting.
  // Excess `>` will emit `error` token.
  if (modeCfg.maxBlockquoteDepth === undefined)
    modeCfg.maxBlockquoteDepth = 0;

  // Should underscores in words open/close em/strong?
  if (modeCfg.underscoresBreakWords === undefined)
    modeCfg.underscoresBreakWords = true;

  // Use `fencedCodeBlocks` to configure fenced code blocks. false to
  // disable, string to specify a precise regexp that the fence should
  // match, and true to allow three or more backticks or tildes (as
  // per CommonMark).

  // Turn on task lists? ("- [ ] " and "- [x] ")
  if (modeCfg.taskLists === undefined) modeCfg.taskLists = false;

  // Turn on strikethrough syntax
  if (modeCfg.strikethrough === undefined)
    modeCfg.strikethrough = false;

  // Allow token types to be overridden by user-provided token types.
  if (modeCfg.tokenTypeOverrides === undefined)
    modeCfg.tokenTypeOverrides = {};

  var tokenTypes = {
    header: "header",
    code: "comment",
    quote: "quote",
    list1: "variable-2",
    list2: "variable-3",
    list3: "keyword",
    hr: "hr",
    image: "image",
    imageAltText: "image-alt-text",
    imageMarker: "image-marker",
    formatting: "formatting",
    linkInline: "link",
    linkEmail: "link",
    linkText: "link",
    linkHref: "string",
    em: "em",
    strong: "strong",
    strikethrough: "strikethrough"
  };

  for (var tokenType in tokenTypes) {
    if (tokenTypes.hasOwnProperty(tokenType) && modeCfg.tokenTypeOverrides[tokenType]) {
      tokenTypes[tokenType] = modeCfg.tokenTypeOverrides[tokenType];
    }
  }

  var hrRE = /^([*\-_])(?:\s*\1){2,}\s*$/
  ,   ulRE = /^[*\-+]\s+/
  ,   olRE = /^[0-9]+([.)])\s+/
  ,   taskListRE = /^\[(x| )\](?=\s)/ // Must follow ulRE or olRE
  ,   atxHeaderRE = modeCfg.allowAtxHeaderWithoutSpace ? /^(#+)/ : /^(#+)(?: |$)/
  ,   setextHeaderRE = /^ *(?:\={1,}|-{1,})\s*$/
  ,   textRE = /^[^#!\[\]*_\\<>` "'(~]+/
  ,   fencedCodeRE = new RegExp("^(" + (modeCfg.fencedCodeBlocks === true ? "~~~+|```+" : modeCfg.fencedCodeBlocks) +
                                ")[ \\t]*([\\w+#\-]*)");

  function switchInline(stream, state, f) {
    state.f = state.inline = f;
    return f(stream, state);
  }

  function switchBlock(stream, state, f) {
    state.f = state.block = f;
    return f(stream, state);
  }

  function lineIsEmpty(line) {
    return !line || !/\S/.test(line.string)
  }

  // Blocks

  function blankLine(state) {
    // Reset linkTitle state
    state.linkTitle = false;
    // Reset EM state
    state.em = false;
    // Reset STRONG state
    state.strong = false;
    // Reset strikethrough state
    state.strikethrough = false;
    // Reset state.quote
    state.quote = 0;
    // Reset state.indentedCode
    state.indentedCode = false;
    if (htmlModeMissing && state.f == htmlBlock) {
      state.f = inlineNormal;
      state.block = blockNormal;
    }
    // Reset state.trailingSpace
    state.trailingSpace = 0;
    state.trailingSpaceNewLine = false;
    // Mark this line as blank
    state.prevLine = state.thisLine
    state.thisLine = null
    return null;
  }

  function blockNormal(stream, state) {

    var sol = stream.sol();

    var prevLineIsList = state.list !== false,
        prevLineIsIndentedCode = state.indentedCode;

    state.indentedCode = false;

    if (prevLineIsList) {
      if (state.indentationDiff >= 0) { // Continued list
        if (state.indentationDiff < 4) { // Only adjust indentation if *not* a code block
          state.indentation -= state.indentationDiff;
        }
        state.list = null;
      } else if (state.indentation > 0) {
        state.list = null;
      } else { // No longer a list
        state.list = false;
      }
    }

    var match = null;
    if (state.indentationDiff >= 4) {
      stream.skipToEnd();
      if (prevLineIsIndentedCode || lineIsEmpty(state.prevLine)) {
        state.indentation -= 4;
        state.indentedCode = true;
        return tokenTypes.code;
      } else {
        return null;
      }
    } else if (stream.eatSpace()) {
      return null;
    } else if ((match = stream.match(atxHeaderRE)) && match[1].length <= 6) {
      state.header = match[1].length;
      if (modeCfg.highlightFormatting) state.formatting = "header";
      state.f = state.inline;
      return getType(state);
    } else if (!lineIsEmpty(state.prevLine) && !state.quote && !prevLineIsList &&
               !prevLineIsIndentedCode && (match = stream.match(setextHeaderRE))) {
      state.header = match[0].charAt(0) == '=' ? 1 : 2;
      if (modeCfg.highlightFormatting) state.formatting = "header";
      state.f = state.inline;
      return getType(state);
    } else if (stream.eat('>')) {
      state.quote = sol ? 1 : state.quote + 1;
      if (modeCfg.highlightFormatting) state.formatting = "quote";
      stream.eatSpace();
      return getType(state);
    } else if (stream.peek() === '[') {
      return switchInline(stream, state, footnoteLink);
    } else if (stream.match(hrRE, true)) {
      state.hr = true;
      return tokenTypes.hr;
    } else if ((lineIsEmpty(state.prevLine) || prevLineIsList) && (stream.match(ulRE, false) || stream.match(olRE, false))) {
      var listType = null;
      if (stream.match(ulRE, true)) {
        listType = 'ul';
      } else {
        stream.match(olRE, true);
        listType = 'ol';
      }
      state.indentation = stream.column() + stream.current().length;
      state.list = true;

      // While this list item's marker's indentation
      // is less than the deepest list item's content's indentation,
      // pop the deepest list item indentation off the stack.
      while (state.listStack && stream.column() < state.listStack[state.listStack.length - 1]) {
        state.listStack.pop();
      }

      // Add this list item's content's indentation to the stack
      state.listStack.push(state.indentation);

      if (modeCfg.taskLists && stream.match(taskListRE, false)) {
        state.taskList = true;
      }
      state.f = state.inline;
      if (modeCfg.highlightFormatting) state.formatting = ["list", "list-" + listType];
      return getType(state);
    } else if (modeCfg.fencedCodeBlocks && (match = stream.match(fencedCodeRE, true))) {
      state.fencedChars = match[1]
      // try switching mode
      state.localMode = getMode(match[2]);
      if (state.localMode) state.localState = CodeMirror.startState(state.localMode);
      state.f = state.block = local;
      if (modeCfg.highlightFormatting) state.formatting = "code-block";
      state.code = -1
      return getType(state);
    }

    return switchInline(stream, state, state.inline);
  }

  function htmlBlock(stream, state) {
    var style = htmlMode.token(stream, state.htmlState);
    if (!htmlModeMissing) {
      var inner = CodeMirror.innerMode(htmlMode, state.htmlState)
      if ((inner.mode.name == "xml" && inner.state.tagStart === null &&
           (!inner.state.context && inner.state.tokenize.isInText)) ||
          (state.md_inside && stream.current().indexOf(">") > -1)) {
        state.f = inlineNormal;
        state.block = blockNormal;
        state.htmlState = null;
      }
    }
    return style;
  }

  function local(stream, state) {
    if (state.fencedChars && stream.match(state.fencedChars, false)) {
      state.localMode = state.localState = null;
      state.f = state.block = leavingLocal;
      return null;
    } else if (state.localMode) {
      return state.localMode.token(stream, state.localState);
    } else {
      stream.skipToEnd();
      return tokenTypes.code;
    }
  }

  function leavingLocal(stream, state) {
    stream.match(state.fencedChars);
    state.block = blockNormal;
    state.f = inlineNormal;
    state.fencedChars = null;
    if (modeCfg.highlightFormatting) state.formatting = "code-block";
    state.code = 1
    var returnType = getType(state);
    state.code = 0
    return returnType;
  }

  // Inline
  function getType(state) {
    var styles = [];

    if (state.formatting) {
      styles.push(tokenTypes.formatting);

      if (typeof state.formatting === "string") state.formatting = [state.formatting];

      for (var i = 0; i < state.formatting.length; i++) {
        styles.push(tokenTypes.formatting + "-" + state.formatting[i]);

        if (state.formatting[i] === "header") {
          styles.push(tokenTypes.formatting + "-" + state.formatting[i] + "-" + state.header);
        }

        // Add `formatting-quote` and `formatting-quote-#` for blockquotes
        // Add `error` instead if the maximum blockquote nesting depth is passed
        if (state.formatting[i] === "quote") {
          if (!modeCfg.maxBlockquoteDepth || modeCfg.maxBlockquoteDepth >= state.quote) {
            styles.push(tokenTypes.formatting + "-" + state.formatting[i] + "-" + state.quote);
          } else {
            styles.push("error");
          }
        }
      }
    }

    if (state.taskOpen) {
      styles.push("meta");
      return styles.length ? styles.join(' ') : null;
    }
    if (state.taskClosed) {
      styles.push("property");
      return styles.length ? styles.join(' ') : null;
    }

    if (state.linkHref) {
      styles.push(tokenTypes.linkHref, "url");
    } else { // Only apply inline styles to non-url text
      if (state.strong) { styles.push(tokenTypes.strong); }
      if (state.em) { styles.push(tokenTypes.em); }
      if (state.strikethrough) { styles.push(tokenTypes.strikethrough); }
      if (state.linkText) { styles.push(tokenTypes.linkText); }
      if (state.code) { styles.push(tokenTypes.code); }
      if (state.image) { styles.push(tokenTypes.image); }
      if (state.imageAltText) { styles.push(tokenTypes.imageAltText, "link"); }
      if (state.imageMarker) { styles.push(tokenTypes.imageMarker); }
    }

    if (state.header) { styles.push(tokenTypes.header, tokenTypes.header + "-" + state.header); }

    if (state.quote) {
      styles.push(tokenTypes.quote);

      // Add `quote-#` where the maximum for `#` is modeCfg.maxBlockquoteDepth
      if (!modeCfg.maxBlockquoteDepth || modeCfg.maxBlockquoteDepth >= state.quote) {
        styles.push(tokenTypes.quote + "-" + state.quote);
      } else {
        styles.push(tokenTypes.quote + "-" + modeCfg.maxBlockquoteDepth);
      }
    }

    if (state.list !== false) {
      var listMod = (state.listStack.length - 1) % 3;
      if (!listMod) {
        styles.push(tokenTypes.list1);
      } else if (listMod === 1) {
        styles.push(tokenTypes.list2);
      } else {
        styles.push(tokenTypes.list3);
      }
    }

    if (state.trailingSpaceNewLine) {
      styles.push("trailing-space-new-line");
    } else if (state.trailingSpace) {
      styles.push("trailing-space-" + (state.trailingSpace % 2 ? "a" : "b"));
    }

    return styles.length ? styles.join(' ') : null;
  }

  function handleText(stream, state) {
    if (stream.match(textRE, true)) {
      return getType(state);
    }
    return undefined;
  }

  function inlineNormal(stream, state) {
    var style = state.text(stream, state);
    if (typeof style !== 'undefined')
      return style;

    if (state.list) { // List marker (*, +, -, 1., etc)
      state.list = null;
      return getType(state);
    }

    if (state.taskList) {
      var taskOpen = stream.match(taskListRE, true)[1] !== "x";
      if (taskOpen) state.taskOpen = true;
      else state.taskClosed = true;
      if (modeCfg.highlightFormatting) state.formatting = "task";
      state.taskList = false;
      return getType(state);
    }

    state.taskOpen = false;
    state.taskClosed = false;

    if (state.header && stream.match(/^#+$/, true)) {
      if (modeCfg.highlightFormatting) state.formatting = "header";
      return getType(state);
    }

    // Get sol() value now, before character is consumed
    var sol = stream.sol();

    var ch = stream.next();

    // Matches link titles present on next line
    if (state.linkTitle) {
      state.linkTitle = false;
      var matchCh = ch;
      if (ch === '(') {
        matchCh = ')';
      }
      matchCh = (matchCh+'').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
      var regex = '^\\s*(?:[^' + matchCh + '\\\\]+|\\\\\\\\|\\\\.)' + matchCh;
      if (stream.match(new RegExp(regex), true)) {
        return tokenTypes.linkHref;
      }
    }

    // If this block is changed, it may need to be updated in GFM mode
    if (ch === '`') {
      var previousFormatting = state.formatting;
      if (modeCfg.highlightFormatting) state.formatting = "code";
      stream.eatWhile('`');
      var count = stream.current().length
      if (state.code == 0) {
        state.code = count
        return getType(state)
      } else if (count == state.code) { // Must be exact
        var t = getType(state)
        state.code = 0
        return t
      } else {
        state.formatting = previousFormatting
        return getType(state)
      }
    } else if (state.code) {
      return getType(state);
    }

    if (ch === '\\') {
      stream.next();
      if (modeCfg.highlightFormatting) {
        var type = getType(state);
        var formattingEscape = tokenTypes.formatting + "-escape";
        return type ? type + " " + formattingEscape : formattingEscape;
      }
    }

    if (ch === '!' && stream.match(/\[[^\]]*\] ?(?:\(|\[)/, false)) {
      state.imageMarker = true;
      state.image = true;
      if (modeCfg.highlightFormatting) state.formatting = "image";
      return getType(state);
    }

    if (ch === '[' && state.imageMarker) {
      state.imageMarker = false;
      state.imageAltText = true
      if (modeCfg.highlightFormatting) state.formatting = "image";
      return getType(state);
    }

    if (ch === ']' && state.imageAltText) {
      if (modeCfg.highlightFormatting) state.formatting = "image";
      var type = getType(state);
      state.imageAltText = false;
      state.image = false;
      state.inline = state.f = linkHref;
      return type;
    }

    if (ch === '[' && stream.match(/[^\]]*\](\(.*\)| ?\[.*?\])/, false) && !state.image) {
      state.linkText = true;
      if (modeCfg.highlightFormatting) state.formatting = "link";
      return getType(state);
    }

    if (ch === ']' && state.linkText && stream.match(/\(.*?\)| ?\[.*?\]/, false)) {
      if (modeCfg.highlightFormatting) state.formatting = "link";
      var type = getType(state);
      state.linkText = false;
      state.inline = state.f = linkHref;
      return type;
    }

    if (ch === '<' && stream.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/, false)) {
      state.f = state.inline = linkInline;
      if (modeCfg.highlightFormatting) state.formatting = "link";
      var type = getType(state);
      if (type){
        type += " ";
      } else {
        type = "";
      }
      return type + tokenTypes.linkInline;
    }

    if (ch === '<' && stream.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/, false)) {
      state.f = state.inline = linkInline;
      if (modeCfg.highlightFormatting) state.formatting = "link";
      var type = getType(state);
      if (type){
        type += " ";
      } else {
        type = "";
      }
      return type + tokenTypes.linkEmail;
    }

    if (ch === '<' && stream.match(/^(!--|\w)/, false)) {
      var end = stream.string.indexOf(">", stream.pos);
      if (end != -1) {
        var atts = stream.string.substring(stream.start, end);
        if (/markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(atts)) state.md_inside = true;
      }
      stream.backUp(1);
      state.htmlState = CodeMirror.startState(htmlMode);
      return switchBlock(stream, state, htmlBlock);
    }

    if (ch === '<' && stream.match(/^\/\w*?>/)) {
      state.md_inside = false;
      return "tag";
    }

    var ignoreUnderscore = false;
    if (!modeCfg.underscoresBreakWords) {
      if (ch === '_' && stream.peek() !== '_' && stream.match(/(\w)/, false)) {
        var prevPos = stream.pos - 2;
        if (prevPos >= 0) {
          var prevCh = stream.string.charAt(prevPos);
          if (prevCh !== '_' && prevCh.match(/(\w)/, false)) {
            ignoreUnderscore = true;
          }
        }
      }
    }
    if (ch === '*' || (ch === '_' && !ignoreUnderscore)) {
      if (sol && stream.peek() === ' ') {
        // Do nothing, surrounded by newline and space
      } else if (state.strong === ch && stream.eat(ch)) { // Remove STRONG
        if (modeCfg.highlightFormatting) state.formatting = "strong";
        var t = getType(state);
        state.strong = false;
        return t;
      } else if (!state.strong && stream.eat(ch)) { // Add STRONG
        state.strong = ch;
        if (modeCfg.highlightFormatting) state.formatting = "strong";
        return getType(state);
      } else if (state.em === ch) { // Remove EM
        if (modeCfg.highlightFormatting) state.formatting = "em";
        var t = getType(state);
        state.em = false;
        return t;
      } else if (!state.em) { // Add EM
        state.em = ch;
        if (modeCfg.highlightFormatting) state.formatting = "em";
        return getType(state);
      }
    } else if (ch === ' ') {
      if (stream.eat('*') || stream.eat('_')) { // Probably surrounded by spaces
        if (stream.peek() === ' ') { // Surrounded by spaces, ignore
          return getType(state);
        } else { // Not surrounded by spaces, back up pointer
          stream.backUp(1);
        }
      }
    }

    if (modeCfg.strikethrough) {
      if (ch === '~' && stream.eatWhile(ch)) {
        if (state.strikethrough) {// Remove strikethrough
          if (modeCfg.highlightFormatting) state.formatting = "strikethrough";
          var t = getType(state);
          state.strikethrough = false;
          return t;
        } else if (stream.match(/^[^\s]/, false)) {// Add strikethrough
          state.strikethrough = true;
          if (modeCfg.highlightFormatting) state.formatting = "strikethrough";
          return getType(state);
        }
      } else if (ch === ' ') {
        if (stream.match(/^~~/, true)) { // Probably surrounded by space
          if (stream.peek() === ' ') { // Surrounded by spaces, ignore
            return getType(state);
          } else { // Not surrounded by spaces, back up pointer
            stream.backUp(2);
          }
        }
      }
    }

    if (ch === ' ') {
      if (stream.match(/ +$/, false)) {
        state.trailingSpace++;
      } else if (state.trailingSpace) {
        state.trailingSpaceNewLine = true;
      }
    }

    return getType(state);
  }

  function linkInline(stream, state) {
    var ch = stream.next();

    if (ch === ">") {
      state.f = state.inline = inlineNormal;
      if (modeCfg.highlightFormatting) state.formatting = "link";
      var type = getType(state);
      if (type){
        type += " ";
      } else {
        type = "";
      }
      return type + tokenTypes.linkInline;
    }

    stream.match(/^[^>]+/, true);

    return tokenTypes.linkInline;
  }

  function linkHref(stream, state) {
    // Check if space, and return NULL if so (to avoid marking the space)
    if(stream.eatSpace()){
      return null;
    }
    var ch = stream.next();
    if (ch === '(' || ch === '[') {
      state.f = state.inline = getLinkHrefInside(ch === "(" ? ")" : "]", 0);
      if (modeCfg.highlightFormatting) state.formatting = "link-string";
      state.linkHref = true;
      return getType(state);
    }
    return 'error';
  }

  var linkRE = {
    ")": /^(?:[^\\\(\)]|\\.|\((?:[^\\\(\)]|\\.)*\))*?(?=\))/,
    "]": /^(?:[^\\\[\]]|\\.|\[(?:[^\\\[\\]]|\\.)*\])*?(?=\])/
  }

  function getLinkHrefInside(endChar) {
    return function(stream, state) {
      var ch = stream.next();

      if (ch === endChar) {
        state.f = state.inline = inlineNormal;
        if (modeCfg.highlightFormatting) state.formatting = "link-string";
        var returnState = getType(state);
        state.linkHref = false;
        return returnState;
      }

      stream.match(linkRE[endChar])
      state.linkHref = true;
      return getType(state);
    };
  }

  function footnoteLink(stream, state) {
    if (stream.match(/^([^\]\\]|\\.)*\]:/, false)) {
      state.f = footnoteLinkInside;
      stream.next(); // Consume [
      if (modeCfg.highlightFormatting) state.formatting = "link";
      state.linkText = true;
      return getType(state);
    }
    return switchInline(stream, state, inlineNormal);
  }

  function footnoteLinkInside(stream, state) {
    if (stream.match(/^\]:/, true)) {
      state.f = state.inline = footnoteUrl;
      if (modeCfg.highlightFormatting) state.formatting = "link";
      var returnType = getType(state);
      state.linkText = false;
      return returnType;
    }

    stream.match(/^([^\]\\]|\\.)+/, true);

    return tokenTypes.linkText;
  }

  function footnoteUrl(stream, state) {
    // Check if space, and return NULL if so (to avoid marking the space)
    if(stream.eatSpace()){
      return null;
    }
    // Match URL
    stream.match(/^[^\s]+/, true);
    // Check for link title
    if (stream.peek() === undefined) { // End of line, set flag to check next line
      state.linkTitle = true;
    } else { // More content on line, check if link title
      stream.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/, true);
    }
    state.f = state.inline = inlineNormal;
    return tokenTypes.linkHref + " url";
  }

  var mode = {
    startState: function() {
      return {
        f: blockNormal,

        prevLine: null,
        thisLine: null,

        block: blockNormal,
        htmlState: null,
        indentation: 0,

        inline: inlineNormal,
        text: handleText,

        formatting: false,
        linkText: false,
        linkHref: false,
        linkTitle: false,
        code: 0,
        em: false,
        strong: false,
        header: 0,
        hr: false,
        taskList: false,
        list: false,
        listStack: [],
        quote: 0,
        trailingSpace: 0,
        trailingSpaceNewLine: false,
        strikethrough: false,
        fencedChars: null
      };
    },

    copyState: function(s) {
      return {
        f: s.f,

        prevLine: s.prevLine,
        thisLine: s.thisLine,

        block: s.block,
        htmlState: s.htmlState && CodeMirror.copyState(htmlMode, s.htmlState),
        indentation: s.indentation,

        localMode: s.localMode,
        localState: s.localMode ? CodeMirror.copyState(s.localMode, s.localState) : null,

        inline: s.inline,
        text: s.text,
        formatting: false,
        linkTitle: s.linkTitle,
        code: s.code,
        em: s.em,
        strong: s.strong,
        strikethrough: s.strikethrough,
        header: s.header,
        hr: s.hr,
        taskList: s.taskList,
        list: s.list,
        listStack: s.listStack.slice(0),
        quote: s.quote,
        indentedCode: s.indentedCode,
        trailingSpace: s.trailingSpace,
        trailingSpaceNewLine: s.trailingSpaceNewLine,
        md_inside: s.md_inside,
        fencedChars: s.fencedChars
      };
    },

    token: function(stream, state) {

      // Reset state.formatting
      state.formatting = false;

      if (stream != state.thisLine) {
        var forceBlankLine = state.header || state.hr;

        // Reset state.header and state.hr
        state.header = 0;
        state.hr = false;

        if (stream.match(/^\s*$/, true) || forceBlankLine) {
          blankLine(state);
          if (!forceBlankLine) return null
          state.prevLine = null
        }

        state.prevLine = state.thisLine
        state.thisLine = stream

        // Reset state.taskList
        state.taskList = false;

        // Reset state.trailingSpace
        state.trailingSpace = 0;
        state.trailingSpaceNewLine = false;

        state.f = state.block;
        var indentation = stream.match(/^\s*/, true)[0].replace(/\t/g, '    ').length;
        state.indentationDiff = Math.min(indentation - state.indentation, 4);
        state.indentation = state.indentation + state.indentationDiff;
        if (indentation > 0) return null;
      }
      return state.f(stream, state);
    },

    innerMode: function(state) {
      if (state.block == htmlBlock) return {state: state.htmlState, mode: htmlMode};
      if (state.localState) return {state: state.localState, mode: state.localMode};
      return {state: state, mode: mode};
    },

    blankLine: blankLine,

    getType: getType,

    closeBrackets: "()[]{}''\"\"``",
    fold: "markdown"
  };
  return mode;
}, "xml");

CodeMirror.defineMIME("text/x-markdown", "markdown");

});

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define('codemirror/mode/xml/xml',["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

var htmlConfig = {
  autoSelfClosers: {'area': true, 'base': true, 'br': true, 'col': true, 'command': true,
                    'embed': true, 'frame': true, 'hr': true, 'img': true, 'input': true,
                    'keygen': true, 'link': true, 'meta': true, 'param': true, 'source': true,
                    'track': true, 'wbr': true, 'menuitem': true},
  implicitlyClosed: {'dd': true, 'li': true, 'optgroup': true, 'option': true, 'p': true,
                     'rp': true, 'rt': true, 'tbody': true, 'td': true, 'tfoot': true,
                     'th': true, 'tr': true},
  contextGrabbers: {
    'dd': {'dd': true, 'dt': true},
    'dt': {'dd': true, 'dt': true},
    'li': {'li': true},
    'option': {'option': true, 'optgroup': true},
    'optgroup': {'optgroup': true},
    'p': {'address': true, 'article': true, 'aside': true, 'blockquote': true, 'dir': true,
          'div': true, 'dl': true, 'fieldset': true, 'footer': true, 'form': true,
          'h1': true, 'h2': true, 'h3': true, 'h4': true, 'h5': true, 'h6': true,
          'header': true, 'hgroup': true, 'hr': true, 'menu': true, 'nav': true, 'ol': true,
          'p': true, 'pre': true, 'section': true, 'table': true, 'ul': true},
    'rp': {'rp': true, 'rt': true},
    'rt': {'rp': true, 'rt': true},
    'tbody': {'tbody': true, 'tfoot': true},
    'td': {'td': true, 'th': true},
    'tfoot': {'tbody': true},
    'th': {'td': true, 'th': true},
    'thead': {'tbody': true, 'tfoot': true},
    'tr': {'tr': true}
  },
  doNotIndent: {"pre": true},
  allowUnquoted: true,
  allowMissing: true,
  caseFold: true
}

var xmlConfig = {
  autoSelfClosers: {},
  implicitlyClosed: {},
  contextGrabbers: {},
  doNotIndent: {},
  allowUnquoted: false,
  allowMissing: false,
  caseFold: false
}

CodeMirror.defineMode("xml", function(editorConf, config_) {
  var indentUnit = editorConf.indentUnit
  var config = {}
  var defaults = config_.htmlMode ? htmlConfig : xmlConfig
  for (var prop in defaults) config[prop] = defaults[prop]
  for (var prop in config_) config[prop] = config_[prop]

  // Return variables for tokenizers
  var type, setStyle;

  function inText(stream, state) {
    function chain(parser) {
      state.tokenize = parser;
      return parser(stream, state);
    }

    var ch = stream.next();
    if (ch == "<") {
      if (stream.eat("!")) {
        if (stream.eat("[")) {
          if (stream.match("CDATA[")) return chain(inBlock("atom", "]]>"));
          else return null;
        } else if (stream.match("--")) {
          return chain(inBlock("comment", "-->"));
        } else if (stream.match("DOCTYPE", true, true)) {
          stream.eatWhile(/[\w\._\-]/);
          return chain(doctype(1));
        } else {
          return null;
        }
      } else if (stream.eat("?")) {
        stream.eatWhile(/[\w\._\-]/);
        state.tokenize = inBlock("meta", "?>");
        return "meta";
      } else {
        type = stream.eat("/") ? "closeTag" : "openTag";
        state.tokenize = inTag;
        return "tag bracket";
      }
    } else if (ch == "&") {
      var ok;
      if (stream.eat("#")) {
        if (stream.eat("x")) {
          ok = stream.eatWhile(/[a-fA-F\d]/) && stream.eat(";");
        } else {
          ok = stream.eatWhile(/[\d]/) && stream.eat(";");
        }
      } else {
        ok = stream.eatWhile(/[\w\.\-:]/) && stream.eat(";");
      }
      return ok ? "atom" : "error";
    } else {
      stream.eatWhile(/[^&<]/);
      return null;
    }
  }
  inText.isInText = true;

  function inTag(stream, state) {
    var ch = stream.next();
    if (ch == ">" || (ch == "/" && stream.eat(">"))) {
      state.tokenize = inText;
      type = ch == ">" ? "endTag" : "selfcloseTag";
      return "tag bracket";
    } else if (ch == "=") {
      type = "equals";
      return null;
    } else if (ch == "<") {
      state.tokenize = inText;
      state.state = baseState;
      state.tagName = state.tagStart = null;
      var next = state.tokenize(stream, state);
      return next ? next + " tag error" : "tag error";
    } else if (/[\'\"]/.test(ch)) {
      state.tokenize = inAttribute(ch);
      state.stringStartCol = stream.column();
      return state.tokenize(stream, state);
    } else {
      stream.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/);
      return "word";
    }
  }

  function inAttribute(quote) {
    var closure = function(stream, state) {
      while (!stream.eol()) {
        if (stream.next() == quote) {
          state.tokenize = inTag;
          break;
        }
      }
      return "string";
    };
    closure.isInAttribute = true;
    return closure;
  }

  function inBlock(style, terminator) {
    return function(stream, state) {
      while (!stream.eol()) {
        if (stream.match(terminator)) {
          state.tokenize = inText;
          break;
        }
        stream.next();
      }
      return style;
    };
  }
  function doctype(depth) {
    return function(stream, state) {
      var ch;
      while ((ch = stream.next()) != null) {
        if (ch == "<") {
          state.tokenize = doctype(depth + 1);
          return state.tokenize(stream, state);
        } else if (ch == ">") {
          if (depth == 1) {
            state.tokenize = inText;
            break;
          } else {
            state.tokenize = doctype(depth - 1);
            return state.tokenize(stream, state);
          }
        }
      }
      return "meta";
    };
  }

  function Context(state, tagName, startOfLine) {
    this.prev = state.context;
    this.tagName = tagName;
    this.indent = state.indented;
    this.startOfLine = startOfLine;
    if (config.doNotIndent.hasOwnProperty(tagName) || (state.context && state.context.noIndent))
      this.noIndent = true;
  }
  function popContext(state) {
    if (state.context) state.context = state.context.prev;
  }
  function maybePopContext(state, nextTagName) {
    var parentTagName;
    while (true) {
      if (!state.context) {
        return;
      }
      parentTagName = state.context.tagName;
      if (!config.contextGrabbers.hasOwnProperty(parentTagName) ||
          !config.contextGrabbers[parentTagName].hasOwnProperty(nextTagName)) {
        return;
      }
      popContext(state);
    }
  }

  function baseState(type, stream, state) {
    if (type == "openTag") {
      state.tagStart = stream.column();
      return tagNameState;
    } else if (type == "closeTag") {
      return closeTagNameState;
    } else {
      return baseState;
    }
  }
  function tagNameState(type, stream, state) {
    if (type == "word") {
      state.tagName = stream.current();
      setStyle = "tag";
      return attrState;
    } else {
      setStyle = "error";
      return tagNameState;
    }
  }
  function closeTagNameState(type, stream, state) {
    if (type == "word") {
      var tagName = stream.current();
      if (state.context && state.context.tagName != tagName &&
          config.implicitlyClosed.hasOwnProperty(state.context.tagName))
        popContext(state);
      if ((state.context && state.context.tagName == tagName) || config.matchClosing === false) {
        setStyle = "tag";
        return closeState;
      } else {
        setStyle = "tag error";
        return closeStateErr;
      }
    } else {
      setStyle = "error";
      return closeStateErr;
    }
  }

  function closeState(type, _stream, state) {
    if (type != "endTag") {
      setStyle = "error";
      return closeState;
    }
    popContext(state);
    return baseState;
  }
  function closeStateErr(type, stream, state) {
    setStyle = "error";
    return closeState(type, stream, state);
  }

  function attrState(type, _stream, state) {
    if (type == "word") {
      setStyle = "attribute";
      return attrEqState;
    } else if (type == "endTag" || type == "selfcloseTag") {
      var tagName = state.tagName, tagStart = state.tagStart;
      state.tagName = state.tagStart = null;
      if (type == "selfcloseTag" ||
          config.autoSelfClosers.hasOwnProperty(tagName)) {
        maybePopContext(state, tagName);
      } else {
        maybePopContext(state, tagName);
        state.context = new Context(state, tagName, tagStart == state.indented);
      }
      return baseState;
    }
    setStyle = "error";
    return attrState;
  }
  function attrEqState(type, stream, state) {
    if (type == "equals") return attrValueState;
    if (!config.allowMissing) setStyle = "error";
    return attrState(type, stream, state);
  }
  function attrValueState(type, stream, state) {
    if (type == "string") return attrContinuedState;
    if (type == "word" && config.allowUnquoted) {setStyle = "string"; return attrState;}
    setStyle = "error";
    return attrState(type, stream, state);
  }
  function attrContinuedState(type, stream, state) {
    if (type == "string") return attrContinuedState;
    return attrState(type, stream, state);
  }

  return {
    startState: function(baseIndent) {
      var state = {tokenize: inText,
                   state: baseState,
                   indented: baseIndent || 0,
                   tagName: null, tagStart: null,
                   context: null}
      if (baseIndent != null) state.baseIndent = baseIndent
      return state
    },

    token: function(stream, state) {
      if (!state.tagName && stream.sol())
        state.indented = stream.indentation();

      if (stream.eatSpace()) return null;
      type = null;
      var style = state.tokenize(stream, state);
      if ((style || type) && style != "comment") {
        setStyle = null;
        state.state = state.state(type || style, stream, state);
        if (setStyle)
          style = setStyle == "error" ? style + " error" : setStyle;
      }
      return style;
    },

    indent: function(state, textAfter, fullLine) {
      var context = state.context;
      // Indent multi-line strings (e.g. css).
      if (state.tokenize.isInAttribute) {
        if (state.tagStart == state.indented)
          return state.stringStartCol + 1;
        else
          return state.indented + indentUnit;
      }
      if (context && context.noIndent) return CodeMirror.Pass;
      if (state.tokenize != inTag && state.tokenize != inText)
        return fullLine ? fullLine.match(/^(\s*)/)[0].length : 0;
      // Indent the starts of attribute names.
      if (state.tagName) {
        if (config.multilineTagIndentPastTag !== false)
          return state.tagStart + state.tagName.length + 2;
        else
          return state.tagStart + indentUnit * (config.multilineTagIndentFactor || 1);
      }
      if (config.alignCDATA && /<!\[CDATA\[/.test(textAfter)) return 0;
      var tagAfter = textAfter && /^<(\/)?([\w_:\.-]*)/.exec(textAfter);
      if (tagAfter && tagAfter[1]) { // Closing tag spotted
        while (context) {
          if (context.tagName == tagAfter[2]) {
            context = context.prev;
            break;
          } else if (config.implicitlyClosed.hasOwnProperty(context.tagName)) {
            context = context.prev;
          } else {
            break;
          }
        }
      } else if (tagAfter) { // Opening tag spotted
        while (context) {
          var grabbers = config.contextGrabbers[context.tagName];
          if (grabbers && grabbers.hasOwnProperty(tagAfter[2]))
            context = context.prev;
          else
            break;
        }
      }
      while (context && context.prev && !context.startOfLine)
        context = context.prev;
      if (context) return context.indent + indentUnit;
      else return state.baseIndent || 0;
    },

    electricInput: /<\/[\s\w:]+>$/,
    blockCommentStart: "<!--",
    blockCommentEnd: "-->",

    configuration: config.htmlMode ? "html" : "xml",
    helperType: config.htmlMode ? "html" : "xml",

    skipAttribute: function(state) {
      if (state.state == attrValueState)
        state.state = attrState
    }
  };
});

CodeMirror.defineMIME("text/xml", "xml");
CodeMirror.defineMIME("application/xml", "xml");
if (!CodeMirror.mimeModes.hasOwnProperty("text/html"))
  CodeMirror.defineMIME("text/html", {name: "xml", htmlMode: true});

});

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define('codemirror/mode/meta',["../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  CodeMirror.modeInfo = [
    {name: "APL", mime: "text/apl", mode: "apl", ext: ["dyalog", "apl"]},
    {name: "PGP", mimes: ["application/pgp", "application/pgp-keys", "application/pgp-signature"], mode: "asciiarmor", ext: ["pgp"]},
    {name: "ASN.1", mime: "text/x-ttcn-asn", mode: "asn.1", ext: ["asn", "asn1"]},
    {name: "Asterisk", mime: "text/x-asterisk", mode: "asterisk", file: /^extensions\.conf$/i},
    {name: "Brainfuck", mime: "text/x-brainfuck", mode: "brainfuck", ext: ["b", "bf"]},
    {name: "C", mime: "text/x-csrc", mode: "clike", ext: ["c", "h"]},
    {name: "C++", mime: "text/x-c++src", mode: "clike", ext: ["cpp", "c++", "cc", "cxx", "hpp", "h++", "hh", "hxx"], alias: ["cpp"]},
    {name: "Cobol", mime: "text/x-cobol", mode: "cobol", ext: ["cob", "cpy"]},
    {name: "C#", mime: "text/x-csharp", mode: "clike", ext: ["cs"], alias: ["csharp"]},
    {name: "Clojure", mime: "text/x-clojure", mode: "clojure", ext: ["clj", "cljc", "cljx"]},
    {name: "ClojureScript", mime: "text/x-clojurescript", mode: "clojure", ext: ["cljs"]},
    {name: "Closure Stylesheets (GSS)", mime: "text/x-gss", mode: "css", ext: ["gss"]},
    {name: "CMake", mime: "text/x-cmake", mode: "cmake", ext: ["cmake", "cmake.in"], file: /^CMakeLists.txt$/},
    {name: "CoffeeScript", mime: "text/x-coffeescript", mode: "coffeescript", ext: ["coffee"], alias: ["coffee", "coffee-script"]},
    {name: "Common Lisp", mime: "text/x-common-lisp", mode: "commonlisp", ext: ["cl", "lisp", "el"], alias: ["lisp"]},
    {name: "Cypher", mime: "application/x-cypher-query", mode: "cypher", ext: ["cyp", "cypher"]},
    {name: "Cython", mime: "text/x-cython", mode: "python", ext: ["pyx", "pxd", "pxi"]},
    {name: "Crystal", mime: "text/x-crystal", mode: "crystal", ext: ["cr"]},
    {name: "CSS", mime: "text/css", mode: "css", ext: ["css"]},
    {name: "CQL", mime: "text/x-cassandra", mode: "sql", ext: ["cql"]},
    {name: "D", mime: "text/x-d", mode: "d", ext: ["d"]},
    {name: "Dart", mimes: ["application/dart", "text/x-dart"], mode: "dart", ext: ["dart"]},
    {name: "diff", mime: "text/x-diff", mode: "diff", ext: ["diff", "patch"]},
    {name: "Django", mime: "text/x-django", mode: "django"},
    {name: "Dockerfile", mime: "text/x-dockerfile", mode: "dockerfile", file: /^Dockerfile$/},
    {name: "DTD", mime: "application/xml-dtd", mode: "dtd", ext: ["dtd"]},
    {name: "Dylan", mime: "text/x-dylan", mode: "dylan", ext: ["dylan", "dyl", "intr"]},
    {name: "EBNF", mime: "text/x-ebnf", mode: "ebnf"},
    {name: "ECL", mime: "text/x-ecl", mode: "ecl", ext: ["ecl"]},
    {name: "edn", mime: "application/edn", mode: "clojure", ext: ["edn"]},
    {name: "Eiffel", mime: "text/x-eiffel", mode: "eiffel", ext: ["e"]},
    {name: "Elm", mime: "text/x-elm", mode: "elm", ext: ["elm"]},
    {name: "Embedded Javascript", mime: "application/x-ejs", mode: "htmlembedded", ext: ["ejs"]},
    {name: "Embedded Ruby", mime: "application/x-erb", mode: "htmlembedded", ext: ["erb"]},
    {name: "Erlang", mime: "text/x-erlang", mode: "erlang", ext: ["erl"]},
    {name: "Factor", mime: "text/x-factor", mode: "factor", ext: ["factor"]},
    {name: "FCL", mime: "text/x-fcl", mode: "fcl"},
    {name: "Forth", mime: "text/x-forth", mode: "forth", ext: ["forth", "fth", "4th"]},
    {name: "Fortran", mime: "text/x-fortran", mode: "fortran", ext: ["f", "for", "f77", "f90"]},
    {name: "F#", mime: "text/x-fsharp", mode: "mllike", ext: ["fs"], alias: ["fsharp"]},
    {name: "Gas", mime: "text/x-gas", mode: "gas", ext: ["s"]},
    {name: "Gherkin", mime: "text/x-feature", mode: "gherkin", ext: ["feature"]},
    {name: "GitHub Flavored Markdown", mime: "text/x-gfm", mode: "gfm", file: /^(readme|contributing|history).md$/i},
    {name: "Go", mime: "text/x-go", mode: "go", ext: ["go"]},
    {name: "Groovy", mime: "text/x-groovy", mode: "groovy", ext: ["groovy", "gradle"], file: /^Jenkinsfile$/},
    {name: "HAML", mime: "text/x-haml", mode: "haml", ext: ["haml"]},
    {name: "Haskell", mime: "text/x-haskell", mode: "haskell", ext: ["hs"]},
    {name: "Haskell (Literate)", mime: "text/x-literate-haskell", mode: "haskell-literate", ext: ["lhs"]},
    {name: "Haxe", mime: "text/x-haxe", mode: "haxe", ext: ["hx"]},
    {name: "HXML", mime: "text/x-hxml", mode: "haxe", ext: ["hxml"]},
    {name: "ASP.NET", mime: "application/x-aspx", mode: "htmlembedded", ext: ["aspx"], alias: ["asp", "aspx"]},
    {name: "HTML", mime: "text/html", mode: "htmlmixed", ext: ["html", "htm"], alias: ["xhtml"]},
    {name: "HTTP", mime: "message/http", mode: "http"},
    {name: "IDL", mime: "text/x-idl", mode: "idl", ext: ["pro"]},
    {name: "Pug", mime: "text/x-pug", mode: "pug", ext: ["jade", "pug"], alias: ["jade"]},
    {name: "Java", mime: "text/x-java", mode: "clike", ext: ["java"]},
    {name: "Java Server Pages", mime: "application/x-jsp", mode: "htmlembedded", ext: ["jsp"], alias: ["jsp"]},
    {name: "JavaScript", mimes: ["text/javascript", "text/ecmascript", "application/javascript", "application/x-javascript", "application/ecmascript"],
     mode: "javascript", ext: ["js"], alias: ["ecmascript", "js", "node"]},
    {name: "JSON", mimes: ["application/json", "application/x-json"], mode: "javascript", ext: ["json", "map"], alias: ["json5"]},
    {name: "JSON-LD", mime: "application/ld+json", mode: "javascript", ext: ["jsonld"], alias: ["jsonld"]},
    {name: "JSX", mime: "text/jsx", mode: "jsx", ext: ["jsx"]},
    {name: "Jinja2", mime: "null", mode: "jinja2"},
    {name: "Julia", mime: "text/x-julia", mode: "julia", ext: ["jl"]},
    {name: "Kotlin", mime: "text/x-kotlin", mode: "clike", ext: ["kt"]},
    {name: "LESS", mime: "text/x-less", mode: "css", ext: ["less"]},
    {name: "LiveScript", mime: "text/x-livescript", mode: "livescript", ext: ["ls"], alias: ["ls"]},
    {name: "Lua", mime: "text/x-lua", mode: "lua", ext: ["lua"]},
    {name: "Markdown", mime: "text/x-markdown", mode: "markdown", ext: ["markdown", "md", "mkd"]},
    {name: "mIRC", mime: "text/mirc", mode: "mirc"},
    {name: "MariaDB SQL", mime: "text/x-mariadb", mode: "sql"},
    {name: "Mathematica", mime: "text/x-mathematica", mode: "mathematica", ext: ["m", "nb"]},
    {name: "Modelica", mime: "text/x-modelica", mode: "modelica", ext: ["mo"]},
    {name: "MUMPS", mime: "text/x-mumps", mode: "mumps", ext: ["mps"]},
    {name: "MS SQL", mime: "text/x-mssql", mode: "sql"},
    {name: "mbox", mime: "application/mbox", mode: "mbox", ext: ["mbox"]},
    {name: "MySQL", mime: "text/x-mysql", mode: "sql"},
    {name: "Nginx", mime: "text/x-nginx-conf", mode: "nginx", file: /nginx.*\.conf$/i},
    {name: "NSIS", mime: "text/x-nsis", mode: "nsis", ext: ["nsh", "nsi"]},
    {name: "NTriples", mime: "text/n-triples", mode: "ntriples", ext: ["nt"]},
    {name: "Objective C", mime: "text/x-objectivec", mode: "clike", ext: ["m", "mm"], alias: ["objective-c", "objc"]},
    {name: "OCaml", mime: "text/x-ocaml", mode: "mllike", ext: ["ml", "mli", "mll", "mly"]},
    {name: "Octave", mime: "text/x-octave", mode: "octave", ext: ["m"]},
    {name: "Oz", mime: "text/x-oz", mode: "oz", ext: ["oz"]},
    {name: "Pascal", mime: "text/x-pascal", mode: "pascal", ext: ["p", "pas"]},
    {name: "PEG.js", mime: "null", mode: "pegjs", ext: ["jsonld"]},
    {name: "Perl", mime: "text/x-perl", mode: "perl", ext: ["pl", "pm"]},
    {name: "PHP", mime: "application/x-httpd-php", mode: "php", ext: ["php", "php3", "php4", "php5", "phtml"]},
    {name: "Pig", mime: "text/x-pig", mode: "pig", ext: ["pig"]},
    {name: "Plain Text", mime: "text/plain", mode: "null", ext: ["txt", "text", "conf", "def", "list", "log"]},
    {name: "PLSQL", mime: "text/x-plsql", mode: "sql", ext: ["pls"]},
    {name: "PowerShell", mime: "application/x-powershell", mode: "powershell", ext: ["ps1", "psd1", "psm1"]},
    {name: "Properties files", mime: "text/x-properties", mode: "properties", ext: ["properties", "ini", "in"], alias: ["ini", "properties"]},
    {name: "ProtoBuf", mime: "text/x-protobuf", mode: "protobuf", ext: ["proto"]},
    {name: "Python", mime: "text/x-python", mode: "python", ext: ["BUILD", "bzl", "py", "pyw"], file: /^(BUCK|BUILD)$/},
    {name: "Puppet", mime: "text/x-puppet", mode: "puppet", ext: ["pp"]},
    {name: "Q", mime: "text/x-q", mode: "q", ext: ["q"]},
    {name: "R", mime: "text/x-rsrc", mode: "r", ext: ["r"], alias: ["rscript"]},
    {name: "reStructuredText", mime: "text/x-rst", mode: "rst", ext: ["rst"], alias: ["rst"]},
    {name: "RPM Changes", mime: "text/x-rpm-changes", mode: "rpm"},
    {name: "RPM Spec", mime: "text/x-rpm-spec", mode: "rpm", ext: ["spec"]},
    {name: "Ruby", mime: "text/x-ruby", mode: "ruby", ext: ["rb"], alias: ["jruby", "macruby", "rake", "rb", "rbx"]},
    {name: "Rust", mime: "text/x-rustsrc", mode: "rust", ext: ["rs"]},
    {name: "SAS", mime: "text/x-sas", mode: "sas", ext: ["sas"]},
    {name: "Sass", mime: "text/x-sass", mode: "sass", ext: ["sass"]},
    {name: "Scala", mime: "text/x-scala", mode: "clike", ext: ["scala"]},
    {name: "Scheme", mime: "text/x-scheme", mode: "scheme", ext: ["scm", "ss"]},
    {name: "SCSS", mime: "text/x-scss", mode: "css", ext: ["scss"]},
    {name: "Shell", mime: "text/x-sh", mode: "shell", ext: ["sh", "ksh", "bash"], alias: ["bash", "sh", "zsh"], file: /^PKGBUILD$/},
    {name: "Sieve", mime: "application/sieve", mode: "sieve", ext: ["siv", "sieve"]},
    {name: "Slim", mimes: ["text/x-slim", "application/x-slim"], mode: "slim", ext: ["slim"]},
    {name: "Smalltalk", mime: "text/x-stsrc", mode: "smalltalk", ext: ["st"]},
    {name: "Smarty", mime: "text/x-smarty", mode: "smarty", ext: ["tpl"]},
    {name: "Solr", mime: "text/x-solr", mode: "solr"},
    {name: "Soy", mime: "text/x-soy", mode: "soy", ext: ["soy"], alias: ["closure template"]},
    {name: "SPARQL", mime: "application/sparql-query", mode: "sparql", ext: ["rq", "sparql"], alias: ["sparul"]},
    {name: "Spreadsheet", mime: "text/x-spreadsheet", mode: "spreadsheet", alias: ["excel", "formula"]},
    {name: "SQL", mime: "text/x-sql", mode: "sql", ext: ["sql"]},
    {name: "Squirrel", mime: "text/x-squirrel", mode: "clike", ext: ["nut"]},
    {name: "Stylus", mime: "text/x-styl", mode: "stylus", ext: ["styl"]},
    {name: "Swift", mime: "text/x-swift", mode: "swift", ext: ["swift"]},
    {name: "sTeX", mime: "text/x-stex", mode: "stex"},
    {name: "LaTeX", mime: "text/x-latex", mode: "stex", ext: ["text", "ltx"], alias: ["tex"]},
    {name: "SystemVerilog", mime: "text/x-systemverilog", mode: "verilog", ext: ["v"]},
    {name: "Tcl", mime: "text/x-tcl", mode: "tcl", ext: ["tcl"]},
    {name: "Textile", mime: "text/x-textile", mode: "textile", ext: ["textile"]},
    {name: "TiddlyWiki ", mime: "text/x-tiddlywiki", mode: "tiddlywiki"},
    {name: "Tiki wiki", mime: "text/tiki", mode: "tiki"},
    {name: "TOML", mime: "text/x-toml", mode: "toml", ext: ["toml"]},
    {name: "Tornado", mime: "text/x-tornado", mode: "tornado"},
    {name: "troff", mime: "text/troff", mode: "troff", ext: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]},
    {name: "TTCN", mime: "text/x-ttcn", mode: "ttcn", ext: ["ttcn", "ttcn3", "ttcnpp"]},
    {name: "TTCN_CFG", mime: "text/x-ttcn-cfg", mode: "ttcn-cfg", ext: ["cfg"]},
    {name: "Turtle", mime: "text/turtle", mode: "turtle", ext: ["ttl"]},
    {name: "TypeScript", mime: "application/typescript", mode: "javascript", ext: ["ts"], alias: ["ts"]},
    {name: "Twig", mime: "text/x-twig", mode: "twig"},
    {name: "Web IDL", mime: "text/x-webidl", mode: "webidl", ext: ["webidl"]},
    {name: "VB.NET", mime: "text/x-vb", mode: "vb", ext: ["vb"]},
    {name: "VBScript", mime: "text/vbscript", mode: "vbscript", ext: ["vbs"]},
    {name: "Velocity", mime: "text/velocity", mode: "velocity", ext: ["vtl"]},
    {name: "Verilog", mime: "text/x-verilog", mode: "verilog", ext: ["v"]},
    {name: "VHDL", mime: "text/x-vhdl", mode: "vhdl", ext: ["vhd", "vhdl"]},
    {name: "XML", mimes: ["application/xml", "text/xml"], mode: "xml", ext: ["xml", "xsl", "xsd"], alias: ["rss", "wsdl", "xsd"]},
    {name: "XQuery", mime: "application/xquery", mode: "xquery", ext: ["xy", "xquery"]},
    {name: "Yacas", mime: "text/x-yacas", mode: "yacas", ext: ["ys"]},
    {name: "YAML", mime: "text/x-yaml", mode: "yaml", ext: ["yaml", "yml"], alias: ["yml"]},
    {name: "Z80", mime: "text/x-z80", mode: "z80", ext: ["z80"]},
    {name: "mscgen", mime: "text/x-mscgen", mode: "mscgen", ext: ["mscgen", "mscin", "msc"]},
    {name: "xu", mime: "text/x-xu", mode: "mscgen", ext: ["xu"]},
    {name: "msgenny", mime: "text/x-msgenny", mode: "mscgen", ext: ["msgenny"]}
  ];
  // Ensure all modes have a mime property for backwards compatibility
  for (var i = 0; i < CodeMirror.modeInfo.length; i++) {
    var info = CodeMirror.modeInfo[i];
    if (info.mimes) info.mime = info.mimes[0];
  }

  CodeMirror.findModeByMIME = function(mime) {
    mime = mime.toLowerCase();
    for (var i = 0; i < CodeMirror.modeInfo.length; i++) {
      var info = CodeMirror.modeInfo[i];
      if (info.mime == mime) return info;
      if (info.mimes) for (var j = 0; j < info.mimes.length; j++)
        if (info.mimes[j] == mime) return info;
    }
  };

  CodeMirror.findModeByExtension = function(ext) {
    for (var i = 0; i < CodeMirror.modeInfo.length; i++) {
      var info = CodeMirror.modeInfo[i];
      if (info.ext) for (var j = 0; j < info.ext.length; j++)
        if (info.ext[j] == ext) return info;
    }
  };

  CodeMirror.findModeByFileName = function(filename) {
    for (var i = 0; i < CodeMirror.modeInfo.length; i++) {
      var info = CodeMirror.modeInfo[i];
      if (info.file && info.file.test(filename)) return info;
    }
    var dot = filename.lastIndexOf(".");
    var ext = dot > -1 && filename.substring(dot + 1, filename.length);
    if (ext) return CodeMirror.findModeByExtension(ext);
  };

  CodeMirror.findModeByName = function(name) {
    name = name.toLowerCase();
    for (var i = 0; i < CodeMirror.modeInfo.length; i++) {
      var info = CodeMirror.modeInfo[i];
      if (info.name.toLowerCase() == name) return info;
      if (info.alias) for (var j = 0; j < info.alias.length; j++)
        if (info.alias[j].toLowerCase() == name) return info;
    }
  };
});

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define('codemirror/addon/display/placeholder',["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  CodeMirror.defineOption("placeholder", "", function(cm, val, old) {
    var prev = old && old != CodeMirror.Init;
    if (val && !prev) {
      cm.on("blur", onBlur);
      cm.on("change", onChange);
      cm.on("swapDoc", onChange);
      onChange(cm);
    } else if (!val && prev) {
      cm.off("blur", onBlur);
      cm.off("change", onChange);
      cm.off("swapDoc", onChange);
      clearPlaceholder(cm);
      var wrapper = cm.getWrapperElement();
      wrapper.className = wrapper.className.replace(" CodeMirror-empty", "");
    }

    if (val && !cm.hasFocus()) onBlur(cm);
  });

  function clearPlaceholder(cm) {
    if (cm.state.placeholder) {
      cm.state.placeholder.parentNode.removeChild(cm.state.placeholder);
      cm.state.placeholder = null;
    }
  }
  function setPlaceholder(cm) {
    clearPlaceholder(cm);
    var elt = cm.state.placeholder = document.createElement("pre");
    elt.style.cssText = "height: 0; overflow: visible";
    elt.className = "CodeMirror-placeholder";
    var placeHolder = cm.getOption("placeholder")
    if (typeof placeHolder == "string") placeHolder = document.createTextNode(placeHolder)
    elt.appendChild(placeHolder)
    cm.display.lineSpace.insertBefore(elt, cm.display.lineSpace.firstChild);
  }

  function onBlur(cm) {
    if (isEmpty(cm)) setPlaceholder(cm);
  }
  function onChange(cm) {
    var wrapper = cm.getWrapperElement(), empty = isEmpty(cm);
    wrapper.className = wrapper.className.replace(" CodeMirror-empty", "") + (empty ? " CodeMirror-empty" : "");

    if (empty) setPlaceholder(cm);
    else clearPlaceholder(cm);
  }

  function isEmpty(cm) {
    return (cm.lineCount() === 1) && (cm.getLine(0) === "");
  }
});

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define('codemirror/addon/hint/show-hint',["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  var HINT_ELEMENT_CLASS        = "CodeMirror-hint";
  var ACTIVE_HINT_ELEMENT_CLASS = "CodeMirror-hint-active";

  // This is the old interface, kept around for now to stay
  // backwards-compatible.
  CodeMirror.showHint = function(cm, getHints, options) {
    if (!getHints) return cm.showHint(options);
    if (options && options.async) getHints.async = true;
    var newOpts = {hint: getHints};
    if (options) for (var prop in options) newOpts[prop] = options[prop];
    return cm.showHint(newOpts);
  };

  CodeMirror.defineExtension("showHint", function(options) {
    options = parseOptions(this, this.getCursor("start"), options);
    var selections = this.listSelections()
    if (selections.length > 1) return;
    // By default, don't allow completion when something is selected.
    // A hint function can have a `supportsSelection` property to
    // indicate that it can handle selections.
    if (this.somethingSelected()) {
      if (!options.hint.supportsSelection) return;
      // Don't try with cross-line selections
      for (var i = 0; i < selections.length; i++)
        if (selections[i].head.line != selections[i].anchor.line) return;
    }

    if (this.state.completionActive) this.state.completionActive.close();
    var completion = this.state.completionActive = new Completion(this, options);
    if (!completion.options.hint) return;

    CodeMirror.signal(this, "startCompletion", this);
    completion.update(true);
  });

  function Completion(cm, options) {
    this.cm = cm;
    this.options = options;
    this.widget = null;
    this.debounce = 0;
    this.tick = 0;
    this.startPos = this.cm.getCursor("start");
    this.startLen = this.cm.getLine(this.startPos.line).length - this.cm.getSelection().length;

    var self = this;
    cm.on("cursorActivity", this.activityFunc = function() { self.cursorActivity(); });
  }

  var requestAnimationFrame = window.requestAnimationFrame || function(fn) {
    return setTimeout(fn, 1000/60);
  };
  var cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;

  Completion.prototype = {
    close: function() {
      if (!this.active()) return;
      this.cm.state.completionActive = null;
      this.tick = null;
      this.cm.off("cursorActivity", this.activityFunc);

      if (this.widget && this.data) CodeMirror.signal(this.data, "close");
      if (this.widget) this.widget.close();
      CodeMirror.signal(this.cm, "endCompletion", this.cm);
    },

    active: function() {
      return this.cm.state.completionActive == this;
    },

    pick: function(data, i) {
      var completion = data.list[i];
      if (completion.hint) completion.hint(this.cm, data, completion);
      else this.cm.replaceRange(getText(completion), completion.from || data.from,
                                completion.to || data.to, "complete");
      CodeMirror.signal(data, "pick", completion);
      this.close();
    },

    cursorActivity: function() {
      if (this.debounce) {
        cancelAnimationFrame(this.debounce);
        this.debounce = 0;
      }

      var pos = this.cm.getCursor(), line = this.cm.getLine(pos.line);
      if (pos.line != this.startPos.line || line.length - pos.ch != this.startLen - this.startPos.ch ||
          pos.ch < this.startPos.ch || this.cm.somethingSelected() ||
          (pos.ch && this.options.closeCharacters.test(line.charAt(pos.ch - 1)))) {
        this.close();
      } else {
        var self = this;
        this.debounce = requestAnimationFrame(function() {self.update();});
        if (this.widget) this.widget.disable();
      }
    },

    update: function(first) {
      if (this.tick == null) return
      var self = this, myTick = ++this.tick
      fetchHints(this.options.hint, this.cm, this.options, function(data) {
        if (self.tick == myTick) self.finishUpdate(data, first)
      })
    },

    finishUpdate: function(data, first) {
      if (this.data) CodeMirror.signal(this.data, "update");

      var picked = (this.widget && this.widget.picked) || (first && this.options.completeSingle);
      if (this.widget) this.widget.close();

      if (data && this.data && isNewCompletion(this.data, data)) return;
      this.data = data;

      if (data && data.list.length) {
        if (picked && data.list.length == 1) {
          this.pick(data, 0);
        } else {
          this.widget = new Widget(this, data);
          CodeMirror.signal(data, "shown");
        }
      }
    }
  };

  function isNewCompletion(old, nw) {
    var moved = CodeMirror.cmpPos(nw.from, old.from)
    return moved > 0 && old.to.ch - old.from.ch != nw.to.ch - nw.from.ch
  }

  function parseOptions(cm, pos, options) {
    var editor = cm.options.hintOptions;
    var out = {};
    for (var prop in defaultOptions) out[prop] = defaultOptions[prop];
    if (editor) for (var prop in editor)
      if (editor[prop] !== undefined) out[prop] = editor[prop];
    if (options) for (var prop in options)
      if (options[prop] !== undefined) out[prop] = options[prop];
    if (out.hint.resolve) out.hint = out.hint.resolve(cm, pos)
    return out;
  }

  function getText(completion) {
    if (typeof completion == "string") return completion;
    else return completion.text;
  }

  function buildKeyMap(completion, handle) {
    var baseMap = {
      Up: function() {handle.moveFocus(-1);},
      Down: function() {handle.moveFocus(1);},
      PageUp: function() {handle.moveFocus(-handle.menuSize() + 1, true);},
      PageDown: function() {handle.moveFocus(handle.menuSize() - 1, true);},
      Home: function() {handle.setFocus(0);},
      End: function() {handle.setFocus(handle.length - 1);},
      Enter: handle.pick,
      Tab: handle.pick,
      Esc: handle.close
    };
    var custom = completion.options.customKeys;
    var ourMap = custom ? {} : baseMap;
    function addBinding(key, val) {
      var bound;
      if (typeof val != "string")
        bound = function(cm) { return val(cm, handle); };
      // This mechanism is deprecated
      else if (baseMap.hasOwnProperty(val))
        bound = baseMap[val];
      else
        bound = val;
      ourMap[key] = bound;
    }
    if (custom)
      for (var key in custom) if (custom.hasOwnProperty(key))
        addBinding(key, custom[key]);
    var extra = completion.options.extraKeys;
    if (extra)
      for (var key in extra) if (extra.hasOwnProperty(key))
        addBinding(key, extra[key]);
    return ourMap;
  }

  function getHintElement(hintsElement, el) {
    while (el && el != hintsElement) {
      if (el.nodeName.toUpperCase() === "LI" && el.parentNode == hintsElement) return el;
      el = el.parentNode;
    }
  }

  function Widget(completion, data) {
    this.completion = completion;
    this.data = data;
    this.picked = false;
    var widget = this, cm = completion.cm;

    var hints = this.hints = document.createElement("ul");
    hints.className = "CodeMirror-hints";
    this.selectedHint = data.selectedHint || 0;

    var completions = data.list;
    for (var i = 0; i < completions.length; ++i) {
      var elt = hints.appendChild(document.createElement("li")), cur = completions[i];
      var className = HINT_ELEMENT_CLASS + (i != this.selectedHint ? "" : " " + ACTIVE_HINT_ELEMENT_CLASS);
      if (cur.className != null) className = cur.className + " " + className;
      elt.className = className;
      if (cur.render) cur.render(elt, data, cur);
      else elt.appendChild(document.createTextNode(cur.displayText || getText(cur)));
      elt.hintId = i;
    }

    var pos = cm.cursorCoords(completion.options.alignWithWord ? data.from : null);
    var left = pos.left, top = pos.bottom, below = true;
    hints.style.left = left + "px";
    hints.style.top = top + "px";
    // If we're at the edge of the screen, then we want the menu to appear on the left of the cursor.
    var winW = window.innerWidth || Math.max(document.body.offsetWidth, document.documentElement.offsetWidth);
    var winH = window.innerHeight || Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);
    (completion.options.container || document.body).appendChild(hints);
    var box = hints.getBoundingClientRect(), overlapY = box.bottom - winH;
    var scrolls = hints.scrollHeight > hints.clientHeight + 1
    var startScroll = cm.getScrollInfo();

    if (overlapY > 0) {
      var height = box.bottom - box.top, curTop = pos.top - (pos.bottom - box.top);
      if (curTop - height > 0) { // Fits above cursor
        hints.style.top = (top = pos.top - height) + "px";
        below = false;
      } else if (height > winH) {
        hints.style.height = (winH - 5) + "px";
        hints.style.top = (top = pos.bottom - box.top) + "px";
        var cursor = cm.getCursor();
        if (data.from.ch != cursor.ch) {
          pos = cm.cursorCoords(cursor);
          hints.style.left = (left = pos.left) + "px";
          box = hints.getBoundingClientRect();
        }
      }
    }
    var overlapX = box.right - winW;
    if (overlapX > 0) {
      if (box.right - box.left > winW) {
        hints.style.width = (winW - 5) + "px";
        overlapX -= (box.right - box.left) - winW;
      }
      hints.style.left = (left = pos.left - overlapX) + "px";
    }
    if (scrolls) for (var node = hints.firstChild; node; node = node.nextSibling)
      node.style.paddingRight = cm.display.nativeBarWidth + "px"

    cm.addKeyMap(this.keyMap = buildKeyMap(completion, {
      moveFocus: function(n, avoidWrap) { widget.changeActive(widget.selectedHint + n, avoidWrap); },
      setFocus: function(n) { widget.changeActive(n); },
      menuSize: function() { return widget.screenAmount(); },
      length: completions.length,
      close: function() { completion.close(); },
      pick: function() { widget.pick(); },
      data: data
    }));

    if (completion.options.closeOnUnfocus) {
      var closingOnBlur;
      cm.on("blur", this.onBlur = function() { closingOnBlur = setTimeout(function() { completion.close(); }, 100); });
      cm.on("focus", this.onFocus = function() { clearTimeout(closingOnBlur); });
    }

    cm.on("scroll", this.onScroll = function() {
      var curScroll = cm.getScrollInfo(), editor = cm.getWrapperElement().getBoundingClientRect();
      var newTop = top + startScroll.top - curScroll.top;
      var point = newTop - (window.pageYOffset || (document.documentElement || document.body).scrollTop);
      if (!below) point += hints.offsetHeight;
      if (point <= editor.top || point >= editor.bottom) return completion.close();
      hints.style.top = newTop + "px";
      hints.style.left = (left + startScroll.left - curScroll.left) + "px";
    });

    CodeMirror.on(hints, "dblclick", function(e) {
      var t = getHintElement(hints, e.target || e.srcElement);
      if (t && t.hintId != null) {widget.changeActive(t.hintId); widget.pick();}
    });

    CodeMirror.on(hints, "click", function(e) {
      var t = getHintElement(hints, e.target || e.srcElement);
      if (t && t.hintId != null) {
        widget.changeActive(t.hintId);
        if (completion.options.completeOnSingleClick) widget.pick();
      }
    });

    CodeMirror.on(hints, "mousedown", function() {
      setTimeout(function(){cm.focus();}, 20);
    });

    CodeMirror.signal(data, "select", completions[0], hints.firstChild);
    return true;
  }

  Widget.prototype = {
    close: function() {
      if (this.completion.widget != this) return;
      this.completion.widget = null;
      this.hints.parentNode.removeChild(this.hints);
      this.completion.cm.removeKeyMap(this.keyMap);

      var cm = this.completion.cm;
      if (this.completion.options.closeOnUnfocus) {
        cm.off("blur", this.onBlur);
        cm.off("focus", this.onFocus);
      }
      cm.off("scroll", this.onScroll);
    },

    disable: function() {
      this.completion.cm.removeKeyMap(this.keyMap);
      var widget = this;
      this.keyMap = {Enter: function() { widget.picked = true; }};
      this.completion.cm.addKeyMap(this.keyMap);
    },

    pick: function() {
      this.completion.pick(this.data, this.selectedHint);
    },

    changeActive: function(i, avoidWrap) {
      if (i >= this.data.list.length)
        i = avoidWrap ? this.data.list.length - 1 : 0;
      else if (i < 0)
        i = avoidWrap ? 0  : this.data.list.length - 1;
      if (this.selectedHint == i) return;
      var node = this.hints.childNodes[this.selectedHint];
      node.className = node.className.replace(" " + ACTIVE_HINT_ELEMENT_CLASS, "");
      node = this.hints.childNodes[this.selectedHint = i];
      node.className += " " + ACTIVE_HINT_ELEMENT_CLASS;
      if (node.offsetTop < this.hints.scrollTop)
        this.hints.scrollTop = node.offsetTop - 3;
      else if (node.offsetTop + node.offsetHeight > this.hints.scrollTop + this.hints.clientHeight)
        this.hints.scrollTop = node.offsetTop + node.offsetHeight - this.hints.clientHeight + 3;
      CodeMirror.signal(this.data, "select", this.data.list[this.selectedHint], node);
    },

    screenAmount: function() {
      return Math.floor(this.hints.clientHeight / this.hints.firstChild.offsetHeight) || 1;
    }
  };

  function applicableHelpers(cm, helpers) {
    if (!cm.somethingSelected()) return helpers
    var result = []
    for (var i = 0; i < helpers.length; i++)
      if (helpers[i].supportsSelection) result.push(helpers[i])
    return result
  }

  function fetchHints(hint, cm, options, callback) {
    if (hint.async) {
      hint(cm, callback, options)
    } else {
      var result = hint(cm, options)
      if (result && result.then) result.then(callback)
      else callback(result)
    }
  }

  function resolveAutoHints(cm, pos) {
    var helpers = cm.getHelpers(pos, "hint"), words
    if (helpers.length) {
      var resolved = function(cm, callback, options) {
        var app = applicableHelpers(cm, helpers);
        function run(i) {
          if (i == app.length) return callback(null)
          fetchHints(app[i], cm, options, function(result) {
            if (result && result.list.length > 0) callback(result)
            else run(i + 1)
          })
        }
        run(0)
      }
      resolved.async = true
      resolved.supportsSelection = true
      return resolved
    } else if (words = cm.getHelper(cm.getCursor(), "hintWords")) {
      return function(cm) { return CodeMirror.hint.fromList(cm, {words: words}) }
    } else if (CodeMirror.hint.anyword) {
      return function(cm, options) { return CodeMirror.hint.anyword(cm, options) }
    } else {
      return function() {}
    }
  }

  CodeMirror.registerHelper("hint", "auto", {
    resolve: resolveAutoHints
  });

  CodeMirror.registerHelper("hint", "fromList", function(cm, options) {
    var cur = cm.getCursor(), token = cm.getTokenAt(cur);
    var to = CodeMirror.Pos(cur.line, token.end);
    if (token.string && /\w/.test(token.string[token.string.length - 1])) {
      var term = token.string, from = CodeMirror.Pos(cur.line, token.start);
    } else {
      var term = "", from = to;
    }
    var found = [];
    for (var i = 0; i < options.words.length; i++) {
      var word = options.words[i];
      if (word.slice(0, term.length) == term)
        found.push(word);
    }

    if (found.length) return {list: found, from: from, to: to};
  });

  CodeMirror.commands.autocomplete = CodeMirror.showHint;

  var defaultOptions = {
    hint: CodeMirror.hint.auto,
    completeSingle: true,
    alignWithWord: true,
    closeCharacters: /[\s()\[\]{};:>,]/,
    closeOnUnfocus: true,
    completeOnSingleClick: true,
    container: null,
    customKeys: null,
    extraKeys: null
  };

  CodeMirror.defineOption("hintOptions", null);
});

define('text!about.html', ['module'], function(module) { module.exports = ""; });
define('text!styles/app.css', ['module'], function(module) { module.exports = "html {\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n}\nbody {\n  margin: 0;\n  font-size: 16px;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n}\nh1,\nh2,\nh3,\nh4,\np,\nblockquote,\nfigure,\nol,\nul {\n  margin: 0;\n  padding: 0;\n}\nmain,\nli {\n  display: block;\n}\nh1,\nh2,\nh3,\nh4 {\n  font-size: inherit;\n}\nstrong {\n  font-weight: bold;\n}\na,\nbutton {\n  color: inherit;\n  -webkit-transition: 0.3s;\n  transition: 0.3s;\n}\na {\n  text-decoration: none;\n}\nbutton {\n  overflow: visible;\n  border: 0;\n  font: inherit;\n  -webkit-font-smoothing: inherit;\n  letter-spacing: inherit;\n  background: none;\n  cursor: pointer;\n}\n-moz-focus-inner {\n  padding: 0;\n  border: 0;\n}\nfocus {\n  outline: 0px solid transparent;\n}\n:focus {\n  outline: 0px solid transparent;\n}\nimg {\n  max-width: 100%;\n  height: auto;\n  border: 0;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ninput,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  font-family: inherit;\n}\n[contentEditable=true]:empty:not(:focus):before {\n  content: attr(placeholder);\n}\nhtml {\n  font-family: 'Space Mono', Menlo, Monaco, Consolas, \"Courier New\", monospace;\n  font-weight: 300;\n  color: #3a3c83;\n  font-size: 16px;\n  line-height: 1.75em;\n}\n@media (min-width: 600px) {\n  html {\n    font-size: calc( 16px + (32 - 16) * ((100vw - 600px) / (1200 - 600)) );\n  }\n}\n@media (min-width: 1200px) {\n  html {\n    font-size: 32px;\n  }\n}\np,\nblockquote,\npre,\naddress,\ndl,\nol,\nul,\ntable {\n  margin-bottom: 1.75em;\n}\nh1,\nh2,\nh3,\nh4,\nh5 {\n  font-family: 'Space Mono', Menlo, Monaco, Consolas, \"Courier New\", monospace;\n  font-weight: 500;\n  color: #3a3c83;\n  clear: both;\n}\nh1 {\n  font-size: 37.13918660312081px;\n  margin-top: 0;\n  line-height: 1.1em;\n  margin-bottom: 0.25em;\n}\n@media (min-width: 600px) {\n  h1 {\n    font-size: calc( 37.13918660312081px + (74.27837320624162 - 37.13918660312081) * ((100vw - 600px) / (1200 - 600)) );\n  }\n}\n@media (min-width: 1200px) {\n  h1 {\n    font-size: 74.27837320624162px;\n  }\n}\nh2 {\n  font-size: 31.382671211473443px;\n  margin-top: 0;\n  line-height: 1.2em;\n  margin-bottom: 0.25em;\n}\n@media (min-width: 600px) {\n  h2 {\n    font-size: calc( 31.382671211473443px + (62.76534242294689 - 31.382671211473443) * ((100vw - 600px) / (1200 - 600)) );\n  }\n}\n@media (min-width: 1200px) {\n  h2 {\n    font-size: 62.76534242294689px;\n  }\n}\nh3 {\n  font-size: 26.518406633189034px;\n  margin-top: 0;\n  line-height: 1.3em;\n  margin-bottom: 0.25em;\n}\n@media (min-width: 600px) {\n  h3 {\n    font-size: calc( 26.518406633189034px + (53.03681326637807 - 26.518406633189034) * ((100vw - 600px) / (1200 - 600)) );\n  }\n}\n@media (min-width: 1200px) {\n  h3 {\n    font-size: 53.03681326637807px;\n  }\n}\nh4 {\n  font-size: 22.408095398395087px;\n  margin-top: 0;\n  line-height: 1.4em;\n  margin-bottom: 0.25em;\n}\n@media (min-width: 600px) {\n  h4 {\n    font-size: calc( 22.408095398395087px + (44.816190796790174 - 22.408095398395087) * ((100vw - 600px) / (1200 - 600)) );\n  }\n}\n@media (min-width: 1200px) {\n  h4 {\n    font-size: 44.816190796790174px;\n  }\n}\nh5 {\n  font-size: 18.934875927090765px;\n  margin-top: 0;\n  line-height: 1.5em;\n  margin-bottom: 0.25em;\n}\n@media (min-width: 600px) {\n  h5 {\n    font-size: calc( 18.934875927090765px + (37.86975185418153 - 18.934875927090765) * ((100vw - 600px) / (1200 - 600)) );\n  }\n}\n@media (min-width: 1200px) {\n  h5 {\n    font-size: 37.86975185418153px;\n  }\n}\nh6 {\n  font-size: 16px;\n  margin-top: 0;\n  line-height: 1.6em;\n  margin-bottom: 0.25em;\n}\n@media (min-width: 600px) {\n  h6 {\n    font-size: calc( 16px + (32 - 16) * ((100vw - 600px) / (1200 - 600)) );\n  }\n}\n@media (min-width: 1200px) {\n  h6 {\n    font-size: 32px;\n  }\n}\na {\n  color: #3a3c83;\n  text-decoration: underline;\n}\na:hover {\n  color: #ff0070;\n}\n/*doc\n---\ntitle: Cetered Container\nname: container\ncategory:\n  - Structure\n---\n\nDescription.\n\n```html_example\n<section class=\"container\">This is a centered container block</section>\n```\n*/\n.container {\n  width: auto;\n  max-width: 70em;\n  float: none;\n  display: block;\n  margin-right: auto;\n  margin-left: auto;\n  padding-left: 1rem;\n  padding-right: 1rem;\n  float: left;\n  clear: none;\n  text-align: inherit;\n  width: 100%;\n  margin-left: 0%;\n  margin-right: 3%;\n}\n.container::after {\n  content: '';\n  display: table;\n  clear: both;\n}\n.container::after {\n  content: '';\n  display: table;\n  clear: both;\n}\n.container:last-child {\n  margin-right: 0%;\n}\n/*doc\n---\ntitle: Main button\nname: button\ncategory:\n  - Elements\n---\n\nDescription.\n\n```html_example\n<button>Main</button>\n```\n*/\nbutton {\n  padding: 0 0.5em;\n  height: 2em;\n  line-height: 1em;\n  background-color: #ff0070;\n  font-weight: bold;\n  color: #fff;\n}\nbutton:hover {\n  background-color: #ff4d9b;\n}\n"; });
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./styles/app.css\"></require>\n  <require from=\"./styles/nav.css\"></require>\n  <require from=\"./resources/elements/scramble\"></require>\n  <nav class=\"navbar\" role=\"navigation\">\n    <ul class=\"nav-list\">\n      <li><a href=\"#/about\"><scramble text=\"About\" duration=\"400\"></scramble></a></li>\n      <li><a href=\"#\"><scramble text=\"Norm\" duration=\"400\"></scramble></a></li>\n      <li><a href=\"#/editor\"><scramble text=\"Editor\" duration=\"400\"></scramble></a></li>\n    </ul>\n  </nav>\n  <router-view></router-view>\n</template>\n"; });
define('text!styles/autocomplete.css', ['module'], function(module) { module.exports = "autocomplete {\n  display: inline-block;\n}\nautocomplete input {\n  width: 100%;\n  box-sizing: border-box;\n  border: none;\n  color: #3a3c83;\n}\nautocomplete input::-webkit-input-placeholder {\n  color: #bcbde1;\n  margin-left: 0.2em;\n}\nautocomplete input::-moz-placeholder {\n  color: #bcbde1;\n  margin-left: 0.2em;\n}\nautocomplete input:-ms-input-placeholder {\n  color: #bcbde1;\n  margin-left: 0.2em;\n}\nautocomplete input::placeholder {\n  color: #bcbde1;\n  margin-left: 0.2em;\n}\nautocomplete .suggestions {\n  list-style-type: none;\n  cursor: default;\n  padding: 0 2rem 0 0;\n  margin: 0;\n  border: none;\n  background: #fff;\n  position: absolute;\n  z-index: 9999;\n  max-height: 15rem;\n  overflow: hidden;\n  overflow-y: auto;\n  box-sizing: border-box;\n  color: #3a3c83;\n}\nautocomplete .suggestion {\n  padding: 0 0.3rem;\n  line-height: 1.5rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\nautocomplete .suggestionhover,\nautocomplete .suggestion.selected {\n  color: #ff0070;\n}\n"; });
define('text!home.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./resources/elements/scramble\"></require>\n  <require from=\"./styles/home.css\"></require>\n  <main id=\"home\">\n    <header class=\"container\">\n      <h1>Norm is a modular text-suggestion system.</h1>\n    </header>\n    <section class=\"container\">\n      <p><scramble repeat.for=\"msg of msgArray\" text.bind=\"msg\" duration=\"45\"/></scramble></p>\n      <button type=\"button\" click.delegate=\"getWords()\">Refresh words</button>\n      <ul>\n        <li repeat.for=\"word of words\"><scramble text.bind=\"word\" duration=\"400\"></scramble></li>\n      </ul>\n    </section>\n  </main>\n</template>"; });
define('text!styles/base.css', ['module'], function(module) { module.exports = "/* \n  http://jaydenseric.com/blog/forget-normalize-or-resets-lay-your-own-css-foundation\n*/\nhtml {\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n}\nbody {\n  margin: 0;\n  font-size: 16px;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n}\nh1,\nh2,\nh3,\nh4,\np,\nblockquote,\nfigure,\nol,\nul {\n  margin: 0;\n  padding: 0;\n}\nmain,\nli {\n  display: block;\n}\nh1,\nh2,\nh3,\nh4 {\n  font-size: inherit;\n}\nstrong {\n  font-weight: bold;\n}\na,\nbutton {\n  color: inherit;\n  -webkit-transition: 0.3s;\n  transition: 0.3s;\n}\na {\n  text-decoration: none;\n}\nbutton {\n  overflow: visible;\n  border: 0;\n  font: inherit;\n  -webkit-font-smoothing: inherit;\n  letter-spacing: inherit;\n  background: none;\n  cursor: pointer;\n}\n-moz-focus-inner {\n  padding: 0;\n  border: 0;\n}\nfocus {\n  outline: 0px solid transparent;\n}\n:focus {\n  outline: 0px solid transparent;\n}\nimg {\n  max-width: 100%;\n  height: auto;\n  border: 0;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ninput,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  font-family: inherit;\n}\n[contentEditable=true]:empty:not(:focus):before {\n  content: attr(placeholder);\n}\n"; });
define('text!text-editor.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"resources/elements/autocomplete\"></require>\n  <require from=\"resources/elements/editor\"></require>\n  <require from=\"styles/text-editor.css\"></require>\n  <main id=\"text-editor\">\n  <section class=\"text-editor-container\">\n    <div class=\"text-editor-title\">\n      <h5 contenteditable=\"true\" placeholder=\"Title\" ref=\"editorTitle\"></h5>\n    </div>\n    <label class=\"text-editor-avatar\">\n      <autocomplete dely=\"300\" placeholder=\"Beyonce\" value.bind=\"avatar\" service.bind=\"avatarNameService\"></autocomplete>\n    </label>\n  </section>\n  <section class=\"text-editor-container\">\n    <editor placeholder='You are typeing as...'></editor>\n  </section>\n</template>"; });
define('text!styles/editor.css', ['module'], function(module) { module.exports = "/* BASICS */\n.CodeMirror {\n  font-family: inherit;\n  color: #3a3c83;\n  font-size: 1em;\n  line-height: 1.43em;\n}\n.CodeMirror .CodeMirror-placeholder {\n  color: #bcbde1;\n}\n.CodeMirror .CodeMirror-cursor {\n  border-left: none;\n  border-right: 2px solid #3a3c83;\n  width: 0;\n}\n.CodeMirror .cm-header {\n  color: #3a3c83;\n}\n.CodeMirror .cm-quote {\n  color: #8586c9;\n}\n.CodeMirror .cm-negative {\n  color: #f00;\n}\n.CodeMirror .cm-positive {\n  color: #008080;\n}\n.CodeMirror .cm-header,\n.CodeMirror .cm-strong {\n  font-weight: bold;\n}\n.CodeMirror .cm-em {\n  font-style: italic;\n}\n.CodeMirror .cm-link {\n  text-decoration: underline;\n}\n.CodeMirror .cm-strikethrough {\n  text-decoration: line-through;\n}\n.CodeMirror .cm-keyword {\n  color: #ff0070;\n}\n.CodeMirror .cm-s-default .cm-atom {\n  color: #219;\n}\n.CodeMirror .cm-s-default .cm-number {\n  color: #164;\n}\n.CodeMirror .cm-s-default .cm-def {\n  color: #00f;\n}\n.CodeMirror .cm-variable,\n.CodeMirror .cm-punctuation,\n.CodeMirror .cm-property,\n.CodeMirror .cm-operator,\n.CodeMirror .cm-variable-2,\n.CodeMirror color $primary,\n.CodeMirror .cm-s-default .cm-variable-3 {\n  color: #085;\n}\n.CodeMirror .cm-comment {\n  color: #8586c9;\n}\n.CodeMirror .cm-s-default .cm-string {\n  color: #a11;\n}\n.CodeMirror .cm-s-default .cm-string-2 {\n  color: #f50;\n}\n.CodeMirror .cm-s-default .cm-meta {\n  color: #555;\n}\n.CodeMirror .cm-s-default .cm-qualifier {\n  color: #555;\n}\n.CodeMirror .cm-s-default .cm-builtin {\n  color: #30a;\n}\n.CodeMirror .cm-s-default .cm-bracket {\n  color: #997;\n}\n.CodeMirror .cm-s-default .cm-tag {\n  color: #bcbde1;\n}\n.CodeMirror .cm-s-default .cm-attribute {\n  color: #00c;\n}\n.CodeMirror .cm-s-default .cm-hr {\n  color: #999;\n}\n.CodeMirror .cm-link {\n  color: #ff0070;\n}\n.CodeMirror .cm-error {\n  color: #f00;\n}\n.CodeMirror .cm-invalidchar {\n  color: #f00;\n}\n.CodeMirror .CodeMirror-composing {\n  border-bottom: 2px solid;\n/* PADDING */\n}\n.CodeMirror .CodeMirror-lines {\n  padding: 4px 0 /* Vertical padding around content */;\n}\n.CodeMirror .CodeMirror pre {\n  padding: 0 4px /* Horizontal padding of content */;\n}\n.CodeMirror .CodeMirror-scrollbar-filler,\n.CodeMirror .CodeMirror-gutter-filler {\n  background-color: #fff /* The little square between H and V scrollbars */;\n}\n.CodeMirror .CodeMirror-guttermarker {\n  color: #000;\n}\n.CodeMirror .CodeMirror-guttermarker-subtle {\n  color: #999;\n}\n"; });
define('text!resources/elements/autocomplete.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../../styles/autocomplete.css\"></require>\n  <input type=\"text\" autocomplete=\"off\"\n         aria-autocomplete=\"list\"\n         aria-expanded.bind=\"expanded\"\n         aria-owns.one-time=\"'au-autocomplate-' + id + '-suggestions'\"\n         aria-activedescendant.bind=\"index >= 0 ? 'au-autocomplate-' + id + '-suggestion-' + index : ''\"\n         id.one-time=\"'au-autocomplete-' + id\"\n         placeholder.bind=\"placeholder\"\n         value.bind=\"inputValue & debounce:delay\"\n         keydown.delegate=\"keydown($event.which)\"\n         blur.trigger=\"blur()\"\n         ref=\"acinput\"\n         >\n  <ul class=\"suggestions\" role=\"listbox\"\n      if.bind=\"expanded\"\n      id.one-time=\"'au-autocomplate-' + id + '-suggestions'\"\n      style=\"width: ${acinput.offsetWidth}px\"\n      ref=\"suggestionsUL\">\n    <li repeat.for=\"suggestion of suggestions\" \n        id.one-time=\"'au-autocomplate-' + id + '-suggestion-' + $index\"\n        role=\"option\"\n        class-name.bind=\"($index === index ? 'selected' : '') + ' suggestion'\"\n        mousedown.delegate=\"suggestionClicked(suggestion)\">\n      <template replaceable part=\"suggestion\">\n        ${suggestion}\n      </template>\n    </li>\n  </ul>\n</template>"; });
define('text!styles/home.css', ['module'], function(module) { module.exports = "#home header {\n  margin: 1rem 0;\n}\n"; });
define('text!resources/elements/editor.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"codemirror/lib/codemirror.css\"></require>\n  <require from=\"codemirror/addon/hint/show-hint.css\"></require>\n  <require from=\"../../styles/editor.css\"></require>\n  <textarea class=\"cm-editor\" ref=\"cmTextarea\"></textarea>\n</template>"; });
define('text!styles/nav.css', ['module'], function(module) { module.exports = "nav {\n  width: auto;\n  max-width: 60em;\n  float: none;\n  display: block;\n  margin-right: auto;\n  margin-left: auto;\n  padding-left: 0;\n  padding-right: 0;\n}\nnav::after {\n  content: '';\n  display: table;\n  clear: both;\n}\nnav ul.nav-list {\n  list-style-type: none;\n}\nnav ul.nav-list li {\n  float: left;\n  clear: none;\n  text-align: inherit;\n  width: 31.33333333333333%;\n  margin-left: 0%;\n  margin-right: 3%;\n  display: inline-block;\n}\nnav ul.nav-list li::after {\n  content: '';\n  display: table;\n  clear: both;\n}\nnav ul.nav-list li:last-child {\n  margin-right: 0%;\n}\nnav ul.nav-list li a {\n  display: block;\n  text-align: center;\n  font-size: 14.201156945318074px;\n  margin-top: 1.84844094752817em;\n  line-height: 2.218129137033805em;\n  margin-bottom: 0.369688189505634em;\n  padding-top: 0;\n  margin-top: 0 !important;\n}\n@media (min-width: 600px) {\n  nav ul.nav-list li a {\n    font-size: calc( 14.201156945318074px + (23.668594908863454 - 14.201156945318074) * ((100vw - 600px) / (1140 - 600)) );\n  }\n}\n@media (min-width: 1140px) {\n  nav ul.nav-list li a {\n    font-size: 23.668594908863454px;\n    margin-top: 1.84844094752817em;\n    line-height: 2.218129137033805em;\n    margin-bottom: 0.369688189505634em;\n  }\n}\n"; });
define('text!resources/elements/scramble.html', ['module'], function(module) { module.exports = "<template><span innerHtml.bind=\"targetText\"></span></template>"; });
define('text!styles/text-editor.css', ['module'], function(module) { module.exports = "#text-editor {\n  margin-top: 1rem;\n}\n.text-editor-container {\n  width: auto;\n  max-width: 60em;\n  float: none;\n  display: block;\n  margin-right: auto;\n  margin-left: auto;\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n.text-editor-container::after {\n  content: '';\n  display: table;\n  clear: both;\n}\n.text-editor-title {\n  float: left;\n  clear: none;\n  text-align: inherit;\n  width: 65.66666666666666%;\n  margin-left: 0%;\n  margin-right: 3%;\n}\n.text-editor-title::after {\n  content: '';\n  display: table;\n  clear: both;\n}\n.text-editor-title:last-child {\n  margin-right: 0%;\n}\n.text-editor-title h5 {\n  border: none;\n  font-weight: bold;\n}\n.text-editor-title h5::before {\n  color: #bcbde1;\n}\n.text-editor-avatar {\n  float: left;\n  clear: none;\n  text-align: inherit;\n  width: 31.33333333333333%;\n  margin-left: 0%;\n  margin-right: 3%;\n}\n.text-editor-avatar::after {\n  content: '';\n  display: table;\n  clear: both;\n}\n.text-editor-avatar:last-child {\n  margin-right: 0%;\n}\n.text-editor-avatar autocomplete {\n  width: 100%;\n  display: block;\n}\n.text-editor-avatar autocomplete input {\n  font-size: 1em;\n  border-right: 1px solid #3a3c83;\n  border-left: 1px solid #3a3c83;\n  padding: 0 0.2em;\n  height: 1.4em;\n}\n"; });
define('text!resources/elements/suggestions.html', ['module'], function(module) { module.exports = "<template>\n  <h1>${value}</h1>\n</template>"; });
define('text!styles/typography.css', ['module'], function(module) { module.exports = "html {\n  font-family: 'Space Mono', Menlo, Monaco, Consolas, \"Courier New\", monospace;\n  font-weight: 300;\n  color: #3a3c83;\n  font-size: 16px;\n  line-height: 1.75em;\n}\n@media (min-width: 600px) {\n  html {\n    font-size: calc( 16px + (32 - 16) * ((100vw - 600px) / (1200 - 600)) );\n  }\n}\n@media (min-width: 1200px) {\n  html {\n    font-size: 32px;\n  }\n}\np,\nblockquote,\npre,\naddress,\ndl,\nol,\nul,\ntable {\n  margin-bottom: 1.75em;\n}\nh1,\nh2,\nh3,\nh4,\nh5 {\n  font-family: 'Space Mono', Menlo, Monaco, Consolas, \"Courier New\", monospace;\n  font-weight: 500;\n  color: #3a3c83;\n  clear: both;\n}\nh1 {\n  font-size: 37.13918660312081px;\n  margin-top: 0;\n  line-height: 1.1em;\n  margin-bottom: 0.25em;\n}\n@media (min-width: 600px) {\n  h1 {\n    font-size: calc( 37.13918660312081px + (74.27837320624162 - 37.13918660312081) * ((100vw - 600px) / (1200 - 600)) );\n  }\n}\n@media (min-width: 1200px) {\n  h1 {\n    font-size: 74.27837320624162px;\n  }\n}\nh2 {\n  font-size: 31.382671211473443px;\n  margin-top: 0;\n  line-height: 1.2em;\n  margin-bottom: 0.25em;\n}\n@media (min-width: 600px) {\n  h2 {\n    font-size: calc( 31.382671211473443px + (62.76534242294689 - 31.382671211473443) * ((100vw - 600px) / (1200 - 600)) );\n  }\n}\n@media (min-width: 1200px) {\n  h2 {\n    font-size: 62.76534242294689px;\n  }\n}\nh3 {\n  font-size: 26.518406633189034px;\n  margin-top: 0;\n  line-height: 1.3em;\n  margin-bottom: 0.25em;\n}\n@media (min-width: 600px) {\n  h3 {\n    font-size: calc( 26.518406633189034px + (53.03681326637807 - 26.518406633189034) * ((100vw - 600px) / (1200 - 600)) );\n  }\n}\n@media (min-width: 1200px) {\n  h3 {\n    font-size: 53.03681326637807px;\n  }\n}\nh4 {\n  font-size: 22.408095398395087px;\n  margin-top: 0;\n  line-height: 1.4em;\n  margin-bottom: 0.25em;\n}\n@media (min-width: 600px) {\n  h4 {\n    font-size: calc( 22.408095398395087px + (44.816190796790174 - 22.408095398395087) * ((100vw - 600px) / (1200 - 600)) );\n  }\n}\n@media (min-width: 1200px) {\n  h4 {\n    font-size: 44.816190796790174px;\n  }\n}\nh5 {\n  font-size: 18.934875927090765px;\n  margin-top: 0;\n  line-height: 1.5em;\n  margin-bottom: 0.25em;\n}\n@media (min-width: 600px) {\n  h5 {\n    font-size: calc( 18.934875927090765px + (37.86975185418153 - 18.934875927090765) * ((100vw - 600px) / (1200 - 600)) );\n  }\n}\n@media (min-width: 1200px) {\n  h5 {\n    font-size: 37.86975185418153px;\n  }\n}\nh6 {\n  font-size: 16px;\n  margin-top: 0;\n  line-height: 1.6em;\n  margin-bottom: 0.25em;\n}\n@media (min-width: 600px) {\n  h6 {\n    font-size: calc( 16px + (32 - 16) * ((100vw - 600px) / (1200 - 600)) );\n  }\n}\n@media (min-width: 1200px) {\n  h6 {\n    font-size: 32px;\n  }\n}\n"; });
define('text!styles/variables.css', ['module'], function(module) { module.exports = ""; });
//# sourceMappingURL=app-bundle.js.map