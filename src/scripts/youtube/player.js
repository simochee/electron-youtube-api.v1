/**
 * YouTube iframeプレイヤー
 */
class Player {
    /**
     * 各種変数宣言
     */
    constructor() {
        this.api = require('youtube-player');
    }
    /**
     * プレイヤーを初期化
     * @param {string} elem : プレイヤーを表示する要素
     */
    init(elem) {
        this.player = this.api(elem, {
            
        })
    }
}

module.exports = new Player();
