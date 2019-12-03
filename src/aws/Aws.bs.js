'use strict';

var AwsExportsJs = require("../aws-exports.js");
var Core = require("@aws-amplify/core");

var aws_config = AwsExportsJs.default;

var config = AwsExportsJs.default;

function configure(config) {
  Core.default.configure(config);
  return /* () */0;
}

exports.aws_config = aws_config;
exports.config = config;
exports.configure = configure;
/* aws_config Not a pure module */
