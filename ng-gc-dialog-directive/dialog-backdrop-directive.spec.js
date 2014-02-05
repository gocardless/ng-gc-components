'use strict';

describe('DialogBackdrop', function() {

  beforeEach(module('gc.backdrop'));

  var elm, scope, $window;

  beforeEach(inject(function($injector) {
    $window = $injector.get('$window');
    spyOn($window.Dialog, 'Backdrop');
  }));

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope;
    elm = $compile('<div backdrop></div>')(scope);
    scope.$digest();
  }));

  it('creates backdrop with element', function() {
    expect($window.Dialog.Backdrop).toHaveBeenCalledWith({
      el: elm[0]
    });
  });

});
