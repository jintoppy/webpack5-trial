const webpack = require("webpack");
const middleware = require("webpack-dev-middleware");
// const webpackHotMiddleware = require("webpack-hot-middleware");


const containerConfig = require('./webpack.container.config');
const mfe1Config = require('./webpack.mfe1.config');
const mfe2Config = require('./webpack.mfe2.config');
const mainConfig = require('./webpack.config');
const express = require("express");
const app = express();
let configs = {};

const mfe1Compiler = webpack(mfe1Config);
const mfe2Compiler = webpack(mfe2Config);
const containerCompiler = webpack(containerConfig);


app.use(async (req, res, next) => {
    if (req.url.indexOf('mfe1') > -1) {
        console.log('===============');
        console.log('inside mfe1');
        console.log(req.url);
        console.log('===============');
        let mfe1MiddleWareInstance;
        if (!configs['mfe1']) {
            configs['mfe1'] = {};
            mfe1MiddleWareInstance = middleware(mfe1Compiler);
            configs['mfe1']['mdl'] = mfe1MiddleWareInstance;
            // configs['mfe1']['hot'] = webpackHotMiddleware(mfe1Compiler);
        }
        // app.use(mfe1MiddleWareInstance);
        configs['mfe1']['mdl'](req, res, next);
        // configs['mfe1']['hot'](req, res, next);
        // mfe1MiddleWareInstance.waitUntilValid(() => {
        //     next();
        // });
    }
    else if (req.url.indexOf('mfe2') > -1) {
        console.log('===============');
        console.log('inside mfe2');
        console.log(req.url);
        console.log('===============');
        let mfe2MiddleWareInstance;
        if (!configs['mfe2']) {
            configs['mfe2'] = {};
            mfe2MiddleWareInstance = middleware(mfe2Compiler);
            configs['mfe2']['mdl'] = mfe2MiddleWareInstance;
            // configs['mfe2']['hot'] = webpackHotMiddleware(mfe2Compiler);
        }
        // app.use(mfe2MiddleWareInstance);
        configs['mfe2']['mdl'](req, res, next);
        // configs['mfe2']['hot'](req, res, next);
    }
    else if (req.url.toLowerCase().indexOf('container') > -1) {
        console.log('===============');
        console.log('inside container');
        console.log(req.url);
        console.log('===============');
        let containerMiddleWareInstance;
        if (!configs['container']) {
            configs['container'] = {};
            containerMiddleWareInstance = middleware(containerCompiler);
            configs['container']['mdl'] = containerMiddleWareInstance;
            // configs['container']['hot'] = webpackHotMiddleware(containerCompiler);
        }
        // app.use(containerMiddleWareInstance);
        configs['container']['mdl'](req, res, next);
        // configs['container']['hot'](req, res, next);
        // containerMiddleWareInstance.waitUntilValid(() => {
        //     next();
        // });
        // configs['container'](req, res, next);
    }
    else {
        next();
    }

});
app.use((req, res, next) => {
    console.log(req.url)
    next();
});
const mainCompiler = webpack(mainConfig);
app.use(middleware(mainCompiler));
// app.use(webpackHotMiddleware(mainCompiler));

// app.use(middleware(webpack(containerConfig)));
// app.use(middleware(webpack(mfe1Config)));
// app.use(middleware(webpack(mfe2Config)));

app.use(express.static('dist'));
app.get("/*", function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(8081, () => console.log("Example app listening on port 8081!"));
