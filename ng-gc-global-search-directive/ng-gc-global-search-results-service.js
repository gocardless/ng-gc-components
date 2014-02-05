'use strict';

angular.module('gc.globalSearchResultsService', [
  'gc.resolveResource'
]).factory('GCGlobalSearchResultsService', [
  'ResolveResource',
  function GCGlobalSearchResultsService(ResolveResource) {

    return new ResolveResource({});

  }
]);
