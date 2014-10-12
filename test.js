/*!
 * object.defaults <https://github.com/jonschlinkert/object.defaults>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var defaults = require('./');

describe('defaults', function () {
  it('should copy only missing properties defaults', function () {
    defaults({a: 'c'}, {a: 'bbb', d: 'c'}).should.eql({a: 'c', d: 'c'});
  });

  it('should copy properties from multiple objects', function () {
    defaults({a: 'b'}, {c: 'd'}, {e: 'f'}).should.eql({a: 'b', c: 'd', e: 'f'});
  });

  it('should fill in values that are null', function () {
    defaults({a: null}, {a: 'c', d: 'c'}).should.eql({a: 'c', d: 'c'});
  });

  it('should not merge nested values.', function () {
    defaults({a: {b: 'c'}}, {a: {d: 'e'}}).should.eql({a: {b: 'c'}});
  });

  it('should clone when an empty object is passed as the first arg.', function () {
    defaults({}, {a: {b: 'c'}}, {a: {d: 'e'}}).should.eql({a: {b: 'c'}});
  });

  it('should return an empty object when the first arg is null.', function () {
    defaults(null).should.eql({});
  });
});
