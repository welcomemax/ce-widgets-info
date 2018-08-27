if (window.jQuery) {
    jQuery(function() {
        const optionsRegExp = /^elfsight(.*?)Options$/;
        let widgetsData = [];

        setTimeout(() => {
            jQuery('div').each(function() {
                let self = this;
                let data = jQuery(this).data();

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

            if (widgetsData) {
                window.postMessage({
                    'method': 'getDataFromContent',
                    'data': widgetsData
                }, '*');
            }
        }, 1000);
    });
}