'use strict';

angular.module('ngGcToDateTime', [
  'gc.utils'
])
.filter('toDateTime', [
  'utils',
  function toDateTime(utils) {

    return function toDateTimeFilter(input, endOfDay) {
      return utils.getFormattedDateTime(input, endOfDay);
    };

  }
]);
