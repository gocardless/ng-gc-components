'use strict';

// XXXXXXXX
//
// Re-write me
// Use angulars pluralize directive as a guide
angular.module('ngGcPluralize', [])
.filter('pluralize', [
  function pluralize() {

    return function pluralizeFilter(word, count) {
      if (count === 1) { return word.one; }
      return word.other;
    };

  }
]);
