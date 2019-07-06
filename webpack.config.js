const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    optimization: {
        minimizer: [
          new OptimizeCssAssetsPlugin({}),
          new UglifyJsPlugin({})
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file-loader',
                exclude: /fonts/,
                options: {
                    name: 'images/[name].[ext]'
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                loader: 'file-loader',
                exclude: /Icons/,
                options: {
                    name: 'fonts/[name].[ext]'
                },
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin ({ 
            filename: 'index.html',
            template: path.resolve(__dirname, './src/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        port: 3200,
        overlay: true,
        open: true
    }
}