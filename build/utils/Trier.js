'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TryBuilder = require('./TryBuilder');

var _TryBuilder2 = _interopRequireDefault(_TryBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Trier = function () {
  function Trier() {
    _classCallCheck(this, Trier);
  }

  _createClass(Trier, null, [{
    key: 'attempt',
    value: function attempt(callback) {
      return new _TryBuilder2.default(callback);
    }
  }]);

  return Trier;
}();

exports.default = Trier;