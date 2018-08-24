if (window.jQuery) {
    jQuery(function() {
        var widgetsData = [];
        var optionsRegExp = /^elfsight(.*?)Options$/;

        jQuery('div').each(function() {
            var self = this;
            var data = jQuery(this).data();

            if (!jQuery.isEmptyObject(data)) {
                Object.keys(data).forEach(function(key) {
                    if (key.match(optionsRegExp)) {
                        widgetsData.push({
                            func: Object.keys(data)[0],
                            el_id: jQuery(self).attr('id'),
                            settings: JSON.parse(decodeURIComponent(data[key]))
                        })
                    }
                })
            }
        });

        window.postMessage({
            'method': 'getDataFromContent',
            'data': widgetsData
        }, '*');
    });
}