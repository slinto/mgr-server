/**
 * Main app start point.
 */
const express = require('express');

const app = express();

const config = require('./config');
const error = require('./lib/error_handler');

config.appSetup(app);
error.setup(app);

app.listen(config.port, () => {
  console.log('Listening on port %d', config.port);
});
