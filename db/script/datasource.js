/**
 * decouple db operations and use Q for promise
 */

var Q = require('q')
  , db = require('./init');

function DataSource() {

}

// Application operations, please note we do not allow to delete application,
// to avoid of breaking constrains 
DataSource.prototype.addApplications =
  Q.nbind(db.applications.insert, db.applications);


DataSource.prototype.findApplications =
  Q.nbind(db.applications.find, db.applications);

// create singleton and export
var ds = new DataSource();
module.exports = ds;

