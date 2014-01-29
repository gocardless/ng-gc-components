'use strict';

angular.module('gc.login', [
  'gc.dialog',
  'gc.loginController',
  'login-template.html'
]).directive('login', [
  function loginDirective() {

    return {
      restrict: 'E',
      templateUrl: 'login-template.html',
      replace: true,
      controller: 'LoginController',
      scope: {}
    };

  }
]);
