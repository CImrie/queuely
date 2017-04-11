import test from 'ava';
import queuey from '../../src'
import TestJob from '../includes/jobs/TestJob';

test('can register a handler for a job', async t => {
  let job = new TestJob();

  queuey.on(TestJob, (suppliedJob) => {
    t.is(suppliedJob, job);
    t.pass();
  });

  queuey.dispatch(job).now();
});

// test('can only register one handler for a job', async t => {
//   let job = new TestJob();
//
//   queuey.on(TestJob, (suppliedJob) => {
//     t.is(suppliedJob, job);
//     t.pass();
//   });
//
//   let anotherHandler = (suppliedJob) => {
//     // t.fail();
//     // throw new Error("CRASH OUT AND DIE M'FOCKER.")
//   };
//
//   let error = await t.throws(function() { return queuey.on(TestJob, anotherHandler);});
//
//   // t.true(error.message.contains('can only have one'));
// });