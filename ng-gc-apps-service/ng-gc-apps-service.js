'use strict';

angular.module('gc.appsService', [
  'ngHttpFactory'
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
