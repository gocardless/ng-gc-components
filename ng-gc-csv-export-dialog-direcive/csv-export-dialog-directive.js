'use strict';

angular.module('gc.csvExportDialog', [
  'gc.csvExportDialogController',
  'gc.dialog',
  'csv-export-dialog-template.html'
])
.directive('csvExportDialog', [
  function csvExportDialogDirective() {

    return {
      restrict: 'E',
      templateUrl: 'csv-export-dialog-template.html',
      replace: true,
      transclude: true,
      controller: 'CsvExportDialogController',
      scope: {}
    };

  }
]);
