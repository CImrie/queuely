# Queuey

Queuey is a multi-transport queue package for Node.js.
It supports a 'sync' and 'array' driver out of the box, which lets you
get set up quickly.

If you want to full power of a distributed, backend queue, you can pull in
a different transport from another package.

**Official Transport Roadmap:** 

[] Redis - `queuey-redis-transport` (not yet built - but is a priority!)

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

```ecmascript 6

```