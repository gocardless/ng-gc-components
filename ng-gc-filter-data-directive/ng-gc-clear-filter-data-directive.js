'use strict';

angular.module('gc.clearFilterDataDirective', [
]).directive('clearFilterData', [
  '$location',
  function clearFilterDataDirective($location) {

    return function(scope, elm, attrs) {
      var options = scope.$eval(attrs.clearFilterData);
      var inclusions = (options && options.include) || [];

      function getFilterKeys() {
        return Object.keys($location.search()).filter(function(key){
          return inclusions.indexOf(key) !== -1;
        });
      }

      elm.bind('click', function() {
        var search = angular.extend({}, $location.search());
        getFilterKeys().forEach(function(key) {
          delete search[key];
        });

        scope.$apply(function() {
          $location.search(search);
        });
      });

      scope.$watch(function() {
        return getFilterKeys().length;
      }, function(count) {
        elm[count > 0 ? 'removeClass' : 'addClass']('u-is-hidden');
      });
    };

  }
]);
