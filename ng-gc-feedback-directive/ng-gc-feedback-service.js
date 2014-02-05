'use strict';

angular.module('gc.feedbackService', [
  'ngHttpFactory'
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
