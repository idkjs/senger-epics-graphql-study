'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Wonka = require("wonka/src/wonka.js");
var React = require("react");

function useEpicReducer(reducer, epic, initialState) {
  var match = React.useState((function () {
          return initialState;
        }));
  var setState = match[1];
  var dispatch = React.useMemo((function () {
          var match = Wonka.makeSubject(/* () */0);
          var next = match.next;
          var actionStream = match.source;
          var newStateStream = Wonka.scan(Curry.__2(reducer), initialState)(actionStream);
          Curry._1(newStateStream, (function (signal) {
                  if (typeof signal === "number" || !signal.tag) {
                    return /* () */0;
                  } else {
                    var s = signal[0];
                    return Curry._1(setState, (function (_s) {
                                  return s;
                                }));
                  }
                }));
          var epicActionStream = Curry._2(epic, actionStream, newStateStream);
          Curry._1(epicActionStream, (function (signal) {
                  if (typeof signal === "number" || !signal.tag) {
                    return /* () */0;
                  } else {
                    return Curry._1(next, signal[0]);
                  }
                }));
          return Curry.__1(next);
        }), /* tuple */[
        reducer,
        epic,
        initialState
      ]);
  return /* tuple */[
          match[0],
          dispatch
        ];
}

function combineEpics(actionStreams) {
  var match = Wonka.makeSubject(/* () */0);
  var next = match.next;
  List.iter((function (state) {
          return Curry._1(state, (function (action) {
                        if (typeof action === "number" || !action.tag) {
                          return /* () */0;
                        } else {
                          return Curry._1(next, action[0]);
                        }
                      }));
        }), actionStreams);
  return match.source;
}

var WT = /* alias */0;

exports.WT = WT;
exports.useEpicReducer = useEpicReducer;
exports.combineEpics = combineEpics;
/* Wonka Not a pure module */
