const path = require('path');
const webpack = require('webpack');

const IS_DEV = (process.env.NODE_ENV === 'dev');

module.exports = function() {
    const config = {
        devtool: IS_DEV ? 'source-map' : undefined,

        entry: {
            popup: path.join(__dirname, 'src/popup/popup.js'),
            background: path.join(__dirname, 'src/bg/background.js'),
            inject: path.join(__dirname, 'src/inject/inject.js'),
            content: path.join(__dirname, 'src/content/content.js'),
            options: path.join(__dirname, 'src/options/options.js')
        },

        output: {
            path: path.join(__dirname, 'extension/dist'),
            filename: '[name].js'
        },

        resolve: {
            modules: [
                'node_modules'
            ]
        },

        plugins: [
            new webpack.DefinePlugin({
                IS_DEV: IS_DEV
            })
        ],

        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    // exclude: /(node_modules)/,
                    options: {
                        compact: true
                    }
                },
                {
                    test: /\.styl/,
                    use: [
                        'style-loader',
                        'css-loader?-url',
                        {
                            loader: 'stylus-loader',
                            options: {
                                'include css': true
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    loader: ['style-loader', 'css-loader']
                },
                // {
                //     test: /\.svg/,
                //     use: {
                //         loader: 'svg-url-loader',
                //         options: {}
                //     }
                // },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'file-loader',
                    options: {
                        name: 'assets/[name].[ext]'
                    }
                },
                {
                    test: /\.(jpe?g|png|gif)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                },
                {
                    test: /\.html$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }
            ]
        }
    };

    if (!IS_DEV) {
        config.plugins.push(
            // new UglifyJsPlugin({
            //     parallel: true,
            //     uglifyOptions: {
            //         warnings: false
            //     }
            // })
        );
    }

    return config;
};