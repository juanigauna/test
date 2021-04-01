"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = require("../models");

function imageCounter() {
  return _imageCounter.apply(this, arguments);
}

function _imageCounter() {
  _imageCounter = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _models.Image.countDocuments();

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _imageCounter.apply(this, arguments);
}

function commentsCounter() {
  return _commentsCounter.apply(this, arguments);
}

function _commentsCounter() {
  _commentsCounter = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _models.Comment.countDocuments();

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _commentsCounter.apply(this, arguments);
}

function imageTotalViewsCounter() {
  return _imageTotalViewsCounter.apply(this, arguments);
}

function _imageTotalViewsCounter() {
  _imageTotalViewsCounter = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var result, viewsTotal;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models.Image.aggregate([{
              $group: {
                _id: "1",
                viewsTotal: {
                  $sum: "$views"
                }
              }
            }]);

          case 2:
            result = _context4.sent;
            viewsTotal = 0;

            if (result.length > 0) {
              viewsTotal += result[0].viewsTotal;
            }

            return _context4.abrupt("return", viewsTotal);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _imageTotalViewsCounter.apply(this, arguments);
}

function likesTotalCounter() {
  return _likesTotalCounter.apply(this, arguments);
}

function _likesTotalCounter() {
  _likesTotalCounter = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    var result, likesTotal;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _models.Image.aggregate([{
              $group: {
                _id: "1",
                likesTotal: {
                  $sum: "$likes"
                }
              }
            }]);

          case 2:
            result = _context5.sent;
            likesTotal = 0;

            if (result.length > 0) {
              likesTotal += result[0].likesTotal;
            }

            return _context5.abrupt("return", likesTotal);

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _likesTotalCounter.apply(this, arguments);
}

var _default = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var results;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Promise.all([imageCounter(), commentsCounter(), imageTotalViewsCounter(), likesTotalCounter()]);

        case 2:
          results = _context.sent;
          return _context.abrupt("return", {
            images: results[0],
            comments: results[1],
            views: results[2],
            likes: results[3]
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

exports["default"] = _default;