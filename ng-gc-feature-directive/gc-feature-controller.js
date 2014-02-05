'use strict';

angular.module('gc.featureController', [
  'gc.featureService'
]).controller('FeatureController', [
  '$scope', 'FeatureService',
  function FeatureController($scope, FeatureService) {
    $scope.features = {};
    FeatureService.findAll().then(function(features) {
      $scope.features = features;
    });

    // Defaults to show if a feature is undefined by the back end
    $scope.featureEnabled = function featureEnabled() {
      var state;
      if ($scope.override == null) {
        state = $scope.features[$scope.feature];
      } else {
        state = $scope.override;
      }
      return state === undefined ? true : state;
    };
  }
])
// Bootstrap fetching the feature data so it's available at render time
.run([
  'FeatureService',
  function FeatureServiceRun(FeatureService) {

    FeatureService.findAll();

  }
]);
