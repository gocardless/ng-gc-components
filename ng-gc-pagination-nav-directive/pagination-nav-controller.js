'use strict';

angular.module('gc.paginationNavController', [
  'gc.utils'
]).controller('PaginationNavController', [
  '$scope', '$location', 'utils',
  function PaginationNavController($scope, $location, utils) {

    function validMeta(meta) {
      return meta && angular.isNumber(meta.page) &&
        angular.isNumber(meta.per_page);
    }

    function getValidLink(link) {
      if (!link) {
        return '';
      }
      return link;
    }

    $scope.paginationLink = function paginationLink(page) {
      if (!page) {
        return '';
      }

      var search = angular.extend({}, $location.search());
      search.page = page;
      return $location.path() + getValidLink('?' + utils.param(search));
    };

    $scope.paginationStart = function paginationStart(meta) {
      var link = validMeta(meta) &&
        (meta.page - 1) * meta.per_page + 1;
      return getValidLink(link);
    };

    $scope.paginationEnd = function paginationEnd(meta) {
      var link = validMeta(meta) &&
        Math.min(meta.page * meta.per_page, meta.records);
      return getValidLink(link);
    };

  }
]);
