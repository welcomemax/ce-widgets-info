fetch(`https://apps.elfsight.com/api/v1/public/applications/`)
    .then(response => response.json())
    .then(res => {
        const data = res.data;

        const apps = data.map((app) => {
            return {
                name: app.name,
                slug: app.alias,
                aliases: [app.alias, app.name],
                version: {
                    last: app.version ? app.version : '1.0.0'
                },
                icon: app.icon
            }
        });

        chrome.storage.local.set({'apps': apps});
    });
