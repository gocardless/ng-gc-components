'use strict';

angular.module('gc.uploadFormController', [
  'gc.railsErrorNormalizer'
]).controller('GcUploadFormController', [
  '$scope', 'RailsErrorNormalizerService',
  function GcUploadFormController($scope, RailsErrorNormalizerService) {

    $scope.handleUploadEnd = function handleUpload(response) {
      $scope.uploadErrors = RailsErrorNormalizerService.normalize(response);
      $scope.onUploadEnd({
        errors: $scope.uploadErrors,
        response: response
      });
    };
  }
]);
