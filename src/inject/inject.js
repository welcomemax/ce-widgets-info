chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(data) {
        if (data.getWidgets) {
            port.postMessage(widgetsInfo.getWidgetsData());
        }

        if (data.highlightWidgets) {
            widgetsInfo.highlightWidgets();
        }
    });
});


widgetsInfoClass = function () {};

widgetsInfoClass.prototype = {
    divs: [],
    matches: [],

    eappsRegex: /^elfsight-app-(.*)$/,

    eappsUrl: 'https://apps.elfsight.com/p/boot/?callback=collect&w=',

    widgetsData: [],

    init: function () {
        this.collectWidgets();
    },

    collectWidgets: function() {
        this.divs = document.getElementsByTagName('div');


        for (var i = 0; i < this.divs.length; i++) {
            var curr = this.divs[i];

            if (this.eappsRegex.test(curr.className)) {
                this.matches.push({type: 'eapps', el: curr});
            }
        }

        this.collectWidgetsData();
    },

    collectWidgetsData: function () {
        for (var i = 0; i < this.matches.length; i++) {
            var curr = this.matches[i];

            if (curr.type = 'eapps') {
                this.getPlatformData(curr);
            }
        }
    },

    getPlatformData: function (curr) {
        var publicID = curr.el.className.match(this.eappsRegex)[1];

        var xhr = new XMLHttpRequest();

        xhr.open('GET', this.eappsUrl + publicID, false); // @TODO async & send for all widgets
        xhr.send();

        if (xhr.status == 200) {
            var responseRegex = /\/\*\*\/collect\((.*)\)\;/;
            var responseJSON = JSON.parse(xhr.responseText.match(responseRegex)[1]);
            var responseData = responseJSON.data.widgets[publicID].data;

            var widgetData = {
                publicID: publicID,
                app: responseData.app,
                settings: responseData.settings
            };

            this.widgetsData.push(widgetData);
        }
    },

    highlightWidgets: function () {
        for (var i = 0; i < this.matches.length; i++) {
            var curr = this.matches[i];

            curr.className += ' widget-highlight';
        }
    },

    getWidgetsData: function () {
        return this.widgetsData;
    }
};

widgetsInfo = new widgetsInfoClass();

widgetsInfo.init();