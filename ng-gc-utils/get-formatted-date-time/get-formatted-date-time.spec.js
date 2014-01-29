'use strict';

describe('getFormattedDateTime', function(){
  beforeEach(module('gc.utils'));

  var utils;

  beforeEach(inject(function ($injector) {
    utils = $injector.get('utils');
  }));

  describe('#getFormattedDateTime', function() {
    it('formats to start of day', function() {
      var date = utils.getFormattedDateTime('2012-01-12');
      expect(date).toBe('2012-01-12T00:00:00+00:00');
    });

    it('formats to end of day', function() {
      var date = utils.getFormattedDateTime('2012-01-12', true);
      expect(date).toBe('2012-01-12T23:59:59+00:00');
    });

    it('returns empty string for invalid date', function() {
      var date = utils.getFormattedDateTime('2012-SHIT');
      expect(date).toBe('');
    });
  });

});
