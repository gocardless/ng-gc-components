'use strict';

angular.module('gc.table', [
  'gc.tableController',
  'gc.clickWhen',
  'gc.thSortable',
  'gc.getFragment',
  'gc.setFragment',
  'gc-table-template.html'
]).directive('gcTable', [
  function gcTableDirective() {

    return {
      restrict: 'E',
      replace: true,
      controller: 'GCTableController',
      templateUrl: 'gc-table-template.html',
      scope: {
        tableData: '=',
        getTableColumns: '&tableColumns',
        getTableOptions: '&tableOptions'
      }
    };

  }

]);
