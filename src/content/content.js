setTimeout(function(){
    // jQueryDefer(function() {
        jQuery(function(){
            var $divs = jQuery('div')
            var widgetsData = [];
            var optionsRegExp = /^elfsight(.*?)Options$/;

            $divs.each(function() {
                var data = jQuery(this).data();

                if (!jQuery.isEmptyObject(data)) {
                    var dataKeys = Object.keys(data);

                    // if (dataKeys.some(function(key) {
                    //         return key.match(optionsRegExp);
                    //     })) {
                    //     widgetsData[dataKeys[0]] = data;
                    // }

                    dataKeys.forEach(function(key){
                        if (key.match(optionsRegExp)) {
                            widgetsData[dataKeys[0]] = JSON.parse(decodeURIComponent(data[key]));
                        }
                    })
                }
            });

            console.log(widgetsData)

            window.postMessage({
                'method': 'test',
                'data': widgetsData
            }, '*');
        })
    // })
}, 3000)

// function jQueryDefer(callback) {
//     if (window.jQuery) {
//         callback();
//     } else {
//         setTimeout(function() {
//             jQueryDefer(callback)
//         }, 50);
//     }
// }