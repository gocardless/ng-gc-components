'use strict';

describe('PartnerApiServiceSpec', function(){
  beforeEach(module('ngGcPartnerApiService'));
  var PartnerApiService, $httpBackend;

  beforeEach(inject(function($injector) {
    PartnerApiService = $injector.get('PartnerApiService');
    $httpBackend = $injector.get('$httpBackend');
  }));

  afterEach(function() {
    $httpBackend.flush();
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('#findOne', function() {
    $httpBackend.expectGET('/api/partner').respond(200);
    PartnerApiService.findOne();
    // Cached
    PartnerApiService.findOne();
  });

});
