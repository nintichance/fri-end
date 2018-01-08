var express = require('express');
var router = express.Router();

// GET (Read) Home Page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'fr!end' });
});

module.exports = router;
