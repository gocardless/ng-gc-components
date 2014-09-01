'use strict';

angular.module('gc.feedbackService', [
  'gc.httpFactory'
]).factory('FeedbackService', [
  'HttpFactory',
  function FeedbackService(HttpFactory) {

    return HttpFactory.create({
      url: '/api/feedback'
    }, {
      'create': { method: 'POST' }
    });

  }
]);
