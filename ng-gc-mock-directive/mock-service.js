'use strict';

angular.module('gc.mockService', [
  'gc.httpFactory'
]).factory('MockService', [
  'HttpFactory',
  function MockService(HttpFactory) {

    return HttpFactory.create({
      url: '/api/admin/user_mock/:id'
    }, {
      'create': { method: 'POST' },
      'destroy': { method: 'DELETE' }
    });

  }
]);
