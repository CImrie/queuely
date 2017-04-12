"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FAILED = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require("events");

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MAX_ATTEMPTS_REACHED = "MAX_ATTEMPTS_REACHED";
var FAILED = exports.FAILED = "FAILED";

var TryBuilder = function () {
  function TryBuilder(callback) {
    var _this = this;

    _classCallCheck(this, TryBuilder);

    this._callback = callback;
    this._notifier = new _events2.default();
    this._attempts = 0;

    this._notifier.on(FAILED, function (resolve, reject, err) {
      if (_this._attempts >= _this._maxTries) {
        reject(err);
      } else {
        _this.attempt();
      }
    });
  }

  _createClass(TryBuilder, [{
    key: "using",
    value: function using() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this._args = args;

      return this;
    }
  }, {
    key: "times",
    value: function times() {
      var tries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      this._maxTries = tries;
      return this.attempt();
    }
  }, {
    key: "attempt",
    value: function attempt() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        try {
          _this2._attempts++;
          resolve(_this2._callback.apply(_this2, _toConsumableArray(_this2._args)));
        } catch (err) {
          _this2._notifier.emit(FAILED, resolve, reject, err);
        }
      });
    }
  }]);

  return TryBuilder;
}();

exports.default = TryBuilder;