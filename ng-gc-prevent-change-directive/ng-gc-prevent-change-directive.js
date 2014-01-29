'use strict';

angular.module('gc.preventChange', [])
.directive('preventChange', [
  '$parse',
  function preventChangeDirective($parse) {

    return function preventChangeLink(scope, element, attrs) {
      var inputFn = $parse(attrs.preventChange);
      var input = inputFn(scope);

      element.val(input);

      element.bind('input', function() {
        element.val(input);
      });

      scope.$watch(inputFn, function(newInput) {
        input = newInput;
        element.val(newInput);
      });
    };

  }
]);
