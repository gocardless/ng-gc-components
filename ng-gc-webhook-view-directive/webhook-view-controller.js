'use strict';

angular.module('gc.webHookViewController', [
]).controller('WebHookViewController', [
  '$scope',
  function WebHookViewController($scope) {

    var REQUEST_TYPE = $scope.REQUEST_TYPE = 'request';
    var RESPONSE_TYPE = $scope.RESPONSE_TYPE = 'response';

    $scope.webHookType = REQUEST_TYPE;

    $scope.isRequestType = function isRequestType() {
      return $scope.webHookType === REQUEST_TYPE;
    };

    $scope.isResponseType = function isResponseType() {
      return $scope.webHookType === RESPONSE_TYPE;
    };

  }
]);
