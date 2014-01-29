'use strict';

describe('MerchantApiServiceSpec', function(){
  beforeEach(module('ngGcMerchantApiService'));
  var MerchantApiService, $httpBackend;

  beforeEach(inject(function($injector) {
    MerchantApiService = $injector.get('MerchantApiService');
    $httpBackend = $injector.get('$httpBackend');
  }));

  afterEach(function() {
    $httpBackend.flush();
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('#findOne', function() {
    $httpBackend.expectGET('/api/merchant').respond(200);
    MerchantApiService.findOne();
    // Cached
    MerchantApiService.findOne();
  });

});
