'use strict';

angular.module('ngGcPrettyJsonFilter', [
]).filter('prettyJson', [
  function prettyJson() {

    var JSON_START = /^\s*(\[|\{[^\{])/,
        JSON_END = /[\}\]]\s*$/,
        PRETTY = 2;

    return function prettyJsonFilter(target, pretty) {
      pretty = pretty || PRETTY;
      if (JSON_START.test(target) && JSON_END.test(target)) {
        target = angular.fromJson(target);
        return angular.toJson(target, pretty);
      }
      return target;
    };

  }
]);
