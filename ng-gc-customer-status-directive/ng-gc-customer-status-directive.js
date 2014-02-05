'use strict';

angular.module('gc.customerStatus', [
  'gc.customerStatusController',
  'ngGcCapitalize',
  'ng-gc-customer-status-template.html'
]).directive('customerStatus', [
  function customerStatusDirective() {

    return {
      restrict: 'E',
      templateUrl: 'ng-gc-customer-status-template.html',
      replace: true,
      scope: {
        title: '@',
        customer: '='
      },
      controller: 'CustomerStatusController'
    };

  }
]);
