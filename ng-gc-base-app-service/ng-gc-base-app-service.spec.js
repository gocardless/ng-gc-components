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

  describe('RavenInitializer', function() {
    beforeEach(function() {
      $window.Raven = {
        setUser: function() {}
      };
    });
    beforeEach(module('ngGcRavenInitializer'));
    injectDependencies();

    it('Raven.setUser', function() {
      var user = {id: 1};
      spyOn($window.Raven, 'setUser');
      $httpBackend.expectGET('/api/user').respond(user);
      $httpBackend.flush();
      expect($window.Raven.setUser).toHaveBeenCalledOnceWith(user);
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
      expect(AppConfigService).toEqualData(config);
    }));
  });

  describe('HttpProviderConfig', function() {
    var clientVersion;
    beforeEach(function() {
      clientVersion = '911';
      window.AppConfig = {
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

  describe('HttpProviderConfig', function() {
    var configSpy, installSpy;
    beforeEach(function() {
      installSpy = jasmine.createSpy('install');
      configSpy = jasmine.createSpy('config').andReturn({
        install: installSpy
      });
      window.Raven = {
        config: configSpy
      };
    });
    afterEach(function() {
      delete window.Raven;
    });

    beforeEach(module('ngGcRavenConfigService'));

    beforeEach(module(function(RavenConfigServiceProvider){
      RavenConfigServiceProvider.config('/test');
    }));

    injectDependencies();

    it('configs Raven', function() {
      expect(configSpy).toHaveBeenCalledOnceWith('/test', jasmine.any(Object));
      expect(installSpy).toHaveBeenCalledOnce();
    });
  });
});
