'use strict';

angular.module('ngGcPartnerApiService', [
  'ngHttpFactory'
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
