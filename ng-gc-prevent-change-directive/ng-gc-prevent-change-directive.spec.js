'use strict';

describe('preventChangeDirective', function() {

  beforeEach(module('gc.preventChange'));

  var elm, scope;

  var CHANGE_VAL = 'ahh…';

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope;
    scope.changeExpr = CHANGE_VAL;
    elm = $compile('<input prevent-change=changeExpr>')(scope);
    scope.$digest();
  }));

  it('sets value from changeExpr', function() {
    var val = 'check me out @2x';
    scope.changeExpr = val;
    scope.$digest();
    expect(elm.val()).toEqual(val);
  });

  it('prevents changes to value', function() {
    elm.val('change me');
    elm.trigger('input');
    expect(elm.val()).toEqual(CHANGE_VAL);
  });

});
