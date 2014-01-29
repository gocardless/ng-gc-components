'use strict';

angular.module('gc.focusSelect', [])
.directive('focusSelect', [
  function focusSelectDirective() {

    return function focusSelectLink(scope, element) {
      element.bind('focus', function() {
        setTimeout(function() {
          element[0].select();
        }, 0);
      });
    };

  }
]);
