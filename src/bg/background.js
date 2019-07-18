import './data.js';

import Utils from './../utils/utils.js';

class Background {
    constructor() {
        this.widgets = {};
        this.sites = {};
        this.tabs = {};
        this.tab = {};

        this.tabWidgets = [];

        this.tab_port = null;
        this.popup_port = null;

        this.utils = new Utils();

        this.init();
    }

    init() {
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
                        widgets: []
                    }
                }

                this.tab_port = chrome.tabs.connect(this.tab.id);
                this.tab_port.onMessage.addListener(postMessageFactory);

                // @TODO move to separate class
                if (this.tab.site === 'partners.shopify.com' && this.tab.url.match(/managed_stores\/new/)) {
                    this.postMessage(this.tab_port, 'utilsSetManagedStore', {
                        store_url: this.utils.getQueryParam('store_url', tab.url),
                        permissions: this.utils.getQueryParam('permissions', tab.url).split(','),
                        message: this.utils.getQueryParam('message', tab.url)
                    });
                }

                this.postMessage(this.tab_port, 'postMessageWidgets');
            }
        });

        chrome.tabs.onActivated.addListener((info) => {
            this.tab = this.tabs[info.tabId];

            this.postMessageReturnTabWidgets();
        });

        // @TODO move factory to utils (what about _this_?)
        let postMessageFactory = (obj) => {
            if (obj && obj.method) {
                if (obj.data) {
                    this[obj.method](obj.data);
                } else {
                    this[obj.method]();
                }
            }
        };
    }

    setBadge(count) {
        chrome.browserAction.setBadgeText({text: count ? count.toString() : ''});

        if (!count) {
            chrome.browserAction.setBadgeBackgroundColor({color: '#38393a'});
        }
    }

    postMessageReturnTabWidgets(data) {
        if (data) {
            this.storeWidgets(data)
        }

        if (this.tab && this.widgets[this.tab.id]) {
            this.tabWidgets = this.widgets[this.tab.id];
            this.setBadge(this.widgets[this.tab.id].length);
        } else {
            this.tabWidgets = [];
            this.setBadge(0);
        }

        if (this.popup_port) {
            this.postMessage(this.popup_port, 'postMessageSetTabWidgets', this.tabWidgets);
        }
    }

    postMessage(port, method, data) {
        let event = {method: method};
        if (data) event.data = data;

        port.postMessage(event);
    }

    postMessageRequestAllData() {
        this.postMessage(this.popup_port, 'postMessageSetAllData', {
            tabs: this.tabs,
            sites: this.sites,
            widgets: this.widgets,
        });
    }

    postMessageRequestTabWidgets() {
        this.postMessage(this.popup_port, 'postMessageSetTabWidgets', this.tabWidgets);
    }

    storeWidgets(data) {
        this.widgets[this.tab.id] = data;
    }
}

new Background();
