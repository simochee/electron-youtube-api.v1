player-controller(data-hide="{isHide}")
    .player-controller
        .controller-top
            .player-time {current ? convertTime(current) : '0:00'}
            .progress-bar
                .seek-bar(style="width: {seek * 100}%")
                .position-bar(style="width: {current / duration * 100}%")
            .player-time {duration ? convertTime(duration - current) : '0:00'}
        .controller-button
            .left
                button.button-icon(type="button"): span.fa.fa-lock
                button.button-icon.active(type="button"): span.fa.fa-repeat
            .center
                button.button-icon.button-large(type="button"): span.fa.fa-backward
                button.button-icon.button-large(type="button"): span.fa.fa-play
                button.button-icon.button-large(type="button"): span.fa.fa-forward
            .right
                button.button-icon(type="button"): span.fa.fa-arrows-alt
    
    script(type="es6").

        //- 整数を０埋めする
        const zero = (num, lv) => {
            return `0000000000${num}`.slice(-2)
        }

        //- 秒を mm:ss に変換
        this.convertTime = (_sec) => {
            const min = Math.floor(_sec / 60)
            const sec = Math.floor(_sec % 60)
            return `${min}:${zero(sec)}`
        }

        //- UIを隠す
        obs.on('hidePlayerUI', () => {
            this.isHide = true
            this.update()
        })

        //- UIを表示する
        obs.on('showPlayerUI', () => {
            this.isHide = false
            this.update()
        })

        // バッファ進捗
        obs.on('video:buffer', (seek) => {
            this.seek = seek
            this.update()
        })

        // 再生位置
        obs.on('video:currentTime', (time) => {
            this.current = time
            this.update()
        })

        // 動画の長さ（once）
        obs.on('video:duration', (time) => {
            this.duration = time
            this.update()
        })