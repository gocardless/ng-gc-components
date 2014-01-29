'use strict';

angular.module('gc.webHookListDirective', [
  'gc.table',
  'gc.paginationNav',
  'gc.webHookListController',
  'webhook-list-template.html'
]).directive('webHookList', [
  function webHookListDirective() {

    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'webhook-list-template.html',
      scope: {
        webHooks: '='
      },
      controller: 'WebHookListController'
    };

  }
]);
