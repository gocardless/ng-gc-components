'use strict';

describe('DialogController', function(){
  beforeEach(module('gc.dialogController'));

  var ctrl, scope, element, attrs;
  var $location;

  beforeEach(inject(function ($rootScope, $controller, $injector) {
    scope = $rootScope.$new();
    $location = $injector.get('$location');
    element = angular.element('<div>');
    attrs = {};

    ctrl = $controller('DialogController', {
      $scope: scope,
      $element: element,
      $attrs: attrs
    });
  }));

  var showSpy;
  var hideSpy;
  var removeSpy;

  beforeEach(function () {
    showSpy = jasmine.createSpy('show');
    hideSpy = jasmine.createSpy('hide');
    removeSpy = jasmine.createSpy('remove');

    scope.dialog = {
      show: showSpy,
      hide: hideSpy,
      remove: removeSpy
    };
  });

  it('#hideDialog', function() {
    scope.show = true;
    scope.hideDialog();
    scope.$digest();
    expect(scope.show).toBe(false);
    expect(hideSpy).toHaveBeenCalledOnce();
    expect(showSpy).not.toHaveBeenCalled();
  });

  it('calls dialog.show', function () {
    scope.show = true;
    scope.$digest();
    expect(showSpy).toHaveBeenCalledOnce();
    expect(hideSpy).not.toHaveBeenCalled();
  });

  it('hides on location change', function () {
    $location.path('new-page');
    scope.$digest();
    expect(hideSpy).toHaveBeenCalledOnce();
    expect(showSpy).not.toHaveBeenCalled();
  });

  it('$destroy', function () {
    scope.$emit('$destroy');
    scope.$digest();
    expect(removeSpy).toHaveBeenCalledOnce();
  });

});
