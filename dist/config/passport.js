"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = require("passport-local");

var _models = require("../models");

_passport["default"].use("signup", new _passportLocal.Strategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
}, /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, email, password, done) {
    var userFound, newUser, userSaved;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models.User.findOne({
              email: email
            });

          case 2:
            userFound = _context.sent;

            if (!userFound) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", done(null, false, {
              message: "The username is already Taken"
            }));

          case 5:
            // create a new User
            newUser = new _models.User();
            newUser.email = email;
            _context.next = 9;
            return _models.User.encryptPassword(password);

          case 9:
            newUser.password = _context.sent;
            _context.next = 12;
            return newUser.save();

          case 12:
            userSaved = _context.sent;
            // create a success message
            req.flash("success", "Ingresa con tu nueva cuenta"); // return the session

            return _context.abrupt("return", done(null, userSaved));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}()));

_passport["default"].use("signin", new _passportLocal.Strategy({
  passwordField: "password",
  usernameField: "email"
}, /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(email, password, done) {
    var userFound, match;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _models.User.findOne({
              email: email
            });

          case 2:
            userFound = _context2.sent;

            if (userFound) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", done(null, false, {
              message: "Not User found."
            }));

          case 5:
            _context2.next = 7;
            return userFound.matchPassword(password);

          case 7:
            match = _context2.sent;

            if (match) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", done(null, false, {
              message: "Incorrect Password."
            }));

          case 10:
            return _context2.abrupt("return", done(null, userFound));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}()));

_passport["default"].serializeUser(function (user, done) {
  done(null, user.id);
});

_passport["default"].deserializeUser( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id, done) {
    var user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _models.User.findById(id);

          case 3:
            user = _context3.sent.toObject();

            if (!user) {
              _context3.next = 7;
              break;
            }

            delete user.password;
            return _context3.abrupt("return", done(null, user));

          case 7:
            return _context3.abrupt("return", done(null, false));

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", done(_context3.t0, false));

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 10]]);
  }));

  return function (_x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());