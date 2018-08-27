require('./inject.styl');

ewiInjectClass = function () {};
ewiInjectClass.prototype = {
    debug: true,

    widgets: [],
    widgetsCounter: 0,

    eappsRegex: /^elfsight-app-(.*)$/,
    esappsRegex: /^elfsight-sapp-(.*)$/,
    optionsRegex: /^elfsight(.*?)Options$/,

    eappsUrl: 'https://apps.elfsight.com/p/boot/?callback=collect',
    esappsUrl: 'https://shy.elfsight.com/p/boot/?callback=collect',

    widgetsData: [],

    pageData: {
        url: '',
        cms: ''
    },

    appsData: [],

    init: function() {
        let self = this;

        self.injectScript(chrome.runtime.getURL('dist/content.js'));

        chrome.storage.sync.get((data) => {
            self.appsData = data.apps;

            self.postMessageFactory();

            self.collectScripts();
            self.collectWidgets();

            // @TODO init wrap on popup open
            self.wrapWidgets();

            if (self.debug) {
                self.logWidgetsData();
            }
        });
    },

    injectScript: function(file_path) {
        let script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', file_path);

        document.head.appendChild(script);
    },

    getDataFromContent: function(data) {
        let self = this;

        data.forEach((widget) => {
            let curr_app;

            self.appsData.forEach((app) => {
                if (widget.func.indexOf(app.func) + 1) {
                    curr_app = app;
                }
            });

            self.widgetsData.push({
                id: this.widgetsCounter++,
                app_type: 'CodeCanyon',
                app_slug: curr_app.slug,
                app_name: curr_app.name,
                settings: widget.settings,
                $el: document.getElementById(widget.el_id)
            });
        });

        self.wrapWidgets();
        self.getWidgetsData();
    },

    postMessageFactory: function() {
        let self = this;

        let factory = function(obj) {
            if (obj && obj.method) {
                if (obj.data) {
                    self[obj.method](obj.data);
                } else {
                    self[obj.method]();
                }
            }
        };

        window.addEventListener('message', function(obj) {
            factory(obj.data ? obj.data : obj);
        });

        chrome.runtime.onConnect.addListener(function(port) {
            window.port = port;

            port.onMessage.addListener(function (obj) {
                factory(obj);
            })
        });
    },

    pushWidget: function(data) {
        let curr_app = {
            name: 'Unknown',
            version: {last: '1.0.0', curr: false}
        };

        this.appsData.forEach(function(app) {
            app.aliases.forEach(function (alias) {
                if (data.app_name.toLowerCase().indexOf(alias) + 1) {
                    curr_app = app;
                }
            });
        });

        if (data.app_name && curr_app.name === 'Unknown') {
            curr_app.name = data.app_name;
        }

        if (data.app_type !== "CodeCanyon") {
            curr_app.version.curr = curr_app.version.last;
        }

        let widgetData = {
            id: this.widgetsCounter++,
            settings: data.settings,
            $el: data.$el,
            app_type: data.app_type,
            app_slug: curr_app.slug,
            app_name: curr_app.name,
            version: curr_app.version
        };

        if (data.publicID) {
            widgetData.publicID = data.publicID;
        }

        this.widgetsData.push(widgetData);
    },

    collectWidgets: function() {
        let self = this;

        // @TODO jQuery widgets support
        // @TODO Weebly Apps widgets support
        // @TODO old Weebly InstaShow widgets support https://elf-test-2.weebly.com/
        // @TODO separate spaghetti with methods

        let $curr, regMatches, publicID;

        let $divs = document.getElementsByTagName('div');

        for (let i = 0; i < $divs.length; i++) {
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
                    app_type: 'Elfsight Apps',
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
                    app_type: 'Shopify',
                    // shop: Shopify.shop // @TODO wait until Shopify can be accessed
                    settings: {"widgetData": "currently unavailable for shopify"}, // @TODO remove temp
                    $el: $curr
                });

                publicID = null;
            }

            self.checkDataAttr($curr);
        }

        self.checkTagNames();

        self.collectWidgetsData();
    },

    collectScripts: function() {
        let self = this;

        let version = false;
        let $scripts = document.getElementsByTagName('script');

        for (let i = 0; i < $scripts.length; i++) {
            let $curr = $scripts[i];

            let src = $curr.getAttribute('src');
            if (src) {
                self.appsData.forEach(function(app) {
                    app.aliases.forEach(function(alias) {
                        if (src.indexOf(alias) + 1) {
                            version = src.split('?ver=')[1];

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
        let xhr = new XMLHttpRequest();

        xhr.open('GET', src, false); // @TODO async && fix on localhost
        xhr.send();

        if (xhr.status === 200) {
            let versionCopyrightRegex = /version:\s?(.*)/i;
            let versionCodeRegex = /version:"(.*?)"/;

            let matches, copyrightVersion, codeVersion;

            matches = xhr.responseText.match(versionCopyrightRegex);
            if (matches) {
                copyrightVersion = xhr.responseText.match(versionCopyrightRegex)[1];
            }

            matches = xhr.responseText.match(versionCodeRegex);
            if (matches) {
                codeVersion = xhr.responseText.match(versionCodeRegex)[1];
            }

            return copyrightVersion ? copyrightVersion : codeVersion;
        }

        return false;
    },

    /**
     * OLD EAPPS
     */
    checkTagNames: function () {
        let self = this;

        let $tags = document.getElementsByTagName('elfsight-app');

        for (let i = 0; i < $tags.length; i++) {
            let $curr = $tags[i];

            self.widgets.push({
                app_type: 'Elfsight Apps',
                $el: $curr,
                publicID: $curr.dataset.id
            });
        }
    },

    /**
     * data-is, data-it, data-yt
     */
    checkDataAttr: function ($curr) {
        let self = this;

        let dataset = $curr.dataset,
            dataset_keys = Object.keys(dataset);

        let settings = {},
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
                for (let i = 1; i < dataset_keys.length; i++) {
                    let option = dataset_keys[i].replace(data_prefix, '').toLowerCase();

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
        let self = this;

        for (let i = 0; i < self.widgets.length; i++) {
            let widget = self.widgets[i];

            if (widget.app_type === 'Elfsight Apps' || widget.app_type === 'Shopify') {
                self.getPlatformData(widget);
            }
        }
    },

    // @TODO refactor, try to catch network requests with chrome.webRequest
    getPlatformData: function (widget) {
        let self = this;

        let platformUrl;
        if (widget.app_type === 'Elfsight Apps') {
            platformUrl = self.eappsUrl + '&w=' + widget.publicID;
        } else if (widget.app_type === 'Shopify' && widget.shop) {
            platformUrl = self.eappsUrl + '&shop=' + widget.shop + '&w=' + widget.publicID; // @TODO wait until can get shop
        }

        if (platformUrl) {
            let xhr = new XMLHttpRequest();

            xhr.open('GET', platformUrl, false); // @TODO async & send for all (batch) eapps widgets
            xhr.send();

            if (xhr.status === 200) {
                let responseRegex = /\/\*\*\/collect\((.*)\);/;
                let responseJSON = JSON.parse(xhr.responseText.match(responseRegex)[1]);
                let responseWidget = responseJSON.data.widgets[widget.publicID];

                if (responseWidget.status) {
                    self.pushWidget({
                        publicID: widget.publicID,
                        app_type: widget.app_type,
                        app_name: responseWidget.data.app,
                        settings: responseWidget.data.settings,
                        $el: widget.$el
                    })
                }

            }
        }
    },

    wrapWidgets: function () {
        let self = this;

        for (let i = 0; i < self.widgetsData.length; i++) {
            if (!self.widgetsData[i].wrapped) {
                let app_name = self.widgetsData[i].app_name,
                    $curr = self.widgetsData[i].$el,
                    $wrap = document.createElement('div'),
                    $label = document.createElement('div');

                if ($curr) {
                    $curr.parentNode.insertBefore($wrap, $curr);

                    $wrap.classList.add('elfsight-widget-wrap');
                    $wrap.appendChild($curr);
                    $wrap.appendChild($label);

                    $label.classList.add('elfsight-widget-label');
                    $label.innerHTML = app_name;

                    self.widgetsData[i].$wrap = $wrap;
                    self.widgetsData[i].wrapped = true;
                }
            }
        }
    },

    highlightWidgets: function (data) {
        for (let i = 0; i < this.widgetsData.length; i++) {
            let $wrap = this.widgetsData[i].$wrap;

            if ($wrap) {
                $wrap.classList.toggle('elfsight-widget-highlight', data.state);
            }
        }
    },

    highlightWidget: function (data) {
        let $wrap = this.widgetsData[data.id].$wrap;

        if ($wrap) {
            $wrap.classList.toggle('elfsight-widget-highlight', data.state);
        }
    },

    moveToWidget: function (data) {
        let $wrap = this.widgetsData[data.id].$wrap;

        $wrap.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center"
        });
    },

    logWidgetsData: function () {
        for (let i = 0; i < this.widgetsData.length; i++) {
            let widget = this.widgetsData[i];

            console.log('\n----------------| ' + widget.app_name + ' detected' + ' |----------------');

            Object.keys(widget).forEach(function (key) {
                let value = widget[key];

                console.log(format_key(key), value, '\n');
            });

            console.log('---------------------------------------------' + widget.app_name.replace(/./g, '-') + '\n\n');

            function format_key (key) {
                for (let i = 0; i < 10 - key.trim().length; i++) {
                    key = ' ' + key;
                }

                return key + ':';
            }
        }
    },

    getWidgetsData: function () {
        port.postMessage({method: 'returnWidgetsData', data: this.widgetsData});
    }
};

ewiInject = new ewiInjectClass();
ewiInject.init();