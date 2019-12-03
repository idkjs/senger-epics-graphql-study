'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Api = require("@aws-amplify/api");
var Aws$EpicsGraphql = require("./aws/Aws.bs.js");
var Form$EpicsGraphql = require("./components/Form.bs.js");
var Epics$EpicsGraphql = require("./Epics.bs.js");
var Hooks$EpicsGraphql = require("./Hooks.bs.js");
var Loader$EpicsGraphql = require("./components/Loader.bs.js");

Aws$EpicsGraphql.configure(Aws$EpicsGraphql.config);

Api.default.configure(Aws$EpicsGraphql.config);

function submissionReducer(param, action) {
  if (typeof action === "number") {
    return {
            loading: false,
            executionResult: undefined,
            submissionStatus: /* Failed */2
          };
  } else if (action.tag) {
    return {
            loading: false,
            executionResult: action[0],
            submissionStatus: /* Success */1
          };
  } else {
    return {
            loading: true,
            executionResult: undefined,
            submissionStatus: /* Pending */0
          };
  }
}

var initialSubmissionState = {
  loading: false,
  executionResult: undefined,
  submissionStatus: /* Pending */0
};

function Router(Props) {
  var match = Hooks$EpicsGraphql.useEpicReducer(submissionReducer, Epics$EpicsGraphql.rootEpic, initialSubmissionState);
  var submissionDispatch = match[1];
  var submissionState = match[0];
  var submit = function (m) {
    return Curry._1(submissionDispatch, /* SubmitMessageRequest */Block.__(0, [m]));
  };
  return React.createElement(React.Fragment, undefined, React.createElement(Form$EpicsGraphql.make, {
                  onSubmit: submit,
                  status: submissionState.submissionStatus
                }), React.createElement(Loader$EpicsGraphql.make, {
                  submissionState: submissionState
                }));
}

var make = Router;

var $$default = Router;

exports.submissionReducer = submissionReducer;
exports.initialSubmissionState = initialSubmissionState;
exports.make = make;
exports.$$default = $$default;
exports.default = $$default;
exports.__esModule = true;
/*  Not a pure module */
