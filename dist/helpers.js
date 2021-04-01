"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentYear = exports.timeago = void 0;

var _moment = _interopRequireDefault(require("moment"));

var timeago = function timeago(timestamp) {
  return (0, _moment["default"])(timestamp).startOf("minute").fromNow();
};

exports.timeago = timeago;

var getCurrentYear = function getCurrentYear() {
  return new Date().getFullYear();
};

exports.getCurrentYear = getCurrentYear;