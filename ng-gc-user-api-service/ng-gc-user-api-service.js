'use strict';

angular.module('ngGcUserApiService', [
  'ngHttpFactory'
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
