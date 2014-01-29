'use strict';

describe('pluralize', function() {
  beforeEach(module('ngGcPluralize'));

  it('should return single version', inject(function(pluralizeFilter) {
    expect(pluralizeFilter({
      one: 'payment',
      other: 'payments'
    }, 1)).toEqual('payment');
  }));

  it('should return plural version', inject(function(pluralizeFilter) {
    expect(pluralizeFilter({
      one: 'payment',
      other: 'payments'
    }, 3)).toEqual('payments');
  }));
});
