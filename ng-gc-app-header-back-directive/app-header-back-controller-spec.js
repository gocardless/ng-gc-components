'use strict';

describe('AppHeaderBackController', function(){
  beforeEach(module('gc.appHeaderBackController'));

  var ctrl, scope, $window;

  beforeEach(inject(function ($rootScope, $controller, $injector) {
    scope = $rootScope.$new();
    $window = $injector.get('$window');

    ctrl = $controller('AppHeaderBackController', {
      $scope: scope
    });
  }));

  it('#navigateBack', function() {
    spyOn($window.history, 'back');
    scope.navigateBack();
    expect($window.history.back).toHaveBeenCalledOnce();
  });

});
