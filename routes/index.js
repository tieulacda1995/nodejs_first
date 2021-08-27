const postsRoute = require('./posts');
const newsRoute = require('./news');
const authsRoute = require('./auths');
const productsRoute = require('./products');


const router = (app) => {

    app.use('/posts', postsRoute);

    app.use('/news', newsRoute);

    app.use('/auths', authsRoute);

    app.use('/products', productsRoute);


    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

};
module.exports = router;
