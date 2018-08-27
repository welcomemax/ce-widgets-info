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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/bg/background.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/bg/background.js":
/*!******************************!*\
  !*** ./src/bg/background.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./data.js */ \"./src/bg/data.js\");ewiBackgroundClass=function(){};ewiBackgroundClass.prototype={storedWidgetsData:{},widgetsData:[],sites:{},tabs:{},tab:{},tab_port:false,popup_port:false,init:function(){let self=this;chrome.extension.onConnect.addListener(function(port){this.popup_port=port;this.popup_port.onMessage.addListener(postMessageFactory);});chrome.tabs.onUpdated.addListener(function(id,info,tab){if(info&&info.status&&info.status.toLowerCase()==='complete'){if(!id||!tab||!tab.url||!(tab.url.indexOf('http')+1)){return;}self.tab=tab;if(!self.tabs[tab.id]){self.tabs[tab.id]={id:tab.id,site:tab.url.match(/^(?:https?:)?(?:\\/\\/)?(?:w+\\.)?([^\\/\\?]+)/)[1],url:tab.url,title:tab.title,favIconUrl:tab.favIconUrl};}if(!self.sites[site]){self.sites[site]={site:site,pages:{}};}if(!self.sites[site].pages[tab.url]){self.sites[site].pages[tab.url]={url:tab.url,widgetsData:[]};}self.tab_port=chrome.tabs.connect(self.tab.id);self.tab_port.onMessage.addListener(postMessageFactory);self.collectWidgetsData();}});chrome.tabs.onActivated.addListener(function(info){self.tab=self.tabs[info.tabId];self.returnWidgetsData();});function postMessageFactory(obj){if(obj&&obj.method){if(obj.data){self[obj.method](obj.data);}else{self[obj.method]();}}}},setBadge:function(count){if(count){chrome.browserAction.setBadgeText({text:count.toString()});chrome.browserAction.setBadgeBackgroundColor({color:'#38393a'});}else{chrome.browserAction.setBadgeText({text:''});}},collectWidgetsData:function(){// tab_port.postMessage({method: 'highlightWidgets'});\nthis.tab_port.postMessage({method:'getWidgetsData'});},returnWidgetsData:function(data){if(data){this.storeWidgetsData(data);}if(this.tab){if(this.storedWidgetsData[this.tab.id]){this.widgetsData=this.storedWidgetsData[this.tab.id];this.setBadge(this.storedWidgetsData[this.tab.id].length);}else{this.widgetsData=[];this.setBadge(0);}}else{this.widgetsData=[];this.setBadge(0);}if(this.popup_port){this.popup_port.postMessage({method:'setWidgetsData',data:this.widgetsData});}},requestWidgetsData:function(){popup_port.postMessage({method:'setWidgetsData',data:this.widgetsData});},storeWidgetsData:function(data){this.storedWidgetsData[this.tab.id]=data;}};ewiBackground=new ewiBackgroundClass();ewiBackground.init();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmcvYmFja2dyb3VuZC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvYmcvYmFja2dyb3VuZC5qcz8zMzAwIl0sInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4vZGF0YS5qcycpO1xyXG5cclxuZXdpQmFja2dyb3VuZENsYXNzID0gZnVuY3Rpb24gKCkge307XHJcbmV3aUJhY2tncm91bmRDbGFzcy5wcm90b3R5cGUgPSB7XHJcbiAgICBzdG9yZWRXaWRnZXRzRGF0YToge30sXHJcbiAgICB3aWRnZXRzRGF0YTogW10sXHJcbiAgICBzaXRlczoge30sXHJcbiAgICB0YWJzOiB7fSxcclxuICAgIHRhYjoge30sXHJcbiAgICB0YWJfcG9ydDogZmFsc2UsXHJcbiAgICBwb3B1cF9wb3J0OiBmYWxzZSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBjaHJvbWUuZXh0ZW5zaW9uLm9uQ29ubmVjdC5hZGRMaXN0ZW5lcihmdW5jdGlvbihwb3J0KSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9wdXBfcG9ydCA9IHBvcnQ7XHJcbiAgICAgICAgICAgIHRoaXMucG9wdXBfcG9ydC5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIocG9zdE1lc3NhZ2VGYWN0b3J5KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChpZCwgaW5mbywgdGFiKSB7XHJcbiAgICAgICAgICAgIGlmIChpbmZvICYmIGluZm8uc3RhdHVzICYmIChpbmZvLnN0YXR1cy50b0xvd2VyQ2FzZSgpID09PSAnY29tcGxldGUnKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpZCB8fCAhdGFiIHx8ICF0YWIudXJsIHx8ICEodGFiLnVybC5pbmRleE9mKCdodHRwJykgKyAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLnRhYiA9IHRhYjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXNlbGYudGFic1t0YWIuaWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50YWJzW3RhYi5pZF0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0YWIuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpdGU6IHRhYi51cmwubWF0Y2goL14oPzpodHRwcz86KT8oPzpcXC9cXC8pPyg/OncrXFwuKT8oW15cXC9cXD9dKykvKVsxXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB0YWIudXJsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGFiLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYXZJY29uVXJsOiB0YWIuZmF2SWNvblVybFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFzZWxmLnNpdGVzW3NpdGVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zaXRlc1tzaXRlXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZTogc2l0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZXM6IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXNlbGYuc2l0ZXNbc2l0ZV0ucGFnZXNbdGFiLnVybF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNpdGVzW3NpdGVdLnBhZ2VzW3RhYi51cmxdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHRhYi51cmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldHNEYXRhOiBbXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLnRhYl9wb3J0ID0gY2hyb21lLnRhYnMuY29ubmVjdChzZWxmLnRhYi5pZCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnRhYl9wb3J0Lm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihwb3N0TWVzc2FnZUZhY3RvcnkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuY29sbGVjdFdpZGdldHNEYXRhKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2hyb21lLnRhYnMub25BY3RpdmF0ZWQuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKGluZm8pIHtcclxuICAgICAgICAgICAgc2VsZi50YWIgPSBzZWxmLnRhYnNbaW5mby50YWJJZF07XHJcblxyXG4gICAgICAgICAgICBzZWxmLnJldHVybldpZGdldHNEYXRhKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHBvc3RNZXNzYWdlRmFjdG9yeSAob2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmogJiYgb2JqLm1ldGhvZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZltvYmoubWV0aG9kXShvYmouZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGZbb2JqLm1ldGhvZF0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2V0QmFkZ2U6IGZ1bmN0aW9uIChjb3VudCkge1xyXG4gICAgICAgIGlmIChjb3VudCkge1xyXG4gICAgICAgICAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRCYWRnZVRleHQoe3RleHQ6IGNvdW50LnRvU3RyaW5nKCl9KTtcclxuICAgICAgICAgICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VCYWNrZ3JvdW5kQ29sb3Ioe2NvbG9yOiAnIzM4MzkzYSd9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRCYWRnZVRleHQoe3RleHQ6ICcnfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjb2xsZWN0V2lkZ2V0c0RhdGE6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyB0YWJfcG9ydC5wb3N0TWVzc2FnZSh7bWV0aG9kOiAnaGlnaGxpZ2h0V2lkZ2V0cyd9KTtcclxuICAgICAgICB0aGlzLnRhYl9wb3J0LnBvc3RNZXNzYWdlKHttZXRob2Q6ICdnZXRXaWRnZXRzRGF0YSd9KTtcclxuICAgIH0sXHJcblxyXG4gICAgcmV0dXJuV2lkZ2V0c0RhdGE6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9yZVdpZGdldHNEYXRhKGRhdGEpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy50YWIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RvcmVkV2lkZ2V0c0RhdGFbdGhpcy50YWIuaWRdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndpZGdldHNEYXRhID0gdGhpcy5zdG9yZWRXaWRnZXRzRGF0YVt0aGlzLnRhYi5pZF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJhZGdlKHRoaXMuc3RvcmVkV2lkZ2V0c0RhdGFbdGhpcy50YWIuaWRdLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndpZGdldHNEYXRhID0gW107XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJhZGdlKDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy53aWRnZXRzRGF0YSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLnNldEJhZGdlKDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucG9wdXBfcG9ydCkge1xyXG4gICAgICAgICAgICB0aGlzLnBvcHVwX3BvcnQucG9zdE1lc3NhZ2Uoe21ldGhvZDogJ3NldFdpZGdldHNEYXRhJywgZGF0YTogdGhpcy53aWRnZXRzRGF0YX0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmVxdWVzdFdpZGdldHNEYXRhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcG9wdXBfcG9ydC5wb3N0TWVzc2FnZSh7bWV0aG9kOiAnc2V0V2lkZ2V0c0RhdGEnLCBkYXRhOiB0aGlzLndpZGdldHNEYXRhfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3JlV2lkZ2V0c0RhdGE6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yZWRXaWRnZXRzRGF0YVt0aGlzLnRhYi5pZF0gPSBkYXRhO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXdpQmFja2dyb3VuZCA9IG5ldyBld2lCYWNrZ3JvdW5kQ2xhc3MoKTtcclxuZXdpQmFja2dyb3VuZC5pbml0KCk7Il0sIm1hcHBpbmdzIjoiQUFBQTtBQXVGQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/bg/background.js\n");

