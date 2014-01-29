'use strict';

angular.module('gc.uploadFormController', [])
  .controller('GcUploadFormController', [
    '$scope',
    function GcUploadFormController($scope) {

      /**
       * @param  {Object|Null} response
       * @return {Array|Undefined}
       */
      function parseErrors(response) {
        if (!response) { return; }
        // rails is a dick
        var errors = response.error || response.errors;
        if (errors == null) { return; }
        return !_.isObject(errors) ? [errors] :
          _.uniq(_.flatten(_.values(errors)));
      }

      $scope.handleUploadEnd = function handleUpload(response) {
        $scope.uploadErrors = parseErrors(response);
        $scope.onUploadEnd({
          errors: $scope.uploadErrors,
          response: response
        });
      };

    }
  ]);
