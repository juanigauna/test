"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.comment = exports.like = exports.create = exports.index = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _md = _interopRequireDefault(require("md5"));

var _sidebar = _interopRequireDefault(require("../helpers/sidebar"));

var _libs = require("../helpers/libs");

var _models = require("../models");

var index = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var viewModel, image, comments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            viewModel = {
              image: {},
              comments: []
            };
            _context.next = 3;
            return _models.Image.findOne({
              filename: {
                $regex: req.params.image_id
              }
            });

          case 3:
            image = _context.sent;

            if (!image) {
              _context.next = 18;
              break;
            }

            image.views = image.views + 1;
            viewModel.image = image;
            image.save();
            _context.next = 10;
            return _models.Comment.find({
              image_id: image._id
            }).sort({
              timestamp: 1
            });

          case 10:
            comments = _context.sent;
            viewModel.comments = comments;
            _context.next = 14;
            return (0, _sidebar["default"])(viewModel);

          case 14:
            viewModel = _context.sent;
            res.render("image", viewModel);
            _context.next = 19;
            break;

          case 18:
            res.redirect("/");

          case 19:
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

var create = function create(req, res) {
  var saveImage = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var imgUrl, images, imageTempPath, ext, targetPath, newImg, imageSaved;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              imgUrl = (0, _libs.randomNumber)();
              _context2.next = 3;
              return _models.Image.find({
                filename: imgUrl
              });

            case 3:
              images = _context2.sent;

              if (!(images.length > 0)) {
                _context2.next = 8;
                break;
              }

              saveImage();
              _context2.next = 24;
              break;

            case 8:
              // Image Location
              imageTempPath = req.file.path;
              ext = _path["default"].extname(req.file.originalname).toLowerCase();
              targetPath = _path["default"].resolve("./uploads/".concat(imgUrl).concat(ext)); // Validate Extension

              if (!(ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".gif")) {
                _context2.next = 21;
                break;
              }

              _context2.next = 14;
              return _fsExtra["default"].rename(imageTempPath, targetPath);

            case 14:
              // create a new image
              newImg = new _models.Image({
                title: req.body.title,
                filename: imgUrl + ext,
                description: req.body.description
              }); // save the image

              _context2.next = 17;
              return newImg.save();

            case 17:
              imageSaved = _context2.sent;
              // redirect to the list of images
              res.redirect("/images/" + imageSaved.uniqueId);
              _context2.next = 24;
              break;

            case 21:
              _context2.next = 23;
              return _fsExtra["default"].unlink(imageTempPath);

            case 23:
              res.status(500).json({
                error: "Only Images are allowed"
              });

            case 24:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function saveImage() {
      return _ref2.apply(this, arguments);
    };
  }();

  saveImage();
};

exports.create = create;

var like = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var image;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _models.Image.findOne({
              filename: {
                $regex: req.params.image_id
              }
            });

          case 2:
            image = _context3.sent;
            console.log(image);

            if (!image) {
              _context3.next = 11;
              break;
            }

            image.likes = image.likes + 1;
            _context3.next = 8;
            return image.save();

          case 8:
            res.json({
              likes: image.likes
            });
            _context3.next = 12;
            break;

          case 11:
            res.status(500).json({
              error: "Internal Error"
            });

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function like(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.like = like;

var comment = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var image, newComment;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models.Image.findOne({
              filename: {
                $regex: req.params.image_id
              }
            });

          case 2:
            image = _context4.sent;

            if (!image) {
              _context4.next = 12;
              break;
            }

            newComment = new _models.Comment(req.body);
            newComment.gravatar = (0, _md["default"])(newComment.email);
            newComment.image_id = image._id;
            _context4.next = 9;
            return newComment.save();

          case 9:
            res.redirect("/images/" + image.uniqueId + "#" + newComment._id);
            _context4.next = 13;
            break;

          case 12:
            res.redirect("/");

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function comment(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

exports.comment = comment;

var remove = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var image;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _models.Image.findOne({
              filename: {
                $regex: req.params.image_id
              }
            });

          case 2:
            image = _context5.sent;

            if (!image) {
              _context5.next = 13;
              break;
            }

            _context5.next = 6;
            return _fsExtra["default"].unlink(_path["default"].resolve("./uploads/" + image.filename));

          case 6:
            _context5.next = 8;
            return _models.Comment.deleteOne({
              image_id: image._id
            });

          case 8:
            _context5.next = 10;
            return image.remove();

          case 10:
            res.json(true);
            _context5.next = 14;
            break;

          case 13:
            res.json({
              response: "Bad Request."
            });

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function remove(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();

exports.remove = remove;