'use strict';

angular.module('gc.mockController', [
  'ngGcUserApiService',
  'gc.mockService'
]).controller('MockController', [
  '$scope', '$window', 'MockService', 'UserApiService',
  function MockController($scope, $window, MockService,
    UserApiService) {

    UserApiService.findOne().then(function(user) {
      $scope.user = user;
    });

    $scope.endSession = function endSession() {
      MockService.destroy().then(function() {
        $window.location.replace('/');
      });
    };

    $scope.mockErrorMessage = function mockErrorMessage(status) {
      var mappings = {
        404: 'User not found',
        fallback: 'Error, try again'
      };

      return status in mappings ? mappings[status] : mappings.fallback;
    };

    $scope.changeSession = function changeSession() {
      if ($scope.user.real_user) {
        MockService.create({
          data: {
            user: $scope.user.email
          }
        }).then(function changeSuccess() {
          $window.location.replace('/');
        }, function changeError(response) {
          $scope.mockError = $scope.mockErrorMessage(response.status);
        });
      }
    };

  }
]);
