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

__webpack_require__(/*! ./data.js */ "./src/bg/data.js");ewiBackgroundClass=function(){};ewiBackgroundClass.prototype={storedWidgetsData:{},widgetsData:[],sites:{},tabs:{},tab:{},tab_port:false,popup_port:false,init:function(){let self=this;chrome.extension.onConnect.addListener(port=>{this.popup_port=port;this.popup_port.onMessage.addListener(postMessageFactory);});chrome.tabs.onUpdated.addListener((id,info,tab)=>{if(info&&info.status&&info.status.toLowerCase()==='complete'){if(!id||!tab||!tab.url||!(tab.url.indexOf('http')+1)){return;}this.tab=tab;this.tab.site=tab.url.match(/^(?:https?:)?(?:\/\/)?(?:w+\.)?([^\/\?]+)/)[1];if(!this.tabs[tab.id]){this.tabs[tab.id]={id:tab.id,site:tab.site,url:tab.url,title:tab.title,favIconUrl:tab.favIconUrl};}if(!this.sites[tab.site]){this.sites[tab.site]={site:tab.site,pages:{}};}if(!this.sites[tab.site].pages[tab.url]){this.sites[tab.site].pages[tab.url]={url:tab.url,widgetsData:[]};}this.tab_port=chrome.tabs.connect(self.tab.id);this.tab_port.onMessage.addListener(postMessageFactory);// @TODO move to separate class
if(this.tab.site==='partners.shopify.com'&&this.tab.url.match(/managed_stores\/new/)){this.shopify_setManagedStore({store_url:this.getQueryParam('store_url',tab.url),permissions:this.getQueryParam('permissions',tab.url).split(','),message:this.getQueryParam('message',tab.url)});}this.collectWidgetsData();}});chrome.tabs.onActivated.addListener(info=>{this.tab=this.tabs[info.tabId];this.returnWidgetsData();});let postMessageFactory=obj=>{if(obj&&obj.method){if(obj.data){this[obj.method](obj.data);}else{this[obj.method]();}}};},setBadge:function(count){if(count){chrome.browserAction.setBadgeText({text:count.toString()});chrome.browserAction.setBadgeBackgroundColor({color:'#38393a'});}else{chrome.browserAction.setBadgeText({text:''});}},collectWidgetsData:function(){// tab_port.postMessage({method: 'highlightWidgets'});
this.tab_port.postMessage({method:'getWidgetsData'});},returnWidgetsData:function(data){if(data){this.storeWidgetsData(data);}if(this.tab){if(this.storedWidgetsData[this.tab.id]){this.widgetsData=this.storedWidgetsData[this.tab.id];this.setBadge(this.storedWidgetsData[this.tab.id].length);}else{this.widgetsData=[];this.setBadge(0);}}else{this.widgetsData=[];this.setBadge(0);}if(this.popup_port){this.popup_port.postMessage({method:'setWidgetsData',data:this.widgetsData});}},// @TODO move to utils class
getQueryParam:function(name,url){name=name.replace(/[\[\]]/g,'\\$&');let regex=new RegExp('[?&]'+name+'(=([^&#]*)|&|#|$)'),results=regex.exec(url);if(!results)return null;if(!results[2])return'';return decodeURIComponent(results[2].replace(/\+/g,' '));},// @TODO move to separate class
shopify_setManagedStore:function(data){this.tab_port.postMessage({method:'shopify_setManagedStore',data:data});},requestWidgetsData:function(){this.popup_port.postMessage({method:'setWidgetsData',data:this.widgetsData});},storeWidgetsData:function(data){this.storedWidgetsData[this.tab.id]=data;}};ewiBackground=new ewiBackgroundClass();ewiBackground.init();

/***/ }),

/***/ "./src/bg/data.js":
/*!************************!*\
  !*** ./src/bg/data.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

var apps=[{slug:'instagram-feed',name:'Instagram Feed',func:'EappsInstagramFeed',aliases:['instagramfeed','instashow']},{slug:'instalink',name:'Instagram Widget',func:'instalink'},{slug:'instagram-testimonials',name:'Instagram Testimonials',func:'EappsInstagramTestimonials'},{slug:'yottie',name:'Yottie',func:'yottie'},{slug:'google-maps',name:'Google Maps',func:'EappsGoogleMaps'},{slug:'pricing-table',name:'Pricing Table',func:'EappsPricingTable'},{slug:'social-icons',name:'Social Media Icons',func:'EappsMediaIcons'},{slug:'social-share-buttons',name:'Social Share Buttons',func:'EappsSocialShareButtons'},{slug:'facebook-feed',name:'Facebook Feed',func:'EappsFacebookFeed'},{slug:'facebook-comments',name:'Facebook Comments',func:'EappsFacebookComments'},{slug:'facebook-like-button',name:'Facebook Like Button',func:'EappsFacebookLikeButton'},{slug:'facebook-share-button',name:'Facebook Share Button',func:'EappsFacebookShareButton'},{slug:'testimonials-slider',name:'TestimonialsSlider',func:'EappsTestimonialsSlider'},{slug:'faq',name:'FAQ',func:'EappsFaq'},{slug:'contact-form',name:'Contact Form',func:'EappsContactForm'},{slug:'form-builder',name:'Form Builder',func:'EappsFormBuilder'}];function formatAppsData(apps){return apps.map(function(app){return{name:app.name,slug:app.slug,func:app.func,aliases:app.aliases?app.aliases.concat([app.slug,app.name]):[app.slug,app.name],type:'',version:{curr:false,last:app.version?app.version:'1.0.0'}};});}chrome.storage.sync.set({'apps':formatAppsData(apps)},function(){});

/***/ })

/******/ });
//# sourceMappingURL=background.js.map