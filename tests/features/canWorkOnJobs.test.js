import test from 'ava';
import queuey from '../../src'
import TestJob from '../includes/jobs/TestJob';
import Worker from '../../src/Worker';

test('can completely process one or more jobs from the queue', async t => {
  let timesCalled = 0;

  queuey.on(TestJob, (job, resolve, reject) => {
    timesCalled++;
    resolve();
  });

  let worker = new Worker(queuey, {
    concurrency: 4,
    interval: 50, // Ridiculously small interval. Don't do this in production.
  });

  // Start worker, which should be non-blocking.
  await worker.start();

  // Dispatch two jobs, again which should be non-blocking.
  queuey.dispatch(new TestJob).toBackground();
  queuey.dispatch(new TestJob).toBackground();

  return await new Promise((resolve, reject) => {
    let timer = setTimeout(() => {
      t.fail();
    }, 3000);

    setInterval(() => {
      if(timesCalled === 2) {
        clearTimeout(timer);
        t.is(timesCalled, 2);
        resolve();
      }
    }, 10);
  });
});