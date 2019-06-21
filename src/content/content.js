import './content.styl';

class Content {
    constructor() {
        this.debug = true;

        this.widgets = [];
        this.widgetsCounter = 0;

        this.eappsRegex = /^elfsight-app-(.*)$/;
        this.esappsRegex = /^elfsight-sapp-(.*)$/;
        this.optionsRegex = /^elfsight(.*?)Options$/;

        this.eappsUrl = 'https://apps.elfsight.com/p/boot/?callback=collect';
        this.esappsUrl = 'https://shy.elfsight.com/p/boot/?callback=collect';

        this.widgetsData = [];

        this.port = false;

        this.pageData = {
            url: '',
            cms: ''
        };

        this.appsData = [];

        this.init();
    }

    init() {
        this.injectScript(chrome.runtime.getURL('dist/inject.js'));

        chrome.storage.local.get((data) => {
            this.appsData = data.apps;

            this.postMessageFactory();

            this.collectScripts();
            this.collectWidgets();

            // @TODO init wrap on popup open
            this.wrapWidgets();

            if (this.debug) {
                this.logWidgetsData();
            }
        });
    }

    injectScript(src, callback) {
        let script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', src);

        // script.onload = () => {
        //     callback();
        // };

        document.head.appendChild(script);
    }

    getDataFromContent(data) {
        data.forEach((widget) => {
            this.pushWidget(Object.assign(widget, {
                app_type: 'CodeCanyon',
                app_name: widget.id,
                $el: document.getElementById(widget.id)
            }));
        });

        this.wrapWidgets();
        this.getWidgetsData();
    }

    postMessageFactory() {
        const factory = (obj) => {
            if (obj && obj.method) {
                if (obj.data) {
                    this[obj.method](obj.data);
                } else {
                    this[obj.method]();
                }
            }
        };

        window.addEventListener('message', (obj) => {
            factory(obj.data ? obj.data : obj);
        });

        chrome.runtime.onConnect.addListener((port) => {
            this.port = port;

            this.port.onMessage.addListener((obj) => {
                factory(obj);
            })
        });
    }

    getApp(name, type) {
        let app = {
            name: name,
            type: type,
            version: {last: '1.0.0', curr: false},
        };

        this.appsData.forEach((item) => {
            item.aliases.forEach((alias) => {
                if (!!~name.toLowerCase().indexOf(alias)) {
                    return app = Object.assign(app, item);
                }
            });
        });

        if (type !== "CodeCanyon") {
            app.version.curr = app.version.last;
        }

        return app;
    }

    pushWidget(data) {
        const app = this.getApp(data.app_name, data.app_type);

        let widgetData = {
            id: this.widgetsCounter++,
            settings: data.settings,
            $el: data.$el,
            app: app
        };

        if (data.publicID) {
            widgetData.publicID = data.publicID;
        }

        this.widgetsData.push(widgetData);
    }

