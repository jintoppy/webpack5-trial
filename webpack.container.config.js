const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const monorepoResolver = {
    apply(resolver) {
        resolver.plugin('module', function (request, callback) {
            if (request.path.startsWith('components/')) {

            }
            if (request.path.startsWith('package-a') === -1) {
                callback();
            } else {
                this.doResolve(
                    'resolve',
                    {
                        ...request,
                        request: request.request.replace(/^package-a/, `${__dirname}/versions/v2.2.0`),
                    },
                    'Edev Resolver',
                    callback
                );
            }
        });
    }
};

const sassLoaderPlugins = {
    test: /\.s[ac]ss$/i,
    oneOf: [
        {
            use: [
                // Creates `style` nodes from JS strings
                {
                    loader: MiniCssExtractPlugin.loader
                },
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",
            ]
        }
    ]

};

module.exports = {
    mode: 'development',
    entry: './src/components/container/App.js',
    devtool: 'eval-source-map',
    output: {
        filename: 'container.js',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name: 'vendor'
                }
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                /* The following line to ask babel 
                     to compile any file with extension
                     .js */
                test: /\.js?$/,

                /* exclude node_modules directory from babel. 
                    Babel will not compile any files in this directory*/
                exclude: /node_modules/,

                // To Use babel Loader
                loader:
                    'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env' /* to transfer any advansed ES to ES5 */,
                        '@babel/preset-react',
                    ], // to compile react to ES5
                },
            },
        ],
    },
    // resolve: {
    //     plugins: [
    //         monorepoResolver
    //     ]
    // },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin(),
        new ModuleFederationPlugin(
            {
                name: 'MFEContainer',
                filename:
                    'containerEntry.js',
                remotes: {
                    MFE1:
                        'MFE1@mfe1Entry.js',
                    'components/MFE2':
                        'MFE2@mfe2Entry.js'
                },
                exposes: {
                    './App':
                        './src/components/container/App',
                },
                shared: {
                    "react": {
                        "singleton": true
                    },
                    "react-dom": {
                        "singleton": true
                    }
                }
            }
        )
    ],
};