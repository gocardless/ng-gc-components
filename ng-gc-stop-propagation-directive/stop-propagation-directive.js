'use strict';

angular.module('gc.stopPropagation', [])
.directive('stopPropagation', [
  function stopPropagationDirective() {

    return function stopPropagationLink($scope, $element, $attrs) {
      var eventName = $attrs.stopPropagation;
      if (!eventName) {
        throw new TypeError('<stop-propagation> value must be set');
      }

      $element.bind(eventName, function(event) {
        event.stopPropagation();
      });
    };

  }
]);
