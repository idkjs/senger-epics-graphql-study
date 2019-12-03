module WT = Wonka.Types;
// open API;
/* Handle submitting a message */
let submitMessageEpic = (actionStream, graphql) =>
  actionStream
  /* We're only concerned with performing this side effect when actions of the type `SubmitMessageRequest`
     are dispatched, so first filter out any other actions */
  |> Wonka.filter((. a) =>
       switch (a) {
       | Types.SubmitMessageRequest(_) => true
       | _ => false
       }
     )
  /* If somehow the user dispatches another message before the first request has finished, we no longer
     care about updating the UI based on the result of the first request. This shouldn't be possible based
     on how the UI is written, so `mergeMap` would achieve the same thing here.
     See https://github.com/kitten/wonka/blob/master/docs/api/operators.md */
  |> Wonka.switchMap((. a)
       /* `a` is guaranteed to be of type `SubmitMessageRequest` but I don't know how to communicate that to
          the compiler in this case, so this switch is a hacky work-around. */
       =>
         switch (a) {
         | Types.SubmitMessageRequest(message) =>
           /* Make the payload for the user's message */

           let message = {"id": None, "message": message, "createdAt": None};
           let mutationRequest =
             Graphql.CreateMessage.make(~input=message, ());

           let graphqlOperation: Types.graphqlOperation = {
             query: mutationRequest##query,
             variables: mutationRequest##variables,
           };
           Wonka.fromPromise(graphql(graphqlOperation))
           /* If the response is successful, emit the success message, otherwise emit the failure message.
              `switchMap` will emit these actions from the outer stream, so overall we are taking a stream
              of actions in and returning a stream of either `SubmitMessageSuccess` or `SubmitMessageFailure`
              actions. */
           |> Wonka.map((. r) =>
                switch (r) {
                | data => Types.SubmitMessageSuccess(data)
                | _ => Types.SubmitMessageFailure
                }
              );
         //   let payload:Types.graphqlOperation = {query:mutation.query,variables:mutation.variables};
         /* For other types of actions return a no-op inner stream. It shouldn't be possible to hit this case */
         | _ => Wonka.fromList([])
         }
       );

/* Update the URL based on the outcome of the message submission */
let submitMessageCompletionEpic = (actionStream, push) =>
  actionStream
  |> Wonka.filter((. a) =>
       switch (a) {
       | Types.SubmitMessageSuccess(r) =>
         push("/success");
         false;
       | Types.SubmitMessageFailure =>
         push("/contact?success=false");
         false;
       | _ => false
       }
     );

/* The root epic pipes the emissions from the action stream to all of the epics in the application.
   This is what will be passed to `useEpicReducer`. */

/*       /* this is using the type that comes from `fetchWithInit` as state this reduce is expecting. Its type is
               ```ocaml
               (string,Fetch.requestInit) => Js.Promise.t(Fetch.response)
               ```
               // or
               ```ocaml
         (
           string,
           Fetch.requestInit
         ) => Js.Promise.t(Fetch.response)
         <root>/node_modules/bs-fetch/src/Fetch.mli
               ```

                */ */
// let rootEpic = (actionStream, _stateStream) =>
//   /* `combineEpics` is used here to squash the 2 epics into a single epic */
//   UseEpicReducer.combineEpics([
//     submitMessageEpic(actionStream, API.mutation),
//     submitMessageCompletionEpic(actionStream, ReasonReactRouter.push),
//   ]);
let rootEpic = (actionStream, _stateStream) =>
  /* `combineEpics` is used here to squash the 2 epics into a single epic, though here only passing one epic. calling useEpicReducer on its own doesnt do the trick */
  UseEpicReducer.combineEpics([
    submitMessageEpic(actionStream, API.mutation),
  ]);