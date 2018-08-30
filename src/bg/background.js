require('./data.js');

ewiBackgroundClass = function () {};
ewiBackgroundClass.prototype = {
    storedWidgetsData: {},
    widgetsData: [],
    sites: {},
    tabs: {},
    tab: {},
    tab_port: false,
    popup_port: false,

    init: function () {
        let self = this;

        chrome.extension.onConnect.addListener(function(port) {
            this.popup_port = port;
            this.popup_port.onMessage.addListener(postMessageFactory);
        });

        chrome.tabs.onUpdated.addListener(function (id, info, tab) {
            if (info && info.status && (info.status.toLowerCase() === 'complete')) {
                if (!id || !tab || !tab.url || !(tab.url.indexOf('http') + 1)) {
                    return;
                }

                self.tab = tab;
                self.tab.site = tab.url.match(/^(?:https?:)?(?:\/\/)?(?:w+\.)?([^\/\?]+)/)[1];

                if (!self.tabs[tab.id]) {
                    self.tabs[tab.id] = {
                        id: tab.id,
                        site: tab.site,
                        url: tab.url,
                        title: tab.title,
                        favIconUrl: tab.favIconUrl
                    }
                }

                if (!self.sites[tab.site]) {
                    self.sites[tab.site] = {
                        site: tab.site,
                        pages: {}
                    }
                }

                if (!self.sites[tab.site].pages[tab.url]) {
                    self.sites[tab.site].pages[tab.url] = {
                        url: tab.url,
                        widgetsData: []
                    }
                }

                self.tab_port = chrome.tabs.connect(self.tab.id);
                self.tab_port.onMessage.addListener(postMessageFactory);

                // @TODO move to separate class
                if (self.tab.site === 'partners.shopify.com' && tab.url.match(/managed_stores\/new/)) {
                    self.shopify_setManagedStore({
                        store_url: self.getQueryParam('store_url', tab.url),
                        permissions: self.getQueryParam('permissions', tab.url).split(','),
                        message: self.getQueryParam('message', tab.url)
                    });
                }

                // setTimeout(() => {
                    self.collectWidgetsData();
                // }, 1000);
            }
        });

        chrome.tabs.onActivated.addListener(function (info) {
            self.tab = self.tabs[info.tabId];

            self.returnWidgetsData();
        });

        function postMessageFactory (obj) {
            if (obj && obj.method) {
                if (obj.data) {
                    self[obj.method](obj.data);
                } else {
                    self[obj.method]();
                }
            }
        }
    },

    setBadge: function (count) {
        if (count) {
            chrome.browserAction.setBadgeText({text: count.toString()});
            chrome.browserAction.setBadgeBackgroundColor({color: '#38393a'});
        } else {
            chrome.browserAction.setBadgeText({text: ''});
        }
    },

    collectWidgetsData: function () {
        // tab_port.postMessage({method: 'highlightWidgets'});
        this.tab_port.postMessage({method: 'getWidgetsData'});
    },

    returnWidgetsData: function (data) {
        if (data) {
            this.storeWidgetsData(data)
        }

        if (this.tab) {
            if (this.storedWidgetsData[this.tab.id]) {
                this.widgetsData = this.storedWidgetsData[this.tab.id];
                this.setBadge(this.storedWidgetsData[this.tab.id].length);
            } else {
                this.widgetsData = [];
                this.setBadge(0);
            }
        } else {
            this.widgetsData = [];
            this.setBadge(0);
        }

        if (this.popup_port) {
            this.popup_port.postMessage({method: 'setWidgetsData', data: this.widgetsData});
        }
    },

    // @TODO move to utils class
    getQueryParam: function(name, url) {
        name = name.replace(/[\[\]]/g, '\\$&');

        let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);

        if (!results) return null;
        if (!results[2]) return '';

        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    },

    // @TODO move to separate class
    shopify_setManagedStore: function(data) {
        this.tab_port.postMessage({method: 'shopify_setManagedStore', data: data});
    },

    requestWidgetsData: function () {
        this.popup_port.postMessage({method: 'setWidgetsData', data: this.widgetsData});
    },

    storeWidgetsData: function (data) {
        this.storedWidgetsData[this.tab.id] = data;
    }
};

ewiBackground = new ewiBackgroundClass();
ewiBackground.init();