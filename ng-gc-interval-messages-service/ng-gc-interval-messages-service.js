'use strict';

angular.module('ngGcIntervalMessagesService', [])
.factory('IntervalMessagesService', [
  '$rootScope', '$locale', '$interpolate', 'INTERVAL_MESSAGES',
  function IntervalMessagesService($rootScope, $locale, $interpolate,
    INTERVAL_MESSAGES) {
    var scope = $rootScope.$new();
    scope.msg = INTERVAL_MESSAGES;

    scope.interval = {
      one: '{{ msg.ONE_INTERVAL_MESSAGES[KEY] }}',
      other: 'every {{ COUNT }} {{ msg.OTHER_INTERVAL_MESSAGES[KEY] }}'
    };

    scope.when = {};
    angular.forEach(scope.interval, function(expression, key) {
      scope.when[key] = $interpolate(expression);
    });

    return {
      get: function(count, msgKey) {
        if (!isNaN(count)) {
          scope.KEY = msgKey;
          scope.COUNT = count;
          //if explicit number rule such as 1, 2, 3... is defined, just use it.
          // Otherwise, check it against pluralization rules in $locale service
          if (!(count in scope.interval)) {
            count = $locale.pluralCat(count);
          }
          return scope.when[count](scope);
        } else {
          return '';
        }
      }
    };
  }
]).factory('INTERVAL_MESSAGES', [
  function INTERVAL_MESSAGES() {
    var MSG = {
      DAYS: 'day',
      WEEKS: 'week',
      MONTHS: 'month',
      ONE_INTERVAL_MESSAGES: {},
      OTHER_INTERVAL_MESSAGES: {}
    };

    var TRANSLATION = {
      ONCE: {
        DAYS: 'daily',
        WEEKS: 'weekly',
        MONTHS: 'monthly'
      },
      OTHER: {
        DAYS: 'days',
        WEEKS: 'weeks',
        MONTHS: 'months'
      }
    };

    var KEYS = ['DAYS', 'WEEKS', 'MONTHS'];

    KEYS.map(function(prop) {
      MSG.ONE_INTERVAL_MESSAGES[MSG[prop]] = TRANSLATION.ONCE[prop];
      MSG.OTHER_INTERVAL_MESSAGES[MSG[prop]] = TRANSLATION.OTHER[prop];
    });

    return MSG;
  }
]);
