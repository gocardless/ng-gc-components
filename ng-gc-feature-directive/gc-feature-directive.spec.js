'use strict';

describe('gc.featureDirective', function() {
  beforeEach(module('gc.featureDirective'));

  var elm, scope, $httpBackend;

  beforeEach(inject(function($rootScope, $compile, _$httpBackend_) {
    $httpBackend = _$httpBackend_;

    elm = angular.element('<gc-feature feature="test">Content</gc-feature>');
    scope = $rootScope.$new();
    $compile(elm)(scope);
  }));

  describe('with feature enabled', function() {

    beforeEach(function() {
      $httpBackend.whenGET('/api/features').respond({
        test: true
      });
      scope.$digest();
      $httpBackend.flush();
    });

    it('shows contents', function() {
      expect(elm.css('display')).not.toBe('none');
    });
  });

  describe('with feature disabled', function() {
    beforeEach(function() {
      $httpBackend.whenGET('/api/features').respond({
        test: false
      });
      scope.$digest();
      $httpBackend.flush();
    });

    it('hides contents', function() {
      expect(elm.hasClass('ng-hide')).toEqual(true);
    });
  });
});
