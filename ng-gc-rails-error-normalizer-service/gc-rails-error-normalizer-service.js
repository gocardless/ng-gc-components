'use strict';

angular.module('gc.railsErrorNormalizer', [
]).factory('RailsErrorNormalizerService', [
  function RailsErrorNormalizerService() {
    return {
      normalize: function normalize(error) {
        if (!error) { return; }
        // rails is a dick
        error = error.error || error.errors;
        if (error == null) { return; }
        return !_.isObject(error) ? [error] :
          _.uniq(_.flatten(_.values(error)));
      }
    };
  }
]);
