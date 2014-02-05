'use strict';

angular.module('gc.featureDirective', [
  'gc.featureController',
  'gc-feature-template.html'
]).directive('gcFeature',
  function gcFeatureDirective() {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      templateUrl: 'gc-feature-template.html',
      controller: 'FeatureController',
      scope: {
        feature: '@',
        override: '=?'
      }
    };
  });
