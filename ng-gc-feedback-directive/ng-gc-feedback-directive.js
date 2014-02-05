'use strict';

angular.module('gc.feedback', [
  'gc.dialog',
  'gc.toggle',
  'gc.feedbackController',
  'ng-gc-feedback-template.html'
]).directive('feedback', [
  function feedbackDirective() {

    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {},
      templateUrl: 'ng-gc-feedback-template.html'
    };

  }
]);
