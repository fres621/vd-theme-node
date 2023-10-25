const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
        canvas: './static/js/render/canvas.js',
        editor: './static/js/editor/index.js'
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './static/canvas.html',
            filename: 'canvas.html',
            chunks: ['canvas'],
        }),
        new HtmlWebpackPlugin({
            template: './static/index.html',
            filename: 'index.html',
            chunks: ['editor'],
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './static/assets', to: 'assets' }
            ]
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './static/favicon.ico', to: 'favicon.ico' }
            ]
        })
    ],
    devServer: {
        compress: true,
        port: 4000,
    },
};
