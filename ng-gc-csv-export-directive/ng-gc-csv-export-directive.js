'use strict';

angular.module('gc.csvExportButton', [
  'gc.csvExportDialog'
])
.directive('csvExportButton', [
  '$parse',
  function csvExportButtonDirective($parse) {

    return {
      restrict: 'A',
      require: '^csvExportDialog',
      link: function incomingCsvExportButtonLink(scope, element, attrs, ctrl) {

        element.bind('click', function onClick() {
          var fn = $parse(attrs.csvExportButton);
          scope.$apply(function() {
            ctrl.exportCSV(fn(scope));
          });
        });

      }
    };

  }
]);
