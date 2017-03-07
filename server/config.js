/**
 * Middleware config.
 */
var express = require('express'),
  bodyParser = require('body-parser'),
  compress = require('compression'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  flash = require('connect-flash'),
  methodOverride = require('method-override'),
  mongoose = require('mongoose'),
  router = require('./router'),
  pjson = require('../package.json');

var DEV_ENV = 'DEVELOPMENT',
  CURRENT_ENV = process.env.NODE_ENV || DEV_ENV,
  APP_VER = pjson.version,
  port = process.env.PORT || 8080,
  DB_URL = 'db_url_here';

/**
 * Basic app setup.
 * @param {Object} app Express object
 */
var appSetup = function (app) {
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
    saveUninitialized: false
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(flash());

  router.setup(app);
};

/**
 * Database connection.
 */
var dbConnect = function () {
  mongoose.connect(DB_URL, function (err) {
    if (err) {
      console.log('MongoDB: Connecting error : ' + err);
    } else {
      console.log('MongoDB: Succeeded connected!');
    }
  });
};

module.exports = {
  CURRENT_ENV: CURRENT_ENV,
  port: port,
  dbConnect: dbConnect,
  appSetup: appSetup
};