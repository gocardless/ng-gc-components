'use strict';

angular.module('ngGcLocationProviderConfig', [])
.config([
  '$locationProvider',
  function LocationProviderConfig($locationProvider) {

    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);

  }
]);
