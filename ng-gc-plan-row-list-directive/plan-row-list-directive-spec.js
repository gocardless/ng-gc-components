'use strict';

describe('planRowDirective', function() {
  beforeEach(module('gc.planRowList'));

  var elm, scope;

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();
    scope.plans = [
      { status: 'active', id: 11 },
      { status: 'inactive', id: 22 }
    ];
    elm = angular.element(
      '<plan-row-list plans="plans" url="url" ' +
      '></plan-row-list>'
    );
    $compile(elm)(scope);
    scope.$digest();
  }));

  it('has plan row items', function() {
    var listItem = elm.find('.payments__list__item');
    expect(listItem.length).toBe(2);
  });

});
