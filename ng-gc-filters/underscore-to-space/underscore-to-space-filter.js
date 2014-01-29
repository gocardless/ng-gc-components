'use strict';

angular.module('ngGcUnderscoreToSpace', [
  'ngGcSafeString'
]).filter('underscoreToSpace', [
  'safeStringFilter',
  function underscoreToSpace(safeStringFilter) {

    return function underscoreToSpaceFilter(input) {
      return safeStringFilter(input).replace(/_/g, ' ');
    };

  }
]);
