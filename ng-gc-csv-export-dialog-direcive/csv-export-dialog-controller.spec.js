'use strict';

describe('CsvExportDialogController', function(){
  beforeEach(module('gc.csvExportDialogController'));

  var ctrl, scope, $httpBackend;
  var AlertService, LocalStorageService, $q;

  beforeEach(inject(function ($rootScope, $controller, $injector) {
    scope = $rootScope.$new();
    $httpBackend = $injector.get('$httpBackend');
    $q = $injector.get('$q');
    AlertService = $injector.get('AlertService');
    LocalStorageService = $injector.get('LocalStorageService');
    LocalStorageService.removeItem('gc_dashboard_hide_export_help');

    ctrl = $controller('CsvExportDialogController', {
      $scope: scope
    });
  }));

  it('#showHelpDialog', function() {
    scope.showHelpDialog();
    expect(scope.isHelpDialogShown).toBe(true);
  });

  it('#hideHelpDialog', function() {
    scope.hideHelpDialog();
    expect(scope.isHelpDialogShown).toBe(false);
  });

  describe('#exportCSV', function() {
    it('success', function() {
      var deferred = $q.defer();
      spyOn(scope, 'showExportSuccess');
      ctrl.exportCSV(function getPromise() { return deferred.promise });
      deferred.resolve();
      scope.$digest();
      expect(scope.showExportSuccess).toHaveBeenCalledOnce();
    });

    it('error', function() {
      var deferred = $q.defer();
      spyOn(AlertService, 'error');
      ctrl.exportCSV(function getPromise() { return deferred.promise });
      deferred.reject();
      scope.$digest();
      expect(AlertService.error).toHaveBeenCalledOnce();
    });
  });

  describe('#showExportSuccess', function() {
    describe('first time export', function() {
      it('shows dialog', function() {
        spyOn(scope, 'showHelpDialog');
        scope.showExportSuccess();
        expect(scope.showHelpDialog).toHaveBeenCalledOnce();
      });
    });

    describe('second export', function() {
      // * first export *
      beforeEach(function() {
        scope.showExportSuccess();
      });

      it('shows alert', function() {
        spyOn(AlertService, 'success');
        scope.showExportSuccess();
        expect(AlertService.success).toHaveBeenCalledOnce();
      });
    });
  });

});
