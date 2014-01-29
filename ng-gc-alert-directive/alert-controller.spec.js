'use strict';

describe('AlertController', function(){
  beforeEach(module('gc.alertController'));

  var ctrl, scope;

  var Alerts = ['test', 'test2'];
  var AlertService = {
    get: function() {
      return Alerts;
    }
  };

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('AlertController', {
      $scope: scope,
      AlertService: AlertService
    });
  }));

  describe('closeAlert', function() {
    it('removes existing index in appAlerts', function() {
      scope.closeAlert(1);
      expect(AlertService.get().length).toEqual(1);
    });
  });
});
