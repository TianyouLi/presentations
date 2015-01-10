// var Q = require('q');

// var utils = require('../db/script/utils')
//   , ds = require('../db/script/datasource');

// // test initialize application datastore
// utils.initApplications();

// // test get all applications information from data store
// ds.findApplications({})
//   .then( function(docs) {
//     console.log('query result:' + JSON.stringify(docs));
//   }, function(err) {
//     console.log('query failed:' + JSON.stringify(err));
//   });

// // test Q

// Q.all([
//   ds.findApplications({}),
//   ds.findApplications({})
// ]).spread(function(docs1, docs2){
//   console.log('query result 1:' + JSON.stringify(docs1));
//   console.log('query result 2:' + JSON.stringify(docs2));
// });

