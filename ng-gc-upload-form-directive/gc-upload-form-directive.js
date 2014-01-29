'use strict';

angular.module('gc.uploadForm', [
  'gcUpload',
  'gc.file',
  'gc.stopPropagation',
  'gc.uploadFormController',
  'gc-upload-form-template.html'
])
.directive('gcUploadForm', [
  function GcUploadFormDirective() {

    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      controller: 'GcUploadFormController',
      templateUrl: 'gc-upload-form-template.html',
      scope: {
        formAction: '@',
        fileAccept: '@',
        isInlineUpload: '@',
        onUploadEnd: '&'
      }
    };

  }
]);
