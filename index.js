/*!
 * object.defaults <https://github.com/jonschlinkert/object.defaults>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var forOwn = require('for-own');
var slice = require('array-slice');

module.exports = function defaults(o, objects) {
  forEach(slice(arguments, 1), function (obj) {
    forOwn(obj, function (val, key) {
      if (o[key] == null) {
        o[key] = val;
      }
    });
  });
  return o;
};

function forEach(arr, cb) {
  if (arr == null) {
    return;
  }

  var len = arr.length;
  var i = -1;

  while (++i < len) {
    if (cb(arr[i], i, arr) === false) {
      break;
    }
  }
}
