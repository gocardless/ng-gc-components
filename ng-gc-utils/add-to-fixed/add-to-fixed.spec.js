'use strict';

describe('addToFixed', function(){
  beforeEach(module('gc.utils'));

  var utils;
  beforeEach(inject(function ($injector) {
    utils = $injector.get('utils');
  }));

  it('adds numbers together and returns them to 2dp', function() {
    var sum = utils.addToFixed(1.0, 1.0, 5.0);
    expect(sum).toBe('7.00');
  });
});
