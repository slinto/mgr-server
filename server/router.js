/**
 * App router.
 */
const staticController = require('./controllers/staticController');
const apiController = require('./controllers/apiController');

module.exports.setup = (app) => {
  app.use('/', staticController);
  app.use('/api', apiController);
};
