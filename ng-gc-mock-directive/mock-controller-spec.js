'use strict';

describe('MockController', function(){
  beforeEach(module('gc.mockController'));

  var ctrl, scope, $httpBackend, replaceSpy;

  beforeEach(module(function ($provide) {
    replaceSpy = jasmine.createSpy('replace');
    $provide.value('$window', {
      location: {
        replace: replaceSpy
      }
    });
  }));

  beforeEach(inject(function ($rootScope, $controller, $injector) {
    scope = $rootScope.$new();
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.expectGET('/api/user').respond(200);
    scope.user = {};

    ctrl = $controller('MockController', {
      $scope: scope
    });
  }));

  it('#endSession', function() {
    $httpBackend.expectDELETE('/api/admin/user_mock').respond(200, []);
    scope.endSession();
    $httpBackend.flush();
    expect(replaceSpy).toHaveBeenCalledOnce();
  });

  it('#changeSession', function() {
    spyOn(scope, 'mockErrorMessage');
    scope.changeSession();
    expect(scope.mockErrorMessage).not.toHaveBeenCalled();
  });

  describe('#changeSession', function() {
    beforeEach(function() {
      scope.user = {
        email: 'a@d.com',
        real_user: {}
      };
    });

    it('success', function() {
      $httpBackend.expectPOST('/api/admin/user_mock', {
        user: 'a@d.com'
      }).respond(200, []);
      scope.changeSession();
      $httpBackend.flush();
      expect(replaceSpy).toHaveBeenCalledOnce();
    });

    it('error 404', function() {
      $httpBackend.expectPOST('/api/admin/user_mock', {
        user: 'a@d.com'
      }).respond(404, []);
      scope.changeSession();
      $httpBackend.flush();
      expect(scope.mockError).toBe('User not found');
    });
  });

});