/***/ }),

/***/ "./src/bg/data.js":
/*!************************!*\
  !*** ./src/bg/data.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var apps=[{slug:'instagram-feed',name:'Instagram Feed',func:'EappsInstagramFeed',aliases:['instagramfeed','instashow']},{slug:'instalink',name:'Instagram Widget',func:'instalink'},{slug:'instagram-testimonials',name:'Instagram Testimonials',func:'EappsInstagramTestimonials'},{slug:'yottie',name:'Yottie',func:'yottie'},{slug:'google-maps',name:'Google Maps',func:'EappsGoogleMaps'},{slug:'pricing-table',name:'Pricing Table',func:'EappsPricingTable'},{slug:'social-icons',name:'Social Media Icons',func:'EappsMediaIcons'},{slug:'social-share-buttons',name:'Social Share Buttons',func:'EappsSocialShareButtons'},{slug:'facebook-feed',name:'Facebook Feed',func:'EappsFacebookFeed'},{slug:'facebook-comments',name:'Facebook Comments',func:'EappsFacebookComments'},{slug:'facebook-like-button',name:'Facebook Like Button',func:'EappsFacebookLikeButton'},{slug:'facebook-share-button',name:'Facebook Share Button',func:'EappsFacebookShareButton'},{slug:'testimonials-slider',name:'TestimonialsSlider',func:'EappsTestimonialsSlider'},{slug:'faq',name:'FAQ',func:'EappsFaq'},{slug:'contact-form',name:'Contact Form',func:'EappsContactForm'},{slug:'form-builder',name:'Form Builder',func:'EappsFormBuilder'}];function formatAppsData(apps){return apps.map(function(app){return{name:app.name,slug:app.slug,func:app.func,aliases:app.aliases?app.aliases.concat([app.slug,app.name]):[app.slug,app.name],type:'',version:{curr:false,last:app.version?app.version:'1.0.0'}};});}chrome.storage.sync.set({'apps':formatAppsData(apps)},function(){});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmcvZGF0YS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvYmcvZGF0YS5qcz85MGU0Il0sInNvdXJjZXNDb250ZW50IjpbInZhciBhcHBzID0gW3tcclxuICAgIHNsdWc6ICdpbnN0YWdyYW0tZmVlZCcsXHJcbiAgICBuYW1lOiAnSW5zdGFncmFtIEZlZWQnLFxyXG4gICAgZnVuYzogJ0VhcHBzSW5zdGFncmFtRmVlZCcsXHJcbiAgICBhbGlhc2VzOiBbJ2luc3RhZ3JhbWZlZWQnLCAnaW5zdGFzaG93J11cclxufSwge1xyXG4gICAgc2x1ZzogJ2luc3RhbGluaycsXHJcbiAgICBuYW1lOiAnSW5zdGFncmFtIFdpZGdldCcsXHJcbiAgICBmdW5jOiAnaW5zdGFsaW5rJ1xyXG59LCB7XHJcbiAgICBzbHVnOiAnaW5zdGFncmFtLXRlc3RpbW9uaWFscycsXHJcbiAgICBuYW1lOiAnSW5zdGFncmFtIFRlc3RpbW9uaWFscycsXHJcbiAgICBmdW5jOiAnRWFwcHNJbnN0YWdyYW1UZXN0aW1vbmlhbHMnXHJcbn0sIHtcclxuICAgIHNsdWc6ICd5b3R0aWUnLFxyXG4gICAgbmFtZTogJ1lvdHRpZScsXHJcbiAgICBmdW5jOiAneW90dGllJ1xyXG59LCB7XHJcbiAgICBzbHVnOiAnZ29vZ2xlLW1hcHMnLFxyXG4gICAgbmFtZTogJ0dvb2dsZSBNYXBzJyxcclxuICAgIGZ1bmM6ICdFYXBwc0dvb2dsZU1hcHMnXHJcbn0sIHtcclxuICAgIHNsdWc6ICdwcmljaW5nLXRhYmxlJyxcclxuICAgIG5hbWU6ICdQcmljaW5nIFRhYmxlJyxcclxuICAgIGZ1bmM6ICdFYXBwc1ByaWNpbmdUYWJsZSdcclxufSwge1xyXG4gICAgc2x1ZzogJ3NvY2lhbC1pY29ucycsXHJcbiAgICBuYW1lOiAnU29jaWFsIE1lZGlhIEljb25zJyxcclxuICAgIGZ1bmM6ICdFYXBwc01lZGlhSWNvbnMnXHJcbn0sIHtcclxuICAgIHNsdWc6ICdzb2NpYWwtc2hhcmUtYnV0dG9ucycsXHJcbiAgICBuYW1lOiAnU29jaWFsIFNoYXJlIEJ1dHRvbnMnLFxyXG4gICAgZnVuYzogJ0VhcHBzU29jaWFsU2hhcmVCdXR0b25zJ1xyXG59LCB7XHJcbiAgICBzbHVnOiAnZmFjZWJvb2stZmVlZCcsXHJcbiAgICBuYW1lOiAnRmFjZWJvb2sgRmVlZCcsXHJcbiAgICBmdW5jOiAnRWFwcHNGYWNlYm9va0ZlZWQnXHJcbn0sIHtcclxuICAgIHNsdWc6ICdmYWNlYm9vay1jb21tZW50cycsXHJcbiAgICBuYW1lOiAnRmFjZWJvb2sgQ29tbWVudHMnLFxyXG4gICAgZnVuYzogJ0VhcHBzRmFjZWJvb2tDb21tZW50cydcclxufSwge1xyXG4gICAgc2x1ZzogJ2ZhY2Vib29rLWxpa2UtYnV0dG9uJyxcclxuICAgIG5hbWU6ICdGYWNlYm9vayBMaWtlIEJ1dHRvbicsXHJcbiAgICBmdW5jOiAnRWFwcHNGYWNlYm9va0xpa2VCdXR0b24nXHJcbn0sIHtcclxuICAgIHNsdWc6ICdmYWNlYm9vay1zaGFyZS1idXR0b24nLFxyXG4gICAgbmFtZTogJ0ZhY2Vib29rIFNoYXJlIEJ1dHRvbicsXHJcbiAgICBmdW5jOiAnRWFwcHNGYWNlYm9va1NoYXJlQnV0dG9uJ1xyXG59LCB7XHJcbiAgICBzbHVnOiAndGVzdGltb25pYWxzLXNsaWRlcicsXHJcbiAgICBuYW1lOiAnVGVzdGltb25pYWxzU2xpZGVyJyxcclxuICAgIGZ1bmM6ICdFYXBwc1Rlc3RpbW9uaWFsc1NsaWRlcidcclxufSwge1xyXG4gICAgc2x1ZzogJ2ZhcScsXHJcbiAgICBuYW1lOiAnRkFRJyxcclxuICAgIGZ1bmM6ICdFYXBwc0ZhcSdcclxufSwge1xyXG4gICAgc2x1ZzogJ2NvbnRhY3QtZm9ybScsXHJcbiAgICBuYW1lOiAnQ29udGFjdCBGb3JtJyxcclxuICAgIGZ1bmM6ICdFYXBwc0NvbnRhY3RGb3JtJ1xyXG59LCB7XHJcbiAgICBzbHVnOiAnZm9ybS1idWlsZGVyJyxcclxuICAgIG5hbWU6ICdGb3JtIEJ1aWxkZXInLFxyXG4gICAgZnVuYzogJ0VhcHBzRm9ybUJ1aWxkZXInXHJcbn1dO1xyXG5cclxuZnVuY3Rpb24gZm9ybWF0QXBwc0RhdGEoYXBwcykge1xyXG4gICAgcmV0dXJuIGFwcHMubWFwKGZ1bmN0aW9uKGFwcCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6IGFwcC5uYW1lLFxyXG4gICAgICAgICAgICBzbHVnOiBhcHAuc2x1ZyxcclxuICAgICAgICAgICAgZnVuYzogYXBwLmZ1bmMsXHJcbiAgICAgICAgICAgIGFsaWFzZXM6IGFwcC5hbGlhc2VzID8gYXBwLmFsaWFzZXMuY29uY2F0KFthcHAuc2x1ZywgYXBwLm5hbWVdKSA6IFthcHAuc2x1ZywgYXBwLm5hbWVdLFxyXG4gICAgICAgICAgICB0eXBlOiAnJyxcclxuICAgICAgICAgICAgdmVyc2lvbjoge1xyXG4gICAgICAgICAgICAgICAgY3VycjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBsYXN0OiBhcHAudmVyc2lvbiA/IGFwcC52ZXJzaW9uIDogJzEuMC4wJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHsnYXBwcyc6IGZvcm1hdEFwcHNEYXRhKGFwcHMpfSwgZnVuY3Rpb24oKSB7fSk7Il0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/bg/data.js\n");

/***/ })

/******/ });