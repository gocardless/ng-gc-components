'use strict';

angular.module('gc.utils.urlIsSameOrigin', [
  'gc.utils.urlResolve'
]).factory('urlIsSameOrigin', [
  '$window', 'urlResolve',
  function urlIsSameOriginFactory($window, urlResolve) {

    var originUrl = urlResolve.urlResolve($window.location.href, true);

    function urlIsSameOrigin(requestUrl) {
      var parsed = urlResolve.urlResolve(requestUrl);
      return (parsed.protocol === originUrl.protocol &&
              parsed.host === originUrl.host);
    }

    return {
      urlIsSameOrigin: urlIsSameOrigin
    };

  }
]);
