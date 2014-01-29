'use strict';

angular.module('gc.utils.getFormattedDateTime', [
  'gc.utils.validDateFormat',
])
.factory('getFormattedDateTime', [
  '$window', 'validDateFormat',
  function getFormattedDateTimeFactory($window, validDateFormat) {

    function getFormattedDateTime(dateStr, endOfDay) {
      var date = validDateFormat.validDateFormat(dateStr);
      if (!date) { return ''; }

      if (endOfDay) { date.endOf('day'); }
      var utcDate = date.format('YYYY-MM-DDTHH:mm:ss');
      return $window.moment.utc(utcDate).format('YYYY-MM-DDTHH:mm:ssZ');
    }

    return {
      getFormattedDateTime: getFormattedDateTime
    };

  }
]);
