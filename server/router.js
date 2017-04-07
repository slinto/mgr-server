/**
 * App router.
 */
var setup = function(app) {
  var staticController = require('./controllers/staticController');
  var apiController = require('./controllers/apiController');

  app.use('/', staticController);
  app.use('/api', apiController);
};

module.exports.setup = setup;