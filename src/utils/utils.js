export default class Utils {
    constructor() {

    }

    postMessageFactory(obj) {
        if (obj && obj.method) {
            if (obj.data) {
                this[obj.method](obj.data);
            } else {
                this[obj.method]();
            }
        }
    }

    getQueryParam(name, url) {
        name = name.replace(/[\[\]]/g, '\\$&');

        let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);

        if (!results) return null;
        if (!results[2]) return '';

        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
}