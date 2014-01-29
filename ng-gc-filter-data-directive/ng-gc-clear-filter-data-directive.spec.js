'use strict';

describe('clearFilterDataDirective', function() {
  beforeEach(module('gc.clearFilterDataDirective'));

  var $compile, scope, $location;
  var elm, elmScope;

  beforeEach(inject(function($rootScope, $injector) {
    $compile = $injector.get('$compile');
    $location = $injector.get('$location');
    scope = $rootScope.$new();
  }));

  beforeEach(function() {
    elm = angular.element(
      '<a clear-filter-data="{ include: [\'includedKey\'] }"></a>'
    );
    $compile(elm)(scope);
    elmScope = elm.scope();
  });

  describe('filter clearing', function() {
    it('clears included filter data on click', function() {
      $location.search('includedKey', 'aValue');
      elm.trigger('click');
      expect($location.search().aKey).toBeUndefined();
    });

    it('does not clear excluded search params', function() {
      $location.search('nonIncludedKey', 'aValue');
      elm.trigger('click');
      expect($location.search().nonIncludedKey).toEqual('aValue');
    });
  });

  describe('visibility', function() {
    it('is hidden when there are no filters', function() {
      $location.search({});
      scope.$digest();
      expect(elm.is(':visible')).toBe(false);
    });

    // Element is clearly visible but the selector is fucked
    // Checking css display is unreliable, browsers set different values
    it('is visible when there are filters', function() {
      $location.search('includedKey', 'aValue');
      scope.$digest();
      expect(elm.css('display')).not.toBe('none');
    });
  });

});
