//const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const vendorPath = path.resolve(__dirname, './vendor');

module.exports = (env, argv) => {

    const entry = {}

    const plugins = [
        new VueLoaderPlugin(),
        /*new MiniCssExtractPlugin({
            filename: 'effect-ui.css',
        })*/
    ];

    if (argv.mode === 'production') {
		entry['effect-ui.min'] = './index.js';
    } else {
        entry['effect-ui'] = './index.js';
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
                /*{
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
                },*/
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
	}
	
}