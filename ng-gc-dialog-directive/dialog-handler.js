'use strict';

angular.module('gc.dialogHandler', [])
.factory('DialogHandler', [
  '$rootScope', function DialogHandler($rootScope) {

    return {
      hide: function hideDialog() {
        $rootScope.$emit('closeDialog');
      }
    };

  }
]);
