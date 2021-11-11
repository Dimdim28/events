'use strict';

const emitter = () => {
  const events = {};
  return {
    on: (name, fn) => {
      const event = events[name];
      if (event) event.push(fn);
      else events[name] = [fn];
    },
    emit: (name, ...data) => {
      const event = events[name];
      if (event) event.forEach((fn) => fn(...data));
    }
  };
};

// Usage

const ee = emitter();

ee.on('event1', (data) => {
    console.log('1');
    console.dir(data);
  });
ee.on('event2', (data) => {
    console.log('2');
    console.dir(data);
  });
ee.on('event3', (data) => {
    console.log('3');
    console.dir(data);
  });
  
ee.on('help', ()=>{
    console.dir(events);
})

ee.emit('event1', { a: 5 });
ee.emit('event2', { b: 6 });
ee.emit('event3', { c: 7 });