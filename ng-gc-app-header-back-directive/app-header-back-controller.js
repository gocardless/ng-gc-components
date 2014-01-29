'use strict';

angular.module('gc.appHeaderBackController', [])
.controller('AppHeaderBackController', [
  '$scope', '$window',
  function AppHeaderBackController($scope, $window) {

    $scope.navigateBack = function navigateBack() {
      $window.history.back();
    };

  }
]);
