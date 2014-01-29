'use strict';

angular.module('gc.webHookCreateController', [
  'ngRoute',
  'gc.webHookModel',
  'gc.alertService'
])
.controller('WebHookCreateController', [
  '$scope', '$route', 'AlertService', 'WebHookModel',
  function WebHookCreateController(
    $scope, $route, AlertService, WebHookModel) {

    $scope.webHookModel = WebHookModel.create();
    $scope.webHook = $scope.webHookModel.scope();

    // set defaults
    _.extend($scope.webHook.form, ($scope.getDefaults() || {}));

    function isSubmitting(value) {
      $scope.isSubmitting = value;
    }

    $scope.createWebHook = function createWebHook() {
      isSubmitting(true);

      var onCreatePromise = $scope.onCreate($scope.webHookModel.serialize());

      if (!onCreatePromise || !_.isFunction(onCreatePromise.then)) {
        throw new Error('onCreate must return a promise');
      }

      onCreatePromise
        .then(function resolve() {
          AlertService.success(
            'Sent web hook. Your web hook will be available soon.'
          );
          $route.reload();
        }, function reject(response) {
          isSubmitting(false);
          $scope.formErrors = response.data && response.data.errors;
          AlertService.error('Failed to send web hook. Please try again.');
        });
    };

  }
]);
