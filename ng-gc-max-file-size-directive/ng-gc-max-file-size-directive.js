'use strict';

angular.module('gc.maxFileSize', [])
.directive('maxFileSize', [
  function maxFileSizeDirective() {

    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        var fileSizeThreshold = parseInt(attrs.maxFileSize, 10);
        if (!fileSizeThreshold) {
          return;
        }

        if (window.File && window.FileReader && window.FileList && window.Blob) {
          ngModel.$validators.maxFileSize = function maxFileSize() {
            var fileSize = element[0].files &&
              element[0].files[0] &&
              element[0].files[0].size;
            if (!fileSize) {
              return true;
            }
            return fileSize < fileSizeThreshold;
          };
        }
      }
    };

  }
]);
