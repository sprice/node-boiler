/*global desc, task, jake, fail, complete */
desc("Build");
task("default", ["lint"], function () {
});

desc('Lint code');
task('lint', [], function () {
  var lint = require("./build/lint_runner.js");
  var files = new jake.FileList();
  files.include('**/*.js');
  files.exclude(
    '.git'
    , 'node_modules'
    , 'public/bootstrap/*'
    , 'public/javascripts/jquery.js'
  );
  var options = nodeLintOptions();
  var passed = lint.validateFileList(files.toArray(), options, {});
  if (!passed) fail("Lint failed.");
});

function nodeLintOptions() {
  // Most options taken from
  // https://raw.github.com/jshint/node-jshint/master/.jshintrc
  return {
    "predef": [
      "console"
    ],

    "node" : true,
    "es5" : true,
    "browser" : true,

    "boss" : false,
    "curly": false,
    "debug": false,
    "devel": false,
    "indent": 2,
    "eqeqeq": true,
    "evil": true,
    "forin": false,
    "immed": true,
    "laxbreak": false,
    "laxcomma": true,
    "newcap": true,
    "noarg": true,
    "noempty": false,
    "nonew": false,
    "nomen": false,
    "onevar": false,
    "plusplus": false,
    "regexp": false,
    "undef": true,
    "sub": true,
    "strict": false,
    "white": true
  };
}
