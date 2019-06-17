const
    apps = [
        'instashow',
        'instalink',
        'instagram-testimonials',
        'yottie',
        'social-icons',
        'social-share-buttons',
        'facebook-feed',
        'facebook-comments',
        'facebook-like-button',
        'facebook-share-button',
        'testimonials-slider',
        'faq',
        'google-maps',
        'pricing-table',
        'contact-form',
        'form-builder',
        'twitter-feed',
        'paypal-button',
        'countdown-timer',
        'pinterest-feed',
        'facebook-reviews',
        'facebook-chat',
        'whatsapp-chat',
        'tripadvisor-reviews',
        'team-showcase',
        'yelp-reviews',
        'pdf-embed',
        'file-embed',
        'cookie-consent',
        'google-reviews',
        'age-verification',
        'portfolio',
        'booking-reviews',
        'airbnb-reviews',
        'vimeo-gallery',
        'click-to-call'
    ],
    predefinedApps = {
        'instashow': {
            aliases: ['instagramfeed', 'instagram-feed']
        }
    };

let fetchPromises = [],
    fetchedApps = [];

apps.forEach((alias) => {
    const appPromise =
        fetch(`https://apps.elfsight.com/api/v1/public/applications/${alias}`)
            .then(response => response.json())
            .then(res => {
                const data = res.data;

                if (data) {
                    fetchedApps.push(data)
                }
            });

    fetchPromises.push(appPromise);
});

Promise.all(fetchPromises).finally(() => {
    const getAliases = (alias, name) => {
        return predefinedApps[alias] && predefinedApps[alias].aliases ? predefinedApps[alias].aliases.concat([alias, name]) : [alias, name]
    };

    const formattedApps = fetchedApps.map((app) => {
        return {
            name: app.name,
            slug: app.alias,
            aliases: getAliases(app.alias, app.name),
            version: {
                last: app.version ? app.version : '1.0.0'
            },
            icon: app.icon
        }
    });

    chrome.storage.local.set({'apps': formattedApps});
});
