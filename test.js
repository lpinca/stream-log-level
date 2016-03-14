'use strict';

var stream = require('stream')
  , test = require('tape')
  , os = require('os');

var passThrough = new stream.PassThrough({ encoding: 'utf8' })
  , logger = require('./')
  , levels = logger.levels;

function spyOn(obj, method, spy) {
  obj['~' +  method] = obj[method];
  obj[method] = spy;
}

function spyOff(obj, method) {
  obj[method] = obj['~' +  method];
  delete obj['~' +  method];
}

test('all levels', function (t) {
  var log = logger({ stream: passThrough, level: 'trace' });

  levels.forEach(function (level) {
    log[level]('foo');
    t.equal(passThrough.read(), 'foo' + os.EOL, level + ' should write');
  });

  t.end();
});

test('default level', function (t) {
  var log = logger({ stream: passThrough })
    , index = levels.indexOf('info');

  levels.slice(0, index).forEach(function (level) {
    log[level]('foo');
    t.equal(passThrough.read(), null, level + ' should not write');
  });

  levels.slice(index).forEach(function (level) {
    log[level]('foo');
    t.equal(passThrough.read(), 'foo' + os.EOL, level + ' should write');
  });

  t.end();
});

test('custom level', function (t) {
  var log = logger({ stream: passThrough, level: 'warn' })
    , index = levels.indexOf('warn');

  levels.slice(0, index).forEach(function (level) {
    log[level]('foo');
    t.equal(passThrough.read(), null, level + ' should not write');
  });

  levels.slice(index).forEach(function (level) {
    log[level]('foo');
    t.equal(passThrough.read(), 'foo' + os.EOL, level + ' should write');
  });

  t.end();
});

test('string interpolation', function (t) {
  var log = logger({ stream: passThrough });

  log.info('foo %s', 'bar');
  t.equal(passThrough.read(), 'foo bar' + os.EOL, 'should replace placeholders');
  t.end();
});

test('prefix', function (t) {
  var log = logger({ stream: passThrough, prefix: 'foo' });

  log.info('bar %s', 'baz');
  t.equal(passThrough.read(), 'foo bar baz' + os.EOL, 'should add prefix');
  t.end();
});

test('prefix function', function (t) {
  var log = logger({
    prefix: function () { return 'foo'; },
    stream: passThrough
  });

  log.info('bar %s', 'baz');
  t.equal(passThrough.read(), 'foo bar baz' + os.EOL, 'should add prefix');
  t.end();
});

test('no options', function (t) {
  var log = logger();

  spyOn(process.stdout, 'write', function (message) {
    spyOff(process.stdout, 'write');

    t.equal(message, 'foo' + os.EOL, 'should write to stdout');
    t.end();
  });

  log.info('foo');
});
