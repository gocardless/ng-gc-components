'use strict';

var componentList = [];

var fs = require('fs');
var path = require('path');
fs.readdirSync('./')
  .filter(function(file) {
    return file.match('^ng-');
  }).forEach(function(folder) {
    var component = require(path.join(__dirname, folder));
    componentList = componentList.concat(component);
  });

var vendorComponents = require('./vendor-components.json');

console.log(vendorComponents.concat(componentList))

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: './',

    // list of files / patterns to load in the browser
    files: vendorComponents.concat(componentList),

    exclude: ['node_modules/**/*spec.js'],

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    frameworks: ['jasmine'],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit'
    reporters: ['dots', 'growl'],

    reportSlowerThan: 50,

    // enable / disable watching file and executing tests
    // whenever any file changes
    autoWatch: true,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
