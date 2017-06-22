const YouYube = require('youtube-node');
const youTube = new YouYube;

youTube.setKey('AIzaSyBfl2CLnKQ-vixTQCpto5r2OMVpm3ONUJw');

// 動画を検索
exports.search = (opts) => {
    return new Promise((resolve, reject) => {
        if(opts.term) {
            if(opts.nextPageToken) {
                youTube.addParam('pageToken', opts.nextPageToken);
            }
            youTube.search(opts.term, 10, (err, result) => {
                if(err) {
                    reject({
                        code: 'API_ERROR',
                        error: err,
                    });
                } else {
                    resolve(result);
                }
            });
        } else {
            reject({
                code: 'NO_SEARCH_TERM',
            });
        }
    });
};

// 動画情報を取得
exports.getInfo = (videoId) => {
    return new Promise((resolve, reject) => {
        if(!videoId) {
            reject({
                code: 'NO_VIDEO_ID',
            });
        } else {
            youTube.getById(videoId, (err, result) => {
                if(err) {
                    reject({
                        code: 'API_ERROR',
                        error: err,
                    });
                } else {
                    resolve(result);
                }
            });
        }
    });
};
