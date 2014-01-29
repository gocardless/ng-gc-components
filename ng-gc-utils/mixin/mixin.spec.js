'use strict';

describe('mixin', function(){
  beforeEach(module('gc.utils'));

  var utils;

  beforeEach(inject(function ($injector) {
    utils = $injector.get('utils');
  }));

  describe('#mixin', function() {
    it('throws with bad args', function() {
      var err = 'mixin expects a receiver and a supplier obj';
      expect(function() {
        utils.mixin();
      }).toThrow(err);
      expect(function() {
        utils.mixin({});
      }).toThrow(err);
    });

    it('extends receiver', function() {
      var receiver = { value: 'initial' };
      var supplier = { test: true };
      expect(utils.mixin(receiver, supplier)).toEqualData({
        value: 'initial',
        test: true
      });
    });

    it('retains supplier descriptors', function() {
      var receiver = {};
      var descriptors = {
        value: true,
        writable: false,
        enumerable: false,
        configurable: false
      };

      var supplier = Object.defineProperties({}, {
        test: descriptors
      });

      utils.mixin(receiver, supplier);

      expect(Object.getOwnPropertyDescriptor(receiver, 'test'))
        .toEqualData(descriptors);
    });
  });

});
