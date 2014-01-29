'use strict';

describe('LocalStorageService', function(){
  beforeEach(module('ngGcIntervalMessagesService'));

  var IntervalMessagesService;

  beforeEach(inject(function ($injector) {
    IntervalMessagesService = $injector.get('IntervalMessagesService');
  }));

  it('one day', function() {
    expect(IntervalMessagesService.get(1, 'day')).toEqual('daily');
  });

  it('other day', function() {
    expect(IntervalMessagesService.get(2, 'day')).toEqual('every 2 days');
  });

  it('one week', function() {
    expect(IntervalMessagesService.get(1, 'week')).toEqual('weekly');
  });

  it('other week', function() {
    expect(IntervalMessagesService.get(2, 'week')).toEqual('every 2 weeks');
  });

  it('one month', function() {
    expect(IntervalMessagesService.get(1, 'month')).toEqual('monthly');
  });

  it('other month', function() {
    expect(IntervalMessagesService.get(2, 'month')).toEqual('every 2 months');
  });

});
