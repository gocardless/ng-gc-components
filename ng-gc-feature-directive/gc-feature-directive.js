'use strict';

angular.module('gc.featureDirective', [
  'gc.featureController',
  'app/shared/components/gc-feature/gc-feature-template.html'
]).directive('gcFeature',
  function gcFeatureDirective() {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      templateUrl: 'app/shared/components/gc-feature/gc-feature-template.html',
      controller: 'FeatureController',
      scope: {
        feature: '@',
        override: '=?'
      }
    };
  });
