"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.profile = exports.signIn = exports.signUp = exports.renderSignIn = exports.renderSignUp = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _models = require("../models");

var renderSignUp = function renderSignUp(req, res) {
  res.render("authentication/signup", {
    layout: "nostats"
  });
};

exports.renderSignUp = renderSignUp;

var renderSignIn = function renderSignIn(req, res) {
  res.render("authentication/signin", {
    layout: "nostats"
  });
};

exports.renderSignIn = renderSignIn;

var signUp = _passport["default"].authenticate("signup", {
  successRedirect: "/auth/signin",
  failureRedirect: "/auth/signup",
  failureFlash: true
});

exports.signUp = signUp;

var signIn = _passport["default"].authenticate("signin", {
  successRedirect: "/",
  failureRedirect: "/auth/signin",
  failureFlash: true
});

exports.signIn = signIn;

var profile = function profile(req, res) {
  res.render("authentication/profile");
};

exports.profile = profile;

var logout = function logout(req, res) {
  req.logout();
  res.redirect("/");
};

exports.logout = logout;