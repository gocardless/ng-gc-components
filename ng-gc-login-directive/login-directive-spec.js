'use strict';

describe('login', function() {
  beforeEach(module('gc.login'));

  var $rootScope, $compile, $httpBackend;

  var elmScope;
  var elm;
  var form;

  // We don't care about dialogs in this test
  beforeEach(function() {
    angular.module('gc.dialog', []);
  });

  function createElm() {
    elm = angular.element(
      '<login></login>'
    );
    $compile(elm)($rootScope);
    elmScope = elm.isolateScope();
    $rootScope.$digest();
    form = elmScope.loginForm;
  }

  function fillInForm(email, password) {
    email = email || 'email@email.com';
    password = password || 'password';
    form.loginEmail.$setViewValue(email);
    form.loginPassword.$setViewValue(password);
  }

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');
    createElm();
  }));

  describe('signIn', function(){
    beforeEach(function() {
      $httpBackend.expect('POST', '/api/auth');
    });

    it('success', function() {
      fillInForm();
      $httpBackend.when('POST', '/api/auth').respond(200);
      elmScope.signIn();
      $httpBackend.flush();
      expect(elmScope.signInError).toBe('');
    });

    it('error', function() {
      fillInForm();
      $httpBackend.when('POST', '/api/auth').respond(401, { error: 'error' });
      elmScope.signIn();
      $httpBackend.flush();
      expect(elmScope.signInError).toBe('error');
    });
  });
});
