'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Js_json = require("bs-platform/lib/js/js_json.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");

var ppx_printed_query = "query ListMessages($filter: ModelMessageFilterInput, $limit: Int, $nextToken: String)  {\nlistMessages(filter: $filter, limit: $limit, nextToken: $nextToken)  {\nitems  {\nid  \nmessage  \ncreatedAt  \n}\n\nnextToken  \n}\n\n}\n";

function parse(value) {
  var value$1 = Js_option.getExn(Js_json.decodeObject(value));
  var match = Js_dict.get(value$1, "listMessages");
  var tmp;
  if (match !== undefined) {
    var value$2 = Caml_option.valFromOption(match);
    var match$1 = Js_json.decodeNull(value$2);
    if (match$1 !== undefined) {
      tmp = undefined;
    } else {
      var value$3 = Js_option.getExn(Js_json.decodeObject(value$2));
      var match$2 = Js_dict.get(value$3, "items");
      var tmp$1;
      if (match$2 !== undefined) {
        var value$4 = Caml_option.valFromOption(match$2);
        var match$3 = Js_json.decodeNull(value$4);
        tmp$1 = match$3 !== undefined ? undefined : Js_option.getExn(Js_json.decodeArray(value$4)).map((function (value) {
                  var match = Js_json.decodeNull(value);
                  if (match !== undefined) {
                    return ;
                  } else {
                    var value$1 = Js_option.getExn(Js_json.decodeObject(value));
                    var match$1 = Js_dict.get(value$1, "id");
                    var tmp;
                    if (match$1 !== undefined) {
                      var value$2 = Caml_option.valFromOption(match$1);
                      var match$2 = Js_json.decodeString(value$2);
                      tmp = match$2 !== undefined ? match$2 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$2));
                    } else {
                      tmp = Js_exn.raiseError("graphql_ppx: Field id on type Message is missing");
                    }
                    var match$3 = Js_dict.get(value$1, "message");
                    var tmp$1;
                    if (match$3 !== undefined) {
                      var value$3 = Caml_option.valFromOption(match$3);
                      var match$4 = Js_json.decodeString(value$3);
                      tmp$1 = match$4 !== undefined ? match$4 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$3));
                    } else {
                      tmp$1 = Js_exn.raiseError("graphql_ppx: Field message on type Message is missing");
                    }
                    var match$5 = Js_dict.get(value$1, "createdAt");
                    var tmp$2;
                    if (match$5 !== undefined) {
                      var value$4 = Caml_option.valFromOption(match$5);
                      var match$6 = Js_json.decodeNull(value$4);
                      if (match$6 !== undefined) {
                        tmp$2 = undefined;
                      } else {
                        var match$7 = Js_json.decodeString(value$4);
                        tmp$2 = match$7 !== undefined ? match$7 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$4));
                      }
                    } else {
                      tmp$2 = undefined;
                    }
                    return {
                            id: tmp,
                            message: tmp$1,
                            createdAt: tmp$2
                          };
                  }
                }));
      } else {
        tmp$1 = undefined;
      }
      var match$4 = Js_dict.get(value$3, "nextToken");
      var tmp$2;
      if (match$4 !== undefined) {
        var value$5 = Caml_option.valFromOption(match$4);
        var match$5 = Js_json.decodeNull(value$5);
        if (match$5 !== undefined) {
          tmp$2 = undefined;
        } else {
          var match$6 = Js_json.decodeString(value$5);
          tmp$2 = match$6 !== undefined ? match$6 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$5));
        }
      } else {
        tmp$2 = undefined;
      }
      tmp = {
        items: tmp$1,
        nextToken: tmp$2
      };
    }
  } else {
    tmp = undefined;
  }
  return {
          listMessages: tmp
        };
}

