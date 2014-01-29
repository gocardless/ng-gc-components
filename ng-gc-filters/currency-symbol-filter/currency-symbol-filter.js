'use strict';

angular.module('ngGcCurrencySymbolFilter', [
]).filter('currencySymbol', [
  function currencySymbol() {
    var CURRENCY_SYMBOLS = {
      GBP: '£',
      EUR: '€'
    };

    return function currencySymbolFilter(input) {
      input = (input || '');
      return CURRENCY_SYMBOLS[input.toUpperCase()];
    };
  }
]);
