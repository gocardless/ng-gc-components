'use strict';

angular.module('gc.loginController', [
  'ngSecurityService'
]).controller('LoginController', [
  '$scope', '$window', 'SecurityService',
  function LoginController($scope, $window, SecurityService) {

    function findById(id) {
      return $window.document.getElementById(id);
    }

    // XXXXXXXXXXXXXX
    // This is so shit
    // but two way binding just doesn't happen with
    // autofilled/password managers
    var email, password;
    function getLoginDetails() {
      email = findById('login-email');
      password = findById('login-password');

      return {
        email: email && email.value,
        password: password && password.value
      };
    }

    $scope.signIn = function signIn() {
      SecurityService.signIn(getLoginDetails())
        .then(function() {
          $scope.signInError = '';
          email && (email.value = '');
          password && (password.value = '');
        }, function(reason) {
          $scope.signInError = reason.data.error;
        });
    };

    $scope.$watch(function() {
      return SecurityService.isSignInVisible();
    }, function(isVisible) {
      $scope.isVisible = isVisible;
    });

    $scope.AppConfig = $window.AppConfig;

  }
]);
