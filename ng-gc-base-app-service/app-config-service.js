'use strict';

angular.module('ngGcAppConfigService', [
]).factory('AppConfigService', [
  '$window',
  function AppConfigService($window) {

    return $window.AppConfig;

  }
]);
