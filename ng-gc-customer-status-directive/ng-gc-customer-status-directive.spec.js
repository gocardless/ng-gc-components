'use strict';

describe('customerStatusDirective', function() {
  beforeEach(module('gc.customerStatus'));

  var elm, scope;
  var customer = {};

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();
    elm = angular.element(
      '<customer-status customer="customer" title="title"></customer-status>'
    );
    scope.customer = customer;
    $compile(elm)(scope);
    scope.$digest();
  }));

  it('has class', function() {
    expect(elm.hasClass('customer-status')).toBe(true);
  });

});
