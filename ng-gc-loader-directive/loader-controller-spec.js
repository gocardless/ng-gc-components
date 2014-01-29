'use strict';

describe('LoaderControllerSpec', function(){
  beforeEach(module('gc.loaderController'));

  var ctrl, scope;

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope;

    ctrl = $controller('LoaderController', {
      $scope: scope
    });
  }));

  it('loading on $routeChangeStart', function() {
    scope.$emit('$routeChangeStart');
    expect(scope.loading).toBe(true);
  });

  it('not loading on $routeChangeSuccess', function() {
    scope.$emit('$routeChangeSuccess');
    expect(scope.loading).toBe(false);
  });

  it('has error on $routeChangeError', function() {
    scope.$emit('$routeChangeError');
    expect(scope.loadingStatus).toEqual('Error while changing page');
  });

});
