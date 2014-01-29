'use strict';

angular.module('gc.appHeaderBack', [
  'gc.appHeaderBackController',
  'app-header-back-template.html'
]).directive('appHeaderBack', [
  function appHeaderBackDirective() {

    return {
      restrict: 'E',
      templateUrl: 'app-header-back-template.html',
      transclude: true,
      replace: true,
      controller: 'AppHeaderBackController',
      scope: {
        title: '@',
        subheading: '@',
        showBackBtn: '@'
      }
    };

  }
]);
