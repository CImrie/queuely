"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SyncTransport = function () {
    function SyncTransport() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, SyncTransport);

        this._options = options;
        this.handlers = options.handlers;
    }

    _createClass(SyncTransport, [{
        key: "push",
        value: function push(dispatchable) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var globalOptions = this._options;
            this.handlers.fire(dispatchable, _extends({}, globalOptions, options));

            return this;
        }
    }, {
        key: "pop",
        value: function pop() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            return null;
        }
    }, {
        key: "fail",
        value: function fail(job, err) {
            throw new Error("Job failed with error: ".err.message);
        }
    }]);

    return SyncTransport;
}();

var sync = function sync(options) {
    return new SyncTransport(options);
};

exports.default = sync;