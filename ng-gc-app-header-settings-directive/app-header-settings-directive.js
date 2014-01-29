'use strict';

angular.module('gc.appHeaderSettings', [
  'gc.toggle',
  'gc.popover',
  'app-header-settings-template.html'
])
.directive('appHeaderSettings', [
  function appHeaderSettingsDirective() {

    return {
      restrict: 'E',
      templateUrl: 'app-header-settings-template.html',
      transclude: true,
      replace: true,
      scope: true
    };

  }
]);
