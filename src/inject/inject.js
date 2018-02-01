chrome.runtime.onConnect.addListener(function (port) {
    window.port = port;

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

    pageData: {
        url: '',
        cms: ''
    },

    appsData: [{
        app_slug: 'instagram-feed',
        app_name: 'Instagram Feed',
        app_type: '',
        aliases: {
            names: ['instagramfeed', 'instashow'],
            src: ['instagram-feed', 'instashow']
        },
        version: {
            last: '3.1.1',
            curr: false
        }
    }],

    init: function () {
        this.collectScripts();
        this.collectWidgets();
        this.wrapWidgets();

        if (this.debug) {
            this.logWidgetsData();
        }
    },

    pushWidget: function(data) {
        var curr_app = {
            app_name: 'Unknown',
            version: {last: '1.0.0', curr: false}
        };

        this.appsData.forEach(function(app) {
            app.aliases.names.push(app.app_name);
            app.aliases.names.forEach(function (alias) {
                if (data.app_name.toLowerCase().indexOf(alias) + 1) {
                    curr_app = app;
                }
            });
        });

        if (data.app_name && curr_app.app_name === 'Unknown') {
            curr_app.app_name = data.app_name;
        }

        var widgetData = {
            id: this.widgetsCounter++,
            settings: data.settings,
            $el: data.$el,
            app_type: data.app_type,
            app_name: curr_app.app_name,
            version: curr_app.version
        };

        if (data.publicID) {
            widgetData.publicID = data.publicID;
        }

        this.widgetsData.push(widgetData);
    },

    collectWidgets: function() {
        var self = this;

        // @TODO jQuery widgets support
        // @TODO Weebly Apps widgets support
        // @TODO old Weebly InstaShow widgets support https://elf-test-2.weebly.com/
        // @TODO separate spaghetti with methods

        var $curr, regMatches, publicID;

        var $divs = document.getElementsByTagName('div');

        for (var i = 0; i < $divs.length; i++) {
            $curr = $divs[i];

            /**
             * EAPPS
             */

            regMatches = $curr.className.match(self.eappsRegex);
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
            regMatches = $curr.className.match(self.esappsRegex);
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

            var datasetKeys = Object.keys($curr.dataset);

            /**
             * CodeCanyon
             */
            if (datasetKeys[0]) {
                var appNameMatches = datasetKeys[0].match(self.optionsRegex);
                if (appNameMatches) {
                    var app_name = datasetKeys[0].match(self.optionsRegex)[1];
                }
            }

            if (app_name) {
                var options = $curr.dataset[datasetKeys[0]];
                var optionsJSON = JSON.parse(decodeURIComponent(options));

                self.pushWidget({
                    app_type: 'CodeCanyon',
                    app_name: app_name,
                    settings: optionsJSON,
                    $el: $curr
                });

                app_name = null;
            }

            self.checkDataAttr($curr);
        }

        self.checkTagNames();

        self.collectWidgetsData();
    },

    collectScripts: function() {
        var self = this;

        var $scripts = document.getElementsByTagName('script');

        for (var i = 0; i < $scripts.length; i++) {
            var $curr = $scripts[i];

            var src = $curr.getAttribute('src');
            if (src) {
                self.appsData.forEach(function(app) {
                    app.aliases.src.forEach(function(alias) {
                        if (src.indexOf(alias) + 1) {
                            var version = src.split('?ver=')[1];

                            if (version) {
                                app.version.curr = version;
                            } else {
                                app.version.curr = self.parseScriptVersion(src);
                            }
                        }
                    })
                });
            }
        }
    },

    parseScriptVersion: function(src) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', src, false); // @TODO async
        xhr.send();

        if (xhr.status === 200) {
            var versionCopyrightRegex = /version:\s?(.*)/i;
            var versionCodeRegex = /version:"(.*?)"/;

            var copyrightVersion = xhr.responseText.match(versionCopyrightRegex)[1];
            var codeVersion = xhr.responseText.match(versionCodeRegex)[1];

            return copyrightVersion ? copyrightVersion : codeVersion;
        }

        return false;
    },

    /**
     * OLD EAPPS
     */
    checkTagNames: function () {
        var self = this;

        var $tags = document.getElementsByTagName('elfsight-app');

        for (var i = 0; i < $tags.length; i++) {
            var $curr = $tags[i];

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
            app_name, data_prefix;

        if (dataset_keys[0]) {
            switch (dataset_keys[0]) {
                case 'is':
                    data_prefix = 'is';
                    app_name = 'InstaShow';
                    break;
                case 'yt':
                    data_prefix = 'yt';
                    app_name = 'Yottie';
                    break;
                case 'il':
                    data_prefix = 'il';
                    app_name = 'InstaLink';
                    break;
            }

            if (data_prefix && app_name) {
                for (var i = 1; i < dataset_keys.length; i++) {
                    var option = dataset_keys[i].replace(data_prefix, '').toLowerCase();

                    settings[option] = dataset[dataset_keys[i]];
                }

                self.pushWidget({
                    app_type: 'data-' + data_prefix,
                    app_name: app_name,
                    settings: settings,
                    $el: $curr
                });
            }
        }
    },

    collectWidgetsData: function () {
        var self = this;

        for (var i = 0; i < self.widgets.length; i++) {
            var widget = self.widgets[i];

            if (widget.app_type === 'eapps' || widget.app_type === 'esapps') {
                self.getPlatformData(widget);
            }
        }
    },

    // @TODO refactor, try to catch network requests to eapps platform
    getPlatformData: function (widget) {
        var self = this;

        var platformUrl;
        if (widget.app_type === 'eapps') {
            platformUrl = self.eappsUrl + '&w=' + widget.publicID;
        } else if (widget.app_type === 'esapps' && widget.shop) {
            platformUrl = self.eappsUrl + '&shop=' + widget.shop + '&w=' + widget.publicID; // @TODO wait until can get shop
        }

        if (platformUrl) {
            var xhr = new XMLHttpRequest();

            xhr.open('GET', platformUrl, false); // @TODO async & send for all (batch) eapps widgets
            xhr.send();

            if (xhr.status === 200) {
                var responseRegex = /\/\*\*\/collect\((.*)\);/;
                var responseJSON = JSON.parse(xhr.responseText.match(responseRegex)[1]);
                var responseData = responseJSON.data.widgets[widget.publicID].data;

                self.pushWidget({
                    publicID: widget.publicID,
                    app_type: widget.app_type,
                    app_name: responseData.app,
                    settings: responseData.settings,
                    $el: widget.$el
                })
            }
        }
    },

    wrapWidgets: function () {
        var self = this;

        for (var i = 0; i < self.widgetsData.length; i++) {
            var app_name = self.widgetsData[i].app_name,
                $curr = self.widgetsData[i].$el,
                $wrap = document.createElement('div'),
                $label = document.createElement('div');

            $curr.parentNode.insertBefore($wrap, $curr);

            $wrap.classList.add('elfsight-widget-wrap');
            $wrap.appendChild($curr);
            $wrap.appendChild($label);

            $label.classList.add('elfsight-widget-label');
            $label.innerHTML = app_name;

            self.widgetsData[i].$wrap = $wrap;
        }
    },

    highlightWidgets: function (data) {
        for (var i = 0; i < this.widgetsData.length; i++) {
            var $wrap = this.widgetsData[i].$wrap;

            $wrap.classList.toggle('elfsight-widget-highlight', data.state);
        }
    },

    highlightWidget: function (data) {
        var $wrap = this.widgetsData[data.id].$wrap;

        $wrap.classList.toggle('elfsight-widget-highlight', data.state);
    },

    moveToWidget: function (data) {
        var $wrap = this.widgetsData[data.id].$wrap;

        $wrap.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center"
        });
    },

    logWidgetsData: function () {
        for (var i = 0; i < this.widgetsData.length; i++) {
            var widget = this.widgetsData[i];

            console.info(widget.app_name + ' widget detected:', widget);
        }
    },

    getWidgetsData: function () {
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