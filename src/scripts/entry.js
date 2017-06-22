top.ipc = require('electron').ipcRenderer;
top.obs = riot.observable();

/**
 * ベースのタグをマウント
 */
require('./tags/app');
riot.mount('app');

/**
 * ルーティングを開始する
 */
const routes = require('./routes');
routes.start();
