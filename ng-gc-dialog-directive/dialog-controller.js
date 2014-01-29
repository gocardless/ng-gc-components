'use strict';

angular.module('gc.dialogController', [])
.controller('DialogController', [
  '$scope', '$element', '$attrs', '$location',
  function DialogController($scope, $element, $attrs, $location) {

    // Creates an element and appends it to the body
    $scope.dialog = {};

    $scope.hideDialog = function hideDialog() {
      if ($scope.$root.$$phase) {
        $scope.show = false;
      } else {
        $scope.$apply(function() {
          $scope.show = false;
        });
      }
    };

    $scope.$watch(function dialogPathWatch(){
      return $location.url();
    }, function(newVal, oldVal) {
      if (newVal !== oldVal) {
        $scope.hideDialog();
      }
    });

    // Watch the variable bound to show
    $scope.$watch('show', function dialogShowWatch(isShown) {
      if (isShown) {
        $scope.dialog.show();
      } else {
        $scope.dialog.hide();
      }
    });

    // Cleanup dialog when the view gets torn down
    $scope.$on('$destroy', function dialogDestroy(){
      $scope.dialog.remove();
    });
  }

]);
