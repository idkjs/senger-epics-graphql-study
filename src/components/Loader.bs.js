'use strict';

var React = require("react");

function jsonify(data) {
  return React.createElement("div", undefined, React.createElement("h4", {
                  className: "card-title"
                }, "Raw Response"), React.createElement("pre", undefined, JSON.stringify(data, null, 2)));
}

function Loader(Props) {
  var submissionState = Props.submissionState;
  var match = submissionState.loading;
  var match$1 = submissionState.executionResult;
  return React.createElement("div", {
              className: "container"
            }, match ? React.createElement("span", undefined, "visible") : React.createElement("span", undefined, "invisible"), match$1 !== undefined ? jsonify(match$1.data) : React.createElement("span", undefined, "no result"));
}

var make = Loader;

exports.jsonify = jsonify;
exports.make = make;
/* react Not a pure module */
