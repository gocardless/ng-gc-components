'use strict';

angular.module('gc.thSortable', [
  'gc.thSortableController',
  'gc.thSortableService'
]).directive('thSortable', [
  'thSortableService',
  function thSortableDirective(thSortableService) {
    return {
      restrict: 'A',
      require: 'thSortable',
      controller: 'ThSortableController',
      link: function thSortableLink(scope, element, attrs, ctrl) {
        var options = scope.$eval(attrs.thSortable);

        function changeSort() {
          scope.$apply(function() {
            ctrl.changeSort();
          });
        }

        if (options.field) {
          element.addClass('is-sortable');
          element.attr('tabindex', 0);

          element.bind('click', changeSort);
          element.bind('keydown', function(event) {
            // Enter
            if (event.which === 13) {
              changeSort();
            }
          });

          // Stored search params
          var sort = thSortableService.get();

          if (options.field === sort.field) {
            // This element is being sorted
            // No need to tear down classes as long as the page
            // relaods on search param change
            element.addClass('is-sorting');
            element.addClass('is-sorting--' + sort.direction);
          }
        }
      }
    };
  }
]);
