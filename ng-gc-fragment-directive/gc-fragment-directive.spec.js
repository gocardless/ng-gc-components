'use strict';

describe('gcFragment', function() {
  beforeEach(module('gc.getFragment'));
  beforeEach(module('gc.setFragment'));

  var scope;
  var parentElm;
  var setElmScope;
  var getElmScope;

  var getElm;
  var setElm;

  var SET_KEY = 'fragment-key';
  var GET_KEY = 'fragment-key';
  var SCOPE_TEST = 'scope-test-text';
  var GET_TEST = 'get-test-text';

  var $compile;

  function createElms() {
    setElm = angular.element(
      '<div gc-set-fragment="' + SET_KEY + '">' +
        '<span class="scope-test">{{ scopeTest }}</span>' +
        '<span class="get-test">{{ getTest }}</span>' +
      '</div>'
    );

    getElm = angular.element(
      '<div gc-get-fragment="' + GET_KEY + '" ' +
        'fragment-data="{ getTest: getData.value }"' +
      '>FALLBACK</div>'
    );

    parentElm = angular.element('<div></div>');
    parentElm.append(setElm);
    parentElm.append(getElm);

    $compile(parentElm)(scope);

    setElmScope = setElm.scope();
    getElmScope = getElm.scope();

    scope.$digest();
  }

  beforeEach(inject(function($rootScope, $injector) {
    scope = $rootScope.$new();
    $compile = $injector.get('$compile');

    scope.scopeTest = SCOPE_TEST;

    scope.getData = {
      value: GET_TEST
    };
  }));

  describe('with a matched fragment', function(){
    beforeEach(function() {
      createElms();
    });

    it('has scope data', function() {
      expect(parentElm.find('.scope-test').text()).toEqual(SCOPE_TEST);
    });

    it('has get fragment data', function() {
      expect(scope.getTest).not.toBeDefined();
      expect(parentElm.find('.get-test').text()).toEqual(GET_TEST);
    });
  });

  describe('with no matched fragment', function(){
    beforeEach(function() {
      GET_KEY = 'what';
      createElms();
    });

    it('does not have scope data', function() {
      expect(parentElm.find('.scope-test').text()).toEqual('');
    });

    it('shows fallback', function() {
      expect(parentElm.find('[gc-get-fragment]').text()).toEqual('FALLBACK');
    });
  });

});
