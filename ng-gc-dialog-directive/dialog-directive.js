'use strict';

angular.module('gc.dialog', [
  'gc.backdrop',
  'gc.dialogController',
  'dialog-template.html',
  'dialog-empty-template.html'
]).directive('dialog', [
  '$rootScope', '$window', '$timeout', '$animate',
  function dialogDirective($rootScope, $window, $timeout, $animate) {
    var Dialog = $window.Dialog;

    var DEFAULT_TMPL = 'dialog-template.html';
    var EMPTY_TMPL = 'dialog-empty-template.html';

    return {
      restrict: 'E',
      templateUrl: function(element, attrs) {
        if (attrs.templateUrl === 'empty') { return EMPTY_TMPL; }
        else { return attrs.templateUrl || DEFAULT_TMPL; }
      },
      replace: true,
      transclude: true,
      require: '^backdrop',
      controller: 'DialogController',
      scope: {
        title: '@',
        cancelText: '@',
        onHide: '&',
        show: '=',
        options: '&'
      },
      link: function dialogLink(scope, element, attrs, backdropController) {
        var options = {
          preventHideOnClick: true
        };
        var opts = angular.extend({}, options, scope.options());

        // Creates an element and appends it to the body
        scope.dialog = new Dialog(opts);

        // Move the dialog element inside the created dialog element
        scope.dialog.append(element[0]);

        scope.backdrop = backdropController.backdrop;

        $rootScope.$on('closeDialog', scope.hideDialog);

        function clickOutsideAnimation(event) {
          if (element[0] && !element[0].contains(event.target)) {
            var PULSE_CLASS = 'is-pulsing';

            $animate.addClass(element, PULSE_CLASS);
            setTimeout(function() {
              $animate.removeClass(element, PULSE_CLASS);
            }, 500);
          }
        }

        scope.dialog.on(Dialog.HIDE, function dialogOnHide() {
          document.removeEventListener('click', clickOutsideAnimation, true);
          scope.onHide();
          scope.backdrop.hide();
          scope.hideDialog();
        }).on(Dialog.SHOW, function dialogOnShow() {
          scope.backdrop.show();
          document.addEventListener('click', clickOutsideAnimation, true);
        });
      }
    };

  }
]);
