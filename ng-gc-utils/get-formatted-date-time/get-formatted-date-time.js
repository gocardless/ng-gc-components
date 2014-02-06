'use strict';

angular.module('gc.utils.getFormattedDateTime', [
  'gc.utils.validDateFormat',
])
.factory('getFormattedDateTime', [
  '$window', 'validDateFormat',
  function getFormattedDateTimeFactory($window, validDateFormat) {

    function getFormattedDateTime(dateStr, endOfDay) {
      if (!validDateFormat.validDateFormat(dateStr)) { return ''; }
      var date = window.moment.utc(dateStr);
      if (endOfDay) { date.endOf('day'); }
      return date.format();
    }

    return {
      getFormattedDateTime: getFormattedDateTime
    };

  }
]);
