'use strict';

angular.module('gc.utils.getEarliestStartAt', [
])
.factory('getEarliestStartAt', [
  '$window',
  function getEarliestStartAtFactory($window) {

    function getLatestDate(timestamps) {
      return _.sortBy(timestamps, function(timestamp) {
        return -timestamp;
      })[0];
    }

    /**
     * Comparing yesterday, plan start at, plan last bill at, it will take
     * the latest one and always add one day
     *
     * @param  {Object} plan
     * @return Moment
     */
    function getEarliestStartAt(dates) {
      var yesterday = $window.moment().startOf('day');
      dates.push(yesterday.format());

      var timeStampDates = dates.map(function(date) {
        return $window.moment(date || undefined);
      }).map(function(date) {
        return date.unix();
      });

      var latestDateTimeStamp = getLatestDate(timeStampDates);
      return $window.moment.unix(latestDateTimeStamp);
    }


    return {
      getEarliestStartAt: getEarliestStartAt
    };

  }
]);
