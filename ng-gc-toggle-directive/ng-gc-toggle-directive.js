'use strict';

angular.module('gc.toggle', [])
.directive('toggle', [
  '$timeout', '$parse',
  function toggleDirective($timeout, $parse) {

    return function link(scope, element, attrs) {
      var hasDigested = true;
      scope.$watch(attrs.toggle, function() {
        hasDigested = false;
        $timeout(function() {
          hasDigested = true;
        });
      });

      element.bind('click', function() {
        // If the toggle has been changed by a different
        // directive, don't do anything on click.
        if (hasDigested) {
          var expr = $parse(attrs.toggle);
          scope.$apply(function() {
            expr.assign(scope, !expr(scope));
          });
        }
      });
    };

  }
]);
