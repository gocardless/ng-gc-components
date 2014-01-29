'use strict';

describe('StatusCodeService', function(){
  beforeEach(module('gc.statusCodeService'));

  var StatusCodeService;

  beforeEach(inject(function ($injector) {
    StatusCodeService = $injector.get('StatusCodeService');
  }));

  var errors = [404, 500, 499, '404', '500', '499'];
  var successes = [100, 201, 301, 200, '100', '201', '301', '200'];

  function expectLabel(prefix, label) {
    it(label, function() {
      expect(StatusCodeService.getLabel(parseInt(prefix + '00', 10)))
        .toEqual(label);
      expect(StatusCodeService.getLabel(parseInt(prefix + '01', 10)))
        .toEqual(label);
      expect(StatusCodeService.getLabel(prefix + '01')).toEqual(label);
      expect(StatusCodeService.getLabel(prefix)).toEqual('');
    });
  }

  describe('StatusCodeService', function() {
    it('#isError', function() {
      errors.forEach(function(error) {
        expect(StatusCodeService.isError(error)).toBe(true);
      });
      successes.forEach(function(success) {
        expect(StatusCodeService.isError(success)).toBe(false);
      });
    });

    it('#isSuccess', function() {
      errors.forEach(function(error) {
        expect(StatusCodeService.isSuccess(error)).toBe(false);
      });
      successes.forEach(function(success) {
        expect(StatusCodeService.isSuccess(success)).toBe(true);
      });
    });

    describe('#getLabel', function() {
      expectLabel(1, 'info');
      expectLabel(2, 'success');
      expectLabel(3, 'redirect');
      expectLabel(4, 'client-error');
      expectLabel(5, 'server-error');
      expectLabel(6, '');
    });
  });
});
