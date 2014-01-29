'use strict';

angular.module('gc.utils.param', [])
.factory('param', [
  function paramFactory() {

    function isArray(value) {
      return Array.isArray(value);
    }

    function isObject(value) {
      return !!(value && typeof value === 'object');
    }

    function encode(uri) {
      return encodeURIComponent(uri);
    }

    function defValue(value) {
      if (value == null) { value = ''; }
      return value;
    }

    function param(source, prefix) {
      if (!isObject(source)) {
        throw new Error('\'source\' must be an object');
      }
      return Object.keys(source).map(function(key, index) {
        var value = source[key];
        var hasIndex = isArray(source) && isObject(value);
        var name = hasIndex ? index : isArray(source) ? defValue() : key;

        if (prefix) key = prefix + '[' + name + ']';
        if (isObject(value)) return param(value, key);

        return encode(key) + '=' + encode(defValue(value));
      }).join('&').replace(/%20/g, '+');
    }

    return {
      param: param
    };
  }
]);


