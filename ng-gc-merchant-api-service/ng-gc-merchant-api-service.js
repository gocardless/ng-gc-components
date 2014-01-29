'use strict';

angular.module('ngGcMerchantApiService', [
  'ngHttpFactory'
]).factory('MerchantApiService', [
  'HttpFactory',
  function MerchantApiService(HttpFactory) {

    return HttpFactory.create({
      url: '/api/merchant'
    }, {
      'findOne': { method: 'GET', cache: true }
    });

  }
]);
