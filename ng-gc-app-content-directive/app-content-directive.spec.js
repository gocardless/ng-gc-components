'use strict';

describe('AppContentDirectiveSpec', function() {
  beforeEach(module('gc.appContent'));

  var elm, scope;

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope;
    elm = angular.element(
     '<app-content>' +
       '{{ message }}' +
     '</app-content>'
    );
    $compile(elm)(scope);
    scope.$digest();
  }));

  it('has class', function() {
    var hasClass = elm.hasClass('site__container');
    expect(hasClass).toBe(true);
  });

  it('has message', function() {
    scope.message = 'message';
    scope.$digest();
    expect(elm.find('.ng-scope').text()).toEqual('message');
  });

});
