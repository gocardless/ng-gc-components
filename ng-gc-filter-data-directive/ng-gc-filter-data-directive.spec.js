'use strict';

describe('filterDataDirective', function() {
  beforeEach(module('gc.filterDataDirective'));

  var $compile, $location, scope;

  beforeEach(inject(function($rootScope, $injector) {
    $compile = $injector.get('$compile');
    $location = $injector.get('$location');
    scope = $rootScope.$new();
  }));

  function sharedExamplesFor(element) {
    var elm, elmScope;

    beforeEach(function() {
      elm = angular.element(element);
      $compile(elm)(scope);
      elmScope = elm.scope();
    });

    it('sets the element value on init', function() {
      $location.search('name', 'Tobias');
      $compile(elm)(scope);
      expect(elmScope.value).toEqual('Tobias');
    });

    it('adds a param to the search', function() {
      scope.form.filterInput.$setViewValue('stuff');
      scope.$digest();
      expect($location.search().name).toEqual('stuff');
    });

    it('removes a param from the search', function() {
      $location.search('name', 'stuff');
      scope.form.filterInput.$setViewValue('');
      scope.$digest();
      expect($location.search().name).toBeUndefined();
    });
  }

  describe('with a filter name', function() {
    sharedExamplesFor(
      '<form name="form">' +
        '<input filter-data="name" ng-model="value" name="filterInput">' +
      '</form>');
  });

  describe('with a filter name and value', function() {
    sharedExamplesFor(
      '<form name="form">' +
        '<input filter-data="{ name: name }" ' +
         'ng-model="value" ' +
         'name="filterInput">' +
      '</form>'
    );
  });

});
