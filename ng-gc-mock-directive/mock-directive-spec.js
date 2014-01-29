'use strict';

describe('mockDirective', function() {
  beforeEach(module('gc.mock'));

  var elm, scope, $httpBackend;

  beforeEach(inject(function($rootScope, $compile, $injector) {
    scope = $rootScope;
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.expectGET('/api/user').respond(200);

    elm = angular.element(
     '<mock></mock>'
    );
    $compile(elm)(scope);
    scope.$digest();
    $httpBackend.flush();
  }));

  it('has toggle class', function() {
    expect(elm.find('.mock-bar__toggle').length).toBe(1);
  });

});
