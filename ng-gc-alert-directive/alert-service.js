'use strict';

angular.module('gc.alertService', [])
.factory('AlertService', [
  function AlertService() {
    var alerts = [];

    return {
      get: function get() {
        return alerts;
      },
      success: function success(message) {
        this._add({ type: 'success', message: message });
        return this;
      },
      error: function error(message) {
        this._add({ type: 'error', message: message });
        return this;
      },
      _add: function _add(alert) {
        if (this._indexOf(alert) === -1) {
          alerts.push(alert);
        }
        return this;
      },
      _indexOf: function _indexOf(alert) {
        var alertIndex = -1;
        alerts.forEach(function(item, index){
          if (item.message === alert.message &&
              item.type === alert.type) {
            alertIndex = index;
          }
        });
        return alertIndex;
      }
    };

  }
]);
