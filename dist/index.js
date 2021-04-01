"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _app = _interopRequireDefault(require("./app"));

require("./config/mongoose");

// database
var port = process.env.PORT || 3000; // Starting the server

_app["default"].listen(port);

console.log("Server on port", port);