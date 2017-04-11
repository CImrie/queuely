import Job from './dispatchables/Job'
// import Event from './dispatchables/Event'

class HandlerManager {
  constructor() {
    this.handlers = {};
  }

  async register(objectClassDefinition, handler) {
    if(objectClassDefinition.prototype instanceof Job)
    {

      if(this.handlers[objectClassDefinition.name]){
        throw new Error("Jobs can only have one registered handler.");
      }

      this.handlers[objectClassDefinition.name] = handler;
      return this;
    }

    throw new Error("Dispatchable must be of type Job from queuey/dispatchables/Job");
  }

  fire(object) {
    let handlers = this.handlers[object.constructor.name];

    if(!handlers) {
      throw new Error("No dispatchable handler registerd for type: " + object.name);
    }

    if(!Array.isArray(handlers)) {
      handlers = [handlers];
    }

    let promises = [];

    handlers.forEach(handler => {
      promises.push(new Promise((resolve, reject) => {
        return handler(object, resolve, reject);
      }));
    });

    return Promise.all(promises);
  }
}

export default HandlerManager;