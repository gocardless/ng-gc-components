'use strict';

describe('SecurityInterceptor', function() {
  var SecurityRetryQueue, interceptor, promise, wrappedPromise;

  beforeEach(module('ngSecurityInterceptor'));

  beforeEach(inject(function($injector) {
    SecurityRetryQueue = $injector.get('SecurityRetryQueue');
    interceptor = $injector.get('SecurityInterceptor');
    wrappedPromise = {};
    promise = {
      then: jasmine.createSpy('then').and.returnValue(wrappedPromise)
    };
  }));

  it('does not intercept non-401 error responses', function() {
    var httpResponse = {
      status: 400
    };
    spyOn(SecurityRetryQueue, 'pushRetryFn');
    interceptor.responseError(httpResponse);
    expect(SecurityRetryQueue.pushRetryFn).not.toHaveBeenCalled();
  });

  it('intercepts 401 error response and adds to queue', function() {
    var notAuthResponse = {
      status: 401
    };
    spyOn(SecurityRetryQueue, 'pushRetryFn');
    interceptor.responseError(notAuthResponse);
    expect(SecurityRetryQueue.pushRetryFn).toHaveBeenCalled();
  });
});
