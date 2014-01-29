'use strict';

angular.module('gc.environmentHelpers', [
  'ngGcAppConfigService',
]).factory('EnvironmentHelpers', [
  'AppConfigService',
  function EnvironmentHelpers(AppConfigService) {

    var config = AppConfigService;

    return {
      isLiveProduction: function isLiveProduction() {
        return config && config.current &&
          config.current.liveProductionHost === config.current.host;
      },
      isSandboxProduction: function isSandboxProduction() {
        return config && config.current &&
          config.current.sandboxProductionHost === config.current.host;
      }
    };

  }
]);
