'use strict';

describe('arrayOperations', function(){
  beforeEach(module('gc.utils'));

  var utils;

  beforeEach(inject(function ($injector) {
    utils = $injector.get('utils');
  }));

  describe('#replace', function() {
    it('replaces array contents', function() {
      var oldArr = [1, 2, 3, 31];
      var newArr = [4, 5, 6];

      var replacedArr = utils.replace(oldArr, newArr);
      expect(oldArr).toEqual(newArr);

      // Check that we have the same reference object
      expect(oldArr).toBe(replacedArr);
    });
  });

  describe('#append', function() {
    it('adds array contents', function() {
      var oldArr = [1, 2, 3, 31];
      var newArr = [4, 5, 6];

      var appendedArr = utils.append(oldArr, newArr);
      expect(oldArr).toEqual([1, 2, 3, 31, 4, 5, 6]);

      // Check that we have the same reference object
      expect(oldArr).toBe(appendedArr);
    });
  });

});
