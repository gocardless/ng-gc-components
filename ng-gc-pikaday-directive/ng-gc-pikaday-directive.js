'use strict';

angular.module('gc.pikaday', [
]).directive('pikaday', [
  '$window',
  function pikadayDirective($window) {

    var formatDate = function formatDate(date) {
      return date.format('D MMM YYYY');
    };

    return {
      restrict: 'E',
      scope: {
        date: '=',
        isRequired: '=',
        options: '=?'
      },
      replace: true,
      template: '<input type="text" ng-model="date" ng-required="isRequired">',
      link: function pikadayLink(scope, element) {
        var pikadayDefault = {
          field: element[0],
          // moment.js date formatting
          format: 'D MMM YYYY',
          // Set start day of week to monday
          firstDay: 1,
          onSelect: function onSelect() {
            var date = this.getMoment();
            if (date.isValid()) {
              scope.$apply(function(){
                scope.date = formatDate(date);
              });
            }
          }
        };

        function getOptions(options) {
          return angular.extend({}, pikadayDefault, angular.copy(options));
        }

        var pikaday = new $window.Pikaday(getOptions(scope.options));

        // if options change, set pikaday config again
        scope.$watch('options', function() {
          pikaday.config(getOptions(scope.options));
          pikaday.draw();
        });

        // Get out of Angulars event loop with setTimeout
        // pikaday.setDate calls 'onSelect' which calls scope.$apply
        $window.setTimeout(function() {
          pikaday.setDate(scope.date);
        }, 0);

        scope.pikaday = pikaday;

        scope.$on('$destroy', function pikadayDestroy(){
          scope.pikaday.destroy();
        });
      }
    };

  }
]);
