'use strict';

var React = require("react");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Hooks$EpicsGraphql = require("../Hooks.bs.js");

var logo = (require('../logo.svg'));

((require('../App.css')));

function isValidMessage(s) {
  if (s !== undefined) {
    return s.length > 0;
  } else {
    return true;
  }
}

function validator(values) {
  var d = { };
  var match = isValidMessage(Js_dict.get(values, "message"));
  if (!match) {
    d["message"] = "bad";
  }
  return d;
}

function isOk(s) {
  return s === undefined;
}

function ListQuery(Props) {
  Props.onSubmit;
  var status = Props.status;
  console.log("status", status);
  var match = Hooks$EpicsGraphql.useForm(undefined, undefined, { }, validator);
  var message = Js_dict.get(match[0], "message");
  console.log("message", message);
  var messageError = Js_dict.get(match[1], "message");
  console.log("messageError", messageError);
  var tmp;
  switch (status) {
    case /* Pending */0 :
        tmp = React.createElement(React.Fragment, undefined, React.createElement("div", {
                  className: "container"
                }, React.createElement("h2", {
                      className: "center"
                    }, "List Loading")));
        break;
    case /* Success */1 :
        tmp = React.createElement(React.Fragment, undefined, React.createElement("p", undefined, "Thank you for your submission. I'll be in touch as soon as possible."));
        break;
    case /* Failed */2 :
        tmp = React.createElement(React.Fragment, undefined, React.createElement("p", undefined, "Oops, there was an issue sending your message. Please try again later."));
        break;
    
  }
  return React.createElement("div", {
              className: "App"
            }, React.createElement("img", {
                  className: "App-logo",
                  alt: "logo",
                  src: logo
                }), React.createElement("div", {
                  className: "jumbotron jumbotron-fluid p-0"
                }, React.createElement("h2", {
                      className: "center"
                    }, "Broadcaster")), tmp);
}

var make = ListQuery;

var $$default = ListQuery;

exports.logo = logo;
exports.isValidMessage = isValidMessage;
exports.validator = validator;
exports.isOk = isOk;
exports.make = make;
exports.$$default = $$default;
exports.default = $$default;
exports.__esModule = true;
/* logo Not a pure module */
