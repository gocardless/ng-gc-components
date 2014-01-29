'use strict';

angular.module('gc.statusCodeService', [
]).factory('StatusCodeService', [
  function StatusCodeServiceFactory() {

    var statuses = {
      '1': 'info',
      '2': 'success',
      '3': 'redirect',
      '4': 'client-error',
      '5': 'server-error'
    };

    var EMPTY = '';

    function matchStatus(code, status) {
      var matcher = new RegExp('^' + code + '\\d{2}$');
      return status.match(matcher);
    }

    function safeString(maybeString) {
      if (maybeString == null) return '';
      return (maybeString).toString();
    }

    var service = {
      isError: function isError(statusCode) {
        statusCode = safeString(statusCode);
        return !!statusCode.match(/^[4-5]\d{2}$/);
      },
      isSuccess: function isSuccess(statusCode) {
        return !service.isError(statusCode);
      },
      getLabel: function getLabel(statusCode) {
        statusCode = safeString(statusCode);
        var prefix = statusCode.substring(0, 1);
        if ((prefix in statuses) && matchStatus(prefix, statusCode)) {
          return statuses[prefix];
        } else {
          return EMPTY;
        }
      }
    };

    return service;

  }
]);
