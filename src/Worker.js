import EventEmitter from 'events';

const RUNNING_JOBS_COUNT_CHANGED = 'RUNNING_JOBS_COUNT_CHANGED';

class Worker {
  constructor(queuey, options = {}) {
    this._queuey = queuey;
    this._transport = options.transport || queuey.transport;
    this._handlers = queuey.handlers;
    this._queue = options.queue;
    this._concurrency = options.concurrency || 1;
    this._runningJobs = 0;
    this._interval = options.interval || 1000;
    this._timer = setInterval(()=>{}, this._interval);
    this._running = false;
    this._notifier = new EventEmitter();
    this._errorReporter = options.errorReporter || function(){};

    // Listen to concurrency changes and respond appropriately.
    this._notifier.on(RUNNING_JOBS_COUNT_CHANGED, (before, after) => {
      // If met maximum concurrency, pause the worker
      if(after >= this._concurrency) {
        this.pause();
      }

      // If a job has finished in some way and there are resource available
      // try to start another job
      if(before > after && after < this._concurrency && this._running) {
        this.startNextJob();
      }
    });
  }

  set runningJobs(number) {
    let before = this._runningJobs;
    this._runningJobs = number;
    this._notifier.emit(RUNNING_JOBS_COUNT_CHANGED, before, this._runningJobs);
  }

  get runningJobs() {
    return this._runningJobs;
  }

  async start() {
    this._running = true;

    // Initialise running jobs up to max.
    for(let i = 0; i < this._concurrency - this.runningJobs; i++) {
      let started = await this.startNextJob();

      if(!started) {
        break; // There were obviously no jobs available.
      }
    }

    // Set appropriate timer instance so that can be flexibly paused to maintain concurrency.
    this._timer = setInterval(this.startNextJob.bind(this), this._interval);
  }

  pause() {
    clearInterval(this._timer);
  }

  stop() {
    this._running = false;
    this.pause();
  }

  markJobAsStoppedProcessing(job) {
    if(this.runningJobs > 0) {
      this.runningJobs--;
    }
  }

  markJobCompleted(job) {
    this.markJobAsStoppedProcessing(job)
  }

  markJobFailed(job, err) {
    this._transport.fail(job, err);
    this._errorReporter(err, job);
  }

  async runJob(job) {

    this._handlers.fire(job).then(() => {
      this.markJobCompleted(job);
    }).catch((err) => {
      this.markJobFailed(job, err);
    });

    return true;
  }

  async startNextJob() {
    if(this.runningJobs >= this._concurrency) {
      return;
    }

    let job = this._transport.pop({queue: this._queue});

    if(job) {
      this.runningJobs++;
      return await this.runJob(job);
    }

    return false;
  }
}

export default Worker;