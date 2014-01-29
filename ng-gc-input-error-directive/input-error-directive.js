'use strict';

angular.module('gc.inputErrorDirective', [
  'input-error-template.html'
]).directive('inputError',
  function inputErrorDirective() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'input-error-template.html',
      scope: {
        errors: '=',
        field: '@'
      }
    };
  });
