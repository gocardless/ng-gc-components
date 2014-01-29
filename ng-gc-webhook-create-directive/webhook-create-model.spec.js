'use strict';

describe('WebHookModel', function(){
  beforeEach(module('gc.webHookModel'));

  var WebHookModel, $rootScope;

  // var BILL_TYPE   = 'bill';
  // var bill = { value: BILL_TYPE, name: 'Subscription' };

  var SUBSCRIPTION_TYPE  = 'subscription';
  var subscription = { value: SUBSCRIPTION_TYPE, name: 'Subscription' };

  // var PRE_AUTHORIZATION_TYPE   = 'pre_authorization';
  // var preAuthorization = { value: PRE_AUTHORIZATION_TYPE, name:
  // 'Subscription' };

  beforeEach(inject(function($injector) {
    WebHookModel = $injector.get('WebHookModel');
    $rootScope = $injector.get('$rootScope');
  }));

  function webHookModelFactory(options, form) {
    var model = WebHookModel.create(options);
    var scope = model.scope();

    angular.extend(scope.form, form);

    $rootScope.$digest();

    var serialized = model.serialize();

    return {
      scope: scope,
      model: model,
      serialized: serialized
    };
  }

  describe('actions', function() {
    it('has bill actions', function() {
      var value = webHookModelFactory();
      expect(value.scope.actions.length).toBe(7);
    });

    it('has limit actions', function() {
      var value = webHookModelFactory();
      var scope = value.scope;
      scope.form.resource_type = subscription;
      $rootScope.$digest();
      expect(value.scope.actions.length).toBe(2);
    });
  });

  describe('#serialize', function() {
    it('bill', function() {
      var value = webHookModelFactory(null, {
        resource_id: '1',
        source_id: '2'
      });

      expect(value.serialized).toEqualData({
        web_hook: {
          action: 'created',
          resource_type: 'bill',
          url: '',
          resource_id: '1',
          source_id: '2'
        }
      });
    });

    it('subscription', function() {
      var value = webHookModelFactory(null, {
        resource_type: subscription,
        source_id: '2'
      });

      expect(value.serialized).toEqualData({
        web_hook: {
          action: 'created',
          resource_type: 'subscription',
          url: ''
        }
      });
    });
  });

});
