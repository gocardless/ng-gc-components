'use strict';

describe('FeedbackController', function(){
  beforeEach(module('gc.feedbackController'));

  var ctrl, scope, $httpBackend, AlertService;

  beforeEach(inject(function ($rootScope, $controller, $injector) {
    scope = $rootScope.$new();
    AlertService = $injector.get('AlertService');
    $httpBackend = $injector.get('$httpBackend');

    ctrl = $controller('FeedbackController', {
      $scope: scope
    });
  }));

  describe('#sendFeedback', function() {
    beforeEach(function() {
      scope.feedback = '11';
    });

    var formSpy;
    beforeEach(function() {
      formSpy = jasmine.createSpy('formSpy');
      scope.feedbackForm = {
        $setPristine: formSpy
      };
    });

    it('success', function() {
      $httpBackend.expectPOST('/api/feedback', {
        body: '11'
      }).respond(200);

      spyOn(AlertService, 'success');
      scope.sendFeedback();
      $httpBackend.flush();
      expect(scope.feedback).toBe('');
      expect(AlertService.success).toHaveBeenCalled();
    });

    it('error', function() {
      $httpBackend.expectPOST('/api/feedback', {
        body: '11'
      }).respond(400);

      spyOn(AlertService, 'error');
      scope.sendFeedback();
      $httpBackend.flush();
      expect(scope.feedback).toBe('11');
      expect(AlertService.error).toHaveBeenCalled();
    });
  });

});
