"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _controllers = require("../controllers");

var router = (0, _express.Router)(); // Controllers

router.get("/", _controllers.homeCtrl.index);
router.get("/images/:image_id", _controllers.imageCtrl.index);
router.post("/images", _controllers.imageCtrl.create);
router.post("/images/:image_id/like", _controllers.imageCtrl.like);
router.post("/images/:image_id/comment", _controllers.imageCtrl.comment);
router["delete"]("/images/:image_id", _controllers.imageCtrl.remove); // Authentication routes

router.get("/auth/signin", _controllers.authCtrl.renderSignIn);
router.post("/auth/signin", _controllers.authCtrl.signIn);
router.get("/auth/signup", _controllers.authCtrl.renderSignUp);
router.post("/auth/signup", _controllers.authCtrl.signUp);
router.get("/auth/logout", _controllers.authCtrl.logout);
router.get("/profile", _controllers.authCtrl.profile);
var _default = router;
exports["default"] = _default;