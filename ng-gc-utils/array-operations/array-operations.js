'use strict';

angular.module('gc.utils.arrayOperations', [])
.factory('arrayOperations', function() {
  var splice = Array.prototype.splice;

  return {
    replace: function replace(target, source) {
      splice.apply(target, [0, target.length].concat(source));
      return target;
    },

    append: function append(target, source) {
      splice.apply(target, [target.length, 0].concat(source));
      return target;
    }
  };
});
