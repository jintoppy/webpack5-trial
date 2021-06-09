const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: './src/index.js',
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

    plugins: [
        new MiniCssExtractPlugin(),
        new ModuleFederationPlugin(
            {
                name: 'MFE',
                filename:
                    'remoteEntry.js',
                remotes: {
                    MFE1: 'MFE1@mfe1Entry.js',
                    'components/MFE2':
                        'MFE2@mfe2Entry.js',
                    MFEContainer: 'MFEContainer@containerEntry.js'
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
        ),
        new HtmlWebpackPlugin({
            template:
                './public/index.html',
            favicon: "./public/favicon.ico"
        }),
    ],
};