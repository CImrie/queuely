# Queuey

Queuey is a multi-transport queue package for Node.js.
It supports a 'sync' and 'array' driver out of the box, which lets you
get set up quickly.

If you want to full power of a distributed, backend queue, you can pull in
a different transport from another package.

**Note: This package is going to hit the prime time soon but I don't yet run it in production.
If you want to take the risk, please let me know if any bugs or issues arise. Otherwise I'll update this when it's ready.**

**Official Transport Roadmap:** 

[] Redis - `queuey-redis-transport` (not yet built - but is a priority!)

### Features

- [x] Queue and process jobs and events in sync or in background
- [x] Dispatch jobs and events on to specific queues
- [x] Support job/event retry via transport configuration
- [x] Worker class to watch a queue and process jobs
    - [x] Interval to poll
    - [x] Process jobs concurrently (as jobs are asynchronous) with max limit
    - [x] Mark jobs as completed
    - [x] Mark jobs as failed (after max retries)

## Usage

```ecmascript 6
import queue from 'queuey';
import Job from 'queuey/dispatchables/Job'
import Event from 'queuey/dispatchables/Event'

// To use another transport, import the transport, then use it as a function
// with the necessary options
queue.use(
  redis({
     host: 'localhost',
     port: 6379,
     username: 'me',
     password: 'secretpass',
     tries: 3,
  })
)

class MyJob extends Job {};
class MyEvent extends Event {};

queue.on(MyJob, (job, resolve, reject) => {
    // perform your logic
    
    resolve();
    
    // if it is possible to have an Error thrown or for the job
    // to be rejected, you should wrap this handler callback 
    // in a promise with a .catch() to safely store it away.
    
    // Not doing so may result in your queue/workers crashing unexpectedly.
});

// Dispatch jobs using a variety of options:
let job = new MyJob();
queue.dispatch(job).onQueue('sla-customers').toBackground();
queue.dispatch(job).toBackground();
queue.dispatch(job).now();
```