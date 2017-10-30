(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["H5AudioControls"] = factory();
	else
		root["H5AudioControls"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__audio_scss__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__audio_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__audio_scss__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



/**
 * H5AudioControls
 * @param audioSrc
 * @param context default: body
 * @param position 'left-top'|'top-right'(default)|'right-bottom'|'left-bottom'
 *
 * Property:
 * audioSrc
 * config: {
 *   context
 *   position
 * }
 * audioElement: {
 *   audioButton
 *   audio
 *   audioPic
 * }
 *
 * Function:
 * load
 * play
 * pause
 * isPlaying
 * _runAutoPlay
 * _changeUI
 * _changeUIToPlay
 * _changeUIToPause
 */

var H5AudioControls = function () {
  function H5AudioControls(audioSrc) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$context = _ref.context,
        context = _ref$context === undefined ? document.body : _ref$context,
        _ref$position = _ref.position,
        position = _ref$position === undefined ? 'top-right' : _ref$position;

    _classCallCheck(this, H5AudioControls);

    this.config = {
      context: isString(context) ? document.querySelector(context) : context,
      position: position
    };

    this.config.context.style.position = 'relative';
    this.audioSrc = audioSrc;

    this.audioElement = {
      audioButton: document.createElement('a'),
      audio: null,
      audioPic: null
    };
  }

  H5AudioControls.prototype.load = function load() {
    var _this = this;

    return new Promise(function (resolve) {
      _this.audioElement.audioButton.href = 'javascript:;';
      _this.audioElement.audioButton.classList.add(__WEBPACK_IMPORTED_MODULE_0__audio_scss___default.a.musicControlWrapper, _this.config.position);

      _this.audioElement.audioButton.innerHTML = '\n        <span class=' + __WEBPACK_IMPORTED_MODULE_0__audio_scss___default.a.musicControl + ' ' + __WEBPACK_IMPORTED_MODULE_0__audio_scss___default.a.play + '>\n          <audio style="display: none;" loop preload controls>\n            <source src=' + _this.audioSrc + ' type="audio/mpeg">\n          </audio>\n        </span>\n      ';

      _this.config.context.appendChild(_this.audioElement.audioButton);

      _this.audioElement.audioPic = _this.audioElement.audioButton.querySelector('.' + __WEBPACK_IMPORTED_MODULE_0__audio_scss___default.a.musicControl);
      _this.audioElement.audio = _this.audioElement.audioPic.querySelector('audio');

      _this._runAutoPlay();
      _this.eventBind();

      setTimeout(function () {
        return resolve();
      }, 0);
    });
  };

  H5AudioControls.prototype.eventBind = function eventBind() {
    var _this2 = this;

    this.audioElement.audioButton.addEventListener('click', function (e) {
      e.stopPropagation();

      if (_this2.audioElement.audioPic.classList.contains(__WEBPACK_IMPORTED_MODULE_0__audio_scss___default.a.play)) {
        // 正在播放
        _this2.pause();
      } else {
        // 暂停中
        _this2.play();
      }
    });
  };

  H5AudioControls.prototype._runAutoPlay = function _runAutoPlay() {
    var _this3 = this;

    this.play();
    document.addEventListener("WeixinJSBridgeReady", function () {
      _this3.play();
    }, false);
    document.addEventListener('YixinJSBridgeReady', function () {
      _this3.play();
    }, false);
  };

  H5AudioControls.prototype.play = function play() {
    var _this4 = this;

    this.audioElement.audio.play();
    setTimeout(function () {
      return _this4._changeUI();
    }, 0);
  };

  H5AudioControls.prototype.pause = function pause() {
    var _this5 = this;

    this.audioElement.audio.pause();
    setTimeout(function () {
      return _this5._changeUI();
    }, 0);
  };

  H5AudioControls.prototype._changeUIToPlay = function _changeUIToPlay() {
    this.audioElement.audioPic.classList.remove(__WEBPACK_IMPORTED_MODULE_0__audio_scss___default.a.pause);
    this.audioElement.audioPic.classList.add(__WEBPACK_IMPORTED_MODULE_0__audio_scss___default.a.play);
  };

  H5AudioControls.prototype._changeUIToPause = function _changeUIToPause() {
    this.audioElement.audioPic.classList.remove(__WEBPACK_IMPORTED_MODULE_0__audio_scss___default.a.play);
    this.audioElement.audioPic.classList.add(__WEBPACK_IMPORTED_MODULE_0__audio_scss___default.a.pause);
  };

  H5AudioControls.prototype._changeUI = function _changeUI() {
    if (this.isPlaying()) {
      this._changeUIToPlay();
    } else {
      this._changeUIToPause();
    }
  };

  H5AudioControls.prototype.isPlaying = function isPlaying() {
    return !this.audioElement.audio.paused;
  };

  return H5AudioControls;
}();

/* harmony default export */ __webpack_exports__["default"] = (H5AudioControls);
;

// private
var isString = function isString(str) {
  return typeof str === 'string' && str.constructor === String;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js??ref--1-1!../node_modules/sass-loader/lib/loader.js??ref--1-2!./audio.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js??ref--1-1!../node_modules/sass-loader/lib/loader.js??ref--1-2!./audio.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, ".src-audio__musicControlWrapper {\n  position: absolute;\n  z-index: 999;\n  width: 15vw;\n  height: 15vw;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.src-audio__musicControlWrapper.left-top {\n  left: 0;\n  top: 0;\n}\n\n.src-audio__musicControlWrapper.top-right {\n  top: 0;\n  right: 0;\n}\n\n.src-audio__musicControlWrapper.right-bottom {\n  right: 0;\n  bottom: 0;\n}\n\n.src-audio__musicControlWrapper.left-bottom {\n  left: 0;\n  bottom: 0;\n}\n\n@keyframes src-audio__reverseRotataZ {\n  from {\n    transform: rotateZ(0deg);\n  }\n  to {\n    transform: rotateZ(-360deg);\n  }\n}\n\n.src-audio__musicControl {\n  display: block;\n  width: 9vw;\n  height: 9vw;\n}\n\n.src-audio__musicControl.src-audio__play {\n  background: url(" + __webpack_require__(4) + ") no-repeat;\n  background-size: 100% 100%;\n  animation: src-audio__reverseRotataZ 2s linear infinite;\n}\n\n.src-audio__musicControl.src-audio__pause {\n  background: url(" + __webpack_require__(5) + ") no-repeat;\n  background-size: 100% 100%;\n}\n", ""]);

