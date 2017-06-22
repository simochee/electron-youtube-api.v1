app-header(data-mode="{mode}" data-hide="{isHide}")
    h1 {title}
    nav.header-nav
        .nav-search
            button(onclick="{changeModeSearch}"): span.fa.fa-search
            form(onsubmit="{search}")
                input#searchInput(type="search" value="旦那が何を言っているのかわからない件" onkeyup="{updateTerm}" autocomplete="on" list="searchSuggest" placeholder="検索ワード または 動画URL")
                datalist#searchSuggest
                    option(each="{item in searchSuggest}" value="{item}")
                button.submit-button(type="submit")

        button(onclick="{resetMode}"): span.fa.fa-navicon
    
    script(type="es6").
        const request = require('../../../../node_modules/superagent/lib/client')

        this.title = ''
    
        this.changeModeSearch = () => {
            this.mode = 'search'
            document.getElementById('searchInput').focus()
        }

        this.resetMode = () => {
            this.mode = null
            this.title = ''
            location.hash = '/'
        }

        this.search = (e) => {
            e.preventDefault()
            const term = e.target[0].value
            if(term !== '') {
                location.hash = `/search/${term}`
            }
        }

        //- modeの初期設定
        this.on('mount', () => {
            if(location.hash.match(/(\/)search/)) {
                this.mode = 'search'
            }
            this.update()
        })

        //- モードを変更
        obs.on('changeMode', (mode) => {
            this.mode = mode
            this.update()
        })

        //- タイトルの設定
        obs.on('setTitle', (title) => {
            this.title = title
            this.update()
        })

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

        //- オートコンプリートを更新
        this.searchSuggest = ['Hello', 'world']
        let searchedTerm
        this.updateTerm = (e) => {
            const term = e.target.value
            if(term !== '' && searchedTerm !== term) {
                searchedTerm = term
                request
                    .get('https://suggestqueries.google.com/complete/search')
                    .query({
                        client: 'firefox',
                        ds: 'yt',
                        q: term
                    })
                    .end((err, res) => {
                        const data = JSON.parse(res.text)[1]
                        this.searchSuggest = data
                        this.update()
                    })
            }
        }