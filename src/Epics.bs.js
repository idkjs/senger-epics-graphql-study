'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Wonka = require("wonka/src/wonka.js");
var API$EpicsGraphql = require("./aws/API.bs.js");
var Graphql$EpicsGraphql = require("./graphql/Graphql.bs.js");
var UseEpicReducer$EpicsGraphql = require("./hooks/UseEpicReducer.bs.js");

function submitMessageEpic(actionStream, graphql) {
  return Wonka.switchMap((function (a) {
                  if (typeof a === "number" || a.tag) {
                    return Wonka.fromList(/* [] */0);
                  } else {
                    var message = {
                      id: undefined,
                      message: a[0],
                      createdAt: undefined
                    };
                    var mutationRequest = Graphql$EpicsGraphql.CreateMessage.make(message, /* () */0);
                    var graphqlOperation_query = mutationRequest.query;
                    var graphqlOperation_variables = mutationRequest.variables;
                    var graphqlOperation = {
                      query: graphqlOperation_query,
                      variables: graphqlOperation_variables
                    };
                    return Wonka.map((function (r) {
                                    return /* SubmitMessageSuccess */Block.__(1, [r]);
                                  }))(Wonka.fromPromise(Curry._1(graphql, graphqlOperation)));
                  }
                }))(Wonka.filter((function (a) {
                      if (typeof a === "number" || a.tag) {
                        return false;
                      } else {
                        return true;
                      }
                    }))(actionStream));
}

function submitMessageCompletionEpic(actionStream, push) {
  return Wonka.filter((function (a) {
                  if (typeof a === "number") {
                    Curry._1(push, "/contact?success=false");
                    return false;
                  } else if (a.tag) {
                    Curry._1(push, "/success");
                    return false;
                  } else {
                    return false;
                  }
                }))(actionStream);
}

function rootEpic(actionStream, _stateStream) {
  return UseEpicReducer$EpicsGraphql.combineEpics(/* :: */[
              submitMessageEpic(actionStream, API$EpicsGraphql.mutation),
              /* [] */0
            ]);
}

var WT = /* alias */0;

exports.WT = WT;
exports.submitMessageEpic = submitMessageEpic;
exports.submitMessageCompletionEpic = submitMessageCompletionEpic;
exports.rootEpic = rootEpic;
/* Wonka Not a pure module */
