'use strict';

describe('AppsService', function(){
  beforeEach(module('gc.appsService'));

  var AppsService, $httpBackend;

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    AppsService = $injector.get('AppsService');
  }));

  describe('#update', function() {
    it('PUTs an update', function() {
      $httpBackend.expectPUT('/api/apps/1?active_app_secret_id=123')
        .respond(200);

      AppsService.update({
        params: { id: 1, active_app_secret_id: 123 }
      });

      $httpBackend.flush();
    });
  });
});
