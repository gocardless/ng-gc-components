'use strict';

describe('LocalStorageService', function(){
  beforeEach(module('ngGcLocalStorageService'));

  var LocalStorageService;

  beforeEach(inject(function ($injector) {
    LocalStorageService = $injector.get('LocalStorageService');
  }));

  describe('localStorage', function() {
    var VALUE = { name: 'name' };
    var KEY = 'test';

    it('#setItem #getItem #removeItem', function() {
      // Set
      LocalStorageService.setItem(KEY, VALUE);

      // Get
      expect(LocalStorageService.getItem(KEY)).toEqual(VALUE);

      // Remove
      LocalStorageService.removeItem(KEY);
      expect(LocalStorageService.getItem(KEY)).toBeNull();
    });
  });

});
