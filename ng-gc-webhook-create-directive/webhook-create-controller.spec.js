'use strict';

describe('WebHookCreateController', function(){
  beforeEach(module('gc.webHookCreateController'));

  var $q, scope, ctrl, $route, AlertService;

  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    $q = $injector.get('$q');
    $route = $injector.get('$route');
    AlertService = $injector.get('AlertService');
    scope.getDefaults = angular.noop;
    scope.onCreate = angular.noop;
    ctrl = $controller('WebHookCreateController', {
      $scope: scope
    });
  }));

  beforeEach(function() {
  });

  describe('#createWebHook', function() {
    it('throws with no promise', function() {
      expect(scope.createWebHook)
        .toThrow('onCreate must return a promise');
    });

    describe('onCreate', function() {
      var deferred;
      beforeEach(function() {
        deferred = $q.defer();
        var promise = deferred.promise;
        scope.onCreate = function() {
          return promise;
        };
      });

      it('success', function() {
        scope.createWebHook();

        expect(scope.isSubmitting).toBe(true);
        spyOn(AlertService, 'success');
        spyOn($route, 'reload');

        deferred.resolve();
        scope.$digest();

        expect(AlertService.success).toHaveBeenCalledOnce();
        expect($route.reload).toHaveBeenCalledOnce();
      });

      it('error', function() {
        scope.createWebHook();

        expect(scope.isSubmitting).toBe(true);
        spyOn(AlertService, 'error');
        spyOn($route, 'reload');

        var errors = { test: 1 };
        deferred.reject({ data: { errors: errors } });
        scope.$digest();

        expect(AlertService.error).toHaveBeenCalledOnce();
        expect($route.reload).not.toHaveBeenCalledOnce();
        expect(scope.formErrors).toEqualData(errors);
      });
    });

  });

});
