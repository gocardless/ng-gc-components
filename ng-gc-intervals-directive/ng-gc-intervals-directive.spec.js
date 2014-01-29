'use strict';

describe('gcIntervalsDirectiveSpec', function() {

  beforeEach(module('gc.intervals'));

  var elm, scope;

  var MSGS;

  beforeEach(inject(function($rootScope, $compile, INTERVAL_MESSAGES) {
    scope = $rootScope;
    MSGS = INTERVAL_MESSAGES;

    elm = $compile('<span gc-intervals="key" count="count"></span>')(scope);
    scope.$digest();
  }));

  it('sets one weekly', function() {
    scope.key = MSGS.WEEKS;
    scope.count = 1;
    scope.$digest();
    expect(elm.text()).toEqual('Weekly');
  });

  it('sets other monthly', function() {
    scope.key = MSGS.MONTHS;
    scope.count = 2;
    scope.$digest();
    expect(elm.text()).toEqual('Every 2 months');
  });

});
