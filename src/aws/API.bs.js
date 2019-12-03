'use strict';

var Api = require("@aws-amplify/api");

function mutation(graphqlOperation) {
  return Api.default.graphql(graphqlOperation);
}

exports.mutation = mutation;
/* @aws-amplify/api Not a pure module */
