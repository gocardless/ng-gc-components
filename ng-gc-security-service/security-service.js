'use strict';

angular.module('ngSecurityService', [
  'ngSecurityInterceptor',
  'ngSecurityRetryQueue',
  'ngAuthService'
])
.factory('SecurityService', [
  '$http', '$q', '$window', 'SecurityRetryQueue', 'AuthService',
  function($http, $q, $window, SecurityRetryQueue, AuthService) {

    var globalSigninVisibleFlag;
    function openSignInDialog() {
      globalSigninVisibleFlag = true;
    }

    function closeSignInDialog(success) {
      globalSigninVisibleFlag = false;
      onSignInDialogClose(success);
    }

    function onSignInDialogClose(success) {
      if (success) {
        SecurityRetryQueue.retryAll();
      } else {
        SecurityRetryQueue.cancelAll();
      }
    }

    SecurityRetryQueue.on(SecurityRetryQueue.EVENTS.PUSH, function() {
      if (SecurityRetryQueue.hasMore()) {
        service.showSignIn();
      }
    });

    // The public API of the service
    var service = {
      // Show the modal signIn dialog
      showSignIn: function showSignIn() {
        openSignInDialog();
      },

      // START: ONE-PRODUCT MIGRATION HACK
      getLocation: function getLocation() {
        return window.location;
      },

      setLocation: function setLocation(location) {
        return window.location = location;
      },
      // END: ONE-PRODUCT MIGRATION HACK

      // Attempt to authenticate a user by the given email and password
      signIn: function signIn(user) {
        return AuthService.signIn({
          data: {
            user: user
          }
        }).then(function(response) {
          var signInAndCloseDialog = function(res) {
            service.currentSession = response;

            if (service.isAuthenticated()) {
              closeSignInDialog(true);
            }
          };

          if (_.has(response.data, 'migration_token')) { // START: ONE-PRODUCT MIGRATION HACK
            try {
              var template = _.template('//<%= host %>/?migration_token=<%= token %>');

              var hostList = {
                'dashboard.gocardless.dev:3004': 'localhost:3010',
                'dashboard.gocardless.com': 'manage.gocardless.com',
                'dashboard-staging.gocardless.com': 'manage-staging.gocardless.com',
                'dashboard-sandbox.gocardless.com': 'manage-sandbox.gocardless.com',
                'dashboard-sandbox-staging.gocardless.com': 'manage-sandbox-staging.gocardless.com',
              };

              var targetHost = hostList[service.getLocation().host];

              if (targetHost) {
                service.signOut(function () {
                  service.setLocation(
                    template({
                      host: targetHost,
                      token: response.data.migration_token
                    })
                  );
                });
              } else {
                throw new Error('Host ' + window.location.host + ' is unknown to the one-product redirect.');
              }
            } catch (e) {
              signInAndCloseDialog(response);
              $window.Bugsnag.notifyException(e);
            } // END: ONE-PRODUCT MIGRATION HACK
          } else {
            signInAndCloseDialog(response);
          }
        });
      },

      // Give up trying to signIn and clear the retry queue
      cancelSignIn: function cancelSignIn() {
        closeSignInDialog(false);
      },

      // Logout the current user and redirect
      signOut: function signOut(callback) {
        AuthService.signOut().then(function(auth) {
          service.currentSession = null;
          if (typeof callback === 'function') {
            callback(auth);
          }
        });
      },

      // Information about the current user
      currentSession: null,

      // Is the current user authenticated?
      isAuthenticated: function isAuthenticated(){
        return !!service.currentSession;
      },

      isSignInVisible: function isSignInVisible() {
        return globalSigninVisibleFlag;
      }
    };

    return service;
  }
]);
