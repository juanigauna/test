"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var _path = _interopRequireDefault(require("path"));

var ImageSchema = new _mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  filename: {
    type: String
  },
  views: {
    type: Number,
    "default": 0
  },
  likes: {
    type: Number,
    "default": 0
  },
  timestamp: {
    type: Date,
    "default": Date.now
  }
});
ImageSchema.virtual("uniqueId").get(function () {
  return this.filename.replace(_path["default"].extname(this.filename), "");
});

var _default = (0, _mongoose.model)("Image", ImageSchema);

exports["default"] = _default;