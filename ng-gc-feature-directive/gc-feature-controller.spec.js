'use strict';

describe('gc.featureController', function() {
  beforeEach(module('gc.featureController'));

  var scope, controller, $httpBackend;

  beforeEach(inject(function($rootScope, $controller, $injector) {
    scope = $rootScope.$new();
    controller = $controller('FeatureController', {
      $scope: scope
    });
    $httpBackend = $injector.get('$httpBackend');
  }));

  describe('#featureEnabled', function() {
    beforeEach(function() {
      $httpBackend.expectGET('/api/features').respond({
        lolwut: true,
        coolFeature: true,
        lameFeature: false
      });
      $httpBackend.flush();
    });

    it('is true with no feature defined', function() {
      scope.feature = 'lolwut';
      expect(scope.featureEnabled()).toBe(true);
    });

    it('is true with feature enabled', function() {
      scope.feature = 'coolFeature';
      expect(scope.featureEnabled()).toBe(true);
    });

    it('is false with feature disabled', function() {
      scope.feature = 'lameFeature';
      expect(scope.featureEnabled()).toBe(false);
    });

    it('can be overriden by a truthy override attribute', function() {
      scope.override = true;
      scope.feature = 'lameFeature';
      expect(scope.featureEnabled()).toBe(true);
    });

    it('can be overriden by a falsey override attribute', function() {
      scope.override = false;
      scope.feature = 'coolFeature';
      expect(scope.featureEnabled()).toBe(false);
    });
  });
});
