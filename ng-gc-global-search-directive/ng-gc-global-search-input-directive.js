'use strict';

angular.module('gc.globalSearchInput', [
]).directive('gcGlobalSearchInput', [
  function gcGlobalSearchInputDirective() {

    return {
      restrict: 'A',
      link: function gcGlobalSearchInputDirectiveLink(scope, element) {
        element.bind('keydown', function(event) {
          // tab
          // should complete typeahead
          if (event.which === 9) {
            event.preventDefault();
          }

          // downarrow
          // should select next search item
          if (event.which === 40) {
            event.preventDefault();
          }

          // enter
          // should go to selected search item
          if (event.which === 13) {
            event.preventDefault();
          }
        });
      }
    };

  }
]);
