/**
 * Three kinds of documents: scenario, application, perf data.
 *
 * scenario:
 *   app_id -> reference to application document
 *   name
 *   features
 *
 * application:
 *   name
 *   category
 *   features
 *
 * workload:
 *   app_id -> reference to application document
 *   version
 *   date
 *
 * perfdata:
 *   scenario_id -> reference to scenario information
 *   date
 *   data
 *   workload_id -> reference to workload information
 */

var Datastore = require('nedb')
  , path = require('path')
  , handlers = require('./handlers');

var db = {};

db.scenarios = new Datastore(
  {filename: path.join(__dirname, '../store/scenarios.db')}
);

db.applications = new Datastore(
  {filename: path.join(__dirname, '../store/applications.db')}
);

db.workloads = new Datastore(
  {filename: path.join(__dirname, '../store/workloads.db')}
);

db.perfdata = new Datastore(
  {filename: path.join(__dirname, '../store/perfdata.db')}
);

// enforce policies
db.applications.ensureIndex(
  {fieldName: 'name', unique: true}, handlers.error
);

// load existing data
for (var i in db) { db[i].loadDatabase(handlers.error); }

// export the db singleton
module.exports = db;

