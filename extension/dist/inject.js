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

/***/ "./src/inject/inject.js":
/*!******************************!*\
  !*** ./src/inject/inject.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

class Inject{constructor(){this.esappsRegex=/^elfsight-sapp-(.*)$/;this.eappsRegex=/^elfsight-app-(.*)$/;this.init();}init(){this.lookupCCApps();// this.lookupPlatformApps();
}postMessage(data){if(data){window.postMessage({'method':'postMessageWidgetFromPage','data':data},'*');}}lookupCCApps(){let widgets=document.querySelectorAll('.elfsight-widget');Array.prototype.slice.call(widgets).forEach(widget=>{const widgetData=widget.data;this.postMessage({app_version:widgetData.version,settings:widgetData.options,element_id:widget.getAttribute('id'),app_type:'CodeCanyon'});});}lookupPlatformApps(){let divs=document.getElementsByTagName('div');for(let i=0;i<divs.length;i++){const currentDiv=divs[i];let type,publicID;let esappsRegMatches=currentDiv.className.match(this.esappsRegex);if(esappsRegMatches&&esappsRegMatches[1]){type='Shopify';publicID=esappsRegMatches[1];}let eappsRegMatches=currentDiv.className.match(this.eappsRegex);if(eappsRegMatches&&eappsRegMatches[1]){type='Elfsight Apps';publicID=eappsRegMatches[1];}if(publicID){this.awaitElementData(currentDiv).then(data=>{this.postMessage({public_id:publicID,app_type:type,settings:data.options,element_id:currentDiv.getAttribute('id')});});}}}awaitElementData(element){let awaitInterval=null;return new Promise(resolve=>{awaitInterval=setInterval(()=>{if(element.data){clearInterval(awaitInterval);return resolve(element.data);}},1000);});}}new Inject();

/***/ })

/******/ });
//# sourceMappingURL=inject.js.map