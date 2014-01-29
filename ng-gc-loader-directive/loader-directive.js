'use strict';

angular.module('gc.loader', [
  'gc.loaderController',
  'loader-template.html'
]).directive('loader',
  [function loaderDirective() {

    return {
      restrict: 'E',
      templateUrl: 'loader-template.html',
      replace: true,
      controller: 'LoaderController',
      scope: {}
    };

  }]);
