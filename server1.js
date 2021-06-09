const express = require("express");
const app = express();
let isAdded = false;
app.use((req, res, next) => {

    const middlewareFn = (req, res, next) => {
        console.log('this is added dynamically');
    };

    if (req.url.indexOf('dynamic') > -1) {
        if (!isAdded) {
            // middlewareFn(req, res, next);
            app.use(middlewareFn);
        }
    }
    next();
});

app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.get('/*', (req, res) => {
    res.send('thanks for trying' + req.url);
});

app.listen(8081, () => console.log("Example app listening on port 8081!"));