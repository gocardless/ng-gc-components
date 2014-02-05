'use strict';

describe('MockService', function(){
  beforeEach(module('gc.mockService'));
  var MockService, $httpBackend;

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    MockService = $injector.get('MockService');
  }));

  it('#create', function() {
    var mockResponse = { id: 22 };
    $httpBackend.expectPOST('/api/admin/user_mock', {
      id: 1
    }).respond(mockResponse);

    var response;
    MockService.create({
      data: {
        id: 1
      }
    }).then(function(resp) {
      response = resp;
    });
    $httpBackend.flush();
    expect(response).toEqualData(mockResponse);
  });

  it('#destroy', function() {
    var mockResponse = { id: 22 };
    $httpBackend.expectDELETE('/api/admin/user_mock/1').respond(mockResponse);

    MockService.destroy({
      params: {
        id: 1
      }
    });
    $httpBackend.flush();
  });

});
