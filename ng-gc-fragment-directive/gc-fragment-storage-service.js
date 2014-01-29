'use strict';

angular.module('gc.fragmentStorage', [])
.factory('FragmentStorage', [
  '$cacheFactory',
  function FragmentStorage($cacheFactory) {

    var cache = $cacheFactory('gcFragmentStorage');

    return {
      put: function put(key, fragment) {
        return cache.put(key, fragment);
      },

      get: function get(key) {
        return cache.get(key);
      },

      remove: function remove(key) {
        return cache.remove(key);
      }
    };

  }
]);
