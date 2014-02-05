'use strict';

angular.module('gc.searchResults', [
  'gc.customerStatus',
  'gc.searchResultsController',
  'ngGcCurrencySymbolFilter',
  'ng-gc-search-results-template.html',
  'templates/ng-gc-search-results-bills-template.html',
  'templates/ng-gc-search-results-customers-template.html',
  'templates/ng-gc-search-results-merchants-template.html',
  'templates/ng-gc-search-results-empty-template.html',
  'templates/ng-gc-search-results-loading-template.html',
  'templates/ng-gc-search-results-payouts-template.html'
]).directive('gcSearchResults', [
  function gcSearchResultsDirective() {

    return {
      restrict: 'E',
      replace: true,
      controller: 'GCSearchResultsController',
      templateUrl: 'ng-gc-search-results-template.html',
      scope: {
        results: '='
      }
    };

  }
]);
