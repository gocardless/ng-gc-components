'use strict';

angular.module('gc.webHookViewDirective', [
  'gc.webHookViewController',
  'ngGcKeyvalueFilter',
  'ngGcPrettyJsonFilter',
  'webhook-view-template.html'
]).directive('webHookView', [
  function webHookViewDirective() {

    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'webhook-view-template.html',
      scope: {
        webHook: '='
      },
      controller: 'WebHookViewController'
    };

  }
]);
