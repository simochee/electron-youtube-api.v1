app-search

    a(each="{item in data}" href="#/player/{item.id.videoId}")
        .thumbnail(style="background-image: url({item.snippet.thumbnails.medium.url})")
        .contents
            h2 {item.snippet.title}
            p {item.snippet.description}

    button(onclick="{moreResult}" show="{nextPageToken}" style="height: 50px") More Results

    script(type="es6").
        const YouTube = require('../youtube')
    
        this.data = [];
        this.nextPageToken = null;

        YouTube.search({ term: opts.term })
            .then((result) => {
                // 次のページのpageTokenを保持
                this.nextPageToken = result.nextPageToken

                result.items.forEach((item) => {
                    this.data.push(item)
                });

                this.update()
            });
        
        this.moreResult = () => {

            YouTube.search({ term: opts.term, nextPageToken: this.nextPageToken })
                .then((result) => {
                    // 次のページのpageTokenを保持
                    this.nextPageToken = result.nextPageToken

                    result.items.forEach((item) => {
                        this.data.push(item)
                    });

                    this.update()
                });
        }