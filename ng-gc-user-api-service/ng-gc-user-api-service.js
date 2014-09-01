'use strict';

angular.module('ngGcUserApiService', [
  'gc.httpFactory'
]).factory('UserApiService', [
  'HttpFactory',
  function UserApiService(HttpFactory) {

    return HttpFactory.create({
      url: '/api/user'
    }, {
      'findOne': { method: 'GET', cache: true }
    });

  }
]);
