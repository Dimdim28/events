"use strict";

const events = require('events');

const emitter = () => {
  const ee = new events.EventEmitter();
  const emit = ee.emit;
  ee.emit = (...args) => {
    emit.apply(ee, args);
    args.unshift("*");
    emit.apply(ee, args);
  };
  return ee;
};

const emitter2 = () => {
  const ee = new events.EventEmitter();
  const emit = ee.emit;
  ee.emit = (...args) => {
    if (args[0] !== "*") emit.apply(ee, args);
    args.unshift("*");
    emit.apply(ee, args);
  };
  return ee;
};

const ee = emitter();

ee.on("event1", (data) => {
  console.log("certain event");
  console.dir(data);
});
ee.on("*", (name, data) => {
  console.log("any event");
  console.dir([name, data]);
});

ee.emit("event1", { a: 5 });
ee.emit("event2", { b: 6 });
ee.emit("*", { a: 700 });
