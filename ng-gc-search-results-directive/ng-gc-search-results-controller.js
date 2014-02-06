'use strict';

angular.module('gc.searchResultsController', [
  'gc.utils'
])
// Map to template files > templates/ng-gc-search-results-CONSTANT-template.html
.constant('SearchStates', {
  MERCHANTS: 'merchants',
  CUSTOMERS: 'customers',
  BILLS: 'bills',
  PAYOUTS: 'payouts',
  LOADING: 'loading',
  EMPTY: 'empty'
})
.factory('SearchState', [
  'SearchStates',
  function SearchStateFactory(SearchStates) {
    var searchState = '';

    function isValidSearchState(state) {
      return Object.keys(SearchStates).some(function(key) {
        return SearchStates[key] === state;
      });
    }

    function getSearchState() {
      return searchState;
    }

    function transitionSearchState(state) {
      if(isValidSearchState(state)) {
        searchState = state;
      }
    }

    return {
      get: getSearchState,
      valid: isValidSearchState,
      transition: transitionSearchState
    };
  }
])
.controller('GCSearchResultsController', [
  '$scope', 'SearchStates', 'SearchState', 'utils',
  function GCSearchResultsController($scope, SearchStates, SearchState, utils) {

    $scope.SearchState = SearchState;

    // Initial state
    $scope.SearchState.transition(SearchStates.LOADING);

    // Ordered by selection priority
    var searchKeys = [
      SearchStates.CUSTOMERS,
      SearchStates.BILLS,
      SearchStates.PAYOUTS,
      SearchStates.MERCHANTS
    ];

    $scope.searchResultsTemplate = function searchResultsTemplate(state) {
      if (!$scope.SearchState.valid(state)) {
        state = SearchStates.EMPTY;
      }
      return 'templates/ng-gc-search-results-' + state + '-template.html';
    };

    $scope.isFacetsVisible = function isFacetsVisible() {
      var state = SearchState.get();
      return state !== SearchStates.EMPTY && state !== SearchStates.LOADING;
    };

    // Steve (2013-26-07) : This is going to move when we have a show view for
    // pending customers
    $scope.customerUrl = function customerUrl(customer) {
      if (customer.is_pending || !customer.user_id) {
        return '/customers' + '?status=pending';
      } else {
        return '/customers/' + customer.id;
      }
    };

    function setSearchState(results) {
      if (!results.$resolved) {
        $scope.SearchState.transition(SearchStates.LOADING);
      } else {
        var index;
        var hasResults;

        if (Object.keys(results).length) {
          hasResults = searchKeys.some(function hasResultsIterator(key, i) {
            if (results[key] && results[key].results.length) {
              index = i;
              return true;
            }
          });
        }

        if (!hasResults) {
          $scope.SearchState.transition(SearchStates.EMPTY);
        } else {
          $scope.SearchState.transition(searchKeys[index]);
        }
      }
    }

    $scope.$watch('results.$resolved', function resolvedChange() {
      if ($scope.results) {
        // Copy the data to prevent an out of sync searchState
        setSearchState(utils.mixin({}, $scope.results));

        // Clear results if there is an error
        $scope.results.$promise &&
        $scope.results.$promise.then(null, function rejectedResults() {
          utils.emptyObject($scope.results);
        });

        // Clear results if we are currently loading
        if (!$scope.results.$resolved) {
          utils.emptyObject($scope.results);
        }
      }
    });
  }
]);
