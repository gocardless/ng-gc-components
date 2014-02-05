'use strict';

angular.module('gc.globalSearchController', [
  'gc.globalSearchResultsService',
  'gc.utils'
]).controller('GlobalSearchController', [
  '$scope',
  'GCGlobalSearchResultsService',
  'utils',
  '$q',
  function GlobalSearchController($scope, GCGlobalSearchResultsService, utils,
    $q) {

    $scope.search = {
      results: GCGlobalSearchResultsService,
      query: ''
    };

    $scope.dialogOptions = {
      template: '<div class="dialog-center">' +
                '<dialog-content class="global-search">' +
                '</dialog-content></div>'
    };

    $scope.closeSearch = function closeSearch() {
      $scope.clearQuery();
      $scope.hideDialog();
    };

    $scope.clearQuery = function clearQuery() {
      $scope.search.query = '';
      utils.emptyObject($scope.search.results);
    };

    $scope.showDialog = function showDialog() {
      $scope.isDialogVisible = true;
    };

    $scope.hideDialog = function hideDialog() {
      $scope.isDialogVisible = false;
    };

    // If dialog hides itself clear the query
    $scope.$watch('isDialogVisible', function watchSearch(isDialogVisible) {
      if (!isDialogVisible) {
        $scope.clearQuery();
      }
    });

    var latestQueryChange;

    var debouncedSearch = utils.debounce(function search(q, start) {
      var deferred = $q.defer();

      var query = $scope.performSearchQuery({
        searchQuery: q
      });
      query.then(function resolve(data) {
        // If this request was iniated after the search query changed
        // reject the promise preventing results from being updated
        if (start < latestQueryChange) {
          deferred.reject('cancelled');
        } else {
          deferred.resolve(data);
        }
      }, function reject(reason) {
        deferred.reject(reason);
      });

      GCGlobalSearchResultsService.resolve(deferred.promise);
    }, 250);

    // Perform the search and populate results
    $scope.$watch('search.query', function watchSearch(q) {
      var deferred;

      latestQueryChange = new Date();

      if (q.length > 2) {
        debouncedSearch(q, latestQueryChange);

        if (!$scope.isDialogVisible) {
          $scope.showDialog();
        }
      } else {
        // Clear results - using resolve will set $resovled to true
        deferred = $q.defer();
        GCGlobalSearchResultsService.resolve(deferred.promise);
        deferred.resolve({});
      }
    });

    // Keep $scope.search.query and $scope.searchQuery in sync
    var lastSearchQueryValue = $scope.search.query = $scope.searchQuery;
    $scope.$watch(function searchQueryValueWatch() {
      if ($scope.searchQuery !== $scope.search.query) {
        // we are out of sync and need to copy
        if ($scope.searchQuery !== lastSearchQueryValue) {
          // parent changed and it has precedence
          lastSearchQueryValue = $scope.search.query = $scope.searchQuery;
        } else {
          $scope.searchQuery = lastSearchQueryValue = $scope.search.query;
        }
      }
      return $scope.searchQuery;
    });

  }
]);
