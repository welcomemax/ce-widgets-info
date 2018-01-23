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
    debug: true,

    widgets: [],

    eappsRegex: /^elfsight-app-(.*)$/,
    esappsRegex: /^elfsight-sapp-(.*)$/,
    optionsRegex: /^elfsight(.*)Options$/,

    eappsUrl: 'https://apps.elfsight.com/p/boot/?callback=collect',
    esappsUrl: 'https://shy.elfsight.com/p/boot/?callback=collect',

    widgetsData: [],

    init: function () {
        this.collectWidgets();

        if (this.debug) {
            this.logWidgetsData();
        }
    },

    collectWidgets: function() {

        // @TODO jQuery widgets support
        // @TODO data-yt widgets support
        // @TODO data-it widgets support
        // @TODO separate spaghetti with methods

        var $curr, regMatches, publicID, datasetKeys;

        var $tags = document.getElementsByTagName('elfsight-app');

        for (var i = 0; i < $tags.length; i++) {
            $curr = $tags[i];

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
            $curr = $divs[i];

            /**
             * EAPPS
             */

            regMatches = $curr.className.match(this.eappsRegex);
            if (regMatches) {
                publicID = regMatches[1];
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
             * ESAPPS
             */
            regMatches = $curr.className.match(this.esappsRegex);
            if (regMatches) {
                publicID = regMatches[1];
            }

            if (publicID) {
                this.widgets.push({
                    type: 'esapps',
                    $el: $curr,
                    publicID: publicID,
                    shop: Shopify.shop // @TODO wait until Shopify can be accessed
                });

                publicID = null;
            }

            /**
             * CodeCanyon
             */
            datasetKeys = Object.keys($curr.dataset);
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

            /**
             * data-is
             */
            datasetKeys = Object.keys($curr.dataset);
            if (datasetKeys[0]) {
                if (datasetKeys[0] === 'is') {
                    var settings = {};

                    for (var j = 1; j < datasetKeys.length; j++) {
                        settings[datasetKeys[j]] = $curr.dataset[datasetKeys[j]];
                    }

                    this.widgetsData.push({
                        type: 'data-is',
                        app: 'Instagram Feed',
                        settings: settings,
                        $el: $curr
                    });
                }
            }

        }

        this.collectWidgetsData();
    },

    collectWidgetsData: function () {
        for (var i = 0; i < this.widgets.length; i++) {
            var widget = this.widgets[i];

            if (widget.type === 'eapps' || widget.type === 'esapps') {
                this.getPlatformData(widget);
            }
        }
    },

    getPlatformData: function (widget) {
        var xhr = new XMLHttpRequest();

        var platformUrl = '';
        if (widget.type === 'eapps') {
            platformUrl = this.eappsUrl + '&w=' + widget.publicID;
        } else if (widget.type === 'esapps') {
            platformUrl = this.eappsUrl + '&shop=' + widget.shop + '&w=' + widget.publicID;
        }

        xhr.open('GET', platformUrl, false); // @TODO async & send for all (batch) eapps widgets
        xhr.send();

        if (xhr.status === 200) {
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

    logWidgetsData: function () {
        for (var i = 0; i < this.widgets.length; i++) {
            var widget = this.widgets[i];

            console.log(widget);
        }
    },

    getWidgetsData: function () {
        return this.widgetsData;
    }
};

var widgetsInfo = new widgetsInfoClass();

widgetsInfo.init();