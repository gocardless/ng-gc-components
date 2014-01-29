'use strict';

describe('AppHeaderBackDirective', function() {
  beforeEach(module('gc.appHeaderBack'));

  var elm, scope;

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope;
    elm = angular.element(
     '<app-header-back title="{{ headerTitle }}" ' +
     'subheading="{{ subheading }}" show-back-btn="{{ showBackBtn }}">' +
       '{{ message }}' +
     '</app-header-back>'
    );
    $compile(elm)(scope);
    scope.$digest();
  }));

  it('has class', function() {
    var hasClass = elm.hasClass('page__outer-header');
    expect(hasClass).toBe(true);
  });

  it('has title', function() {
    scope.headerTitle = 'test';
    scope.$digest();
    expect(elm.find('.page__header__title').text()).toBe('test');
  });

  it('has subheading', function() {
    scope.headerTitle = 'customer name';
    scope.subheading = 'company name';
    scope.$digest();
    expect(elm.find('.page__header__title').text()).toBe('company name');
    expect(elm.find('.page__header__subheading').text()).toBe('customer name');
  });

  it('has message', function() {
    scope.message = 'message';
    scope.$digest();
    expect(elm.find('.ng-scope').text()).toEqual('message');
  });

});
