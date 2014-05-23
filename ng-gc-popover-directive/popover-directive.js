'use strict';

angular.module('gc.popover', [
  'gc.dialogController'
]).directive('popover', [
  '$rootScope', '$window',
  function popoverDirective($rootScope, $window) {
    var Dialog = $window.Dialog;

    return {
      restrict: 'E',
      template: '<div ng-transclude ng-show="show"></div>',
      replace: true,
      transclude: true,
      controller: 'DialogController',
      scope: {
        show: '='
      },
      link: function popoverLink(scope, element) {
        scope.dialog = new Dialog({
          el: element[0]
        });

        $rootScope.$on('closePopover', scope.hideDialog);

        scope.dialog.on(Dialog.HIDE, function popoverHide() {
          scope.hideDialog();
        });
      }
    };

  }
]);
