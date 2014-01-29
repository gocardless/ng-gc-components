'use strict';

angular.module('ngGcHttpProviderConfig', [
  'gc.ngHttpGetParamInterceptor'
]).config([
  '$httpProvider',
  function($httpProvider) {

    var clientVersion = window.AppConfig && window.AppConfig.clientVersion;

    $httpProvider.defaults.headers.common.Accept = 'application/json';
    $httpProvider.defaults.headers.common['CLIENT-VERSION'] = clientVersion;

    $httpProvider.interceptors.push('httpGetParamInterceptor');
  }
]);
