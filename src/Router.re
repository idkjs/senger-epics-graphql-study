Aws.configure(Aws.config);
API.configure(API.api, Aws.config);

let submissionReducer:
  (Types.submissionState, Types.submissionAction) => Types.submissionState =
  (_, action) =>
    switch (action) {
    | Types.SubmitMessageRequest(_message) => {
        loading: true,
        executionResult: None,
        submissionStatus: Pending,
      }
    | Types.SubmitMessageSuccess(executionResult) => {
        loading: false,
        executionResult: Some(executionResult),
        submissionStatus: Success,
      }
    | Types.SubmitMessageFailure => {
        loading: false,
        executionResult: None,
        submissionStatus: Failed,
      }
    };
let initialSubmissionState: Types.submissionState = {
  loading: false,
  executionResult: None,
  submissionStatus: Types.Pending,
};

[@react.component]
let make = () => {
  let (submissionState, submissionDispatch) =
    Hooks.useEpicReducer(
      submissionReducer,
      Epics.rootEpic,
      initialSubmissionState,
    );
  let submit = m => submissionDispatch(Types.SubmitMessageRequest(m));

  <>
    <Form onSubmit=submit status={submissionState.submissionStatus} />
    <Loader submissionState />
  </>;
};
let default = make;