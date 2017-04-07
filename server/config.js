/**
 * Middleware config.
 */
const bodyParser = require('body-parser');
const compress = require('compression');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const router = require('./router');
const pjson = require('../package.json');

const DEV_ENV = 'DEVELOPMENT';
const CURRENT_ENV = process.env.NODE_ENV || DEV_ENV;
const APP_VER = pjson.version;
const port = process.env.PORT || 8080;
const DB_URL = 'db_url_here';

/**
 * Basic app setup.
 * @param {Object} app Express object
 */
const appSetup = (app) => {
  app.locals.CURRENT_ENV = CURRENT_ENV;
  app.locals.APP_VER = APP_VER;
  app.set('view engine', 'pug');
  app.set('views', 'server/views');
  app.use(compress());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(session({
    secret: 'somesecrettokenhere',
    resave: false,
    saveUninitialized: false,
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(flash());
  router.setup(app);
};

/**
 * Database connection.
 */
const dbConnect = () => {
  mongoose.connect(DB_URL, (err) => {
    if (err) {
      console.log(`MongoDB: Connecting error : ${err}`);
    } else {
      console.log('MongoDB: Succeeded connected!');
    }
  });
};

module.exports = {
  CURRENT_ENV,
  port,
  dbConnect,
  appSetup,
};
