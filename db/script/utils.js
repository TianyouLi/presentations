var ds = require('./datasource');

function Utils() {
  this.ds = ds;
}

Utils.prototype.initApplications = function() {
  var apps = [
    {
      name: 'BioDigital',
      category: 'Education',
      features: 'WebGL'
    },
    {
      name: 'AngryBird',
      category: 'Game',
      features: 'Canvas 2D'
    }
  ];

  this.ds.addApplications(apps)
    .then(function(docs) {
      console.log('[docs add success:]' + JSON.stringify(docs));
    }, function(err) {
      console.log('[docs add fail:]' + JSON.stringify(err));
    });
}


var utils = new Utils();
module.exports = utils;

