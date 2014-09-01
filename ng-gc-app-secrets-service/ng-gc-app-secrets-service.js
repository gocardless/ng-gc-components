'use strict';

angular.module('gc.appSecretsService', [
  'gc.httpFactory'
]).factory('AppSecretsService', [
  'HttpFactory',
  function AppSecretsService(HttpFactory) {

    return HttpFactory.create({
      url: '/api/apps/:app_id/app_secrets/:id'
    }, {
      findAll: { method: 'get' },
      create: { method: 'post' },
      delete: { method: 'delete'}
    });

  }

]);
