var bunyan = require('bunyan');

var logger = bunyan.createLogger({name:'handlers'}); 

function Handlers () {

}

Handlers.prototype.info = function(data) {
  logger.info({data: data});
}

Handlers.prototype.error = function(err) {
  if (err == null)
    return;

  // write log and terminate application
  logger.error({error: err});
}

var handlers = new Handlers();
module.exports = handlers;
