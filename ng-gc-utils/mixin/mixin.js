'use strict';

angular.module('gc.utils.mixin', [])
.factory('mixin', [
  function mixinFactory() {

    function mixin(receiver, supplier) {
      if (!angular.isObject(receiver) || !angular.isObject(supplier)) {
        throw new TypeError('mixin expects a receiver and a supplier obj');
      }

      return Object.getOwnPropertyNames(supplier)
        .reduce(function mixinSupplierIteration(receiver, property) {
        return Object.defineProperty(
          receiver,
          property,
          Object.getOwnPropertyDescriptor(supplier, property)
        );
      }, receiver);
    }

    return {
      mixin: mixin
    };

  }
]);
