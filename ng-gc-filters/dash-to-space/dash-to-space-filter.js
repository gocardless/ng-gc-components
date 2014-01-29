'use strict';

angular.module('ngGcDashToSpace', [
  'ngGcSafeString'
]).filter('dashToSpace', [
  'safeStringFilter',
  function dashToSpace(safeStringFilter) {

    return function dashToSpaceFilter(input) {
      return safeStringFilter(input).replace(/-/g, ' ');
    };

  }
]);
