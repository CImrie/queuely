"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Envelope = function () {
    function Envelope(queuely, dispatchable) {
        _classCallCheck(this, Envelope);

        this._queuely = queuely;
        this._dispatchable = dispatchable;
        this._options = {};
    }

    _createClass(Envelope, [{
        key: "onQueue",
        value: function onQueue(queueName) {
            this._options.queue = queueName;
        }
    }, {
        key: "toBackground",
        value: function toBackground() {
            this._queuely.transport.push(this._dispatchable, this._options);
        }
    }, {
        key: "now",
        value: function now() {
            this._queuely.syncTransport.push(this._dispatchable, this._options);
        }
    }]);

    return Envelope;
}();

exports.default = Envelope;