// exports
exports.locals = {
	"musicControlWrapper": "src-audio__musicControlWrapper",
	"musicControl": "src-audio__musicControl",
	"play": "src-audio__play",
	"reverseRotataZ": "src-audio__reverseRotataZ",
	"pause": "src-audio__pause"
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNjQgNjQiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe29wYWNpdHk6MC4yO2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO30NCgkuc3Qxe2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6I0ZGRkZGRjt9DQo8L3N0eWxlPg0KPGc+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTMyLDIuOEMxNS45LDIuOCwyLjgsMTUuOSwyLjgsMzJTMTUuOSw2MS4yLDMyLDYxLjJTNjEuMiw0OC4xLDYxLjIsMzJTNDguMSwyLjgsMzIsMi44TDMyLDIuOHoiLz4NCgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMzIsMEMxNC4zLDAsMCwxNC4zLDAsMzJzMTQuMywzMiwzMiwzMnMzMi0xNC4zLDMyLTMyUzQ5LjcsMCwzMiwweiBNMzIsNjEuMkMxNS45LDYxLjIsMi44LDQ4LjEsMi44LDMyDQoJCVMxNS45LDIuOCwzMiwyLjhTNjEuMiwxNS45LDYxLjIsMzJTNDguMSw2MS4yLDMyLDYxLjJ6Ii8+DQoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTMwLjMsMTEuMmwtMi4xLDAuNkwzNi4xLDM5Yy01LjYtMC44LTEwLjUsNC0xMC4xLDguN2MwLjEsMS42LDEuMywyLjksMiwzLjVjNCwzLjQsOS40LTAuMiwxMS4zLTUuNw0KCQljMC44LTIuMywwLjQtNC0wLjgtOC4xbC00LjktMTYuOWMyLjUtMC44LDcuNywxLDkuNCwzLjVjMS4xLDEuNiwxLjgsMy45LDEuNCw1LjhjLTAuMSwwLjUtMC40LDIsMCwxLjdjMC43LTAuNiwwLjktMS4yLDEuMy0yLjQNCgkJYzAuMy0xLjEsMC40LTIuNywwLjMtMy43QzQ0LjQsMTUuNCwzMy4zLDE4LjMsMzAuMywxMS4yTDMwLjMsMTEuMnoiLz4NCjwvZz4NCjwvc3ZnPg0K"

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Ig0KICAgICB2aWV3Qm94PSIwIDAgNjQgNjQiPg0KICA8c3R5bGUgdHlwZT0idGV4dC9jc3MiPg0KICAgIC5zdDB7b3BhY2l0eTowLjI7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7fQ0KICAgIC5zdDF7ZmlsbDojRkZGRkZGO30NCiAgICAuc3Qye2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6I0ZGRkZGRjt9DQogIDwvc3R5bGU+DQogIDxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zMiwyLjhDMTUuOSwyLjgsMi44LDE1LjksMi44LDMyUzE1LjksNjEuMiwzMiw2MS4yUzYxLjIsNDguMSw2MS4yLDMyUzQ4LjEsMi44LDMyLDIuOEwzMiwyLjh6Ii8+DQogIDxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zMiwwQzE0LjMsMCwwLDE0LjMsMCwzMnMxNC4zLDMyLDMyLDMyczMyLTE0LjMsMzItMzJTNDkuNywwLDMyLDB6IE0yLjgsMzJDMi44LDE1LjksMTUuOSwyLjgsMzIsMi44DQoJYzcuNywwLDE0LjYsMywxOS45LDcuOEwxMC42LDUxLjlDNS43LDQ2LjYsMi44LDM5LjcsMi44LDMyeiBNMzIsNjEuMmMtNy43LDAtMTQuNi0zLTE5LjktNy44bDQxLjMtNDEuM2M0LjgsNS4yLDcuOCwxMi4yLDcuOCwxOS45DQoJQzYxLjIsNDguMSw0OC4xLDYxLjIsMzIsNjEuMnoiLz4NCiAgPHBhdGggY2xhc3M9InN0MiIgZD0iTTMwLjMsMTEuMmwtMi4xLDAuNkwzNi4xLDM5Yy01LjYtMC44LTEwLjUsNC0xMC4xLDguN2MwLjEsMS42LDEuMywyLjksMiwzLjVjNCwzLjQsOS40LTAuMiwxMS4zLTUuNw0KCWMwLjgtMi4zLDAuNC00LTAuOC04LjFsLTQuOS0xNi45YzIuNS0wLjgsNy43LDEsOS40LDMuNWMxLjEsMS42LDEuOCwzLjksMS40LDUuOGMtMC4xLDAuNS0wLjQsMiwwLDEuN2MwLjctMC42LDAuOS0xLjIsMS4zLTIuNA0KCWMwLjMtMS4xLDAuNC0yLjcsMC4zLTMuN0M0NC40LDE1LjQsMzMuMywxOC4zLDMwLjMsMTEuMkwzMC4zLDExLjJ6Ii8+DQo8L3N2Zz4NCg=="

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(7);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ])["default"];
});