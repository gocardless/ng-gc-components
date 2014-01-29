'use strict';

angular.module('gc.alert', [
  'alert-template.html'
])
.directive('alert', [
  '$location', '$window',
  function alertDirective($location, $window) {

    return {
      restrict: 'E',
      templateUrl: 'alert-template.html',
      transclude: true,
      replace: true,
      scope:{
        type: '@',
        close: '&'
      },
      link: function alertDirectiveLink(scope) {
        // Hide
        $window.setTimeout(function() {
          scope.$apply(scope.close);
        }, 5000);

        var hasShown;
        scope.$watch(function alertPathWatch() {
          return $location.url();
        }, function alertPathWatchAction() {
          if (hasShown) { scope.close(); }
          hasShown = true;
        });
      }
    };

  }
]);
