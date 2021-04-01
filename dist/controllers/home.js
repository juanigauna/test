"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sidebar = _interopRequireDefault(require("../helpers/sidebar"));

var _models = require("../models");

var index = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var images, viewModel;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models.Image.find().sort({
              timestamp: -1
            });

          case 2:
            images = _context.sent;
            viewModel = {
              images: []
            };
            viewModel.images = images;
            _context.next = 7;
            return (0, _sidebar["default"])(viewModel);

          case 7:
            viewModel = _context.sent;
            res.render("index", viewModel);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function index(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.index = index;