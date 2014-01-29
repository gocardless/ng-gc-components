'use strict';

angular.module('ngGcKeyvalueFilter', [
  'ngGcCapitalize'
]).filter('keyvalue', [
  'capitalizeFilter',
  function keyvalue(capitalizeFilter) {

    function capitalizeHeaders(input) {
      return (input || '').split('-').map(function(word) {
        return capitalizeFilter(word);
      }).join('-');
    }

    return function keyvalueFilter(target) {
      return Object.keys(target).map(function(key) {
        return capitalizeHeaders(key) + ': ' + target[key];
      }).join('\n');
    };

  }
]);
