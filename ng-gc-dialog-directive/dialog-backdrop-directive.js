'use strict';

angular.module('gc.backdrop', [])
.directive('backdrop', [
  '$window',
  function backdropDirective($window) {

    return {
      controller: function backdropController($element) {
        this.backdrop = new $window.Dialog.Backdrop({
          el: $element[0]
        });
      }
    };

  }
]);
