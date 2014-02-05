'use strict';

angular.module('gc.feedbackController', [
  'gc.feedbackService',
  'gc.alertService',
  'gc.dialogHandler'
]).controller('FeedbackController',
  ['$scope', 'FeedbackService', 'AlertService', 'DialogHandler',
  function FeedbackController($scope, FeedbackService,
    AlertService, DialogHandler) {

    $scope.sendFeedback = function sendFeedback() {
      FeedbackService.create({
        data: {
          body: $scope.feedback
        }
      }).then(function(){
        $scope.feedback = '';

        // Reset form/control states
        $scope.feedbackForm.$setPristine();

        AlertService.success('Thanks for the feedback!');
      }, function() {
        AlertService.error('Failed to send feedback. Please try again');
      });

      DialogHandler.hide();
    };

  }]);
