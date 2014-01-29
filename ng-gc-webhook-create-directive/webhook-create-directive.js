'use strict';

angular.module('gc.webHookCreateDirective', [
  'gc.webHookCreateController',
  'gc.inputErrorDirective',
  'webhook-create-template.html'
]).directive('webHookCreate', [
  function webHookCreateDirective() {

    return {
      restrict: 'E',
      controller: 'WebHookCreateController',
      templateUrl: 'webhook-create-template.html',
      replace: true,
      scope: {
        getDefaults: '&form',
        onCreate: '&'
      }
    };

  }
]);
