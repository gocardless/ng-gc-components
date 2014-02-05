'use strict';

describe('CustomerStatusController', function(){
  beforeEach(module('gc.customerStatusController'));

  var ctrl, scope;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();

    ctrl = $controller('CustomerStatusController', {
      $scope: scope
    });
  }));

  var ACTIVE = 'active';
  var INACTIVE = 'inactive';
  var RE_AUTH = 're-auth';
  var PENDING = 'pending';

  var USER_ID = '0ASATS5K9H';

  var ACTIVE_CUSTOMER = {
    active_customer: true,
    billy_customer: true,
    active_billy_customer: true,
    user_id: USER_ID
  };

  var RE_AUTH_CUSTOMER = {
    active_customer: true,
    billy_customer: true,
    active_billy_customer: false,
    user_id: USER_ID
  };

  var INACTIVE_CUSTOMER = {
    active_customer: false,
    user_id: USER_ID
  };

  var PENDING_CUSTOMER = {
    user_id: null
  };

  describe('#customerStatus', function() {
    it('is active', function() {
      expect(scope.customerStatus(ACTIVE_CUSTOMER)).toBe(ACTIVE);
    });

    it('is re-auth', function() {
      expect(scope.customerStatus(RE_AUTH_CUSTOMER)).toBe(RE_AUTH);
    });

    it('is inactive', function() {
      expect(scope.customerStatus(INACTIVE_CUSTOMER)).toBe(INACTIVE);
    });

    it('is pending', function() {
      expect(scope.customerStatus(PENDING_CUSTOMER)).toBe(PENDING);
    });
  });

  describe('#customerStatusTitle', function() {
    it('is active', function() {
      var msg = 'authorised';
      expect(scope.customerStatusTitle(ACTIVE_CUSTOMER)).toBe(msg);
    });

    it('is re-auth', function() {
      var msg = 'only authorised through a partner';
      expect(scope.customerStatusTitle(RE_AUTH_CUSTOMER)).toBe(msg);
    });

    it('is inactive', function() {
      var msg = 'inactive';
      expect(scope.customerStatusTitle(INACTIVE_CUSTOMER)).toBe(msg);
    });

    it('is pending', function() {
      var msg = 'pending';
      expect(scope.customerStatusTitle(PENDING_CUSTOMER)).toBe(msg);
    });
  });

});
