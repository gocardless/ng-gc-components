'use strict';

describe('BaseAppService', function() {
  var $rootScope, $window, $http, $httpBackend;

  function injectDependencies() {
    beforeEach(inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $window = $injector.get('$window');
      $http = $injector.get('$http');
      $httpBackend = $injector.get('$httpBackend');
    }));
  }

  describe('LogInitializer', function() {
    beforeEach(module('ngGcLogInitializer'));
    injectDependencies();

    it('$rootScope.$log', inject(function($log) {
      expect($rootScope.$log).toBe($log);
    }));
  });

  describe('BugsnagInitializer', function() {
    beforeEach(function() {
      $window.Bugsnag = {
        user: null
      };
    });
    beforeEach(module('ngGcBugsnagInitializer'));
    injectDependencies();

    it('sets the Bugsnag user to the current user', function() {
      var user = { id: 1 };
      $httpBackend.expectGET('/api/user').respond(user);
      $httpBackend.flush();
      expect($window.Bugsnag.user).toEqual(user);
    });
  });

  describe('AppConfigService', function() {
    var config;
    beforeEach(function() {
      config = {
        host: 'test'
      };
      $window.AppConfig = config;
    });
    beforeEach(module('ngGcAppConfigService'));
    injectDependencies();

    it('has config', inject(function(AppConfigService) {
      expect(AppConfigService).toEqual(config);
    }));
  });

  describe('HttpProviderConfig', function() {
    var clientVersion;
    beforeEach(function() {
      clientVersion = '911';
      $window.AppConfig = {
        clientVersion: clientVersion
      };
    });

    beforeEach(module('ngGcHttpProviderConfig'));
    injectDependencies();

    it('sets CLIENT-VERSION/Accept headers', function() {
      $httpBackend.expectGET('/test', {
        'Accept': 'application/json',
        'CLIENT-VERSION':'911'
      }).respond(200);
      $http.get('/test');
      $httpBackend.flush();
    });
  });

  describe('BugsnagConfigService', function() {
    beforeEach(function() {
      $window.Bugsnag = {
        apiKey: null
      };
    });
    afterEach(function() {
      delete $window.Bugsnag;
    });

    beforeEach(module('ngGcBugsnagConfigService'));

    beforeEach(module(function(BugsnagConfigServiceProvider){
      BugsnagConfigServiceProvider.config({ apiKey: 'test-key' });
    }));

    injectDependencies();

    it('configures Bugsnag apiKey', function() {
      expect($window.Bugsnag.apiKey).toEqual('test-key');
    });
  });
});
