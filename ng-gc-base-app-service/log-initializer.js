'use strict';

angular.module('ngGcLogInitializer', [
]).run([
  '$rootScope', '$log',
  function LogInitializer($rootScope, $log) {

    $rootScope.$log = $log;

  }
]);
