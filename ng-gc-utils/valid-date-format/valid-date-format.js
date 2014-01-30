'use strict';

angular.module('gc.utils.validDateFormat', [])
.factory('validDateFormat', [
  '$window',
  function validDateFormatFactory($window) {

    var FORMATS = [
      'YYYYMMDD',
      'DDMMYYYY',
      'DDMMYY',
      'DMMMYYYY',
      'MMMDYYYY',
      'YYYY-MM-DD',
      'DD-MM-YYYY',
      'DD-MM-YY',
      'D-MMM-YYYY',
      'MMM-D-YYYY',
      'YYYY MM DD',
      'DD MM YYYY',
      'DD MM YY',
      'D MMM YYYY',
      'MMM D YYYY',
      'YYYY/MM/DD',
      'DD/MM/YYYY',
      'DD/MM/YY',
      'D/MMM/YYYY',
      'MMM/D/YYYY',
      'YYYY-MM-DDTHH:mm:ss',
      'YYYY-MM-DDTHH:mm:ssZ'
    ];

    function validDateFormat(dateStr) {
      if (!dateStr) { return false; }
      var isValid = FORMATS.some(function(format) {
        return $window.moment(dateStr, format, true).isValid();
      });
      if (!isValid) {
        return false;
      }
      return $window.moment(dateStr);
    }

    return {
      validDateFormat: validDateFormat
    };

  }
]);
