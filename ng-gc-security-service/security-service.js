'use strict';

angular.module('ngSecurityService', [
  'ngSecurityInterceptor',
  'ngSecurityRetryQueue',
  'ngAuthService'
])
.factory('SecurityService', [
  '$http', '$q', 'SecurityRetryQueue', 'AuthService',
  function($http, $q, SecurityRetryQueue, AuthService) {

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

      // Attempt to authenticate a user by the given email and password
      signIn: function signIn(user) {
        return AuthService.signIn({
          data: {
            user: user
          }
        }).then(function(response) {
          service.currentSession = response;
          if (service.isAuthenticated()) {
            closeSignInDialog(true);
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
