'use strict';

angular.module('ngGcCapitalizeEach', [
  'ngGcCapitalize',
  'ngGcSafeString'
]).filter('capitalizeEach', [
  'safeStringFilter', 'capitalizeFilter',
  function capitalizeEach(safeStringFilter, capitalizeFilter) {

    return function capitalizeEachFilter(input) {
      input = safeStringFilter(input);
      var inputs = input.split(' ');
      inputs = inputs.map(function(word) {
        return capitalizeFilter(word);
      });
      return inputs.join(' ');
    };

  }
]);
