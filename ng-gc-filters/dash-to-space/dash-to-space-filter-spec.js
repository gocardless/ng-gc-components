'use strict';

describe('pluralize', function() {
  beforeEach(module('ngGcDashToSpace'));

  it('strips dashes', inject(function(dashToSpaceFilter) {
    expect(dashToSpaceFilter('payment-options')).toEqual('payment options');
  }));

});
