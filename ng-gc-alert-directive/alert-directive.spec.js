'use strict';

describe('AlertDirective', function() {

  beforeEach(module('gc.alert'));

  var elm, scope, location;

  var MESSAGE = 'alert message';

  beforeEach(inject(function($rootScope, $compile, $location) {
    scope = $rootScope;
    location = $location;

    elm = angular.element(
     '<alert close="closeAlert()">' +
       '{{ message }}' +
     '</alert>'
    );

    scope.message = MESSAGE;
    scope.closeAlert = function() {
      scope.calledClose = true;
    };

    $compile(elm)(scope);
    scope.$digest();
  }));

  it('has alert class', function() {
    var alert = elm.hasClass('alert');
    expect(alert).toBe(true);
  });

  it('has message', function() {
    var message = elm.find('[ng-transclude]');
    expect(message.text()).toEqual(MESSAGE);
  });

  it('closes on location change', function() {
    location.path('/page');
    scope.$apply();
    expect(scope.calledClose).toBe(true);
  });

  it('closes on close element click', function() {
    var closeElm = elm.find('.alert__content__close');
    closeElm.trigger('click');
    scope.$apply();
    expect(scope.calledClose).toBe(true);
  });

});
