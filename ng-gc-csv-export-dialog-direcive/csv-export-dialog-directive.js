'use strict';

angular.module('gc.csvExportDialog', [
  'gc.csvExportDialogController',
  'gc.dialog',
  'app/shared/components/csv-export-dialog/csv-export-dialog-template.html'
])
.directive('csvExportDialog', [
  function csvExportDialogDirective() {

    return {
      restrict: 'E',
      templateUrl: 'app/shared/components/csv-export-dialog/' +
                   'csv-export-dialog-template.html',
      replace: true,
      transclude: true,
      controller: 'CsvExportDialogController',
      scope: {}
    };

  }
]);
