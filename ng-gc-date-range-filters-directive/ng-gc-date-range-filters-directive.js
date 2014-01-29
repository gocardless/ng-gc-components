'use strict';

angular.module('gc.dateRangeFiltersDirective', [
  'gc.pikaday',
  'ngGcToDateTime',
  'gc.filterDataDirective',
  'ng-gc-date-range-filters-template.html'
]).directive('dateRangeFilters', function dateRangeFiltersDirective() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'ng-gc-date-range-filters-template.html',
    scope: {
      filters: '='
    }
  };
});
