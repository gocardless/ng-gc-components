'use strict';

angular.module('gc.webHookModel', [
])
.factory('WebHookModel', [
  '$rootScope',
  function WebHookModelFactory($rootScope) {

    var RESOURCE_TYPES = {
      BILL: 'bill',
      SUBSCRIPTION: 'subscription',
      PRE_AUTHORIZATION: 'pre_authorization'
    },

    ACTIONS = {
      CREATED:  'created',
      FAILED: 'failed',
      PAID: 'paid',
      WITHDRAWN: 'withdrawn',
      CHARGEDBACK: 'chargedback',
      REFUNDED: 'refunded',
      RETRIED: 'retried',
      CANCELLED: 'cancelled',
      EXPIRED: 'expired'
    },

    NAMED_RESOURCE_TYPES = [
      { value: RESOURCE_TYPES.BILL, name: 'Bill' },
      { value: RESOURCE_TYPES.SUBSCRIPTION, name: 'Subscription' },
      { value: RESOURCE_TYPES.PRE_AUTHORIZATION, name: 'Pre-authorization' }
    ],

    NAMED_ACTIONS = [
      { value: ACTIONS.CREATED, name: 'Created' },
      { value: ACTIONS.FAILED, name: 'Failed' },
      { value: ACTIONS.CANCELLED, name: 'Cancelled' },
      { value: ACTIONS.PAID, name: 'Paid' },
      { value: ACTIONS.WITHDRAWN, name: 'Withdrawn' },
      { value: ACTIONS.CHARGEDBACK, name: 'Chargedback' },
      { value: ACTIONS.REFUNDED, name: 'Refunded' },
      { value: ACTIONS.RETRIED, name: 'Retried' }
    ],

    LIMIT_ACTIONS = [
      { value: ACTIONS.CANCELLED, name: 'Cancelled' },
      { value: ACTIONS.EXPIRED, name: 'Expired' }
    ];

    function WebHookModel(options) {
      this._scope = {
        RESOURCE_TYPES: RESOURCE_TYPES,
        ACTIONS: ACTIONS
      };
      this.options = options || {};
      this._scope.form = {};
      var _this = this;

      this._scope.isResourceType = function(resource) {
        return _this._scope.form.resource_type.value === resource;
      };

      this._scope.isAction = function(action) {
        return _this._scope.form.action.value === action;
      };

      this.setPristine();
      this._watchResourceType();
    }

    WebHookModel.prototype._watchResourceType = function _watchResourceType() {
      var _this = this;
      $rootScope.$watch(function() {
        return _this._scope.form.resource_type;
      }, function watchResourceType(resourceType, oldResourceType) {
        if (resourceType === oldResourceType) { return; }
        if (resourceType.value === RESOURCE_TYPES.SUBSCRIPTION ||
            resourceType.value === RESOURCE_TYPES.PRE_AUTHORIZATION) {
          _this._scope.actions = LIMIT_ACTIONS;
        } else {
          _this._scope.actions = NAMED_ACTIONS;
        }
        _this._scope.form.action = _this._scope.actions[0];
      });
    };

    WebHookModel.prototype.scope = function scope() {
      return this._scope;
    };

    WebHookModel.prototype.setPristine = function setPristine() {
      var _this = this;

      // should be default web_hook url
      this._scope.form.url = '';
      this._scope.form.resource_id = '';
      this._scope.form.source_id = '';

      this._scope.resourceTypes = NAMED_RESOURCE_TYPES.slice();
      this._scope.form.resource_type = this._scope.resourceTypes[0];

      this._scope.actions = NAMED_ACTIONS.slice();
      this._scope.form.action = _this._scope.actions[0];
    };

    WebHookModel.prototype.serialize = function serialize() {
      var form = _.cloneDeep(this._scope.form);

      var web_hook = {
        action: form.action.value,
        resource_type: form.resource_type.value,
        url: form.url
      };

      if (form.resource_id) {
        web_hook.resource_id = form.resource_id;
      }

      if (this._scope.isResourceType(RESOURCE_TYPES.BILL) && form.source_id) {
        web_hook.source_id = form.source_id;
      }

      return {
        web_hook: web_hook
      };
    };

    return {
      create: function create(options) {
        return new WebHookModel(options);
      }
    };
  }
]);
