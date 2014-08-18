'use strict';

describe('PopoverDirective', function() {
  beforeEach(module('gc.popover'));

  var elm, scope, elmScope;
  var $window;

  beforeEach(inject(function($rootScope, $compile, $injector) {
    scope = $rootScope.$new();
    $window = $injector.get('$window');

    elm = angular.element(
     '<popover show="showPopover">' +
       '{{ message }}' +
     '</popover>'
    );

    $compile(elm)(scope);
    scope.$digest();
    elmScope = elm.isolateScope();
  }));

  it('is not visible', function() {
    scope.showPopover = false;
    scope.$digest();
    expect(elm[0].hasAttribute('open')).toBe(false);
  });

  it('is visible', function() {
    scope.showPopover = true;
    scope.$digest();
    expect(elm[0].hasAttribute('open')).toBe(true);
  });

  it('has message', function() {
    var message = 'message-test';
    scope.message = message;
    scope.$digest();
    expect(elm.find('.ng-scope').text()).toEqual(message);
  });

  it('closes on event closePopover', function() {
    scope.showPopover = true;
    scope.$digest();
    spyOn(elmScope, 'hideDialog');
    scope.$emit('closePopover');
    expect(scope.showPopover).toBe(false);
    expect(elmScope.hideDialog.calls.count()).toEqual(1);
  });

  it('has dialog', function() {
    expect(elmScope.dialog).toEqual(jasmine.any($window.Dialog));
  });

  it('listens for dialog hide', function() {
    spyOn(elmScope, 'hideDialog');
    elmScope.dialog.emit($window.Dialog.HIDE);
    expect(elmScope.hideDialog.calls.count()).toEqual(1);
  });

});
