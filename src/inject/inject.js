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
    widgets: [],

    eappsRegex: /^elfsight-app-(.*)$/,
    optionsRegex: /^elfsight(.*)Options$/,

    eappsUrl: 'https://apps.elfsight.com/p/boot/?callback=collect&w=',

    widgetsData: [],

    init: function () {
        this.collectWidgets();
    },

    collectWidgets: function() {
        // @TODO separate spaghetti with methods
        var $tags = document.getElementsByTagName('elfsight-app');

        for (var i = 0; i < $tags.length; i++) {
            var $curr = $tags[i];

            /**
             * OLD EAPPS
             */
            this.widgets.push({
                type: 'eapps',
                $el: $curr,
                publicID: $curr.dataset.id
            });
        }

        var $divs = document.getElementsByTagName('div');

        for (var i = 0; i < $divs.length; i++) {
            var $curr = $divs[i];

            /**
             * EAPPS
             */
            var regMatches = $curr.className.match(this.eappsRegex);
            if (regMatches) {
                var publicID = regMatches[1];
            }

            if (publicID) {
                this.widgets.push({
                    type: 'eapps',
                    $el: $curr,
                    publicID: publicID
                });

                publicID = null;
            }

            /**
             * CodeCanyon
             */
            var datasetKeys = Object.keys($curr.dataset);
            if (datasetKeys[0]) {
                var appNameMatches = datasetKeys[0].match(this.optionsRegex);
                if (appNameMatches) {
                    var appName = datasetKeys[0].match(this.optionsRegex)[1];
                }
            }

            if (appName) {
                var options = $curr.dataset[datasetKeys[0]];
                var optionsJSON = JSON.parse(decodeURIComponent(options));

                this.widgetsData.push({
                    type: 'codecanyon',
                    app: appName,
                    settings: optionsJSON,
                    $el: $curr
                });

                appName = null;
            }

        }

        this.collectWidgetsData();
    },

    collectWidgetsData: function () {
        for (var i = 0; i < this.widgets.length; i++) {
            var widget = this.widgets[i];

            if (widget.type = 'eapps') {
                this.getPlatformData(widget);
            }
        }
    },

    getPlatformData: function (widget) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', this.eappsUrl + widget.publicID, false); // @TODO async & send for all (batch) eapps widgets
        xhr.send();

        if (xhr.status == 200) {
            var responseRegex = /\/\*\*\/collect\((.*)\);/;
            var responseJSON = JSON.parse(xhr.responseText.match(responseRegex)[1]);
            var responseData = responseJSON.data.widgets[widget.publicID].data;

            this.widgetsData.push({
                type: widget.type,
                publicID: widget.publicID,
                app: responseData.app,
                settings: responseData.settings,
                $el: widget.$el
            });
        }
    },

    highlightWidgets: function () {
        var self = this;

        setTimeout(function () {
            for (var i = 0; i < self.widgets.length; i++) {
                var curr = self.widgets[i].$el;

                curr.className += ' widget-highlight';
            }
        }, 3000, self);
    },

    getWidgetsData: function () {
        return this.widgetsData;
    }
};

var widgetsInfo = new widgetsInfoClass();

widgetsInfo.init();