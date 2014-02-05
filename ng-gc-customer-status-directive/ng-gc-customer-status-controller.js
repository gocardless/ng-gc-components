'use strict';

angular.module('gc.customerStatusController', [])
.controller('CustomerStatusController', [
  '$scope',
  function CustomerStatusController($scope) {

    var ACTIVE = 'active';
    var INACTIVE = 'inactive';
    var RE_AUTH = 're-auth';
    var PENDING = 'pending';

    var ACTIVE_MSG = 'authorised';
    var RE_AUTH_MSG = 'only authorised through a partner';
    var INACTIVE_MSG = 'inactive';
    var PENDING_MSG = 'pending';

    $scope.customerStatus = function customerStatus(customer) {
      if (!customer) { return INACTIVE; }

      if (customer.active_customer && !customer.active_billy_customer) {
        return RE_AUTH;
      }
      else if (customer.active_customer) {
        return ACTIVE;
      }
      // XXX - WORST FLAG EVER
      // This will break
      else if (!customer.user_id) {
        return PENDING;
      }
      else {
        return INACTIVE;
      }
    };

    $scope.customerStatusTitle = function customerStatusTitle(customer) {
      switch ($scope.customerStatus(customer)) {
      case ACTIVE:
        return ACTIVE_MSG;
      case RE_AUTH:
        return RE_AUTH_MSG;
      case PENDING:
        return PENDING_MSG;
      default:
        return INACTIVE_MSG;
      }
    };

  }
]);
