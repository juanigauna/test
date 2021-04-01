"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _morgan = _interopRequireDefault(require("morgan"));

var _express = _interopRequireDefault(require("express"));

var _errorhandler = _interopRequireDefault(require("errorhandler"));

var _multer = _interopRequireDefault(require("multer"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _connectFlash = _interopRequireDefault(require("connect-flash"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _passport = _interopRequireDefault(require("passport"));

var _handlebars = _interopRequireDefault(require("handlebars"));

require("./config/passport");

var _routes = _interopRequireDefault(require("./routes"));

var helpers = _interopRequireWildcard(require("./helpers"));

var _config = _interopRequireDefault(require("./config"));

var app = (0, _express["default"])();

var _require = require("@handlebars/allow-prototype-access"),
    allowInsecurePrototypeAccess = _require.allowInsecurePrototypeAccess; // Settings


app.set("port", _config["default"].port);
app.set("views", _path["default"].join(__dirname, "./views"));
app.engine(".hbs", (0, _expressHandlebars["default"])({
  defaultLayout: "main",
  layoutsDir: _path["default"].join(app.get("views"), "layouts"),
  partialsDir: _path["default"].join(app.get("views"), "partials"),
  helpers: helpers,
  extname: ".hbs",
  handlebars: allowInsecurePrototypeAccess(_handlebars["default"])
}));
app.set("view engine", ".hbs"); // Uploads Settings

app.use((0, _multer["default"])({
  dest: "./uploads"
}).single("image")); // middlewares

app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_express["default"].json());
app.use((0, _expressSession["default"])({
  secret: "somesecretkey",
  resave: true,
  saveUninitialized: true
}));
app.use((0, _connectFlash["default"])());
app.use(_passport["default"].initialize());
app.use(_passport["default"].session()); // Global Variables

app.use(function (req, res, next) {
  // the curren user session
  app.locals.user = req.user || null; // succes messages by flash

  app.locals.success = req.flash("success"); // passport authentication erros

  app.locals.error = req.flash("error");
  next();
}); // Routes

app.use(_routes["default"]); // The Public directory for static files

app.use("/public", _express["default"]["static"](_path["default"].join(__dirname, "./public"))); // The Uploads directory

app.use("/uploads", _express["default"]["static"]("./uploads")); // Error Handling

if ("development" === app.get("env")) {
  app.use((0, _errorhandler["default"])());
}

var _default = app;
exports["default"] = _default;