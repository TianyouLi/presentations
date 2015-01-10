var express = require('express');
var router = express.Router();
var ds = require('../db/script/datasource');

/* GET home page. */
router.get('/', function(req, res) {
  ds.findApplications({}, {_id:0}).then(function(docs) {
    var data = {};
    data.applications = docs;
    res.render('index', {
      title: 'Presentations',
      dpm: JSON.stringify(data)
    });
  });
});


module.exports = router;

