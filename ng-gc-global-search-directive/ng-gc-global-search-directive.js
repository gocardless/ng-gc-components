'use strict';

angular.module('gc.globalSearch', [
  'gc.dialog',
  'gc.searchResults',
  'gc.globalSearchController',
  'gc.focusInput',
  'gc.globalSearchInput',
  'ng-gc-global-search-template.html',
  'ng-gc-global-search-dialog-template.html'
]).directive('gcGlobalSearch', [
  function gcGlobalSearchDirective() {

    return {
      restrict: 'E',
      replace: true,
      controller: 'GlobalSearchController',
      templateUrl: 'ng-gc-global-search-template.html',
      scope: {
        searchQuery: '=',
        performSearchQuery: '&'
      }
    };

  }
]);