function json_of_ModelIDFilterInput(value) {
  var v = value.ne;
  var v$1 = value.eq;
  var v$2 = value.le;
  var v$3 = value.lt;
  var v$4 = value.ge;
  var v$5 = value.gt;
  var v$6 = value.contains;
  var v$7 = value.notContains;
  var v$8 = value.between;
  var tmp;
  if (v$8 !== undefined) {
    var v$9 = v$8;
    tmp = v$9.map((function (v) {
            if (v !== undefined) {
              return v;
            } else {
              return null;
            }
          }));
  } else {
    tmp = null;
  }
  var v$10 = value.beginsWith;
  return Js_dict.fromArray(/* array */[
                /* tuple */[
                  "ne",
                  v !== undefined ? v : null
                ],
                /* tuple */[
                  "eq",
                  v$1 !== undefined ? v$1 : null
                ],
                /* tuple */[
                  "le",
                  v$2 !== undefined ? v$2 : null
                ],
                /* tuple */[
                  "lt",
                  v$3 !== undefined ? v$3 : null
                ],
                /* tuple */[
                  "ge",
                  v$4 !== undefined ? v$4 : null
                ],
                /* tuple */[
                  "gt",
                  v$5 !== undefined ? v$5 : null
                ],
                /* tuple */[
                  "contains",
                  v$6 !== undefined ? v$6 : null
                ],
                /* tuple */[
                  "notContains",
                  v$7 !== undefined ? v$7 : null
                ],
                /* tuple */[
                  "between",
                  tmp
                ],
                /* tuple */[
                  "beginsWith",
                  v$10 !== undefined ? v$10 : null
                ]
              ].filter((function (param) {
                    return !Js_json.test(param[1], /* Null */5);
                  })));
}

function json_of_ModelStringFilterInput(value) {
  var v = value.ne;
  var v$1 = value.eq;
  var v$2 = value.le;
  var v$3 = value.lt;
  var v$4 = value.ge;
  var v$5 = value.gt;
  var v$6 = value.contains;
  var v$7 = value.notContains;
  var v$8 = value.between;
  var tmp;
  if (v$8 !== undefined) {
    var v$9 = v$8;
    tmp = v$9.map((function (v) {
            if (v !== undefined) {
              return v;
            } else {
              return null;
            }
          }));
  } else {
    tmp = null;
  }
  var v$10 = value.beginsWith;
  return Js_dict.fromArray(/* array */[
                /* tuple */[
                  "ne",
                  v !== undefined ? v : null
                ],
                /* tuple */[
                  "eq",
                  v$1 !== undefined ? v$1 : null
                ],
                /* tuple */[
                  "le",
                  v$2 !== undefined ? v$2 : null
                ],
                /* tuple */[
                  "lt",
                  v$3 !== undefined ? v$3 : null
                ],
                /* tuple */[
                  "ge",
                  v$4 !== undefined ? v$4 : null
                ],
                /* tuple */[
                  "gt",
                  v$5 !== undefined ? v$5 : null
                ],
                /* tuple */[
                  "contains",
                  v$6 !== undefined ? v$6 : null
                ],
                /* tuple */[
                  "notContains",
                  v$7 !== undefined ? v$7 : null
                ],
                /* tuple */[
                  "between",
                  tmp
                ],
                /* tuple */[
                  "beginsWith",
                  v$10 !== undefined ? v$10 : null
                ]
              ].filter((function (param) {
                    return !Js_json.test(param[1], /* Null */5);
                  })));
}

