const webpack = require('webpack')

module.exports = [
    {
        entry: './src/scripts/entry.js',
        output: {
            path: __dirname + '/build/js',
            filename: 'bundle.js'
        },
        target: 'electron',
        module: {
            rules: [
                {
                    test: /\.tag$/,
                    enforce: 'pre',
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'riot-tag-loader',
                            options: {
                                template: 'pug',   // テンプレートを指定（任意）
                                debug: true
                            }
                        }
                    ]
                },
                {
                    test: /\.js|\.tag$/,
                    enforce: 'post',
                    exclude: /node_modules/,
                    use: ['buble-loader']
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.tag']
        },
        plugins: [
            new webpack.ProvidePlugin({ riot: 'riot' })
        ],
        devtool: 'source-map',
    }
]