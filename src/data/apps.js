var apps = [{
    app_slug: 'instagram-feed',
    app_name: 'Instagram Feed',
    app_type: '',
    aliases: {
        names: ['instagramfeed', 'instashow'],
        src: ['instashow']
    },
    version: {
        last: '3.1.1',
        curr: false
    }
}, {
    app_slug: 'instalink',
    app_name: 'Instagram Widget',
    app_type: '',
    aliases: {
        names: [],
        src: []
    },
    version: {
        last: '2.3.1',
        curr: false
    }
}, {
    app_slug: 'instagram-testimonials',
    app_name: 'Instagram Testimonials',
    app_type: '',
    aliases: {
        names: [],
        src: []
    },
    version: {
        last: '1.0.0',
        curr: false
    }
}, {
    app_slug: 'yottie',
    app_name: 'Yottie',
    app_type: '',
    aliases: {
        names: [],
        src: []
    },
    version: {
        last: '2.6.0',
        curr: false
    }
}, {
    app_slug: 'google-maps',
    app_name: 'Google Maps',
    app_type: '',
    aliases: {
        names: [],
        src: []
    },
    version: {
        last: '1.1.0',
        curr: false
    }
}, {
    app_slug: 'pricing-table',
    app_name: 'Pricing Table',
    app_type: '',
    aliases: {
        names: [],
        src: []
    },
    version: {
        last: '2.0.0',
        curr: false
    }
}, {
    app_slug: 'social-icons',
    app_name: 'Social Media Icons',
    app_type: '',
    aliases: {
        names: [],
        src: []
    },
    version: {
        last: '1.1.1',
        curr: false
    }
}, {
    app_slug: 'social-share-buttons',
    app_name: 'Social Share Buttons',
    app_type: '',
    aliases: {
        names: [],
        src: []
    },
    version: {
        last: '1.0.1',
        curr: false
    }
}, {
    app_slug: 'facebook-feed',
    app_name: 'Facebook Feed',
    app_type: '',
    aliases: {
        names: [],
        src: []
    },
    version: {
        last: '1.3.0',
        curr: false
    }
}, {
    app_slug: 'facebook-comments',
    app_name: 'Facebook Comments',
    app_type: '',
    aliases: {
        names: [],
        src: []
    },
    version: {
        last: '1.0.0',
        curr: false
    }
}, {
    app_slug: 'facebook-like-button',
    app_name: 'Facebook Like Button',
    app_type: '',
    aliases: {
        names: [],
        src: []
    },
    version: {
        last: '1.0.0',
        curr: false
    }
}, {
    app_slug: 'facebook-share-button',
    app_name: 'Facebook Share Button',
    app_type: '',
    aliases: {
        names: [],
        src: []
    },
    version: {
        last: '1.0.0',
        curr: false
    }
}, {
    app_slug: 'contact-form',
    app_name: 'Contact Form',
    app_type: '',
    aliases: {
        names: [],
        src: []
    },
    version: {
        last: '1.0.0',
        curr: false
    }
}];

function formatAppsData (data) {


    return data;
}

chrome.storage.sync.set({'apps': formatAppsData(apps)}, function() {});