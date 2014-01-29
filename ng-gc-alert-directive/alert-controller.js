'use strict';

angular.module('gc.alertController', [
  'gc.alertService'
]).controller('AlertController', [
  '$scope', 'AlertService',
  function AlertController($scope, AlertService) {

    $scope.appAlerts = AlertService.get();
    $scope.closeAlert = function(index) {
      $scope.appAlerts.splice(index, 1);
    };

  }
]);
