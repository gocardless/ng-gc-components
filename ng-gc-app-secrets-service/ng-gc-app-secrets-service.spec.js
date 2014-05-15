'use strict';

describe('AppSecretsService', function(){
  beforeEach(module('gc.appSecretsService'));

  var AppSecretsService, $httpBackend;

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    AppSecretsService = $injector.get('AppSecretsService');
  }));

  describe('#findAll', function() {
    it('GETs an index', function() {
      $httpBackend.expectGET('/api/apps/1/app_secrets').respond(200);
      AppSecretsService.findAll({ params: { app_id: 1} });
      $httpBackend.flush();
    });
  });

  describe('#create', function() {
    it('POSTs to create', function() {
      $httpBackend.expectPOST('/api/apps/1/app_secrets').respond(201);
      AppSecretsService.create({ params: { app_id: 1} });
      $httpBackend.flush();
    });
  });

  describe('#delete', function() {
    it('DELETEs the app secret', function() {
      $httpBackend.expectDELETE('/api/apps/1/app_secrets/2').respond(201);
      AppSecretsService.delete({ params: { app_id: 1, id: 2} });
      $httpBackend.flush();
    });
  });
});
