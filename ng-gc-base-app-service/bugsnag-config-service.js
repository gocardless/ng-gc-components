'use strict';

angular.module('ngGcBugsnagConfigService', [
]).provider('BugsnagConfigService', [
  function() {

    this.config = function config(options, metaData) {
      window.Bugsnag.releaseStage = options.releaseStage;
      window.Bugsnag.apiKey = options.apiKey;
      window.Bugsnag.notifyReleaseStages = options.notifyReleaseStages;
      if (metaData) { window.Bugsnag.metaData = metaData; }
    };

    this.$get = angular.noop;

  }
]);
