(function() {
    "use strict";

    let widgets = document.querySelectorAll('.elfsight-widget');
    let widgetsData = [];

    Array.prototype.slice.call(widgets).forEach((widget) => {
        let widgetData = widget.data;

        widgetsData.push({
            version: widgetData.version,
            settings: widgetData.options,
            id: widget.getAttribute('id')
        })
    });

    if (widgetsData) {
        window.postMessage({
            'method': 'getDataFromContent',
            'data': widgetsData
        }, '*');
    }
})();
