var apps = [{
    slug: 'instagram-feed',
    name: 'Instagram Feed',
    func: 'EappsInstagramFeed',
    aliases: ['instagramfeed', 'instashow']
}, {
    slug: 'instalink',
    name: 'Instagram Widget',
    func: 'instalink'
}, {
    slug: 'instagram-testimonials',
    name: 'Instagram Testimonials',
    func: 'EappsInstagramTestimonials'
}, {
    slug: 'yottie',
    name: 'Yottie',
    func: 'yottie'
}, {
    slug: 'google-maps',
    name: 'Google Maps',
    func: 'EappsGoogleMaps'
}, {
    slug: 'pricing-table',
    name: 'Pricing Table',
    func: 'EappsPricingTable'
}, {
    slug: 'social-icons',
    name: 'Social Media Icons',
    func: 'EappsMediaIcons'
}, {
    slug: 'social-share-buttons',
    name: 'Social Share Buttons',
    func: 'EappsSocialShareButtons'
}, {
    slug: 'facebook-feed',
    name: 'Facebook Feed',
    func: 'EappsFacebookFeed'
}, {
    slug: 'facebook-comments',
    name: 'Facebook Comments',
    func: 'EappsFacebookComments'
}, {
    slug: 'facebook-like-button',
    name: 'Facebook Like Button',
    func: 'EappsFacebookLikeButton'
}, {
    slug: 'facebook-share-button',
    name: 'Facebook Share Button',
    func: 'EappsFacebookShareButton'
}, {
    slug: 'testimonials-slider',
    name: 'TestimonialsSlider',
    func: 'EappsTestimonialsSlider'
}, {
    slug: 'faq',
    name: 'FAQ',
    func: 'EappsFaq'
}, {
    slug: 'contact-form',
    name: 'Contact Form',
    func: 'EappsContactForm'
}, {
    slug: 'form-builder',
    name: 'Form Builder',
    func: 'EappsFormBuilder'
}, {
    slug: 'twitter-feed',
    name: 'Twitter Feed',
    func: 'EappsTwitterFeed'
}, {
    slug: 'paypal-button',
    name: 'PayPal Button',
    func: 'EappsPaypalButton'
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