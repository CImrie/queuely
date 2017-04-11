class SyncTransport {
    constructor(options) {
        this.handlers = options.handlers;
    }

    push(dispatchable, options = {}) {
        this.handlers.fire(dispatchable);

        return this;
    }

    pop(options = {}) {
        return null;
    }
}

let sync = (options) => {
    return new SyncTransport(options);
};

export default sync;