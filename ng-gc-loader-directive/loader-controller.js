'use strict';

angular.module('gc.loaderController', [])
.controller('LoaderController', [
  '$scope',
  function LoaderController($scope) {

    $scope.$on('$routeChangeStart', function $routeChangeStart() {
      $scope.loadingStatus = 'Loading...';
      $scope.loading = true;
    });

    $scope.$on('$routeChangeSuccess', function $routeChangeSuccess() {
      $scope.loading = false;
    });

    $scope.$on('$routeChangeError', function $routeChangeError() {
      $scope.loadingStatus = 'Error while changing page';
    });

  }
]);