    collectWidgets() {
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
            regMatches = $curr.className.match(this.eappsRegex);
            if (regMatches) {
                publicID = regMatches[1];
            }

            if (publicID) {
                this.widgets.push({
                    app_type: 'Elfsight Apps',
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
                this.pushWidget({
                    publicID: publicID,
                    app_type: 'Shopify',
                    settings: {
                        "widgetData": "currently unavailable for Shopify"
                    },
                    $el: $curr
                });

                publicID = null;
            }

            this.checkDataAttr($curr);
        }

        this.checkTagNames();

        this.collectWidgetsData();
    }

    collectScripts() {
        let version = false;
        let $scripts = document.getElementsByTagName('script');

        for (let i = 0; i < $scripts.length; i++) {
            let $curr = $scripts[i];
            let src = $curr.getAttribute('src');

            if (src) {
                this.appsData.forEach((app) => {
                    app.aliases.forEach((alias) => {
                        if (src.indexOf(alias) + 1) {
                            version = src.split('?ver=')[1];

                            if (version) {
                                app.version.curr = version;
                            } else {
                                app.version.curr = this.parseScriptVersion(src);
                            }
                        }
                    })
                });
            }
        }
    }

    parseScriptVersion(src) {
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
    }

    /**
     * OLD EAPPS
     */
    checkTagNames() {
        let $tags = document.getElementsByTagName('elfsight-app');

        for (let i = 0; i < $tags.length; i++) {
            let $curr = $tags[i];

            this.widgets.push({
                app_type: 'Elfsight Apps',
                $el: $curr,
                publicID: $curr.dataset.id
            });
        }
    }

    /**
     * data-is, data-it, data-yt
     */
    checkDataAttr($curr) {
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

                this.pushWidget({
                    app_type: 'data-' + data_prefix,
                    app_name: app_name,
                    settings: settings,
                    $el: $curr
                });
            }
        }
    }

    collectWidgetsData() {
        for (let i = 0; i < this.widgets.length; i++) {
            let widget = this.widgets[i];

            if (widget.app_type === 'Elfsight Apps' || widget.app_type === 'Shopify') {
                this.getPlatformData(widget);
            }
        }
    }

    // @TODO refactor, try to catch network requests with chrome.webRequest
    getPlatformData(widget) {
        let platformUrl;
        if (widget.app_type === 'Elfsight Apps') {
            platformUrl = this.eappsUrl + '&w=' + widget.publicID;
        } else if (widget.app_type === 'Shopify' && widget.shop) {
            platformUrl = this.eappsUrl + '&shop=' + widget.shop + '&w=' + widget.publicID; // @TODO wait until can get shop
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
                    this.pushWidget({
                        publicID: widget.publicID,
                        app_type: widget.app_type,
                        app_name: responseWidget.data.app,
                        settings: responseWidget.data.settings,
                        $el: widget.$el
                    })
                }

            }
        }
    }

    wrapWidgets() {
        for (let i = 0; i < this.widgetsData.length; i++) {
            if (!this.widgetsData[i].wrapped) {
                let app_name = this.widgetsData[i].app_name,
                    $curr = this.widgetsData[i].$el,
                    $wrap = document.createElement('div'),
                    $label = document.createElement('div');

                if ($curr) {
                    $curr.parentNode.insertBefore($wrap, $curr);

                    $wrap.classList.add('elfsight-widget-wrap');
                    $wrap.appendChild($curr);
                    $wrap.appendChild($label);

                    $label.classList.add('elfsight-widget-label');
                    $label.innerHTML = app_name;

                    this.widgetsData[i].$wrap = $wrap;
                    this.widgetsData[i].wrapped = true;
                }
            }
        }
    }

    highlightWidgets(data) {
        for (let i = 0; i < this.widgetsData.length; i++) {
            let $wrap = this.widgetsData[i].$wrap;

            if ($wrap) {
                $wrap.classList.toggle('elfsight-widget-highlight', data.state);
            }
        }
    }

    highlightWidget(data) {
        let $wrap = this.widgetsData[data.id].$wrap;

        if ($wrap) {
            $wrap.classList.toggle('elfsight-widget-highlight', data.state);
        }
    }

    moveToWidget(data) {
        let $wrap = this.widgetsData[data.id].$wrap;

        $wrap.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center"
        });
    }

    logWidgetsData() {
        for (let i = 0; i < this.widgetsData.length; i++) {
            let widget = this.widgetsData[i];

            console.log('\n----------------| ' + widget.app_name + ' detected' + ' |----------------');

            Object.keys(widget).forEach((key) => {
                let value = widget[key];

                console.log(this.formatKeyOut(key), value, '\n');
            });

            if (widget.app_name !== undefined) {
                console.log('---------------------------------------------' + widget.app_name.replace(/./g, '-') + '\n\n');
            } else {
                console.log('------------------------------------------------------' + '\n\n');
            }
        }
    }

    formatKeyOut(key) {
        for (let i = 0; i < 10 - key.trim().length; i++) {
            key = ' ' + key;
        }

        return key + ':';
    }

    getWidgetsData() {
        if (this.port) {
            this.port.postMessage({method: 'returnWidgetsData', data: this.widgetsData});
        }
    }

    setManagedStore(data) {
        let shop_domain_input = document.getElementById('shop_domain'),
            collaborator_message_input = document.getElementById('collaborator_relationship_request_message');

        shop_domain_input.value = data.store_url;
        collaborator_message_input.value = data.message;

        data.permissions.forEach((permission) => {
            let collaborator_relationship_inputs = document.querySelectorAll('input[name="collaborator_relationship[allow_' + permission + ']"]');

            collaborator_relationship_inputs.forEach((input) => {
                input.checked = true;
            })
        });
    }
}

new Content();
