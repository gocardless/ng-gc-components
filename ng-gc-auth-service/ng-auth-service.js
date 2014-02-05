'use strict';

angular.module('ngAuthService', [
]).provider('AuthService', [
  function AuthService() {

    var apiEndpoint = '/api/auth';
    this.setApiEndpoint = function setApiEndpoint(endpoint) {
      apiEndpoint = endpoint;
    };

    this.$get = [
      '$http',
      function $get($http) {
        return {
          signIn: function signIn(config) {
            config = config || {};
            return $http.post(apiEndpoint, config.data);
          },
          signOut: function signOut(config) {
            return $http.delete(apiEndpoint, config);
          }
        };
      }
    ];

  }
]);
