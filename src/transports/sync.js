class SyncTransport {
    constructor(options = {}) {
        this._options = options;
        this.handlers = options.handlers;
    }

    push(dispatchable, options = {}) {
        let globalOptions = this._options;
        this.handlers.fire(dispatchable, {...globalOptions, ...options});

        return this;
    }

    pop(options = {}) {
        return null;
    }

    fail(job, err) {
        throw new Error("Job failed with error: " . err.message);
    }
}

let sync = (options) => {
    return new SyncTransport(options);
};

export default sync;