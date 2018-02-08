// window.popup_port = chrome.runtime.connect();

chrome.extension.onConnect.addListener(function(port) {
    window.popup_port = port;
    popup_port.onMessage.addListener(postMessageFactory);
});

chrome.tabs.onUpdated.addListener(function (id, info, tab) {
    if (info && info.status && (info.status.toLowerCase() === 'complete')) {
        if(!id || !tab || !tab.url || !(tab.url.indexOf('http') + 1)) {
            return;
        }

        window.id = id;
        window.tab_port = chrome.tabs.connect(id);
        tab_port.onMessage.addListener(postMessageFactory);

        widgetsInfo.collectWidgetsData();

        console.log(id, info, tab); // @TODO remove temp log
    }
});

chrome.tabs.onActivated.addListener(function (info) {
    window.id = info.tabId;
    widgetsInfo.returnWidgetsData();
});

function postMessageFactory (obj) {
    if (obj && obj.method) {
        if (obj.data) {
            widgetsInfo[obj.method](obj.data);
        } else {
            widgetsInfo[obj.method]();
        }
    }
}

widgetsInfoClass = function () {};
widgetsInfoClass.prototype = {
    storedWidgetsData: {},
    widgetsData: [],

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
        tab_port.postMessage({method: 'getWidgetsData'});
    },

    returnWidgetsData: function (data) {
        if (data) {
            this.storeWidgetsData(data)
        }

        if (this.storedWidgetsData[id]) {
            this.widgetsData = this.storedWidgetsData[id];
            this.setBadge(this.storedWidgetsData[id].length);
        } else {
            this.widgetsData = [];
            this.setBadge(0);
        }

        // console.log(widgetsData); // @TODO remove temp log
        // console.log(popup_port); // @TODO remove temp log

        // popup_port.postMessage({method: 'popupWidgetsData', data: widgetsData});
    },

    getWidgetsData: function () {
        popup_port.postMessage({method: 'widgetsDataToPopup', data: this.widgetsData});
    },

    storeWidgetsData: function (data) {
        this.storedWidgetsData[id] = data;
    }
};

widgetsInfo = new widgetsInfoClass();