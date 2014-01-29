'use strict';

describe('UserApiServiceSpec', function(){
  beforeEach(module('ngGcUserApiService'));
  var UserApiService, $httpBackend;

  beforeEach(inject(function($injector) {
    UserApiService = $injector.get('UserApiService');
    $httpBackend = $injector.get('$httpBackend');
  }));

  afterEach(function() {
    $httpBackend.flush();
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('#findOne', function() {
    $httpBackend.expectGET('/api/user').respond(200);
    UserApiService.findOne();
    // Cached
    UserApiService.findOne();
  });

});