function json_of_ModelMessageFilterInput(value) {
  var v = value.id;
  var v$1 = value.message;
  var v$2 = value.createdAt;
  var v$3 = value.and;
  var tmp;
  if (v$3 !== undefined) {
    var v$4 = v$3;
    tmp = v$4.map((function (v) {
            if (v !== undefined) {
              return json_of_ModelMessageFilterInput(Caml_option.valFromOption(v));
            } else {
              return null;
            }
          }));
  } else {
    tmp = null;
  }
  var v$5 = value.or;
  var tmp$1;
  if (v$5 !== undefined) {
    var v$6 = v$5;
    tmp$1 = v$6.map((function (v) {
            if (v !== undefined) {
              return json_of_ModelMessageFilterInput(Caml_option.valFromOption(v));
            } else {
              return null;
            }
          }));
  } else {
    tmp$1 = null;
  }
  var v$7 = value.not;
  return Js_dict.fromArray(/* array */[
                /* tuple */[
                  "id",
                  v !== undefined ? json_of_ModelIDFilterInput(Caml_option.valFromOption(v)) : null
                ],
                /* tuple */[
                  "message",
                  v$1 !== undefined ? json_of_ModelStringFilterInput(Caml_option.valFromOption(v$1)) : null
                ],
                /* tuple */[
                  "createdAt",
                  v$2 !== undefined ? json_of_ModelStringFilterInput(Caml_option.valFromOption(v$2)) : null
                ],
                /* tuple */[
                  "and",
                  tmp
                ],
                /* tuple */[
                  "or",
                  tmp$1
                ],
                /* tuple */[
                  "not",
                  v$7 !== undefined ? json_of_ModelMessageFilterInput(Caml_option.valFromOption(v$7)) : null
                ]
              ].filter((function (param) {
                    return !Js_json.test(param[1], /* Null */5);
                  })));
}

function make(filter, limit, nextToken, param) {
  return {
          query: ppx_printed_query,
          variables: Js_dict.fromArray(/* array */[
                  /* tuple */[
                    "filter",
                    filter !== undefined ? json_of_ModelMessageFilterInput(Caml_option.valFromOption(filter)) : null
                  ],
                  /* tuple */[
                    "limit",
                    limit !== undefined ? limit : null
                  ],
                  /* tuple */[
                    "nextToken",
                    nextToken !== undefined ? nextToken : null
                  ]
                ].filter((function (param) {
                      return !Js_json.test(param[1], /* Null */5);
                    }))),
          parse: parse
        };
}

function makeWithVariables(variables) {
  var filter = variables.filter;
  var limit = variables.limit;
  var nextToken = variables.nextToken;
  return {
          query: ppx_printed_query,
          variables: Js_dict.fromArray(/* array */[
                  /* tuple */[
                    "filter",
                    filter !== undefined ? json_of_ModelMessageFilterInput(Caml_option.valFromOption(filter)) : null
                  ],
                  /* tuple */[
                    "limit",
                    limit !== undefined ? limit : null
                  ],
                  /* tuple */[
                    "nextToken",
                    nextToken !== undefined ? nextToken : null
                  ]
                ].filter((function (param) {
                      return !Js_json.test(param[1], /* Null */5);
                    }))),
          parse: parse
        };
}

function makeVariables(filter, limit, nextToken, param) {
  return Js_dict.fromArray(/* array */[
                /* tuple */[
                  "filter",
                  filter !== undefined ? json_of_ModelMessageFilterInput(Caml_option.valFromOption(filter)) : null
                ],
                /* tuple */[
                  "limit",
                  limit !== undefined ? limit : null
                ],
                /* tuple */[
                  "nextToken",
                  nextToken !== undefined ? nextToken : null
                ]
              ].filter((function (param) {
                    return !Js_json.test(param[1], /* Null */5);
                  })));
}

function definition_002(graphql_ppx_use_json_variables_fn, filter, limit, nextToken, param) {
  return Curry._1(graphql_ppx_use_json_variables_fn, Js_dict.fromArray(/* array */[
                    /* tuple */[
                      "filter",
                      filter !== undefined ? json_of_ModelMessageFilterInput(Caml_option.valFromOption(filter)) : null
                    ],
                    /* tuple */[
                      "limit",
                      limit !== undefined ? limit : null
                    ],
                    /* tuple */[
                      "nextToken",
                      nextToken !== undefined ? nextToken : null
                    ]
                  ].filter((function (param) {
                        return !Js_json.test(param[1], /* Null */5);
                      }))));
}

var definition = /* tuple */[
  parse,
  ppx_printed_query,
  definition_002
];

function ret_type(f) {
  return { };
}

var MT_Ret = { };

