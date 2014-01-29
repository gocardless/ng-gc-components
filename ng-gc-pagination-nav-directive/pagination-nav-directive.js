'use strict';

angular.module('gc.paginationNav', [
  'gc.paginationNavController',
  'pagination-nav-template.html'
]).directive('paginationNav',
  [function paginationNavDirective() {

    return {
      restrict: 'E',
      templateUrl: 'pagination-nav-template.html',
      scope: {
        meta: '&'
      },
      controller: 'PaginationNavController',
      replace: true
    };

  }]);
