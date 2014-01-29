'use strict';

describe('ordinal', function() {
  beforeEach(module('ngGcOrdinal'));

  it('2nd', inject(function(ordinalFilter) {
    expect(ordinalFilter('2')).toEqual('2nd');
  }));

  it('returns empty string', inject(function(ordinalFilter) {
    expect(ordinalFilter('')).toEqual('');
    expect(ordinalFilter([])).toEqual('');
  }));

});
