/**
 * Statics router.
 */
const express = require('express');

const router = express.Router();

/**
 * GET: Index
 */
router.get('/', (req, res) => {
  res.render('static/index');
});

module.exports = router;
