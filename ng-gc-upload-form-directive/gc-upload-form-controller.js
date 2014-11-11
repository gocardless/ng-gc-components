'use strict';

angular.module('gc.uploadFormController', [
  'gc.railsErrorNormalizer'
]).controller('GcUploadFormController', [
  '$scope', 'RailsErrorNormalizerService',
  function GcUploadFormController($scope, RailsErrorNormalizerService) {

    var maxFileUploadSize = parseInt($scope.maxFileUploadSize, 10);
    if (maxFileUploadSize > 0) {
      $scope.maxFileUploadSizeInMb = maxFileUploadSize / 1024 / 1024;
    }

    $scope.handleUploadEnd = function handleUpload(response) {
      $scope.uploadErrors = RailsErrorNormalizerService.normalize(response);
      $scope.onUploadEnd({
        errors: $scope.uploadErrors,
        response: response
      });
    };
  }
]);
