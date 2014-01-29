'use strict';

describe('pluralize', function() {
  beforeEach(module('ngGcSafeString'));

  it('returns striing', inject(function(safeStringFilter) {
    expect(safeStringFilter('payment')).toEqual('payment');
  }));

  it('returns empty string', inject(function(safeStringFilter) {
    expect(safeStringFilter([])).toEqual('');
  }));
});
