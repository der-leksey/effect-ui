//const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const vendorPath = path.resolve(__dirname, './vendor');

module.exports = (env, argv) => {

    const entry = {}

    const plugins = [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'ef.bundle.min.css',
        })
    ];

    if (argv.mode === 'production') {
		entry['ef.bundle.min'] = './index.js',
        entry.polyfills = './polyfills.js';
        /** копируем библиотеки */
        plugins.push(
            new CopyPlugin({
                patterns: [
                    { from: 'node_modules/vue/dist/vue.min.js', to: vendorPath },
                    { from: 'node_modules/vue/dist/vue.js', to: vendorPath },
                    { from: 'node_modules/nouislider/distribute', to: vendorPath },
                ],
            }),
        )
    } else {
        entry['ef.bundle'] = './index.js';
	}

    return {
        entry,
        output: {
            path: path.resolve(__dirname, './dist'),
        },
        plugins,
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.css$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [require('cssnano')]
                            }
                        }
                    ],
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
   
            ],
        },
        resolve: {
            alias: {
                'vue-esm$': 'vue/dist/vue.esm.js'
            }
        }
	}
	
}