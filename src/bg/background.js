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
        var self = this;

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

                var site = tab.url.match(/^(?:https?:)?(?:\/\/)?(?:w+\.)?([^\/\?]+)/)[1]

                if (!self.tabs[tab.id]) {
                    self.tabs[tab.id] = {
                        id: tab.id,
                        site: site,
                        url: tab.url,
                        title: tab.title,
                        favIconUrl: tab.favIconUrl
                    };
                }

                if (!self.sites[site]) {
                    self.sites[site] = {
                        site: site,
                        pages: {}
                    };
                }

                if (!self.sites[site].pages[tab.url]) {
                    self.sites[site].pages[tab.url] = {
                        url: tab.url,
                        widgetsData: []
                    }
                }

                self.tab_port = chrome.tabs.connect(self.tab.id);
                self.tab_port.onMessage.addListener(postMessageFactory);

                self.collectWidgetsData();
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

    requestWidgetsData: function () {
        popup_port.postMessage({method: 'setWidgetsData', data: this.widgetsData});
    },

    storeWidgetsData: function (data) {
        this.storedWidgetsData[this.tab.id] = data;
    }
};

ewiBackground = new ewiBackgroundClass();
ewiBackground.init();