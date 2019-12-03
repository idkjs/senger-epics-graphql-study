type t;
[@bs.module "@aws-amplify/core"] external amplify: t = "default";
[@bs.module "../aws-exports.js"] external aws_config: Js.t('a) = "default";

type config;
[@bs.module "../aws-exports.js"] external config: config = "default";
[@bs.send] external configure: (t, config) => unit = "configure";
let configure = config => {
  configure(amplify, config);
};