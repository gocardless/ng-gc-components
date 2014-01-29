'use strict';

angular.module('gc.utils.getStartAtAfterToday', [
  'gc.utils.getStartAt'
])
.factory('getStartAtAfterToday', [
  '$window', 'getStartAt',
  function getStartAtAfterTodayFactory($window, getStartAt) {

    /**
     * @param  {Stromg} date
     * @return {String}
     */
    function formatDate(date) {
      return $window.moment(date).format('YYYY-MM-DD');
    }

    /**
     * Starting from today will give you a start at that is
     * hopefully valid
     *
     * @param  {String} startAt
     * @param  {Boolean} overrideStartAt
     * @return {String|Undefined}
     */
    function getStartAtAfterToday(startAt, overrideStartAt) {
      if (!overrideStartAt) {
        return formatDate(getStartAt.getStartAt(formatDate(), startAt));
      }
    }

    return {
      getStartAtAfterToday: getStartAtAfterToday
    };

  }
]);
