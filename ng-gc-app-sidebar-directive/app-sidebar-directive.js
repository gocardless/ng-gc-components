'use strict';

angular.module('gc.appSidebar', [
  'gc.appContent',
  'app-sidebar-template.html'
])
.directive('appSidebar', [
  function appSidebarDirective() {

    return {
      restrict: 'E',
      templateUrl: 'app-sidebar-template.html',
      transclude: true,
      replace: true,
      link: function link(scope, element, attrs) {
        scope.sidebarInclude = attrs.sidebarInclude;
      }
    };

  }
]);
