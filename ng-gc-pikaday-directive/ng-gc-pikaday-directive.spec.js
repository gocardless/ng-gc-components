'use strict';

describe('pikadayDirective', function() {

  beforeEach(module('gc.pikaday'));

  var elm, scope, pikadayScope, document, moment;

  beforeEach(module(function($provide) {
    $provide.decorator('$window', function($delegate) {
      $delegate.setTimeout = function setTimeout(fn) {
        fn();
      };

      return $delegate;
    });
  }));

  beforeEach(inject(function($rootScope, $compile, $document, $window) {
    moment = $window.moment;
    document = $document;
    scope = $rootScope;

    scope.pikadayDate = '2013-07-17T00:00:00';
    elm = $compile('<pikaday date=pikadayDate></pikaday>')(scope);
    scope.$digest();
    pikadayScope = elm.isolateScope();
  }));

  it('formats initial input', function() {
    scope.$digest();
    expect(elm.val()).toEqual('17 Jul 2013');
  });

  it('binds input', function() {
    scope.pikadayDate = 'test';
    scope.$digest();
    expect(elm.val()).toEqual('test');
  });

  it('sets and binds formatted date', function() {
    pikadayScope.pikaday.show();
    pikadayScope.pikaday.setMoment(moment());

    var val = elm.val();
    expect(val).toEqual(moment().format('D MMM YYYY'));
    expect(scope.pikadayDate).toEqual(val);
  });

});
