'use strict';

angular.module('gc.csvExportDialogController', [
  'gc.alertService',
  'ngGcLocalStorageService'
])
.controller('CsvExportDialogController', [
  '$scope', 'AlertService', 'LocalStorageService',
  function CsvExportDialogController($scope,
    AlertService, LocalStorageService) {

    $scope.showExportSuccess = function showExportSuccess() {
      var isVisible = !LocalStorageService
        .getItem('gc_dashboard_hide_export_help');
      if (isVisible) {
        LocalStorageService.setItem('gc_dashboard_hide_export_help', true);
      }

      if (isVisible) {
        $scope.showHelpDialog();
      } else {
        AlertService.success(
          'We will email your export csv shortly. ' +
          'This can take anywhere from a few seconds to 10 minutes.'
        );
      }
    };

    $scope.showHelpDialog = function showHelpDialog() {
      $scope.isHelpDialogShown = true;
    };

    $scope.hideHelpDialog = function hideHelpDialog() {
      $scope.isHelpDialogShown = false;
    };

    // API
    this.exportCSV = function exportCSV(getPromise) {
      if (!_.isFunction(getPromise)) {
        throw new TypeError('getPromise must be fn that returns a promise');
      }
      var promise = getPromise();
      if (!promise || !_.isFunction(promise.then)) {
        throw new TypeError('exportCSV expects a promise');
      }

      promise.then(function exportSuccess() {
        $scope.showExportSuccess();
      }, function exportError() {
        AlertService.error('The CSV export failed. Please try again.');
      });
    };

  }
]);
