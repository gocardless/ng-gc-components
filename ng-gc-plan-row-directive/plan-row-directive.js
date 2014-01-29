'use strict';

angular.module('gc.planRow', [
  'gc.intervals',
  'ngGcCapitalize',
  'ngGcCapitalizeEach',
  'ngGcCurrencySymbolFilter',
  'plan-row-template.html'
])
.directive('planRow', [
  function planRowDirective() {

    return {
      restrict: 'E',
      templateUrl: 'plan-row-template.html',
      scope: {
        plan: '=',
        isAuthorization: '@',
        url: '@'
      },
      replace: true
    };

  }
]);
