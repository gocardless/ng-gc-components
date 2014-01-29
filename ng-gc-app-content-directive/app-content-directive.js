'use strict';

angular.module('gc.appContent', [
  'app-content-template.html'
])
.directive('appContent', [
  function appContentDirective() {

    return {
      restrict: 'E',
      templateUrl: 'app-content-template.html',
      transclude: true,
      replace: true
    };

  }
]);
