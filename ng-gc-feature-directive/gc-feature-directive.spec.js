'use strict';

describe('gc.featureDirective', function() {
  beforeEach(module('gc.featureDirective'));

  var elm, scope, $httpBackend;

  beforeEach(inject(function($rootScope, $compile, _$httpBackend_) {
    $httpBackend = _$httpBackend_;

    elm = angular.element('<div><gc-feature feature="test"><span>hello</span></gc-feature></div>');
    scope = $rootScope.$new();
    $compile(elm)(scope);
  }));

  describe('with feature enabled', function() {

    beforeEach(function() {
      $httpBackend.whenGET('/api/features').respond({
        test: true
      });
      $httpBackend.flush();
      scope.$digest();
    });

    it('shows contents', function() {
      expect(elm.children().length).not.toEqual(0);
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
      expect(elm.children().length).toEqual(0);
    });
  });
});
