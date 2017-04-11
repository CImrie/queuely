import test from 'ava';
import queuey from '../../src'
import TestJob from '../includes/jobs/TestJob';

test('can pull a job from the queue', async t => {
    let job = new TestJob();

    queuey.dispatch(job).toBackground();
    t.is(queuey.transport.pop(), job);
    t.true(queuey.transport.get('default').length === 0);
});