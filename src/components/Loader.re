[@bs.val]
 external jsonStringify: ('a, Js.Nullable.t(unit), int) => string =
"JSON.stringify";
let jsonify = data =>
   <div>
     <h4 className="card-title"> {React.string("Raw Response")} </h4>
     <pre> {React.string(jsonStringify(data, Js.Nullable.null, 2))} </pre>
 </div>;
[@react.component]
let make = (~submissionState:Types.submissionState) =>
  <div className="container">
    {submissionState.loading
       ? <span> "visible"->React.string </span>
       : <span> "invisible"->React.string </span>}
    {switch (submissionState.executionResult) {
     | Some(result) => jsonify(result.data);
     | None => <span> "no result"->React.string </span>
     }}
  </div>;