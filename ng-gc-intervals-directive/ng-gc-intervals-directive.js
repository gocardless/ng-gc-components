'use strict';

angular.module('gc.intervals', [
  'ngGcCapitalize',
  'ngGcIntervalMessagesService'
]).directive('gcIntervals', [
  'IntervalMessagesService', 'capitalizeFilter',
  function gcIntervalsDirective(IntervalMessagesService, capitalizeFilter) {

    return function gcIntervalsLink(scope, element, attr) {
      scope.$watch(function gcIntervals() {
        var value = parseFloat(scope.$eval(attr.count));
        var key = scope.$eval(attr.gcIntervals);
        return IntervalMessagesService.get(value, key);
      }, function gcIntervalsAction(newVal) {
        element.text(capitalizeFilter(newVal));
      });
    };

  }
]);
