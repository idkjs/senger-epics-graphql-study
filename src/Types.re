
type graphqlOperation = {
  query: string,
  variables: Js.Json.t,
};

type executionResult = {
  errors: Js.Nullable.t(array(string)),
  data: option(Js.Json.t),
};
type mutation = graphqlOperation => Js.Promise.t(executionResult);

/* The response variant wraps the parsed result of executing a GraphQL operation. */
type response('response) =
  | Fetching
  | Data('response)
  | Error(string)
  | NotFound;

type formAction =
  | Blur(string)
  | Change(string, string)
  | Validate;

type submissionStatus =
  | Pending
  | Success
  | Failed;

type submissionState = {
  loading: bool,
  executionResult: option(executionResult),
  submissionStatus,
};

type submissionAction =
  | SubmitMessageRequest(string)
  | SubmitMessageSuccess(executionResult)
  | SubmitMessageFailure;

// type mutationStatus =
//   | Pending
//   | Success
//   | Failed;

// type mutationState = {loading: bool,executionResult:option(executionResult)};

type message = {
  id: option(string),
  message: string,
  createdAt: option(string),
};
