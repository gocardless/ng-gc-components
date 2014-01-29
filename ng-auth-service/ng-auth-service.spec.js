'use strict';

describe('AuthService', function(){
  beforeEach(module('ngAuthService'));

  var AuthService, $httpBackend;

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
  });

  function injectDependecies() {
    beforeEach(inject(function ($injector) {
      AuthService = $injector.get('AuthService');
      $httpBackend = $injector.get('$httpBackend');
    }));
  }

  function behavesAsSignIn(url) {
    it('#signIn', function() {
      var data = {
        user: {
          email: '@',
          password: 1
        }
      };

      $httpBackend.expectPOST(url, data).respond(200);
      AuthService.signIn({ data: data });
      $httpBackend.flush();
    });
  }

  function behavesAsSignOut(url) {
    it('#signOut', function() {
      $httpBackend.expectDELETE(url).respond(200);
      AuthService.signOut();
      $httpBackend.flush();
    });
  }

  describe('default api', function() {
    injectDependecies();

    behavesAsSignIn('/api/auth');
    behavesAsSignOut('/api/auth');
  });

  describe('provider #setApiEndpoint', function() {
    beforeEach(function() {
      module(function(AuthServiceProvider) {
        AuthServiceProvider.setApiEndpoint('/api/auth/custom');
      });
    });

    injectDependecies();

    behavesAsSignIn('/api/auth/custom');
    behavesAsSignOut('/api/auth/custom');
  });

});
