'use strict';

describe('param', function() {
  var param;

  beforeEach(module('gc.utils'));

  beforeEach(inject(function ($injector) {
    param = $injector.get('utils').param;
  }));

  it('given a flat object', function() {
    var input = { a: 'plain', flat: 'object' };
    expect(param(input)).toEqual('a=plain&flat=object');
  });

  it('given a flat object with spaces', function() {
    var input = { a: 'flat object' };
    expect(param(input)).toEqual('a=flat+object');
  });

  it('given an object with a nested object', function() {
    var input = { a: { nested: 'object' } };
    expect(param(input)).toEqual('a%5Bnested%5D=object');
  });

  it('given an object with a deeply nested object', function() {
    var input = { a: { deeply: { nested: 'object' } } };
    expect(param(input)).toEqual('a%5Bdeeply%5D%5Bnested%5D=object');
  });

  it('given an object with an array', function() {
    var input = { a: ['nested', 'array'] };
    expect(param(input)).toEqual('a%5B%5D=nested&a%5B%5D=array');
  });

  it('given an object with a deeply nested array', function() {
    var input = { a: [['nested'], ['array']] };
    expect(param(input)).toEqual('a%5B0%5D%5B%5D=nested&a%5B1%5D%5B%5D=array');
  });

  it('given an object containing an array of objects', function() {
    var input = { a: [{ nested: 'object' }, { nested: 'object' }] };
    expect(param(input))
      .toEqual('a%5B0%5D%5Bnested%5D=object&a%5B1%5D%5Bnested%5D=object');
  });

  it('given an object undefined and null values', function() {
    var input = { a: undefined, b: null };
    expect(param(input))
      .toEqual('a=&b=');
  });

  it('throws for non objects', function() {
    expect(function() {
      param(null);
    }).toThrow(new Error('\'source\' must be an object'));
  });
});
