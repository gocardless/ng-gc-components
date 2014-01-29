'use strict';

angular.module('gc.utils.emptyObject', [])
.factory('emptyObject', [
  function emptyObjectFactory() {

    function emptyObject(obj) {
      Object.keys(obj).map(function emptyObjectIteration(key) {
        delete obj[key];
      });
      return obj;
    }

    return {
      emptyObject: emptyObject
    };

  }
]);
