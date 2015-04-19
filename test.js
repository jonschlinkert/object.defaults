/*!
 * object.defaults <https://github.com/jonschlinkert/object.defaults>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

/* deps: mocha */
require('should');
var defaults = require('./');

describe('defaults', function () {
  var ctx = {};
  beforeEach(function () {
    ctx.foo = {aaa: 'bbb', ccc: 'ddd'};
    ctx.bar = {ccc: 'eee', fff: 'ggg'};
  });

  it('should return an empty string when undefined.', function() {
    defaults().should.eql({});
  });

  it('should extend the first object with missing properties from the second.', function() {
    defaults(ctx.foo, ctx.bar).should.eql({aaa:'bbb',ccc:'ddd',fff:'ggg'});
  });

  it('should ignore non-objects.', function() {
    defaults(ctx.foo, ctx.bar, 'baz').should.eql({aaa:'bbb',ccc:'ddd',fff:'ggg'});
  });

  it('should use the default object as context.', function() {
    ctx.bar = {aaa: 'ddd'};
    defaults(ctx.foo, ctx.bar).should.eql({aaa:'bbb',ccc:'ddd'}, 'should not overwrite `aaa`');
  });

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
