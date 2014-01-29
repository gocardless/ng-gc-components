'use strict';

angular.module('gc.planRowList', [
  'gc.planRowListController',
  'gc.planRow',
  'plan-row-list-template.html'
]).directive('planRowList', [
  function planRowDirective() {

    return {
      restrict: 'E',
      templateUrl: 'plan-row-list-template.html',
      scope: {
        plans: '=',
        url: '@'
      },
      controller: 'PlanRowListController',
      replace: true
    };

  }
]);
