'use strict';

angular.module('gc.tableController', [
])
.controller('GCTableController', [
  '$scope',
  function GCTableController($scope) {

    $scope.options = $scope.getTableOptions();

    $scope.columns = $scope.getTableColumns();
    if (!$scope.columns) {
      throw new Error('Provide the table columns');
    }

  }
]);
