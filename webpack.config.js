const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/scripts/entry.js',
    output: {
        path: `${__dirname}/public/js`,
        filename: 'bundle.min.js',
    },
    module: {
        preLoaders: [
            {
                test: /\.tag$/,
                exclude: /node_modules/,
                loader: 'riot-tag-loader',
                query: {
                    template: 'pug'
                }
            }
        ],
        loaders: [
            {
                test: /\.js|\.tag$/,
                exclude: /node_modules/,
                loader: 'buble-loader',
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.tag'],
    },
    plugins: [
        // new UglifyJSPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.ProvidePlugin({
            riot: 'riot',
        }),
    ],
    devtool: 'source-map',
};