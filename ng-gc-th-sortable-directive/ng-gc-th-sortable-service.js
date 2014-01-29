'use strict';

angular.module('gc.thSortableService', [
  'ngRoute',
]).factory('thSortableService', [
  '$route', '$location',
  function thSortableService($route, $location) {

    var sortCache = {
      field: {},
      direction: {}
    };

    function getSortField(key) {
      return $route.current.params.sort_field ||
        sortCache.field[key];
    }

    function getSortDirection(key) {
      return $route.current.params.sort_direction ||
        sortCache.direction[key];
    }

    return {
      get: function get(key) {
        return {
          field: getSortField(key),
          direction: getSortDirection(key)
        };
      },
      init: function init(key) {
        var sort = this.get(key);
        var params = this.getSearchParams(key, sort);
        _.extend($route.current.params, params);
        return sort;
      },
      getSearchParams: function getSearchParams(key, sort) {
        // $location.search() returns an instance
        // - changing that instance updates search!
        var search = _.extend({}, $location.search());

        if (sort.field === search.field &&
            sort.direction === search.direction) {
          return;
        }

        // Set pristine state
        delete search.sort_field;
        delete search.sort_direction;

        if (sort.field) {
          search.sort_field = sort.field;
          sortCache.field[key] = sort.field;
        }

        if (sort.direction) {
          search.sort_direction = sort.direction;
          sortCache.direction[key] = sort.direction;
        }
        return search;
      },
      set: function set(key, sort) {
        $location.search(this.getSearchParams(key, sort));
      }
    };

  }
]);
