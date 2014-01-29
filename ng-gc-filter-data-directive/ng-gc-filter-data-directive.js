'use strict';

angular.module('gc.filterDataDirective', [
  'gc.clearFilterDataDirective'
]).directive('filterData', [
  '$location', '$parse',
  function filterDataDirective($location, $parse) {

    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        var filterDataGetter = $parse(attrs.filterData);

        // Get filter key - can be a string attr or parsed from an expression
        var filterKey = filterDataGetter() || attrs.filterData;
        var isObject = angular.isObject(filterKey);
        if (isObject) {
          filterKey = Object.keys(filterKey)[0];
        }

        // Set initial form value if it exists in search params
        var value = $location.search()[filterKey];
        if (value) {
          ctrl.$setViewValue(value);
        }

        // Allows us to run the model value through a filter
        function getModelValue() {
          // Assign model value to filter key in the filterData attr object
          // eg. filter-data={ before: before | someFilter }
          var context = {};
          context[filterKey] = ctrl.$modelValue;
          return isObject ? filterDataGetter(context)[filterKey]
                          : ctrl.$modelValue;
        }

        // Cast undefined, null or '' to null
        function toNull(value) {
          return (value == null || value === '') ? null : value;
        }

        // Update the bound search param when the model value changes
        scope.$watch(function() {
          return ctrl.$modelValue;
        }, function() {
          $location.search(filterKey, toNull(getModelValue()));
        });

      }
    };

  }
]);
