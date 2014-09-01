'use strict';

angular.module('ngGcPartnerApiService', [
  'gc.httpFactory'
]).factory('PartnerApiService', [
  'HttpFactory',
  function PartnerApiService(HttpFactory) {

    return HttpFactory.create({
      url: '/api/partner'
    }, {
      'findOne': { method: 'GET', cache: true }
    });

  }
]);