var ListMessages = {
  ppx_printed_query: ppx_printed_query,
  query: ppx_printed_query,
  parse: parse,
  json_of_ModelIDFilterInput: json_of_ModelIDFilterInput,
  json_of_ModelStringFilterInput: json_of_ModelStringFilterInput,
  json_of_ModelMessageFilterInput: json_of_ModelMessageFilterInput,
  make: make,
  makeWithVariables: makeWithVariables,
  makeVariables: makeVariables,
  definition: definition,
  ret_type: ret_type,
  MT_Ret: MT_Ret
};

var ppx_printed_query$1 = "mutation CreateMessage($input: CreateMessageInput!)  {\ncreateMessage(input: $input)  {\nid  \nmessage  \ncreatedAt  \n}\n\n}\n";

function parse$1(value) {
  var value$1 = Js_option.getExn(Js_json.decodeObject(value));
  var match = Js_dict.get(value$1, "createMessage");
  var tmp;
  if (match !== undefined) {
    var value$2 = Caml_option.valFromOption(match);
    var match$1 = Js_json.decodeNull(value$2);
    if (match$1 !== undefined) {
      tmp = undefined;
    } else {
      var value$3 = Js_option.getExn(Js_json.decodeObject(value$2));
      var match$2 = Js_dict.get(value$3, "id");
      var tmp$1;
      if (match$2 !== undefined) {
        var value$4 = Caml_option.valFromOption(match$2);
        var match$3 = Js_json.decodeString(value$4);
        tmp$1 = match$3 !== undefined ? match$3 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$4));
      } else {
        tmp$1 = Js_exn.raiseError("graphql_ppx: Field id on type Message is missing");
      }
      var match$4 = Js_dict.get(value$3, "message");
      var tmp$2;
      if (match$4 !== undefined) {
        var value$5 = Caml_option.valFromOption(match$4);
        var match$5 = Js_json.decodeString(value$5);
        tmp$2 = match$5 !== undefined ? match$5 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$5));
      } else {
        tmp$2 = Js_exn.raiseError("graphql_ppx: Field message on type Message is missing");
      }
      var match$6 = Js_dict.get(value$3, "createdAt");
      var tmp$3;
      if (match$6 !== undefined) {
        var value$6 = Caml_option.valFromOption(match$6);
        var match$7 = Js_json.decodeNull(value$6);
        if (match$7 !== undefined) {
          tmp$3 = undefined;
        } else {
          var match$8 = Js_json.decodeString(value$6);
          tmp$3 = match$8 !== undefined ? match$8 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$6));
        }
      } else {
        tmp$3 = undefined;
      }
      tmp = {
        id: tmp$1,
        message: tmp$2,
        createdAt: tmp$3
      };
    }
  } else {
    tmp = undefined;
  }
  return {
          createMessage: tmp
        };
}

function json_of_CreateMessageInput(value) {
  var v = value.id;
  var v$1 = value.createdAt;
  return Js_dict.fromArray(/* array */[
                /* tuple */[
                  "id",
                  v !== undefined ? v : null
                ],
                /* tuple */[
                  "message",
                  value.message
                ],
                /* tuple */[
                  "createdAt",
                  v$1 !== undefined ? v$1 : null
                ]
              ].filter((function (param) {
                    return !Js_json.test(param[1], /* Null */5);
                  })));
}

function make$1(input, param) {
  return {
          query: ppx_printed_query$1,
          variables: Js_dict.fromArray(/* array */[/* tuple */[
                    "input",
                    json_of_CreateMessageInput(input)
                  ]].filter((function (param) {
                      return !Js_json.test(param[1], /* Null */5);
                    }))),
          parse: parse$1
        };
}

function makeWithVariables$1(variables) {
  var input = variables.input;
  return {
          query: ppx_printed_query$1,
          variables: Js_dict.fromArray(/* array */[/* tuple */[
                    "input",
                    json_of_CreateMessageInput(input)
                  ]].filter((function (param) {
                      return !Js_json.test(param[1], /* Null */5);
                    }))),
          parse: parse$1
        };
}

