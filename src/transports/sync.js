class SyncTransport {
    constructor() {
        this._queues = {};
        this._defaultQueueName = 'default';
    }

    push(dispatchable, options = {}) {
        let queue = options.queue || this._defaultQueueName;
        this.get(queue).push(dispatchable);

        return this;
    }

    pop(options = {}) {
        let queue = options.queue || this._defaultQueueName;
        return this.get(queue).pop();
    }

    get(queue) {
        if(!this._queues[queue])
        {
            let newQueue = {};
            newQueue[queue] = [];

            this._queues[queue] = [];
        }

        return this._queues[queue];
    }
}

let sync = () => {
    return new SyncTransport();
};

export default sync;