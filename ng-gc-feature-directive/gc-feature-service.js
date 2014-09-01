'use strict';

angular.module('gc.featureService', [
  'gc.httpFactory'
]).factory('FeatureService', [
  'HttpFactory',
  function FeatureService(HttpFactory) {

    return HttpFactory.create({
      url: '/api/features'
    }, {
      findAll: { method: 'GET', cache: true }
    });

  }
]);
