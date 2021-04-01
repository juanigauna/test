"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomNumber = void 0;

var randomNumber = function randomNumber() {
  var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
  var randomNumber = 0;

  for (var i = 0; i < 6; i++) {
    randomNumber += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return randomNumber;
};

exports.randomNumber = randomNumber;