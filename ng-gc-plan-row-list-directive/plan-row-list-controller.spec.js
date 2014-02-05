'use strict';

describe('PlanRowListController', function(){
  beforeEach(module('gc.planRowListController'));

  var ctrl, scope;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();

    scope.plans = [{
      status: 'failed'
    },
    {
      status: 'active'
    }];

    ctrl = $controller('PlanRowListController', {
      $scope: scope
    });

  }));

  describe('#getPlanUrl', function() {
    it('returns uri', function() {
      var url = scope.getPlanUrl({uri: 'test'});
      expect(url).toBe('test');
    });

    it('returns plans path', function() {
      var url = scope.getPlanUrl({id: '1'});
      expect(url).toBe('/plans/1');
    });
  });

});
