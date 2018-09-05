import './data.js';

import Utils from './../utils/utils.js';

class Background {
    constructor() {
        this.storedWidgetsData = {};
        this.widgetsData = [];

        this.sites = {};
        this.tabs = {};
        this.tab = {};

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
                        widgetsData: []
                    }
                }

                this.tab_port = chrome.tabs.connect(this.tab.id);
                this.tab_port.onMessage.addListener(postMessageFactory);

                // @TODO move to separate class
                if (this.tab.site === 'partners.shopify.com' && this.tab.url.match(/managed_stores\/new/)) {
                    this.message(this.tab_port, 'setManagedStore', {
                        store_url: this.utils.getQueryParam('store_url', tab.url),
                        permissions: this.utils.getQueryParam('permissions', tab.url).split(','),
                        message: this.utils.getQueryParam('message', tab.url)
                    });
                }

                this.message(this.tab_port, 'getWidgetsData');
            }
        });

        chrome.tabs.onActivated.addListener((info) => {
            this.tab = this.tabs[info.tabId];

            this.returnWidgetsData();
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
        console.log(count)
        chrome.browserAction.setBadgeText({text: count ? count.toString() : ''});
        if (!count) {
            chrome.browserAction.setBadgeBackgroundColor({color: '#38393a'});
        }
    }

    returnWidgetsData(data) {
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
            this.message(this.popup_port, 'setWidgetsData', this.widgetsData);
        }
    }

    message(port, method, data) {
        let event = {method: method};
        if (data) event.data = data;

        port.postMessage(event);
    }

    requestWidgetsData () {
        this.message(this.popup_port, 'setWidgetsData', this.widgetsData);
    }

    storeWidgetsData (data) {
        this.storedWidgetsData[this.tab.id] = data;
    }
}


new Background();