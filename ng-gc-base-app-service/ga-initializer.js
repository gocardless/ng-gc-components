'use strict';

angular.module('ngGcGaInitializer', [
]).run([
  '$rootScope', '$window', '$location', '$log',
  function googleAnalytics($rootScope, $window, $location, $log) {

    $window._gaq || ($window._gaq = []);

    $rootScope.$on('$viewContentLoaded', function trackGAPageView() {
      var path = $location.url();
      $log.info('Page loaded: ' + path);
      $window._gaq.push(['_trackPageview', path]);
    });

  }
]);
