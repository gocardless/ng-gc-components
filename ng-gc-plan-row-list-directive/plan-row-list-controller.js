'use strict';

angular.module('gc.planRowListController', [])
.controller('PlanRowListController', [
  '$scope',
  function PlanRowListController($scope) {

    $scope.getPlanUrl = function getPlanUrl(plan) {
      if (plan.uri) {
        return plan.uri;
      } else {
        return '/plans/' + plan.id;
      }
    };

  }
]);
