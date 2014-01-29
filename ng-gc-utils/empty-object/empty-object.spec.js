'use strict';

describe('emptyObject', function(){
  beforeEach(module('gc.utils'));

  var utils;

  beforeEach(inject(function ($injector) {
    utils = $injector.get('utils');
  }));

  describe('#emptyObject', function() {
    it('retains reference', function() {
      var obj = {test: true};
      var clean = utils.emptyObject(obj);
      expect(obj).toBe(clean);
    });

    it('is empty', function() {
      var obj = {test: true};
      utils.emptyObject(obj);
      expect(Object.keys(obj).length).toBe(0);
    });
  });

});
