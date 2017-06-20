const route = require('riot-route');

/**
 * ホーム画面
 */
require('../pages/home.tag');
route('/', () => {
    riot.mount('app', 'home');
});

exports.start = () => {
    route.start(true);
};
