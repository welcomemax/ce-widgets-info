/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/inject/inject.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js?-url!./node_modules/stylus-loader/index.js?!./src/inject/inject.styl":
/*!******************************************************************************************************!*\
  !*** ./node_modules/css-loader?-url!./node_modules/stylus-loader??ref--5-2!./src/inject/inject.styl ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".elfsight-widget-wrap {\n  position: relative;\n  min-height: 50px;\n  transition: box-shadow 0.3s;\n  box-shadow: 0 0 1px 1px rgba(0,0,0,0.04);\n}\n.elfsight-widget-wrap:hover {\n  box-shadow: 0 0 1px 1px rgba(0,0,0,0.2);\n}\n.elfsight-widget-wrap:hover .elfsight-widget-label {\n  opacity: 1;\n}\n.elfsight-widget-wrap.elfsight-widget-highlight {\n  box-shadow: 0 0 1px 1px #f93262;\n}\n.elfsight-widget-label {\n  position: absolute;\n  right: 20px;\n  bottom: 8px;\n  background: #38393a url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuOWwzfk4AAAEgSURBVChTlZG7SgNREIYXYzBga+PipdHGNKYUQuwF8YZ9SoukCCQEBJ9AkJT7BHmCFRsfwsJytUmwUzTNgnv2HL8ZRxCxycDHzPzzz9mzu5H3/iyEUI0s6Bv07+QCMriBVRuroQdPcAFLmCvkHdguiuKo9P6O+hVatqJLB/BRluWE3GGpZiMN59xQngobJulSHTLEQH6BLuWCjWV+C0mE2KToi0i9Qv0gSxZtdRNc74TZRDaHkJouS+1vrz7pymTRd7myUwODR9PlgDUG038WjumnYojhE/ZsJtoy9DCdmyRaCslPcw3yzddV+BPO+QHL8m82VaBZpBmDfO9LaOR5vsWLHlLLyW+wr+bfgXjK/e/JM3lB8jOMIDaLnj4HIfoCxvRigdqppKQAAAAASUVORK5CYII=\") no-repeat 12px center;\n  color: #fff;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  font-size: 12px;\n  font-weight: normal;\n  letter-spacing: 0.4px;\n  line-height: 1;\n  padding: 4px 12px 4px 32px;\n  border-radius: 2px;\n  cursor: pointer;\n  z-index: 100;\n  opacity: 0.8;\n  margin: 0 !important;\n  transition: background 0.3s, opacity 0.3s;\n}\n.elfsight-widget-label:hover {\n  background-color: #303131;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/// css base code, injected by the css-loader
module.exports=function(useSourceMap){var list=[];// return the list of modules as css string
list.toString=function toString(){return this.map(function(item){var content=cssWithMappingToString(item,useSourceMap);if(item[2]){return"@media "+item[2]+"{"+content+"}";}else{return content;}}).join("");};// import a list of modules into the list
list.i=function(modules,mediaQuery){if(typeof modules==="string")modules=[[null,modules,""]];var alreadyImportedModules={};for(var i=0;i<this.length;i++){var id=this[i][0];if(typeof id==="number")alreadyImportedModules[id]=true;}for(i=0;i<modules.length;i++){var item=modules[i];// skip already imported module
// this implementation is not 100% perfect for weird media query combinations
//  when a module is imported multiple times with different media queries.
//  I hope this will never occur (Hey this way we have smaller bundles)
if(typeof item[0]!=="number"||!alreadyImportedModules[item[0]]){if(mediaQuery&&!item[2]){item[2]=mediaQuery;}else if(mediaQuery){item[2]="("+item[2]+") and ("+mediaQuery+")";}list.push(item);}}};return list;};function cssWithMappingToString(item,useSourceMap){var content=item[1]||'';var cssMapping=item[3];if(!cssMapping){return content;}if(useSourceMap&&typeof btoa==='function'){var sourceMapping=toComment(cssMapping);var sourceURLs=cssMapping.sources.map(function(source){return'/*# sourceURL='+cssMapping.sourceRoot+source+' */';});return[content].concat(sourceURLs).concat([sourceMapping]).join('\n');}return[content].join('\n');}// Adapted from convert-source-map (MIT)
function toComment(sourceMap){// eslint-disable-next-line no-undef
var base64=btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));var data='sourceMappingURL=data:application/json;charset=utf-8;base64,'+base64;return'/*# '+data+' */';}

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
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

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

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
		var nextSibling = getElement(options.insertAt.before, target);
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

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
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

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
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

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
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
 */module.exports=function(css){// get current location
var location=typeof window!=="undefined"&&window.location;if(!location){throw new Error("fixUrls requires window.location");}// blank or null?
if(!css||typeof css!=="string"){return css;}var baseUrl=location.protocol+"//"+location.host;var currentDir=baseUrl+location.pathname.replace(/\/[^\/]*$/,"/");// convert each url(...)
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
	 */var fixedCss=css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(fullMatch,origUrl){// strip quotes (if they exist)
var unquotedOrigUrl=origUrl.trim().replace(/^"(.*)"$/,function(o,$1){return $1;}).replace(/^'(.*)'$/,function(o,$1){return $1;});// already a full url? no change
if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)){return fullMatch;}// convert the url to a full url
var newUrl;if(unquotedOrigUrl.indexOf("//")===0){//TODO: should we add protocol?
newUrl=unquotedOrigUrl;}else if(unquotedOrigUrl.indexOf("/")===0){// path should be relative to the base url
newUrl=baseUrl+unquotedOrigUrl;// already starts with '/'
}else{// path should be relative to current directory
newUrl=currentDir+unquotedOrigUrl.replace(/^\.\//,"");// Strip leading './'
}// send back the fixed url(...)
return"url("+JSON.stringify(newUrl)+")";});// send back the fixed css
return fixedCss;};

