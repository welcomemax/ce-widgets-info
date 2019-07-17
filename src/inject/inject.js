class Inject {
    constructor() {
        this.esappsRegex = /^elfsight-sapp-(.*)$/;
        this.eappsRegex = /^elfsight-app-(.*)$/;

        this.init();
    }

    init() {
        this.lookupCCApps();
        // this.lookupPlatformApps();
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

    lookupPlatformApps() {
        let divs = document.getElementsByTagName('div');

        for (let i = 0; i < divs.length; i++) {
            const currentDiv = divs[i];
            let type, publicID;

            let esappsRegMatches = currentDiv.className.match(this.esappsRegex);
            if (esappsRegMatches && esappsRegMatches[1]) {
                type = 'Shopify';
                publicID = esappsRegMatches[1];
            }

            let eappsRegMatches = currentDiv.className.match(this.eappsRegex);
            if (eappsRegMatches && eappsRegMatches[1]) {
                type = 'Elfsight Apps';
                publicID = eappsRegMatches[1];
            }

            if (publicID) {
                this.awaitElementData(currentDiv).then(data => {
                    this.postMessage({
                        public_id: publicID,
                        app_type: type,
                        settings: data.options,
                        element_id: currentDiv.getAttribute('id'),
                    });
                })
            }
        }
    }

    awaitElementData(element) {
        let awaitInterval = null;

        return new Promise(resolve => {
            awaitInterval = setInterval(() => {
                if (element.data) {
                    clearInterval(awaitInterval);
                    return resolve(element.data);
                }
            }, 1000)
        })
    }
}

new Inject();
