'use strict';

describe('PaginationNavController', function(){
  beforeEach(module('gc.paginationNavController'));

  var ctrl, scope, $rootScope, $location;

  beforeEach(inject(function ($controller, $injector) {
    $rootScope = $injector.get('$rootScope');
    $location = $injector.get('$location');
    scope = $rootScope.$new();

    ctrl = $controller('PaginationNavController', {
      $scope: scope
    });
  }));

  describe('paginationLink', function() {
    describe('for a missing link', function () {
      it('returns empty string', function() {
        expect(scope.paginationLink(undefined)).toBe('');
      });
    });

    describe('for a valid link', function () {
      describe('with existing search params', function () {
        beforeEach(function() {
          $location.search().page = 1;
          $location.search().status = 'pending';
        });

        it('generates a valid param string', function() {
          expect(scope.paginationLink(1)).toBe('?page=1&status=pending');
        });
      });
      describe('with no existing search params', function () {
        beforeEach(function() {
          $location.search().page = 1;
        });

        it('generates a valid param string', function() {
          expect(scope.paginationLink(1)).toBe('?page=1');
        });
      });

      describe('with a path', function() {
        beforeEach(function() {
          spyOn($location, 'path').andReturn('/somepath');
        });

        it('includes the path in the link', function() {
          expect(scope.paginationLink(1)).toBe('/somepath?page=1');
        });
      });
    });
  });

  describe('detail methods', function (){
    var meta;

    describe('on the first or middle pages', function (){
      beforeEach(function() {
        meta = {
          page: 1,
          per_page: 30,
          records: 100
        };
      });

      describe('paginationStart', function() {
        it('calculates start correctly', function() {
          expect(scope.paginationStart(meta)).toBe(1);
        });
      });

      describe('paginationEnd', function() {
        it('calculates end correctly', function() {
          expect(scope.paginationEnd(meta)).toBe(30);
        });
      });
    });

    describe('on the last page, with non divisible records', function (){
      beforeEach(function() {
        meta = {
          page: 3,
          per_page: 20,
          records: 55
        };
      });

      describe('paginationStart', function() {
        it('calculates start correctly', function() {
          expect(scope.paginationStart(meta)).toBe(41);
        });
      });

      describe('paginationEnd', function() {
        it('calculates end correctly', function() {
          expect(scope.paginationEnd(meta)).toBe(55);
        });
      });
    });
  });


});
