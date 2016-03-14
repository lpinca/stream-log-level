'use strict';

var util = require('util');
var os = require('os');

var levels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];

function noop() {}

/**
 * Build a logger object.
 *
 * @param {Object} opts Configuration options
 * @param {String|Function} opts.prefix Log message prefix
 * @param {Stream} opts.stream Stream to write to
 * @param {String} opts.level Log level
 * @return {Object} Logger object
 * @public
 */
function streamLogLevel(opts) {
  opts || (opts = {});

  var index = levels.indexOf(opts.level || 'info');
  var stream = opts.stream || process.stdout;

  function log() {
    var prefix = opts.prefix;

    if (prefix) {
      if (typeof prefix === 'function') prefix = prefix();
      arguments[0] = util.format(prefix, arguments[0]);
    }

    stream.write(util.format.apply(util, arguments) + os.EOL);
  }

  return levels.reduce(function reduce(logger, level) {
    logger[level] = levels.indexOf(level) < index ? noop : log;
    return logger;
  }, {});
}

//
// Expose the levels to make testing easier.
//
streamLogLevel.levels = levels;

module.exports = streamLogLevel;
