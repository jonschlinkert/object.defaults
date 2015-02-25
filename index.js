/*!
 * object.defaults <https://github.com/jonschlinkert/object.defaults>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var slice = require('array-slice');
var forOwn = require('for-own');

module.exports = function defaults(o, objects) {
  if (o == null) {
    return {};
  }

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
  for (var i = 0; i < len; i++) {
    if (cb(arr[i], i, arr) === false) {
      break;
    }
  }
}
