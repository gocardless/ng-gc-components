'use strict';

describe('utilsSpec', function(){
  beforeEach(module('gc.utils'));

  var mixin;

  beforeEach(module(function($provide){
    mixin = {
      fooFunction: function() {},
      barValue: 'heyhey'
    };
    $provide.value('mixin', mixin);
  }));

  var utils;

  beforeEach(inject(function ($injector) {
    utils = $injector.get('utils');
  }));

  it('adds any passed objects to the utils object', function() {
    for (var prop in mixin) {
      if (mixin.hasOwnProperty(prop)) {
        expect(utils[prop]).toBe(mixin[prop]);
      }
    }
  });
});
