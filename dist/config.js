"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var _default = {
  database: {
    URI: process.env.MONGODB_URI || "mongodb://localhost/imgshare"
  },
  port: process.env.PORT || 3000
};
exports["default"] = _default;