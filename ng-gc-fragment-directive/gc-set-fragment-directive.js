'use strict';

// @gcdoc directive
// @name gcSetFragment
// @restrict A
//
// @description
//
// Stores a linking/cloning function with the current scope of the element.
// The element is stored under a string key and can be retrieved
// and inserted later.
//
// The current scope is used to create a child scope when inserting the
// element clone with gc-get-fragment
//
//    <span gc-set-fragment="fragmentKey:String">
//      your crazy html that has access to your current scope
//      and any data passed trough when calling <gc-get-fragment>
//    </span>
//
//  See gc-get-fragment

angular.module('gc.setFragment', [
  'gc.fragmentStorage'
]).directive('gcSetFragment', [
  'FragmentStorage',
  function gcSetFragmentDirective(FragmentStorage) {

    return {
      transclude: 'element',
      compile: function(element, attrs, linker) {
        return function link($scope, $element, $attrs) {
          var field = $attrs.gcSetFragment;
          var fragment = {
            linker: linker,
            scope: $scope
          };

          FragmentStorage.put(field, fragment);

          $scope.$on('$destroy', function destroyFragment() {
            FragmentStorage.remove(field);
          });
        };
      }
    };

  }

]);
