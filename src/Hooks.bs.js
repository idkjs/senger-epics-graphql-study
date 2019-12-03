'use strict';

var UseForm$EpicsGraphql = require("./hooks/UseForm.bs.js");
var UseEpicReducer$EpicsGraphql = require("./hooks/UseEpicReducer.bs.js");

var useForm = UseForm$EpicsGraphql.useForm;

var useEpicReducer = UseEpicReducer$EpicsGraphql.useEpicReducer;

exports.useForm = useForm;
exports.useEpicReducer = useEpicReducer;
/* UseForm-EpicsGraphql Not a pure module */
