'use strict';

angular.module('gc.utils.getStartAt', [
  'gc.utils.validDateFormat'
])
.factory('getStartAt', [
  '$window', 'validDateFormat',
  function getStartAtFactory($window, validDateFormat) {

    /**
     * Input start at validation and sanitation
     * User input must be valid and come after the earliest start date
     * Defaults to earliest start date if user input is invalid
     *
     * @param  {Object} plan
     * @param  {String} startAt
     * @return {String}
     */
    function getStartAt(defaultStartAt, startAt) {
      if (startAt && validDateFormat.validDateFormat(startAt) &&
        $window.moment(startAt).isValid() &&
        $window.moment(startAt).isAfter(defaultStartAt)) {
        return startAt;
      } else {
        return defaultStartAt;
      }
    }

    return {
      getStartAt: getStartAt
    };

  }
]);
