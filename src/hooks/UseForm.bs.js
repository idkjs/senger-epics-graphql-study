'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Belt_SetString = require("bs-platform/lib/js/belt_SetString.js");

function pickByTouched(errors, touched) {
  return $$Array.fold_right((function (param, acc) {
                var k = param[0];
                var match = Belt_SetString.has(touched, k);
                if (match) {
                  acc[k] = param[1];
                }
                return acc;
              }), Js_dict.entries(errors), { });
}

function getFormStateReducer(validator, validateOnChange, validateOnBlur, state, action) {
  if (typeof action === "number") {
    var errors = Curry._1(validator, state.values);
    return {
            touched: state.touched,
            values: state.values,
            errors: errors
          };
  } else if (action.tag) {
    var name = action[0];
    var touched = Belt_SetString.add(state.touched, name);
    state.values[name] = action[1];
    var errors$1 = validateOnChange ? pickByTouched(Curry._1(validator, state.values), touched) : state.errors;
    return {
            touched: touched,
            values: state.values,
            errors: errors$1
          };
  } else {
    var touched$1 = Belt_SetString.add(state.touched, action[0]);
    var errors$2 = validateOnBlur ? pickByTouched(Curry._1(validator, state.values), touched$1) : state.errors;
    return {
            touched: touched$1,
            values: state.values,
            errors: errors$2
          };
  }
}

function useForm($staropt$star, $staropt$star$1, initialValues, validator) {
  var validateOnChange = $staropt$star !== undefined ? $staropt$star : true;
  var validateOnBlur = $staropt$star$1 !== undefined ? $staropt$star$1 : true;
  var reducer = function (param, param$1) {
    return getFormStateReducer(validator, validateOnChange, validateOnBlur, param, param$1);
  };
  var initialState_errors = { };
  var initialState = {
    touched: Belt_SetString.empty,
    values: initialValues,
    errors: initialState_errors
  };
  var match = React.useReducer(reducer, initialState);
  var dispatch = match[1];
  var state = match[0];
  var handleBlur = function (e) {
    return Curry._1(dispatch, /* Blur */Block.__(0, [e.target.name]));
  };
  var handleChange = function (e) {
    return Curry._1(dispatch, /* Change */Block.__(1, [
                  e.target.name,
                  e.target.value
                ]));
  };
  var validate = function (param) {
    return Curry._1(dispatch, /* Validate */0);
  };
  return /* tuple */[
          state.values,
          state.errors,
          handleChange,
          handleBlur,
          validate
        ];
}

exports.pickByTouched = pickByTouched;
exports.getFormStateReducer = getFormStateReducer;
exports.useForm = useForm;
/* react Not a pure module */
