class Envelope {
    constructor(queuely, dispatchable) {
        this._queuely = queuely;
        this._dispatchable = dispatchable;
        this._options = {};
    }

    onQueue(queueName) {
        this._options.queue = queueName;
    }

    toBackground() {
        this._queuely.transport.push(this._dispatchable, this._options);
    }

    now() {
        this._queuely.syncTransport.push(this._dispatchable, this._options);
    }
}

export default Envelope;