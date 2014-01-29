'use strict';

describe('capitalize', function() {
  beforeEach(module('ngGcCapitalize'));

  it('should capitalize', inject(function(capitalizeFilter) {
    expect(capitalizeFilter('gocardless')).toEqual('Gocardless');
  }));

  it('returns empty string for non-strings', inject(function(capitalizeFilter) {
    expect(capitalizeFilter([])).toEqual('');
  }));

});
