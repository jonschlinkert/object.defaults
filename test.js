/*!
 * object.defaults <https://github.com/jonschlinkert/object.defaults>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

require('mocha');
var assert = require('assert');
var defaults = require('./');

describe('defaults', function () {
  var ctx = {};
  beforeEach(function () {
    ctx.foo = {aaa: 'bbb', ccc: 'ddd'};
    ctx.bar = {ccc: 'eee', fff: 'ggg'};
  });

  it('should return an empty string when undefined.', function() {
    assert.deepEqual(defaults(), {});
  });

  it('should extend the first object with missing properties from the second.', function() {
    assert.deepEqual(defaults(ctx.foo, ctx.bar), {aaa:'bbb',ccc:'ddd',fff:'ggg'});
  });

  it('should ignore non-objects.', function() {
    assert.deepEqual(defaults(ctx.foo, ctx.bar, 'baz'), {aaa:'bbb',ccc:'ddd',fff:'ggg'});
  });

  it('should use the default object as context.', function() {
    ctx.bar = {aaa: 'ddd'};
    assert.deepEqual(defaults(ctx.foo, ctx.bar), {aaa:'bbb',ccc:'ddd'}, 'should not overwrite `aaa`');
  });

  it('should copy only missing properties defaults', function () {
    assert.deepEqual(defaults({a: 'c'}, {a: 'bbb', d: 'c'}), {a: 'c', d: 'c'});
  });

  it('should copy properties from multiple objects', function () {
    assert.deepEqual(defaults({a: 'b'}, {c: 'd'}, {e: 'f'}), {a: 'b', c: 'd', e: 'f'});
  });

  it('should fill in values that are null', function () {
    assert.deepEqual(defaults({a: null}, {a: 'c', d: 'c'}), {a: 'c', d: 'c'});
  });

  it('should not merge nested values.', function () {
    assert.deepEqual(defaults({a: {b: 'c'}}, {a: {d: 'e'}}), {a: {b: 'c'}});
  });

  it('should shallow clone when an empty object is passed as the first arg.', function () {
    assert.deepEqual(defaults({}, {a: {b: 'c'}}, {a: {d: 'e'}}), {a: {b: 'c'}});
  });

  it('should return an empty object when the first arg is null.', function () {
    assert.deepEqual(defaults(null), {});
  });
});
