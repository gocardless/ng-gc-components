'use strict';

angular.module('gc.utils', [
  'gc.utils.arrayOperations',
  'gc.utils.emptyObject',
  'gc.utils.mixin',
  'gc.utils.throttle',
  'gc.utils.debounce',
  'gc.utils.param',
  'gc.utils.getFormattedDateTime',
  'gc.utils.validDateFormat',
  'gc.utils.addToFixed',
  'gc.utils.getStartAt',
  'gc.utils.getEarliestStartAt',
  'gc.utils.getStartAtAfterToday'
]).factory('utils', [
  'arrayOperations',
  'emptyObject',
  'mixin',
  'throttle',
  'debounce',
  'param',
  'getFormattedDateTime',
  'validDateFormat',
  'addToFixed',
  'getStartAt',
  'getEarliestStartAt',
  'getStartAtAfterToday',
  function utilsService() {
    var utils = {};
    var slice = Array.prototype.slice;

    slice.call(arguments).forEach(function(arg) {
      Object.keys(arg).forEach(function(key) {
        if (utils[key]) {
          throw new Error('util function "' +  key + '" is already defined');
        } else {
          utils[key] = arg[key];
        }
      });
    });

    return utils;
  }
]);
