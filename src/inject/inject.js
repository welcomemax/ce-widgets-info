class Inject {
    constructor() {
        this.init();
    }

    init() {
        this.lookupCCApps();
        this.lookupDataAttrs();
    }

    postMessage(data) {
        if (data) {
            window.postMessage({
                'method': 'postMessageWidgetFromPage',
                'data': data
            }, '*');
        }
    }

    lookupCCApps() {
        let widgets = document.querySelectorAll('.elfsight-widget');

        Array.prototype.slice.call(widgets).forEach((widget) => {
            const widgetData = widget.data;

            this.postMessage({
                app_version: widgetData.version,
                settings: widgetData.options,
                element_id: widget.getAttribute('id'),
                app_type: 'CodeCanyon'
            })
        });
    }

    lookupDataAttrs() {
        let divs = document.querySelectorAll('div[data-is], div[data-yt], div[data-il]');

        Array.prototype.slice.call(divs).forEach((element) => {
            let dataset = element.dataset,
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
                        let option = dataset_keys[i].replace(data_prefix, '');

                        option = option.charAt(0).toLowerCase() + option.slice(1);

                        settings[option] = dataset[dataset_keys[i]];
                    }

                    this.postMessage({
                        settings: settings,
                        element_id: element.getAttribute('id'),
                        app_type: 'data-' + data_prefix,
                        app_name: app_name
                    });
                }
            }
        })
    }
}

new Inject();
