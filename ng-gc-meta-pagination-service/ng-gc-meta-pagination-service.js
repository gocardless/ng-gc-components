'use strict';

angular.module('ngGcMetaPaginationService', [])
.service('MetaPaginationService', [
  function MetaPaginationService() {

    var self = this;

    this.parseHeaders = function parseHeaders(headers) {
      var meta;

      try {
        meta = JSON.parse(headers('X-Pagination'));
      } catch (e) {
        console.error(e);
        meta = {};
      }

      return meta;
    };

    this.setMeta = function setMeta(data, headers) {
      data.meta = self.parseHeaders(headers) || {};
      return data;
    };

  }
]);
