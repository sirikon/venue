const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const basicAuth = require('express-basic-auth');
const RedisStore = require('connect-redis')(session);

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const SESSION_SECRET = process.env.SESSION_SECRET || 'secret';
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';

const config = {
    title: 'DotNet2019',
    year: '2019',
    twitter: '@dotNetConfSpain',
    baseUrl: process.env.BASE_URL || 'http://localhost:8000'
};

function asyncWrapper(fn) {
    return (req, res) => {
        fn(req, res).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
    };
}

const adminAuth = basicAuth({
    users: { [ADMIN_USER]: ADMIN_PASSWORD },
    challenge: true,
    realm: 'Admin access'
});

module.exports = (talks) => {

    const talkMiddleware = require('./middleware/talkMiddleware')(talks);
    const userMiddleware = require('./middleware/userMiddleware')();

    const indexController = require('./controllers/index')(talks);
    const talksController = require('./controllers/talks')(talks);
    const adminController = require('./controllers/admin');

    const app = express();

    app.set('view engine', 'html');
    app.engine('html', (filename, payload={}, cb) => {
        payload.config = config;
        return ejs.renderFile(filename, payload, cb);
    });
    app.set('views', path.join(__dirname, '/views'));
    app.set('layout', path.join(__dirname, '/views/layouts/layout'));

    app.use(expressLayouts);

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(session({
        store: new RedisStore({
            url: REDIS_URL
        }),
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 2592000000 // one month
        }
    }));

    app.use(userMiddleware);

    app.use('/', express.static(path.join(__dirname, '/favicons')));
    app.use('/static', express.static(path.join(__dirname, '/static')));

    app.get('/', indexController.getIndex);
    app.get('/talk/:slug', talkMiddleware, talksController.getTalkById);
    app.post('/talk/:slug', talkMiddleware, asyncWrapper(talksController.postFeedback));
    app.post('/talk/:slug/question', talkMiddleware, asyncWrapper(talksController.postQuestion));

    app.get('/admin', adminAuth, asyncWrapper(adminController.getIndex));
    app.get('/admin/:slug/questions', adminAuth, talkMiddleware, asyncWrapper(adminController.getQuestions));

    return app;
};
