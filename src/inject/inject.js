
window.onload = function () {


}


chrome.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(factory);
});




widgetsInfoClass = function () {};
widgetsInfoClass.prototype = {
    debug: true,

    widgets: [],
    widgetsCounter: 0,

    eappsRegex: /^elfsight-app-(.*)$/,
    esappsRegex: /^elfsight-sapp-(.*)$/,
    optionsRegex: /^elfsight(.*)Options$/,

    eappsUrl: 'https://apps.elfsight.com/p/boot/?callback=collect',
    esappsUrl: 'https://shy.elfsight.com/p/boot/?callback=collect',

    widgetsData: [],

    init: function () {
        var self = this;

        document.addEventListener('DOMContentLoaded', function() {
            self.collectWidgets();

            if (self.debug) {
                self.logWidgetsData();
            }
        })
    },

    collectWidgets: function() {
        var self = this;

        // @TODO jQuery widgets support
        // @TODO Weebly Apps widgets support
        // @TODO old Weebly InstaShow widgets support https://elf-test-2.weebly.com/
        // @TODO separate spaghetti with methods

        var $curr, regMatches, publicID, datasetKeys;

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
                self.widgets.push({
                    app_type: 'eapps',
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
                self.widgetsData.push({ // @TODO change temp widgetsData to widgets
                    id: self.widgetsCounter++,
                    publicID: publicID,
                    app_type: 'esapps',
                    // shop: Shopify.shop // @TODO wait until Shopify can be accessed
                    settings: {"widgetData": "currently unavailable for shopify"}, // @TODO remove temp
                    $el: $curr
                });

                publicID = null;
            }

            datasetKeys = Object.keys($curr.dataset);

            /**
             * CodeCanyon
             */
            if (datasetKeys[0]) {
                var appNameMatches = datasetKeys[0].match(this.optionsRegex);
                if (appNameMatches) {
                    var app_name = datasetKeys[0].match(this.optionsRegex)[1];
                }
            }

            if (app_name) {
                var options = $curr.dataset[datasetKeys[0]];
                var optionsJSON = JSON.parse(decodeURIComponent(options));

                self.widgetsData.push({
                    id: self.widgetsCounter++,
                    app_type: 'codecanyon',
                    app_name: app_name,
                    settings: optionsJSON,
                    $el: $curr
                });

                appName = null;
            }

            self.checkDataAttr($curr);
        }

        self.checkTagNames();

        self.collectWidgetsData();
    },

    /**
     * OLD EAPPS
     */
    checkTagNames: function ($curr) {
        var self = this;

        var $tags = document.getElementsByTagName('elfsight-app');

        for (var i = 0; i < $tags.length; i++) {
            $curr = $tags[i];

            self.widgets.push({
                app_type: 'eapps',
                $el: $curr,
                publicID: $curr.dataset.id
            });
        }
    },

    /**
     * data-is, data-it, data-yt
     */
    checkDataAttr: function ($curr) {
        var self = this;

        var dataset = $curr.dataset,
            dataset_keys = Object.keys(dataset);

        var settings = {},
            app_name, app_type;

        if (dataset_keys[0]) {
            switch (dataset_keys[0]) {
                case 'is':
                    app_type = 'data-is';
                    app_name = 'Instagram Feed (InstaShow)';
                    break;
                case 'yt':
                    app_type = 'data-yt';
                    app_name = 'Youtube Gallery (Yottie)';
                    break;
                case 'it':
                    app_type = 'data-it';
                    app_name = 'Instagram Widget (InstaLink)';
                    break;
            }

            if (app_type && app_name) {
                for (var i = 1; i < dataset_keys.length; i++) {
                    settings[dataset_keys[i]] = dataset[dataset_keys[i]];
                }

                self.widgetsData.push({
                    id: self.widgetsCounter++,
                    app_type: app_type,
                    app_name: app_name,
                    settings: settings,
                    $el: $curr
                });
            }
        }
    },

    collectWidgetsData: function () {
        for (var i = 0; i < this.widgets.length; i++) {
            var widget = this.widgets[i];

            if (widget.app_type === 'eapps' || widget.app_type === 'esapps') {
                this.getPlatformData(widget);
            }
        }
    },

    // @TODO refactor, try to catch network requests to eapps platform
    getPlatformData: function (widget) {
        var xhr = new XMLHttpRequest();

        var platformUrl;
        if (widget.app_type === 'eapps') {
            platformUrl = this.eappsUrl + '&w=' + widget.publicID;
        } else if (widget.app_type === 'esapps' && widget.shop) {
            platformUrl = this.eappsUrl + '&shop=' + widget.shop + '&w=' + widget.publicID; // @TODO wait until can get shop
        }

        if (platformUrl) {
            xhr.open('GET', platformUrl, false); // @TODO async & send for all (batch) eapps widgets
            xhr.send();

            if (xhr.status === 200) {
                var responseRegex = /\/\*\*\/collect\((.*)\);/;
                var responseJSON = JSON.parse(xhr.responseText.match(responseRegex)[1]);
                var responseData = responseJSON.data.widgets[widget.publicID].data;

                this.widgetsData.push({
                    id: self.widgetsCounter++,
                    publicID: widget.publicID,
                    app_type: widget.app_type,
                    app_name: responseData.app,
                    settings: responseData.settings,
                    $el: widget.$el
                });
            }
        }
    },

    highlightWidgets: function () {
        for (var i = 0; i < this.widgetsData.length; i++) {
            var $parent = this.widgetsData[i].$el.parentElement;

            $parent.classList.toggle('widget-highlight');
        }
    },

    highlightWidget: function (data) {
        var $widget = this.widgetsData[data.id].$el
        var $widget_wrap = this.widgetsData.parentElement

        console.log(data.id)
        console.log(data)

        $widget_wrap.classList.toggle('widget-highlight');
    },

    logWidgetsData: function () {
        for (var i = 0; i < this.widgetsData.length; i++) {
            var widget = this.widgetsData[i];

            console.info('widget', widget);
        }
    },

    getWidgetsData: function () {
        var port = chrome.extension.connect();
        console.log(this.widgetsData)
        port.postMessage(this.widgetsData);
    }
};

widgetsInfo = new widgetsInfoClass();

widgetsInfo.init();

function factory (obj) {
    if (obj && obj.method) {
        if (obj.data) {
            widgetsInfo[obj.method](obj.data);
        } else {
            widgetsInfo[obj.method]();
        }
    }
}