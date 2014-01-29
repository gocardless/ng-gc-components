'use strict';

angular.module('gc.mock', [
  'gc.toggle',
  'gc.mockController',
  'mock-template.html'
]).directive('mock', [
  function mockDirective() {

    return {
      restrict: 'E',
      templateUrl: 'mock-template.html',
      replace: true,
      controller: 'MockController',
      scope: {}
    };

  }
]);
