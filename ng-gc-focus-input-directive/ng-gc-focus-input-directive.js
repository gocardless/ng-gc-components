'use strict';

angular.module('gc.focusInput', [])
.directive('focusInput', [
  '$timeout',
  function focusInputDirective($timeout) {

    return {
      restrict: 'A',
      link: function focusInputLink(scope, element, attrs) {
        scope.$watch(function() {
          return scope.$eval(attrs.focusInput);
        }, function(isFocused) {
          if (isFocused) {
            $timeout(function() {
              element[0].focus();

              // Keep cursor at the end of the input
              var inpValue = element[0].value;
              element[0].value = '';
              element[0].value = inpValue;
            });
          }
        });
      }
    };

  }
]);
