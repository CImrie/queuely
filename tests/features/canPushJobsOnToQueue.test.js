import test from 'ava';
import queuey from '../../src'
import TestJob from '../includes/jobs/TestJob';

test('can push a job on to the queue', async t => {
  let job = new TestJob();

  queuey.dispatch(job).toBackground();
  t.is(queuey.syncTransport._queues['default'][0], job);
});