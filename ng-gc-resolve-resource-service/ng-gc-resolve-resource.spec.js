'use strict';

describe('ResolveResourceSpec', function(){
  beforeEach(module('gc.resolveResource'));

  var ResolveResource, resource, scope;
  var $q;

  beforeEach(inject(function ($rootScope, $injector) {
    scope = $rootScope;
    ResolveResource = $injector.get('ResolveResource');
    $q = $injector.get('$q');
  }));

  beforeEach(function () {
    resource = new ResolveResource();
  });

  it('throws on slice', function() {
    var e = new Error('ResolveResource: array slice is not allowed');
    expect(function() {
      resource.slice();
    }).toThrow(e);
  });

  it('throws on concat', function() {
    var e = new Error('ResolveResource: array concat is not allowed');
    expect(function() {
      resource.concat();
    }).toThrow(e);
  });

  it('throws on non-thenable object', function() {
    var e = new TypeError('resolve expects a promise object');
    expect(function() {
      resource.resolve({
        then: 'then'
      });
    }).toThrow(e);
  });

  describe('resolve.$promise', function() {
    var deferred;

    beforeEach(function() {
      deferred = $q.defer();
    });

    it('rejects with error', function() {
      var rejectedValue;

      resource.resolve(deferred.promise);
      resource.$promise.then(null, function(value) {
        rejectedValue = value;
      });

      deferred.reject('ERROR');
      scope.$apply();
      expect(rejectedValue).toBe('ERROR');
      expect(resource).toEqual([]);
    });

    it('retains reference to array', function() {
      var resolvedValue;

      resource.resolve(deferred.promise);
      resource.$promise.then(function(value) {
        resolvedValue = value;
      });

      deferred.resolve([1, 2]);
      scope.$apply();
      expect(resolvedValue.length).toBe(2);
      expect(resource).toBe(resolvedValue);
    });
  });

});