function makeVariables$1(input, param) {
  return Js_dict.fromArray(/* array */[/* tuple */[
                  "input",
                  json_of_CreateMessageInput(input)
                ]].filter((function (param) {
                    return !Js_json.test(param[1], /* Null */5);
                  })));
}

function definition_002$1(graphql_ppx_use_json_variables_fn, input, param) {
  return Curry._1(graphql_ppx_use_json_variables_fn, Js_dict.fromArray(/* array */[/* tuple */[
                      "input",
                      json_of_CreateMessageInput(input)
                    ]].filter((function (param) {
                        return !Js_json.test(param[1], /* Null */5);
                      }))));
}

var definition$1 = /* tuple */[
  parse$1,
  ppx_printed_query$1,
  definition_002$1
];

function ret_type$1(f) {
  return { };
}

var MT_Ret$1 = { };

var CreateMessage = {
  ppx_printed_query: ppx_printed_query$1,
  query: ppx_printed_query$1,
  parse: parse$1,
  json_of_CreateMessageInput: json_of_CreateMessageInput,
  make: make$1,
  makeWithVariables: makeWithVariables$1,
  makeVariables: makeVariables$1,
  definition: definition$1,
  ret_type: ret_type$1,
  MT_Ret: MT_Ret$1
};

var ppx_printed_query$2 = "subscription onCreateMessage  {\nonCreateMessage  {\n__typename  \nmessage  \n}\n\n}\n";

function parse$2(value) {
  var value$1 = Js_option.getExn(Js_json.decodeObject(value));
  var match = Js_dict.get(value$1, "onCreateMessage");
  var tmp;
  if (match !== undefined) {
    var value$2 = Caml_option.valFromOption(match);
    var match$1 = Js_json.decodeNull(value$2);
    if (match$1 !== undefined) {
      tmp = undefined;
    } else {
      var value$3 = Js_option.getExn(Js_json.decodeObject(value$2));
      var match$2 = Js_dict.get(value$3, "__typename");
      var tmp$1;
      if (match$2 !== undefined) {
        var value$4 = Caml_option.valFromOption(match$2);
        var match$3 = Js_json.decodeString(value$4);
        tmp$1 = match$3 !== undefined ? match$3 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$4));
      } else {
        tmp$1 = Js_exn.raiseError("graphql_ppx: Field __typename on type Message is missing");
      }
      var match$4 = Js_dict.get(value$3, "message");
      var tmp$2;
      if (match$4 !== undefined) {
        var value$5 = Caml_option.valFromOption(match$4);
        var match$5 = Js_json.decodeString(value$5);
        tmp$2 = match$5 !== undefined ? match$5 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$5));
      } else {
        tmp$2 = Js_exn.raiseError("graphql_ppx: Field message on type Message is missing");
      }
      tmp = {
        __typename: tmp$1,
        message: tmp$2
      };
    }
  } else {
    tmp = undefined;
  }
  return {
          onCreateMessage: tmp
        };
}

function make$2(param) {
  return {
          query: ppx_printed_query$2,
          variables: null,
          parse: parse$2
        };
}

function makeWithVariables$2(param) {
  return {
          query: ppx_printed_query$2,
          variables: null,
          parse: parse$2
        };
}

function makeVariables$2(param) {
  return null;
}

function definition_002$2(graphql_ppx_use_json_variables_fn) {
  return 0;
}

var definition$2 = /* tuple */[
  parse$2,
  ppx_printed_query$2,
  definition_002$2
];

function ret_type$2(f) {
  return { };
}

var MT_Ret$2 = { };

var OnCreateMessage = {
  ppx_printed_query: ppx_printed_query$2,
  query: ppx_printed_query$2,
  parse: parse$2,
  make: make$2,
  makeWithVariables: makeWithVariables$2,
  makeVariables: makeVariables$2,
  definition: definition$2,
  ret_type: ret_type$2,
  MT_Ret: MT_Ret$2
};

exports.ListMessages = ListMessages;
exports.CreateMessage = CreateMessage;
exports.OnCreateMessage = OnCreateMessage;
/* No side effect */
