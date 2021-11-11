'use strict';

const emitter = () => {
  let events = {};
  const ee = {
    on: (name, f, timeout = 0) => {
      const event = events[name] || [];
      events[name] = event;
      event.push(f);
      if (timeout) setTimeout(() => {
        ee.remove(name, f);
      }, timeout);
    },
    length:(name, ...data)=>{
      const event = events[name];
      if(event) return data.length;
    },
    emit: (name, ...data) => {
      const event = events[name];
      if (event) event.forEach((f) => f(...data));
    },
    
    names: () => Object.keys(events),

    functions: ()=>Object.keys(ee),
  };
  return ee;
};

const ee = emitter();

ee.on('e1', (data) => {
  console.dir(data);
});

ee.emit('e1', { msg: 'e1 ok' });

console.log(ee.length('e1',1,2,3,4,5));


ee.on('e5', () => {console.log('Hello')});

ee.emit('e5');


console.log('names', ee.names());
console.log('functions', ee.functions());
console.log('length', ee.length('e1',1,2,3,4,5));




const emitter2 = (l, o) => (l = {}, o = {
  on: (n, f) => (l[n] = l[n] || []).push(f),
  emit: (n, ...d) => (l[n] || []).map((f) => f(...d)),
  names: () => Object.keys(l),
  functions: ()=>Object.keys(o),
});

// Usage

const ee2 = emitter2();

// on and emit

ee2.on('e1', (data) => {
  console.dir(data);
});
ee2.on('e2', (data) => {
  console.dir(data);
});


ee2.emit('e1', { msg: 'e1 ok' });

// once


ee2.emit('e2', { msg: 'e2 ok' });
ee2.emit('e2', { msg: 'e2 not ok' });
console.log(ee2.functions());
console.log(ee2.names());
