'use strict';

angular.module('gcNgWindowLocationService', [])
.factory('WindowLocationService', [
  '$window',
  function WindowLocationService($window) {

    return $window.location;

  }
]);