/***/ }),

/***/ "./src/inject/inject.js":
/*!******************************!*\
  !*** ./src/inject/inject.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./inject.styl */ "./src/inject/inject.styl");ewiInjectClass=function(){};ewiInjectClass.prototype={debug:true,widgets:[],widgetsCounter:0,eappsRegex:/^elfsight-app-(.*)$/,esappsRegex:/^elfsight-sapp-(.*)$/,optionsRegex:/^elfsight(.*?)Options$/,eappsUrl:'https://apps.elfsight.com/p/boot/?callback=collect',esappsUrl:'https://shy.elfsight.com/p/boot/?callback=collect',widgetsData:[],pageData:{url:'',cms:''},appsData:[],init:function(){let self=this;self.injectScript(chrome.runtime.getURL('dist/content.js'));chrome.storage.sync.get(data=>{self.appsData=data.apps;self.postMessageFactory();self.collectScripts();self.collectWidgets();// @TODO init wrap on popup open
self.wrapWidgets();if(self.debug){self.logWidgetsData();}});},injectScript:function(file_path){let script=document.createElement('script');script.setAttribute('type','text/javascript');script.setAttribute('src',file_path);document.head.appendChild(script);},getDataFromContent:function(data){let self=this;data.forEach(widget=>{let curr_app;self.appsData.forEach(app=>{if(widget.func.indexOf(app.func)+1){curr_app=app;}});self.widgetsData.push({id:this.widgetsCounter++,app_type:'CodeCanyon',app_slug:curr_app.slug,app_name:curr_app.name,settings:widget.settings,$el:document.getElementById(widget.el_id)});});self.wrapWidgets();self.getWidgetsData();},postMessageFactory:function(){let self=this;let factory=function(obj){if(obj&&obj.method){if(obj.data){self[obj.method](obj.data);}else{self[obj.method]();}}};window.addEventListener('message',function(obj){factory(obj.data?obj.data:obj);});chrome.runtime.onConnect.addListener(function(port){window.port=port;port.onMessage.addListener(function(obj){factory(obj);});});},pushWidget:function(data){let curr_app={name:'Unknown',version:{last:'1.0.0',curr:false}};this.appsData.forEach(function(app){app.aliases.forEach(function(alias){if(data.app_name.toLowerCase().indexOf(alias)+1){curr_app=app;}});});if(data.app_name&&curr_app.name==='Unknown'){curr_app.name=data.app_name;}if(data.app_type!=="CodeCanyon"){curr_app.version.curr=curr_app.version.last;}let widgetData={id:this.widgetsCounter++,settings:data.settings,$el:data.$el,app_type:data.app_type,app_slug:curr_app.slug,app_name:curr_app.name,version:curr_app.version};if(data.publicID){widgetData.publicID=data.publicID;}this.widgetsData.push(widgetData);},collectWidgets:function(){let self=this;// @TODO jQuery widgets support
// @TODO Weebly Apps widgets support
// @TODO old Weebly InstaShow widgets support https://elf-test-2.weebly.com/
// @TODO separate spaghetti with methods
let $curr,regMatches,publicID;let $divs=document.getElementsByTagName('div');for(let i=0;i<$divs.length;i++){$curr=$divs[i];/**
             * EAPPS
             */regMatches=$curr.className.match(self.eappsRegex);if(regMatches){publicID=regMatches[1];}if(publicID){self.widgets.push({app_type:'Elfsight Apps',$el:$curr,publicID:publicID});publicID=null;}/**
             * ESAPPS
             */regMatches=$curr.className.match(self.esappsRegex);if(regMatches){publicID=regMatches[1];}if(publicID){self.widgetsData.push({// @TODO change temp widgetsData to widgets
id:self.widgetsCounter++,publicID:publicID,app_type:'Shopify',// shop: Shopify.shop // @TODO wait until Shopify can be accessed
settings:{"widgetData":"currently unavailable for shopify"},// @TODO remove temp
$el:$curr});publicID=null;}self.checkDataAttr($curr);}self.checkTagNames();self.collectWidgetsData();},collectScripts:function(){let self=this;let version=false;let $scripts=document.getElementsByTagName('script');for(let i=0;i<$scripts.length;i++){let $curr=$scripts[i];let src=$curr.getAttribute('src');if(src){self.appsData.forEach(function(app){app.aliases.forEach(function(alias){if(src.indexOf(alias)+1){version=src.split('?ver=')[1];if(version){app.version.curr=version;}else{app.version.curr=self.parseScriptVersion(src);}}});});}}},parseScriptVersion:function(src){let xhr=new XMLHttpRequest();xhr.open('GET',src,false);// @TODO async && fix on localhost
xhr.send();if(xhr.status===200){let versionCopyrightRegex=/version:\s?(.*)/i;let versionCodeRegex=/version:"(.*?)"/;let matches,copyrightVersion,codeVersion;matches=xhr.responseText.match(versionCopyrightRegex);if(matches){copyrightVersion=xhr.responseText.match(versionCopyrightRegex)[1];}matches=xhr.responseText.match(versionCodeRegex);if(matches){codeVersion=xhr.responseText.match(versionCodeRegex)[1];}return copyrightVersion?copyrightVersion:codeVersion;}return false;},/**
     * OLD EAPPS
     */checkTagNames:function(){let self=this;let $tags=document.getElementsByTagName('elfsight-app');for(let i=0;i<$tags.length;i++){let $curr=$tags[i];self.widgets.push({app_type:'Elfsight Apps',$el:$curr,publicID:$curr.dataset.id});}},/**
     * data-is, data-it, data-yt
     */checkDataAttr:function($curr){let self=this;let dataset=$curr.dataset,dataset_keys=Object.keys(dataset);let settings={},app_name,data_prefix;if(dataset_keys[0]){switch(dataset_keys[0]){case'is':data_prefix='is';app_name='InstaShow';break;case'yt':data_prefix='yt';app_name='Yottie';break;case'il':data_prefix='il';app_name='InstaLink';break;}if(data_prefix&&app_name){for(let i=1;i<dataset_keys.length;i++){let option=dataset_keys[i].replace(data_prefix,'').toLowerCase();settings[option]=dataset[dataset_keys[i]];}self.pushWidget({app_type:'data-'+data_prefix,app_name:app_name,settings:settings,$el:$curr});}}},collectWidgetsData:function(){let self=this;for(let i=0;i<self.widgets.length;i++){let widget=self.widgets[i];if(widget.app_type==='Elfsight Apps'||widget.app_type==='Shopify'){self.getPlatformData(widget);}}},// @TODO refactor, try to catch network requests with chrome.webRequest
getPlatformData:function(widget){let self=this;let platformUrl;if(widget.app_type==='Elfsight Apps'){platformUrl=self.eappsUrl+'&w='+widget.publicID;}else if(widget.app_type==='Shopify'&&widget.shop){platformUrl=self.eappsUrl+'&shop='+widget.shop+'&w='+widget.publicID;// @TODO wait until can get shop
}if(platformUrl){let xhr=new XMLHttpRequest();xhr.open('GET',platformUrl,false);// @TODO async & send for all (batch) eapps widgets
xhr.send();if(xhr.status===200){let responseRegex=/\/\*\*\/collect\((.*)\);/;let responseJSON=JSON.parse(xhr.responseText.match(responseRegex)[1]);let responseWidget=responseJSON.data.widgets[widget.publicID];if(responseWidget.status){self.pushWidget({publicID:widget.publicID,app_type:widget.app_type,app_name:responseWidget.data.app,settings:responseWidget.data.settings,$el:widget.$el});}}}},wrapWidgets:function(){let self=this;for(let i=0;i<self.widgetsData.length;i++){if(!self.widgetsData[i].wrapped){let app_name=self.widgetsData[i].app_name,$curr=self.widgetsData[i].$el,$wrap=document.createElement('div'),$label=document.createElement('div');if($curr){$curr.parentNode.insertBefore($wrap,$curr);$wrap.classList.add('elfsight-widget-wrap');$wrap.appendChild($curr);$wrap.appendChild($label);$label.classList.add('elfsight-widget-label');$label.innerHTML=app_name;self.widgetsData[i].$wrap=$wrap;self.widgetsData[i].wrapped=true;}}}},highlightWidgets:function(data){for(let i=0;i<this.widgetsData.length;i++){let $wrap=this.widgetsData[i].$wrap;if($wrap){$wrap.classList.toggle('elfsight-widget-highlight',data.state);}}},highlightWidget:function(data){let $wrap=this.widgetsData[data.id].$wrap;if($wrap){$wrap.classList.toggle('elfsight-widget-highlight',data.state);}},moveToWidget:function(data){let $wrap=this.widgetsData[data.id].$wrap;$wrap.scrollIntoView({behavior:"smooth",block:"center",inline:"center"});},logWidgetsData:function(){for(let i=0;i<this.widgetsData.length;i++){let widget=this.widgetsData[i];console.log('\n----------------| '+widget.app_name+' detected'+' |----------------');Object.keys(widget).forEach(function(key){let value=widget[key];console.log(format_key(key),value,'\n');});console.log('---------------------------------------------'+widget.app_name.replace(/./g,'-')+'\n\n');function format_key(key){for(let i=0;i<10-key.trim().length;i++){key=' '+key;}return key+':';}}},getWidgetsData:function(){port.postMessage({method:'returnWidgetsData',data:this.widgetsData});},// @TODO move to separate class
shopify_setManagedStore:function(data){let shop_domain_input=document.getElementById('shop_domain'),collaborator_message_input=document.getElementById('collaborator_relationship_request_message');shop_domain_input.value=data.store_url;collaborator_message_input.value=data.message;data.permissions.forEach(permission=>{let collaborator_relationship_inputs=document.querySelectorAll('input[name="collaborator_relationship[allow_'+permission+']"]');collaborator_relationship_inputs.forEach(input=>{input.checked=true;});});}};ewiInject=new ewiInjectClass();ewiInject.init();

/***/ }),

/***/ "./src/inject/inject.styl":
/*!********************************!*\
  !*** ./src/inject/inject.styl ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader?-url!../../node_modules/stylus-loader??ref--5-2!./inject.styl */ "./node_modules/css-loader/index.js?-url!./node_modules/stylus-loader/index.js?!./src/inject/inject.styl");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ })

/******/ });
//# sourceMappingURL=inject.js.map