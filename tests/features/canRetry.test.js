import test from 'ava';
import queuey from '../../src'
import TestJob from '../includes/jobs/TestJob';

test('can retry a dispatchable', async t => {
  let job = new TestJob();

  let tries = 3;
  t.plan(tries);
  let counter = 0;

  queuey.syncTransport._options.tries = tries;

  queuey.on(TestJob, (suppliedJob, resolve, reject) => {
    t.true(true); // test tried
    counter++;

    if(counter < tries) {
      throw new Error("EEEOOOOOO you faillllllll.");
    }
  });

  await queuey.dispatch(job).now();
});