'use strict';

describe('EnvironmentHelpers', function(){
  beforeEach(module('gc.environmentHelpers'));

  var EnvironmentHelpers;

  function setup(config) {
    beforeEach(module(function($provide) {
      $provide.value('AppConfigService', {
        current: config
      });
    }));

    beforeEach(inject(function($injector) {
      EnvironmentHelpers = $injector.get('EnvironmentHelpers');
    }));
  }

  describe('EnvironmentHelpers', function() {
    describe('isLiveProduction', function() {
      describe('false', function() {
        setup({
          host: 'test',
          sandboxProductionHost: 'other'
        });

        it(function() {
          expect(EnvironmentHelpers.isLiveProduction()).toBe(false);
        });
      });

      describe('true', function() {
        setup({
          host: 'test',
          liveProductionHost: 'test'
        });

        it(function() {
          expect(EnvironmentHelpers.isLiveProduction()).toBe(true);
        });
      });
    });

    describe('sandboxProductionHost', function() {
      describe('false', function() {
        setup({
          host: 'test',
          sandboxProductionHost: 'other'
        });

        it(function() {
          expect(EnvironmentHelpers.isSandboxProduction()).toBe(false);
        });
      });

      describe('true', function() {
        setup({
          host: 'test',
          sandboxProductionHost: 'test'
        });

        it(function() {
          expect(EnvironmentHelpers.isSandboxProduction()).toBe(true);
        });
      });
    });
  });
});
