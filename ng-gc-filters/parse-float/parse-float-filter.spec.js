'use strict';

describe('parseFloat', function() {
  beforeEach(module('ngGcParseFloat'));

  it('handles zeroes', inject(function(parseFloatFilter) {
    expect(parseFloatFilter('0.0')).toBe(0);
  }));

  it('handles numbers', inject(function(parseFloatFilter) {
    expect(parseFloatFilter('2.88')).toBe(2.88);
  }));

  it('handles non string numbers', inject(function(parseFloatFilter) {
    expect(parseFloatFilter('AHH')).toBeNaN();
    expect(parseFloatFilter([])).toBeNaN();
  }));

});
