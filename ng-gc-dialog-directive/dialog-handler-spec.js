'use strict';

describe('DialogHandlerSpec', function(){
  beforeEach(module('gc.dialogHandler'));
  var service, scope;

  beforeEach(inject(function(DialogHandler, $rootScope) {
    service = DialogHandler;
    scope = $rootScope;
  }));

  it('#hide', function() {
    var isClosed;
    scope.$on('closeDialog', function() {
      isClosed = true;
    });
    service.hide();
    scope.$apply();
    expect(isClosed).toEqual(true);
  });
});
