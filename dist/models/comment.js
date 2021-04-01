"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var CommentSchema = new _mongoose.Schema({
  image_id: {
    type: _mongoose.Schema.Types.ObjectId
  },
  email: {
    type: String
  },
  name: {
    type: String
  },
  gravatar: {
    type: String
  },
  comment: {
    type: String
  },
  timestamp: {
    type: Date,
    "default": Date.now
  }
}, {
  versionKey: false
});
CommentSchema.virtual("image").set(function (image) {
  this._image = image;
}).get(function () {
  return this._image;
});

var _default = (0, _mongoose.model)("Comment", CommentSchema);

exports["default"] = _default;