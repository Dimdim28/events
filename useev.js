const EventEmitter = function () {
    this.events = {}; // hash of array of function
  };
  
  EventEmitter.prototype.on = function (name, fn) {
    const event = this.events[name];
    if (event) event.push(fn);
    else this.events[name] = [fn];
  };
  
  EventEmitter.prototype.emit = function (name, ...data) {
    const event = this.events[name];
    if (event) event.forEach(fn => fn(...data));
  };


const ee = new EventEmitter();

ee.on('event1', (data) => {
  console.dir(data);
});
console.log('====================2========================');
ee.on('event2', (data) => {
    console.dir(data);
  });

  console.log('====================3========================');

ee.on('event3', (data) => {
    console.dir( data);
});


ee.emit('event1', { a: 5 });
ee.emit('event2', { b: 6 });
ee.emit('event3', { c: 7 });