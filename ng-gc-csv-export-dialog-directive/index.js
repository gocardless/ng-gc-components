var ngComponentScriptBuilder = require('ng-component-script-builder');
var path = require('path');
var cwd = path.resolve(__dirname, './');
var currentFile = path.basename(__filename);

var filepath = ngComponentScriptBuilder.write({
  cwd: cwd,
  stripPrefix: cwd + '/',
  patterns: [
    '*.js',
    '*.css',
    '*.scss',
    '*.html',
    '!*spec.js*',
    '!' + currentFile
  ],
});

module.exports = [filepath];
