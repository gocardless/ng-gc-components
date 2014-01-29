// https://gist.github.com/harrison @ https://gist.github.com/gocardless
// ---------------------------------------------------------
// Heavily inspired by https://github.com/twilson63/ngUpload

// AngularJS file upload directive
//
// Creates a new inherited child scope and adds a $isUploading property
// Use this property to show loading messages and to disable the submit button
//
// The attribute directive takes an options hash:
// options = { onUploadEnd: function onUploadEnd(content) {}  }
// Use ng-submit if you want to know when the upload starts
//
// <div ng-app="app">
//   <div ng-controller="ctrl">
//    <form action="/uploads" gc-upload="{
//        onUploadEnd: onUploadEnd
//      }">
//      <input type="file" name="file" ng-required="true">
//      <input type="submit" value="Upload" ng-disabled="$isUploading">
//    </form>
//  </div>
// </div>
//
//  angular.module('app', ['gcUpload'])
//    .controller('ctrl', function($scope) {
//      $scope.onUploadEnd = function onUploadEnd(content) {
//        console.log(content);
//      }
//  });

'use strict';

angular.module('gcUpload', [])
  .directive('gcUpload', [
    '$log',
    function gcUploadDirective($log) {

      function getActionAttrValue(element) {
        var action = element.attr('action');
        var separator = action.indexOf('?') === -1 ? '?' : '&';
        var tStamp = +(new Date());

        // Append a timestamp field to the url
        // to prevent browser caching results
        return action + separator + '_t=' + tStamp;
      }

      return {
        scope: true,
        require: 'form',
        link: function gcUploadLink(scope, element, attrs, ctrl) {
          // Give each directive instance a new id
          var iframeID = _.uniqueId();

          var options = scope.$eval(attrs.gcUpload) || {};

          function setLoadingState(state) {
            scope.$isUploading = state;
          }

          element.attr({
            'target': 'upload-iframe-' + iframeID,
            'method': 'post',
            'action': getActionAttrValue(element),
            'enctype': 'multipart/form-data',
            'encoding': 'multipart/form-data'
          });

          var iframe = angular.element(
            '<iframe name="upload-iframe-' + iframeID + '" ' +
            'border="0" width="0" height="0" ' +
            'style="width:0px;height:0px;border:none;display:none">'
          );

          element.after(iframe);

          setLoadingState(false);

          // Start upload
          element.bind('submit', function uploadStart() {
            scope.$apply(function() {
              setLoadingState(true);
            });

            // Finish upload
            iframe.bind('load', function uploadEnd() {
              iframe.unbind('load');
              // Reset form
              element[0].reset();
              ctrl.$setPristine();

              scope.$apply(function() {
                setLoadingState(false);
              });

              // Get iframe body contents
              var bodyElement = (iframe[0].contentDocument ||
                iframe[0].contentWindow.document).body;
              var content = angular.element(bodyElement).text();
              try {
                content = angular.fromJson(content);
              } catch (e) {
                $log.warn('Response is not valid JSON');
              }

              if (angular.isFunction(options.onUploadEnd)) {
                scope.$apply(function() {
                  options.onUploadEnd(content);
                });
              }
            });
          });
        }
      };
    }
  ]);
