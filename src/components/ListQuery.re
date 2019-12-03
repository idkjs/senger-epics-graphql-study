let logo = [%bs.raw {|require('../logo.svg')|}];
[%bs.raw {|require('../App.css')|}];
let isValidMessage = s =>
  switch (s) {
  | Some(s) => Js.String.length(s) > 0
  | None => true
  };

let validator = values => {
  let d = Js.Dict.empty();
  isValidMessage(Js.Dict.get(values, "message"))
    ? ignore() : Js.Dict.set(d, "message", "bad");
  d;
};

let isOk = (s: option(string)) =>
  switch (s) {
  | Some(_e) => false
  | None => true
  };

[@react.component]
let make = (~onSubmit, ~status) => {
  Js.log2("status", status);
  let (values, errors, handleChange, _, _) =
    Hooks.useForm(Js.Dict.empty(), validator);
  let message = Js.Dict.get(values, "message");
  Js.log2("message", message);
  let messageError = Js.Dict.get(errors, "message");
  Js.log2("messageError", messageError);
  <div className="App">
    <img src=logo className="App-logo" alt="logo" />
    <div className="jumbotron jumbotron-fluid p-0">
      <h2 className="center"> "Broadcaster"->React.string </h2>
    </div>
    {switch (status) {
     | Types.Pending =>
       // action="/send-message-no-js"
       // method="post"
       <>
         <div className="container">
           <h2 className="center"> "List Loading"->React.string </h2>
         </div>
       </>
     | Types.Success =>
       <>
         <p>
           {React.string(
              "Thank you for your submission. I'll be in touch as soon as possible.",
            )}
         </p>
       </>
     | _ =>
       <>
         <p>
           {React.string(
              "Oops, there was an issue sending your message. Please try again later.",
            )}
         </p>
       </>
     }}
  </div>;
};
let default = make;