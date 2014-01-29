'use strict';

describe('ngGcCurrencySymbolFilter', function() {
  var currencySymbol;

  beforeEach(module('ngGcCurrencySymbolFilter'));

  beforeEach(inject(function ($filter) {
    currencySymbol = $filter('currencySymbol');
  }));

  it('handles no input without throwing an error', function() {
    expect(currencySymbol).not.toThrow();
    expect(currencySymbol()).toBeUndefined();
  });

  it('handles GBP', function() {
    expect(currencySymbol('gbp')).toBe('£');
    expect(currencySymbol('GBP')).toBe('£');
  });

  it('handles EUR', function() {
    expect(currencySymbol('eur')).toBe('€');
    expect(currencySymbol('EUR')).toBe('€');
  });
});
