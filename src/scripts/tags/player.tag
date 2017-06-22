app-player

    #player

    player-controller

    script(type="es6").
        require('./player/controller')
    
        const Player = require('youtube-player')
        const YouTube = require('../youtube')

        let player

        // 動画情報を取得
        YouTube.getInfo((opts.videoId))
            .then((result) => {
                obs.trigger('setTitle', result.items[0].snippet.title)
            })

        obs.trigger('changeMode', 'player');

        let unmounted = false
        this.on('mount', () => {
            // 動画を取得
            player = Player('player', {
                videoId: opts.videoId,
                playerVars: {
                    // 自動再生
                    autoplay: 1,
                    // デフォルトUIを表示しない
                    controls: 0,
                    // 動画アノテーションを表示しない
                    iv_load_polify: 3,
                    // Youtubeのロゴを表示しない
                    modestbranding: 1,
                    // 動画情報を表示しない
                    showinfo: 0,
                    // 関連動画を表示しない
                    rel: 0,
                }
            })

            player.getDuration()
                .then((time) => {
                    obs.trigger('video:duration', time)
                })

            let timestamp = new Date()
            let isHide = false
            document.body.addEventListener('mousemove', (e) => {
                timestamp = new Date()
                if(isHide) {
                    obs.trigger('showPlayerUI')
                }
                isHide = false
            });
            
            let buffered
            let currentTime
            const timer = () => {
                // コントローラとヘッダを隠す
                if(new Date() - timestamp > 2400) {
                    obs.trigger('hidePlayerUI')
                    isHide = true
                }
                // 動画のバッファ進捗
                player.getVideoLoadedFraction()
                    .then((seek) => {
                        if(buffered != seek) {
                            obs.trigger('video:buffer', seek)
                            buffered = seek
                        }
                    })
                // 動画の再生位置
                player.getCurrentTime()
                    .then((time) => {
                        if(currentTime != time) {
                            obs.trigger('video:currentTime', time)
                            currentTime = time
                        }
                    })
                if(!unmounted) {
                    requestAnimationFrame(timer)
                }
            }

            timer()
            
        })

        this.on('unmount', () => {
            unmounted = true
        })


