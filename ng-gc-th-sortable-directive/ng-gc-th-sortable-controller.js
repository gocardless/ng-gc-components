'use strict';

angular.module('gc.thSortableController', [
  'gc.thSortableService'
]).controller('ThSortableController', [
  '$scope', '$attrs', 'thSortableService',
  function ThSortableController($scope, $attrs, thSortableService) {

    var ASC = 'asc';
    var DESC = 'desc';

    var options = $scope.$eval($attrs.thSortable);
    if (!options.field) { return; }

    var sortKey = options.name;

    if (!sortKey) {
      throw new Error('No <th-sortable={name}>');
    }

    // get/and set stored sort params
    var sort = thSortableService.init(sortKey);

    this.changeSort = function changeSort() {
      if (sort.field !== options.field) {
        // Always set to ASC by default when sorting a new column
        sort.direction = ASC;
      } else {
        // Invert
        sort.direction = (sort.direction === ASC) ? DESC : ASC;
      }
      // Set active sort field
      sort.field = options.field;

      // Update search params
      thSortableService.set(sortKey, sort);
    };

  }
]);
