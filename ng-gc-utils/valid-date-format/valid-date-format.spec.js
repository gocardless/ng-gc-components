'use strict';

describe('validDateFormat', function(){
  beforeEach(module('gc.utils'));

  var utils, $window;

  beforeEach(inject(function ($injector) {
    utils = $injector.get('utils');
    $window = $injector.get('$window');
  }));

  // var FORMATS = ['YYYYMMDD', 'DDMMYYYY', 'DDMMYY', 'DMMMYYYY', 'MMMDYYYY'];

  function specDate(dateStr, isValid) {
    it(dateStr +  ' should be ' + isValid, function () {
      var date = utils.validDateFormat(dateStr);
      expect($window.moment.isMoment(date)).toBe(isValid);
    });
  }

  function isValidDate(dateStr) {
    specDate(dateStr, true);
  }

  function isInValidDate(dateStr) {
    specDate(dateStr, false);
  }

  describe('#validDateFormat', function() {
    describe('valid', function() {
      isValidDate('2012-01-12');
      isValidDate('20120112');
      isValidDate('12012013');
      isValidDate('12-01-2013');
      isValidDate('231298');
      isValidDate('23-12-98');
      isValidDate('01 jan 2012');
      isValidDate('09/04/1986');
      isValidDate('sep 4 1986');
      isValidDate('september 4 1986');
      isValidDate('1 january 1986');
    });

    describe('invalid', function() {
      isInValidDate('2012-SHIT');
      isInValidDate('20130-101');
      isInValidDate('2013001');
      isInValidDate('0101');
      isInValidDate('');
      isInValidDate();
    });

  });

});
