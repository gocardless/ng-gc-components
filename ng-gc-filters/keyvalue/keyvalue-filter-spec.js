'use strict';

describe('keyvalueFilter', function(){
  beforeEach(module('ngGcKeyvalueFilter'));

  var keyvalueFilter;

  beforeEach(inject(function ($injector) {
    keyvalueFilter = $injector.get('keyvalueFilter');
  }));

  describe('keyvalueFilter', function() {
    it('format', function() {
      expect(keyvalueFilter({a: 2, b: 1}))
        .toEqual('A: 2\nB: 1');
    });
  });
});
