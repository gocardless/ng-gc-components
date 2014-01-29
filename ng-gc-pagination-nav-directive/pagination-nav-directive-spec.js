'use strict';

describe('paginationNavDirective', function() {
  beforeEach(module('gc.paginationNav'));

  var elm, scope;

  var checkNavigationState = function (options) {
    Object.keys(options).map(function(key) {
      var message;
      if (options[key]) {
        message = 'disables ' + key;
      } else {
        message = 'doesn\'t disable ' + key;
      }

      it(message, function () {
        expect(elm.find('.pagination-nav__btn--' + key)
          .hasClass('is-disabled')).toBe(options[key]);
      });
    });
  };

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();
    scope.meta = {};
    elm = angular.element('<pagination-nav meta="meta"></pagination-nav>');
    $compile(elm)(scope);
    scope.$digest();
  }));

  describe('initial page', function () {
    beforeEach(function () {
      scope.meta = {'records':783, 'page':1, 'per_page':20, 'pages':40,
        'links':{
          'next':2,
          'last':40
        }
      };
      scope.$digest();
    });

    checkNavigationState({
      previous: true,
      next: false
    });
  });

  describe('middle page', function () {
    beforeEach(function () {
      scope.meta = {'records':783, 'page':2, 'per_page':20, 'pages':40,
        'links':{
          'next':3,
          'previous':1,
          'first':1,
          'last':40
        }
      };
      scope.$digest();
    });

    checkNavigationState({
      previous: false,
      next: false
    });
  });

  describe('end page', function () {
    beforeEach(function () {
      scope.meta = {'records':783, 'page':40, 'per_page':20, 'pages':40,
        'links':{
          'previous':39,
          'first':1
        }
      };
      scope.$digest();
    });

    checkNavigationState({
      previous: false,
      next: true
    });
  });

});
