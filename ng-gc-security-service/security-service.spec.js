'use strict';

describe('SecurityService', function() {

  var $rootScope, $http, $httpBackend, $window;
  var userInfo, userInfoWithMigrationToken;

  beforeEach(module('ngSecurityService'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $http = $injector.get('$http');
    $window = $injector.get('$window');

    userInfo = {
      id: '1234567890',
      email: 'jo@bloggs.com',
      firstName: 'Jo',
      lastName: 'Bloggs'
    };

    userInfoWithMigrationToken = _.assign({ migration_token: 'JWT_SAMPLE_TOKEN' }, userInfo);
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  var service, queue;
  beforeEach(inject(function($injector) {
    service = $injector.get('SecurityService');
    queue = $injector.get('SecurityRetryQueue');
  }));

  describe('showSignIn', function() {
    it('should open the dialog', function() {
      service.showSignIn();
      expect(service.isSignInVisible()).toBe(true);
    });
  });

  describe('signIn', function() {
    it('sends a http request to signIn the specified user', function() {
      $httpBackend.expect('POST', '/api/auth', {
        user: { email: 'email', password: 'password' }
      }).respond(200, userInfo);
      service.signIn({ email: 'email', password: 'password' });
      $httpBackend.flush();
    });

    it('calls queue.retry on a successful signIn', function() {
      $httpBackend.when('POST', '/api/auth').respond(200, userInfo);
      spyOn(queue, 'retryAll');
      service.showSignIn();
      service.signIn({ email: 'email', password: 'password' });
      $httpBackend.flush();
      $rootScope.$digest();
      expect(queue.retryAll).toHaveBeenCalled();
    });

    it('does not call queue.retryAll after a signIn failure', function() {
      $httpBackend.when('POST', '/api/auth').respond(400, null);
      spyOn(queue, 'retryAll');
      expect(queue.retryAll).not.toHaveBeenCalled();
      service.signIn({ email: 'email', password: 'password' });
      $httpBackend.flush();
      expect(queue.retryAll).not.toHaveBeenCalled();
    });

    it('does not attempt redirect when migration_token is not present', function() {
      $httpBackend.when('POST', '/api/auth').respond(200, userInfo);
      spyOn(service, 'getLocation');
      spyOn(service, 'setLocation');
      service.showSignIn();
      service.signIn({ email: 'email', password: 'password' });
      $httpBackend.flush();
      $rootScope.$digest();
      expect(service.getLocation).not.toHaveBeenCalled();
      expect(service.setLocation).not.toHaveBeenCalled();
    });

    describe('when redirecting to PRO for one-product', function() {
      beforeEach(function() {
        $window.Bugsnag = {
          notifyException: jasmine.createSpy('notifyException'),
        };
      })

      describe('with a valid host', function() {
        beforeEach(function() {
          $httpBackend.when('DELETE', '/api/auth').respond(201, {});
          $httpBackend.when('POST', '/api/auth').respond(200, userInfoWithMigrationToken);
        });

        [
          ['dashboard.gocardless.dev:3004', 'localhost:3010'],
          ['dashboard.gocardless.com', 'manage.gocardless.com'],
          ['dashboard-staging.gocardless.com', 'manage-staging.gocardless.com'],
          ['dashboard-sandbox.gocardless.com', 'manage-sandbox.gocardless.com'],
          ['dashboard-sandbox-staging.gocardless.com', 'manage-sandbox-staging.gocardless.com']
        ].forEach(function (hosts) {
          it('redirects ' + hosts[0] + ' to: ' + hosts[1], function() {
            spyOn(service, 'getLocation').and.returnValue({ host: hosts[0] });
            spyOn(service, 'setLocation');
            service.showSignIn();
            service.signIn({ email: 'email', password: 'password' });
            $httpBackend.flush();
            $rootScope.$digest();
            expect(service.getLocation).toHaveBeenCalled();
            expect(service.setLocation).toHaveBeenCalledWith('//' + hosts[1] + '/?migration_token=' + userInfoWithMigrationToken.migration_token);
          });
        });
      });

      describe('with an invalid host', function() {
        it('reports error and signs in normally', function() {
          $httpBackend.when('POST', '/api/auth').respond(200, userInfoWithMigrationToken);
          spyOn(queue, 'retryAll');
          service.showSignIn();
          service.signIn({ email: 'email', password: 'password' });
          $httpBackend.flush();
          $rootScope.$digest();
          expect(queue.retryAll).toHaveBeenCalled();
          expect($window.Bugsnag.notifyException).toHaveBeenCalled();
        });
      });

      describe('when service.signOut() fails', function() {
        it('reports error and signin normally', function() {
          $httpBackend.when('POST', '/api/auth').respond(200, userInfoWithMigrationToken);
          spyOn(service, 'getLocation').and.returnValue({ host: 'dashboard.gocardless.dev:3004' });
          spyOn(service, 'signOut').and.throwError();
          spyOn(queue, 'retryAll');
          service.showSignIn();
          service.signIn({ email: 'email', password: 'password' });
          $httpBackend.flush();
          $rootScope.$digest();
          expect(service.getLocation).toHaveBeenCalled();
          expect(queue.retryAll).toHaveBeenCalled();
          expect($window.Bugsnag.notifyException).toHaveBeenCalled();
        });
      });
    });
  });

  describe('signOut', function() {
    beforeEach(function() {
      $httpBackend.when('DELETE', '/api/auth').respond(200);
    });

    it('sends a http post to clear the current logged in user', function() {
      $httpBackend.expect('DELETE', '/api/auth');
      service.signOut();
      $httpBackend.flush();
    });

    it('calls signout callback', function() {
      var called;
      service.signOut(function() {
        called = true;
      });
      $httpBackend.flush();
      expect(called).toBe(true);
    });
  });

  describe('isAuthenticated', function() {
    it('should be unauthenticated to begin with', function() {
      expect(service.isAuthenticated()).toBe(false);
    });

    it('should be authenticated if we successfully sign in', function() {
      $httpBackend.when('POST', '/api/auth').respond(200, userInfo);
      service.signIn({ email: 'email', password: 'password' });
      $httpBackend.flush();
      expect(service.isAuthenticated()).toBe(true);
    });

    it('should not be authenticated if we clear the user', function() {
      $httpBackend.when('POST', '/api/auth').respond(401);
      service.signIn({ email: 'email', password: 'password' });
      $httpBackend.flush();
      expect(service.isAuthenticated()).toBe(false);
    });
  });
});
