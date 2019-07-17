import './content.styl';

class Content {
    constructor() {
        this.debug = true;

        this.widgets = [];
        this.widgetsCounter = 0;

        this.eappsRegex = /^elfsight-app-(.*)$/;
        this.eappsUrl = 'https://apps.elfsight.com/p/boot/?callback=collect';

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
        });
    }

    injectScript(src, callback) {
        let script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', src);

        script.onload = () => {
            callback && callback();
        };

        document.head.appendChild(script);
    }

    getApp(data) {
        let name = data.app_slug || data.app_name || data.element_id.replace(/eapps-(.*)-\d*/, '$1');
        let type = data.app_type || data.platform && {'eapps': 'Elfsight Apps', 'esapps': 'Shopify', 'cc': 'CodeCanyon'}[data.platform];

        let app = {
            name: name || null,
            type: type || null,
            version: {last: '1.0.0', curr: data.version || false}
        };

        if (!name) {
            return app;
        }

        this.appsData.forEach((item) => {
            item.aliases.forEach((alias) => {
                if (!!~alias.indexOf(name.toLowerCase())) {
                    return app = Object.assign(app, item);
                }
            });
        });

        if (data.platform !== 'cc') {
            app.version.curr = app.version.last;
        }

        return app;
    }

    pushWidget(data) {
        const app = this.getApp(data);

        let element = data.element;

        if (!element && data.element_id) {
            element = document.getElementById(data.element_id);
        }

        let widgetData = {
            id: this.widgetsCounter++,
            settings: data.settings,
            element: element,
            app: app
        };

        if (data.public_id) {
            widgetData.public_id = data.public_id;
        }

        if (this.debug) {
            this.logWidgetData(widgetData);
        }

        this.widgetsData.push(widgetData);

        widgetData.wrapper = this.wrapWidget(widgetData);

        this.postMessageWidgetsData();
    }

    /**
     * data-is, data-it, data-yt
     */

    // @TODO move into inject
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
                    element: $curr
                });
            }
        }
    }

    wrapWidget(widget) {
        let wrapper = document.createElement('div'),
            label = document.createElement('div');

        if (widget.element) {
            widget.element.parentNode.insertBefore(wrapper, widget.element);

            wrapper.classList.add('ceewi-wrap');
            wrapper.appendChild(widget.element);
            wrapper.appendChild(label);

            label.classList.add('ceewi-label');
            label.innerHTML = widget.app.name;
        }

        return wrapper;
    }

    logWidgetData(widget) {
        const formatKeyOut = (key) => {
            for (let i = 0; i < 10 - key.trim().length; i++) {
                key = ' ' + key;
            }

            return key + ':';
        };

        console.log('\n----------------| ' + widget.app_name + ' detected' + ' |----------------');

        Object.keys(widget).forEach((key) => {
            let value = widget[key];

            console.log(formatKeyOut(key), value, '\n');
        });

        if (widget.app_name !== undefined) {
            console.log('---------------------------------------------' + widget.app_name.replace(/./g, '-') + '\n\n');
        } else {
            console.log('------------------------------------------------------' + '\n\n');
        }
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

    postMessageWidgetFromPage(widget) {
        this.pushWidget(widget);
    }

    postMessagePlatformWidget(widget) {
        this.pushWidget(widget);
    }

    postMessageWidgetsData() {
        if (this.port) {
            this.port.postMessage({method: 'postMessageReturnWidgetsData', data: this.widgetsData});
        }
    }

    postMessageHighlightWidget(data) {
        let wrapper = this.widgetsData[data.id].wrapper;

        if (wrapper) {
            wrapper.classList.toggle('ceewi-highlight', data.state);
        }
    }

    postMessageMoveToWidget(data) {
        let element = this.widgetsData[data.id].element;

        element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
        });
    }

    utilsSetManagedStore(data) {
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
