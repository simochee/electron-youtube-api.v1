const JSONP = require('node-jsonp');
const fs = require('fs');

JSONP('https://suggestqueries.google.com/complete/search', {
    client: 'firefox',
    ds: 'yt',
    q: '東京03'
}, (json) => {
    fs.writeFileSync('test.json', JSON.stringify(json, null, 2))
})

