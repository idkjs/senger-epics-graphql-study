type t;
[@bs.module "@aws-amplify/api"] external api: t = "default";
[@bs.send] external configure: (t, Aws.config) => unit = "configure";

//   let message = {"id": None, "message": "value", "createdAt": None};
//  let mutationRequest = Graphql.CreateMessage.make(~input=message, ());
// let graphqlOperation: Types.graphqlOperation = {
//   query: mutationRequest##query,
//   variables: mutationRequest##variables,
// };
// type executionResult = {
//   errors: Js.Nullable.t(array(string)),
//   data: Js.Nullable.t(Js.Json.t),
// };
[@bs.send]
external _graphql:
  (t, Types.graphqlOperation) => Js.Promise.t(Types.executionResult) =
  "graphql";
/* [@bs.val] external fetchWithInit : (string, requestInit) => Js.Promise.t(response) = "fetch"; */
// let graphql =
//   graphqlOperation => {
//     _graphql(api, graphqlOperation);
//   };
// [@bs.val]
// external mutate:
//   (t, Types.mutation, Types.graphqlOperation) =>
//   Js.Promise.t(Types.executionResult) =
//   "graphql";
// type mutation = Types.graphqlOperation => Js.Promise.t(Types.executionResult);
// let mutate = graphqlOperation => {
//   mutate(api, graphqlOperation);
// };
let mutation: Types.mutation =
  graphqlOperation => {
    _graphql(api, graphqlOperation);
  };

[@bs.send.pipe: Types.submissionAction]
external json: Js.Promise.t(Types.executionResult) = "json";