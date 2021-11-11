"use strict";

const emitter = (events = {}) => ({
  on: (name, fn) => (events[name] = events[name] || []).push(fn),
  emit: (name, ...data) => (events[name] || []).forEach((fn) => fn(...data)),
});

// Usage

const ee = emitter();

ee.on("event1", (data) => {
  console.dir(data);
});

ee.on("event2", (a,b,c) => {
    let z = a+b+c;
    console.dir(z);
  });
  

ee.emit("event1", { a: 5 });
ee.emit("event1", { b: 6 });
ee.emit("event2", 2,3,5);

