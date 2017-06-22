const route = require('riot-route').default;

/**
 * ホーム
 */
require('../tags/index');
route('/', () => {
    riot.mount('router', 'app-index');
});

/**
 * 動画検索
 */
require('../tags/search');
route('/search/*', (term) => {
    riot.mount('router', 'app-search', {
        term,
    });
});

/**
 * プレイヤー
 */
require('../tags/player');
route('/player/*', (videoId) => {
    riot.mount('router', 'app-player', {
        videoId,
    });
    top.obs.trigger('changePage', 'player');
});

module.exports = {
    start: () => {
        route.start(true);
    },
};
