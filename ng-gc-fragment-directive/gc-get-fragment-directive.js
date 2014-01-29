'use strict';

// @gcdoc directive
// @name gcGetFragment
// @restrict A
//
// @description
//
// Retrieves a stored linking function with the scope to inherit from.
//
// A child scope is created from the stored scope, and any
// object properties passed through <fragment-data={obj}> will be
// attached to the child scope.
//
// The linking function/stored element is called with the child scope
// returning a element clone that is used to replace the current directive
// element entirely.
//
// If no stored fragment is found the current element will be untouched.
//
//    <span gc-get-fragment="fragmentKey:String" fragment-data="{ $index: 1 }">
//      <!-- FALLBACK WHEN NO FRAGMENT IS FOUND -->
//    </span>
//
// See gc-set-fragment

angular.module('gc.getFragment', [
  'gc.fragmentStorage'
]).directive('gcGetFragment', [
  'FragmentStorage',
  function gcGetFragmentDirective(FragmentStorage) {

    return function gcFragmentLink(scope, element, attrs) {
      var childScope;
      var fragmentData;
      var field = attrs.gcGetFragment;
      var fragment = FragmentStorage.get(field);
      if (!fragment) { return; }

      fragmentData = scope.$eval(attrs.fragmentData);
      childScope = fragment.scope.$new();
      if (angular.isObject(fragmentData)) {
        Object.keys(fragmentData).map(function(key) {
          childScope[key] = fragmentData[key];
        });
      }

      fragment.linker(childScope, function fragmentClone(clone) {
        element.replaceWith(clone);
      });
    };
  }

]);
