'use strict';

describe('ngSecurityRetryQueue', function() {
  var queue;

  function mockRetryItem() {
    return jasmine.createSpyObj('retryItem', ['retry', 'cancel']);
  }

  beforeEach(module('ngSecurityRetryQueue'));

  beforeEach(inject(function($injector) {
    queue = $injector.get('SecurityRetryQueue');
  }));

  describe('hasMore', function() {
    it('initially has no items to retry', function() {
      expect(queue.hasMore).toBeDefined();
      expect(queue.hasMore()).toBe(false);
    });

    it('has more items once one has been pushed', function() {
      queue.push(mockRetryItem());
      expect(queue.hasMore()).toBe(true);
    });
  });

  describe('pushRetryFn', function() {
    it('adds a new item to the queue', function() {
      queue.pushRetryFn(function() {});
      expect(queue.hasMore()).toBe(true);
    });
  });

  describe('push', function() {
    it('emits event on push', function() {
      var called;
      queue.on(queue.EVENTS.PUSH, function() {
        called = true;
      });
      queue.push(function() {});
      expect(called).toBe(true);
    });
  });

  describe('retryAll', function() {
    it('should not fail if the queue is empty', function(){
      expect(queue.retryAll).not.toThrow();
    });

    it('should empty the queue', function() {
      queue.push(mockRetryItem());
      queue.push(mockRetryItem());
      queue.push(mockRetryItem());
      expect(queue.hasMore()).toBe(true);
      queue.retryAll();
      expect(queue.hasMore()).toBe(false);
    });
  });

  describe('cancelAll', function() {
    it('should empty the queue', function() {
      queue.push(mockRetryItem());
      queue.push(mockRetryItem());
      queue.push(mockRetryItem());
      expect(queue.hasMore()).toBe(true);
      queue.cancelAll();
      expect(queue.hasMore()).toBe(false);
    });
  });

});
