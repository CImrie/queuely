class Envelope {
    constructor(queuey, dispatchable) {
        this._queuey = queuey;
        this._dispatchable = dispatchable;
        this._options = {};
    }

    onQueue(queueName) {
        this._options.queue = queueName;
    }

    toBackground() {
        this._queuey.transport.push(this._dispatchable, this._options);
    }

    now() {
        this._queuey.syncTransport.push(this._dispatchable, this._options);
    }
}

export default Envelope;