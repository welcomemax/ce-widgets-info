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

        chrome.extension.onConnect.addListener((port) => {
            this.popup_port = port;
            this.popup_port.onMessage.addListener(postMessageFactory);
        });

        chrome.tabs.onUpdated.addListener((id, info, tab) => {
            if (info && info.status && (info.status.toLowerCase() === 'complete')) {
                if (!id || !tab || !tab.url || !(tab.url.indexOf('http') + 1)) {
                    return;
                }

                this.tab = tab;
                this.tab.site = tab.url.match(/^(?:https?:)?(?:\/\/)?(?:w+\.)?([^\/\?]+)/)[1];

                if (!this.tabs[tab.id]) {
                    this.tabs[tab.id] = {
                        id: tab.id,
                        site: tab.site,
                        url: tab.url,
                        title: tab.title,
                        favIconUrl: tab.favIconUrl
                    }
                }

                if (!this.sites[tab.site]) {
                    this.sites[tab.site] = {
                        site: tab.site,
                        pages: {}
                    }
                }

                if (!this.sites[tab.site].pages[tab.url]) {
                    this.sites[tab.site].pages[tab.url] = {
                        url: tab.url,
                        widgetsData: []
                    }
                }

                this.tab_port = chrome.tabs.connect(self.tab.id);
                this.tab_port.onMessage.addListener(postMessageFactory);

                // @TODO move to separate class
                if (this.tab.site === 'partners.shopify.com' && this.tab.url.match(/managed_stores\/new/)) {
                    this.shopify_setManagedStore({
                        store_url: this.getQueryParam('store_url', tab.url),
                        permissions: this.getQueryParam('permissions', tab.url).split(','),
                        message: this.getQueryParam('message', tab.url)
                    });
                }

                this.collectWidgetsData();
            }
        });

        chrome.tabs.onActivated.addListener((info) => {
            this.tab = this.tabs[info.tabId];

            this.returnWidgetsData();
        });

        let postMessageFactory = (obj) => {
            if (obj && obj.method) {
                if (obj.data) {
                    this[obj.method](obj.data);
                } else {
                    this[obj.method]();
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