'use strict';

angular.module('ngGcLocalStorageService', [])
.factory('LocalStorageService',
  ['$window',
  function LocalStorageService($window) {

    return {
      getItem: function getItem(key) {
        return angular.fromJson($window.localStorage.getItem(key));
      },

      setItem: function setItem(key, value) {
        $window.localStorage.setItem(key, angular.toJson(value));
      },

      removeItem: function removeItem(key) {
        $window.localStorage.removeItem(key);
      }
    };

  }]);
