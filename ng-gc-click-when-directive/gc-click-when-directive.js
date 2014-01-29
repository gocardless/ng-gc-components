'use strict';

// Conditional ng-click directive
//
// maybeSomeUrl = "/page/{{ id }}"
// <a href gc-click-when="{{ maybeSomeUrl }}">
//
// The string passed to the directive argument is interpolated
// with any data set with <gc-click-when-scope="{id: 22}">

angular.module('gc.clickWhen', [
]).directive('gcClickWhen', [
  '$interpolate', '$location',
  function gcClickWhenDirective($interpolate, $location) {

    return function gcClickWhenLink(scope, element, attrs) {
      var data = scope.$eval(attrs.gcClickWhenScope);
      var exp = $interpolate(attrs.gcClickWhen);
      var url = exp(data);
      if (!url) { return; }

      element.addClass('is-link');
      element.bind('click', function() {
        scope.$apply(function() {
          $location.url(url);
        });
      });
    };
  }

]);
