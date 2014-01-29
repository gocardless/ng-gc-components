'use strict';

angular.module('gc.file', [])
.directive('gcFileValue', [
  function gcFileDirective() {
    return {
      require: 'ngModel',
      link: function(scope, element, attr, ctrl) {

        function setViewValue() {
          ctrl.$setViewValue(element.val());
        }

        setViewValue();

        element.bind('change', function() {
          scope.$apply(setViewValue);
        });

      }
    };
  }
]);
