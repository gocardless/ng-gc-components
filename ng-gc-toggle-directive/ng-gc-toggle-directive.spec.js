'use strict';

describe('toggleDirective', function() {
  beforeEach(module('gc.toggle'));

  var elm, elm2, scope, $timeout;

  beforeEach(inject(function($rootScope, $compile, _$timeout_) {
    $timeout =_$timeout_;
    scope = $rootScope;

    scope.value = false;
    scope.valueTwo = false;
    elm2 = $compile('<i toggle="valueTwo"></i>')(scope);
    elm = $compile('<i toggle="value"></i>')(scope);
    scope.$digest();
  }));

  it('has not changed scope.value', function() {
    elm.trigger('click');
    scope.$digest();
    expect(scope.value).toEqual(false);
  });

  it('toggles the scope property on click', function() {
    // Set value to trigger initial digest
    scope.value = true;
    $timeout.flush();

    // Call click
    elm.trigger('click');
    expect(scope.value).toEqual(false);
  });

});
