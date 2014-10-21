'use strict';

describe('DialogDirective', function() {
  beforeEach(module('gc.dialog'));

  var elm, dialogElm, scope, location, elmScope;

  beforeEach(inject(function($rootScope, $compile, $location) {
    scope = $rootScope.$new();
    location = $location;

    var ID = Date.now();
    dialogElm = angular.element(
      '<div backdrop>' +
      '<dialog dialog-title="{{ dialogTitle }}" show="showDialog" id="' + ID + '" >' +
        '{{ message }}' +
      '</dialog>' +
      '</div>'
    );

    $compile(dialogElm)(scope);
    scope.$digest();
    // HACK - dialogElm no longer references the <dialog> elm, it gets inserted
    // before body end
    elmScope = $('#' + ID).isolateScope();

    // Dialog element gets ripped out and appended to the body
    elm = angular.element(elmScope.dialog.element());
  }));

  it('has dialog element', function() {
    expect(elm.find('.dialog').length).toBe(1);
  });

  it('is visible', function() {
    scope.showDialog = true;
    scope.$digest();
    expect(elm[0].hasAttribute('open')).toBe(true);
  });

  it('has dialog-title', function() {
    var title = 'title-test';
    scope.dialogTitle = title;
    scope.$digest();
    expect(elm.find('#dialog-title').text()).toEqual(title);
  });

  it('has message', function() {
    var message = 'message-test';
    scope.message = message;
    scope.$digest();
    expect(elm.find('.ng-scope').text()).toEqual(message);
  });

  it('to close on click', function() {
    scope.showDialog = true;
    scope.$digest();
    elm.find('.dialog__header__close').trigger('click');
    expect(scope.showDialog).toBe(false);
  });

  it('closes on event closeDialog', function() {
    scope.showDialog = true;
    scope.$digest();
    scope.$emit('closeDialog');
    expect(scope.showDialog).toBe(false);
  });

  it('closes on location change', function() {
    scope.showDialog = true;
    location.path('/page');
    scope.$apply();
    expect(scope.showDialog).toBe(false);
  });

});
