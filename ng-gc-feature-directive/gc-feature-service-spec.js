'use strict';

describe('gc.featureService', function() {
  beforeEach(module('gc.featureService'));

  var FeatureService, $httpBackend;

  beforeEach(inject(function($injector) {
    FeatureService = $injector.get('FeatureService');
    $httpBackend = $injector.get('$httpBackend');
  }));

  it('#findAll', function() {
    var data = { coolFeature: true };
    $httpBackend.expectGET('/api/features').respond(data);

    var response;
    FeatureService.findAll().then(function(resp) {
      response = resp;
    });
    $httpBackend.flush();
    expect(response).toEqualData(data);
  });
});
