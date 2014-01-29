'use strict';

angular.module('gc.webHookListController', [
  'gc.statusCodeService'
]).controller('WebHookListController', [
  '$scope', 'StatusCodeService',
  function WebHookListController($scope, StatusCodeService) {

    $scope.getStatusCodeLabel = function getStatusCodeLabel(statusCode) {
      return StatusCodeService.getLabel(statusCode);
    };

  }
]);
