'use strict';

angular.module('gc.appsService', [
  'gc.httpFactory'
]).factory('AppsService', [
  'HttpFactory',
  function AppsService(HttpFactory) {

    return HttpFactory.create({
      url: '/api/apps'
    }, {
      update: {
        method: 'PUT',
        url: '/api/apps/:id'
      }
    });

  }

]);
