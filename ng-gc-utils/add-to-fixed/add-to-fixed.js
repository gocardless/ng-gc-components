'use strict';

angular.module('gc.utils.addToFixed', [])
.factory('addToFixed', [
  '$window',
  function addToFixedFactory($window) {

    function addToFixed() {
      var args = Array.prototype.slice.call(arguments);
      var numbers = args.map(function(number) {
        return new $window.Big(number);
      }).reduce(function(bigNum, sum) {
        return sum.plus(bigNum);
      });
      return numbers.toFixed(2);
    }

    return {
      addToFixed: addToFixed
    };

  }
]);
