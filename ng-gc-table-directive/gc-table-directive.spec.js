'use strict';

describe('gcTable', function() {
  beforeEach(module('gc.table'));

  var scope;

  var elm;

  var $compile;

  function createElm() {
    elm = angular.element(
      '<gc-table ' +
        'table-data="data" ' +
        'table-options="options" ' +
        'table-columns="columns" ' +
        '>' +
        '<span class="get-test">{{ getTest }}</span>' +
      '</gc-table>'
    );
    $compile(elm)(scope);
    scope.$digest();
  }

  beforeEach(inject(function($rootScope, $injector) {
    scope = $rootScope.$new();
    $compile = $injector.get('$compile');
  }));

  describe('columns', function(){
    beforeEach(function() {
      scope.columns = [{
        field: 'status',
        displayAs: 'Status Header',
        isHidden: true,
        className: 'status'
      }, {
        field: 'name'
      }];

      createElm();
    });

    it('has two columns', function() {
      expect(elm.find('.table-list__header').length).toBe(2);
    });

    describe('status', function() {
      var statusElm;

      beforeEach(function() {
        statusElm = elm.find('.table-list__header--status');
      });

      it('is hidden', function() {
        expect(statusElm.is(':hidden')).toBe(true);
      });

      it('has name', function() {
        expect(statusElm.text().trim()).toBe('Status Header');
      });
    });
  });

  describe('rows', function(){
    beforeEach(function() {
      scope.columns = [{
        field: 'status'
      }, {
        field: 'name'
      }];

      scope.data = [
        { status: 'status:cell1', name: 'name:cell1' },
        { status: 'status:cell2', name: 'name:cell2' }
      ];

      createElm();
    });

    it('has two rows', function() {
      expect(elm.find('.table-list__row').length).toBe(2);
    });

    describe('row data', function() {
      var firstRow;

      beforeEach(function() {
        firstRow = elm.find('.table-list__row').first();
      });

      it('has status', function() {
        expect(firstRow.find('.table-list__cell--status').text().trim())
          .toBe('status:cell1');
      });

      it('has name', function() {
        expect(firstRow.find('.table-list__cell--name').text().trim())
          .toBe('name:cell1');
      });
    });
  });
});
