import test from 'ava';
import queuey from '../../src'
import TestEvent from '../includes/events/TestEvent';

test('can register one or more handlers for an event', async t => {
  let event = new TestEvent();

  t.plan(2);

  queuey.on(TestEvent, (suppliedEvent) => {
    t.is(suppliedEvent, event);
  });

  queuey.on(TestEvent, (suppliedEvent) => {
    t.true(true);
  });

  queuey.dispatch(event).now();
});
