class Envelope {
    constructor(queuely, dispatchable) {
        this._queuely = queuely;
        this._dispatchable = dispatchable;
        this._options = {};
    }

    onQueue(queueName) {
        this._options.queue = queueName;

        return this;
    }

    async toBackground() {
        return await this._queuely.transport.push(this._dispatchable, this._options);
    }

    async now() {
        return await this._queuely.syncTransport.push(this._dispatchable, this._options);
    }
}

export default Envelope;