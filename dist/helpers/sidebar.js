"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _stats = _interopRequireDefault(require("./stats"));

var _images = _interopRequireDefault(require("./images"));

var _comments = _interopRequireDefault(require("./comments"));

var _default = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(viewModel) {
    var results;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Promise.all([(0, _stats["default"])(), _images["default"].popular(), _comments["default"].newest()]);

          case 2:
            results = _context.sent;
            viewModel.sidebar = {
              stats: results[0],
              popular: results[1],
              comments: results[2]
            };
            return _context.abrupt("return", viewModel);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;