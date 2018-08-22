var apps = [{
    slug: 'instagram-feed',
    name: 'Instagram Feed',
    func: 'EappsInstagramFeed',
    aliases: ['instagramfeed', 'instashow']
}, {
    slug: 'instalink',
    name: 'Instagram Widget'
}, {
    slug: 'instagram-testimonials',
    name: 'Instagram Testimonials'
}, {
    slug: 'yottie',
    name: 'Yottie'
}, {
    slug: 'google-maps',
    name: 'Google Maps',
    func: 'EappsGoogleMaps'
}, {
    slug: 'pricing-table',
    name: 'Pricing Table'
}, {
    slug: 'social-icons',
    name: 'Social Media Icons'
}, {
    slug: 'social-share-buttons',
    name: 'Social Share Buttons'
}, {
    slug: 'facebook-feed',
    name: 'Facebook Feed'
}, {
    slug: 'facebook-comments',
    name: 'Facebook Comments'
}, {
    slug: 'facebook-like-button',
    name: 'Facebook Like Button'
}, {
    slug: 'facebook-share-button',
    name: 'Facebook Share Button'
}, {
    slug: 'contact-form',
    name: 'Contact Form'
}];

function formatAppsData(apps) {
    return apps.map(function(app) {
        return {
            name: app.name,
            slug: app.slug,
            func: app.func,
            aliases: app.aliases ? app.aliases.concat([app.slug, app.name]) : [app.slug, app.name],
            type: '',
            version: {
                curr: false,
                last: app.version ? app.version : '1.0.0'
            }
        }
    });
}

chrome.storage.sync.set({'apps': formatAppsData(apps)}, function() {});