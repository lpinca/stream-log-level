# stream-log-level

[![Version npm][npm-stream-log-level-badge]][npm-stream-log-level]
[![Build Status][travis-stream-log-level-badge]][travis-stream-log-level]
[![Coverage Status][coverage-stream-log-level-badge]][coverage-stream-log-level]

Simple and lightweight logger that writes to a stream.

This module is like[`console-log-level`][console-log-level] but instead of
using the `console` object it uses a given stream.

Log levels supported: trace, debug, info, warn, error and fatal.

## Install

```
npm install --save stream-log-level
```

## Usage

```js
var logger = require('stream-log-level');

var log = logger();

log.trace('a'); // => does nothing
log.debug('b'); // => does nothing
log.info('c');  // => writes 'c\n' to STDOUT
log.warn('d');  // => writes 'd\n' to STDOUT
log.error('e'); // => writes 'e\n' to STDOUT
log.fatal('f'); // => writes 'f\n' to STDOUT
```

## Options

The logger can be configured by passing in an options object:

```js
var logger = require('stream-log-level');

var log = logger({
  prefix: function () { return new Date().toISOString(); },
  level: 'info'
});
```

Supported options:

Name   | Description                       | Type                   | Default value
-------|-----------------------------------|------------------------|-----------------
level  | Specify the log level             | `String`               | `info`
prefix | Set a prefix for all log messages | `String` or `Function` | `undefined`
stream | The stream to write to            | `Stream`               | `process.stdout`


## License

[MIT](LICENSE)

[npm-stream-log-level-badge]: https://img.shields.io/npm/v/stream-log-level.svg
[npm-stream-log-level]: https://www.npmjs.com/package/stream-log-level
[travis-stream-log-level-badge]: https://img.shields.io/travis/lpinca/stream-log-level/master.svg
[travis-stream-log-level]: https://travis-ci.org/lpinca/stream-log-level
[coverage-stream-log-level-badge]: https://img.shields.io/coveralls/lpinca/stream-log-level/master.svg
[coverage-stream-log-level]: https://coveralls.io/r/lpinca/stream-log-level?branch=master
[console-log-level]: https://github.com/watson/console-log-level
