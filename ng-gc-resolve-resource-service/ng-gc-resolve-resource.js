'use strict';

angular.module('gc.resolveResource', [
  'gc.utils'
]).factory('ResolveResource', [
  '$q', 'utils',
  function ResolveResourceFactory($q, utils) {

    function arrayMehodNotAllowed(method) {
      return function() {
        throw new Error('ResolveResource: array ' + method +' is not allowed');
      };
    }

    var resolve = {
      resolve: function resolve(promise) {
        if (!promise || !angular.isFunction(promise.then)) {
          throw new TypeError('resolve expects a promise object');
        }

        var deferred = $q.defer();
        var _this = this;

        function markAsResolved() {
          _.redefine(_this, {
            $resolved: true
          });
        }

        promise.then(markAsResolved, markAsResolved);

        promise.then(function resolveSuccess(data) {
          if (Array.isArray(_this)) {
            utils.replace(_this, data);
          } else if (angular.isObject(_this)) {
            utils.emptyObject(_this);
            utils.mixin(_this, data);
          }
          deferred.resolve(_this);
        }, function resolveError(error) {
          deferred.reject(error);
        });

        _.redefine(_this, {
          $resolved: false,
          $promise: deferred.promise
        }, {
          configurable: true,
          enumerable: false
        });

        return _this;
      },
      slice: arrayMehodNotAllowed('slice'),
      concat: arrayMehodNotAllowed('concat')
    };

    return function ResolveResource(ref) {
      ref = ref || [];
      if (!Array.isArray(ref) && !angular.isObject(ref)) {
        throw new TypeError('ref: provide an object or an array');
      }

      return _.redefine(ref, resolve);
    };

  }
]);
