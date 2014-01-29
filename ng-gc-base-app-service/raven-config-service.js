'use strict';

angular.module('ngGcRavenConfigService', [
]).provider('RavenConfigService', [
  function() {

    var defaultOptions = {
      ignoreUrls: [
        // Facebook flakiness
        /graph\.facebook\.com/i,
        // Facebook blocked
        /connect\.facebook\.net\/en_US\/all\.js/i,
        // Woopra flakiness
        /eatdifferent\.com\.woopra-ns\.com/i,
        /static\.woopra\.com\/js\/woopra\.js/i,
        // Chrome extensions
        /extensions\//i,
        /^chrome:\/\//i,
        // Other plugins
        /127\.0\.0\.1:4001\/isrunning/i,  // Cacaoweb
        /webappstoolbarba\.texthelp\.com\//i,
        /metrics\.itunes\.apple\.com\.edgesuite\.net\//i
      ],
      ignoreErrors: [
        // Random plugins/extensions
        'top.GLOBALS',
        // http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
        'originalCreateNotification',
        'canvas.contentDocument',
        'MyApp_RemoveAllHighlights',
        'http://tt.epicplay.com',
        'Can\'t find variable: ZiteReader',
        'jigsaw is not defined',
        'ComboSearch is not defined',
        'http://loading.retry.widdit.com/',
        'atomicFindClose',
        // Facebook borked
        'fb_xd_fragment',
        // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to
        // reduce this. (thanks @acdha)
        // See http://stackoverflow.com/questions/4113268/
        // -> how-to-stop-javascript-injection-from-vodafone-proxy
        'bmi_SafeAddOnload',
        'EBCallBackMessageReceived',
        // See http://toolbar.conduit.com/Developer/
        // HtmlAndGadget/Methods/JSInjection.aspx
        'conduitPage',
        'Access is denied.',
        'Error loading script',
        'stopme is not defined'
      ],
      includePaths: [
        /https:\/\/([^/@]*\.)?gocardless\.com/
      ]
    };

    this.config = function config(endpoint, options) {
      options = options || defaultOptions;
      if (!endpoint) {
        throw new Error('Sentry endpoint must be provided');
      }
      window.Raven.config(endpoint, options).install();
    };

    this.$get = angular.noop;

  }
]);

