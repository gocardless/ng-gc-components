'use strict';

angular.module('ngGcBaseAppService', [
  'ngGcHttpProviderConfig',
  'ngGcLocationProviderConfig',
  'ngGcBugsnagInitializer',
  'ngGcLogInitializer',
  'ngGcGaInitializer',
  'ngGcBugsnagConfigService',
  'ngGcExceptionHandlerProviderConfig'
]);
