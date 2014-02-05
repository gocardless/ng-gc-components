'use strict';

describe('SecurityInterceptor', function() {
  var queue, interceptor, promise, wrappedPromise;

  beforeEach(module('ngSecurityInterceptor'));

  beforeEach(inject(function($injector) {
    queue = $injector.get('SecurityRetryQueue');
    interceptor = $injector.get('SecurityInterceptor');
    wrappedPromise = {};
    promise = {
      then: jasmine.createSpy('then').andReturn(wrappedPromise)
    };
  }));

  it('accepts and returns a promise', function() {
    var newPromise = interceptor(promise);
    expect(promise.then).toHaveBeenCalled();
    expect(promise.then.mostRecentCall.args[0]).toBe(null);
    expect(newPromise).toBe(wrappedPromise);
  });

  it('does not intercept non-401 error responses', function() {
    var httpResponse = {
      status: 400
    };
    interceptor(promise);
    var errorHandler = promise.then.mostRecentCall.args[1];
    expect(errorHandler(httpResponse)).toBe(promise);
  });

  it('intercepts 401 error response and adds to queue', function() {
    var notAuthResponse = {
      status: 401
    };
    interceptor(promise);
    var errorHandler = promise.then.mostRecentCall.args[1];
    errorHandler(notAuthResponse);
    expect(queue.hasMore()).toBe(true);
  });
});
