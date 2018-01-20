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
    matches: [],

    eappsRegex: /^elfsight-app-(.*)$/,

    eappsUrl: 'https://apps.elfsight.com/p/boot/?callback=collect&w=',

    widgetsData: [],

    init: function () {
        this.collectWidgets();
    },

    collectWidgets: function() {
        var divs = document.getElementsByTagName('div');
        var tags = document.getElementsByTagName('elfsight-app');

        for (var i = 0; i < tags.length; i++) {
            var curr = tags[i];

            this.matches.push({
                type: 'eapps',
                el: curr,
                publicID: curr.dataset.id
            });
        }

        for (var i = 0; i < divs.length; i++) {
            var curr = divs[i];

            if (this.eappsRegex.test(curr.className)) {
                this.matches.push({
                    type: 'eapps',
                    el: curr,
                    publicID: curr.className.match(this.eappsRegex)[1]
                });
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
        var xhr = new XMLHttpRequest();

        xhr.open('GET', this.eappsUrl + curr.publicID, false); // @TODO async & send for all (batch) eapps widgets
        xhr.send();

        if (xhr.status == 200) {
            var responseRegex = /\/\*\*\/collect\((.*)\);/;
            var responseJSON = JSON.parse(xhr.responseText.match(responseRegex)[1]);
            var responseData = responseJSON.data.widgets[curr.publicID].data;

            var widgetData = {
                type: curr.type,
                publicID: curr.publicID,
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