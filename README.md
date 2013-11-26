# events

  Element event management component. Allows you to unbind listeners by event type , or unbind every listener from an element.
  It can work as a single global instance for managing all application events, but it's preferable to use it within another object that attaches events to elements, such as a template/view.

## Installation

    $ component install treygriffith/events

See http://github.com/component for more information

## Example

```js
var Events = require('events');
var events = new Events();
var a = document.querySelector('a');

var onclick = function () {
  e.preventDefault();
  console.log(e.target);
};

events.bind(a, 'click', function () {
  e.preventDefault();
  console.log(e.target);
});

events.bind(a, 'click', onclick);

events.bind(a, 'dblclick', function () {
  e.preventDefault();
  console.log(e.target);
});

events.bind(a, 'dblclick', function () {
  e.preventDefault();
  console.log(e.target + "2");
});

events.unbind(a, 'click', onclick); // removes only the onclick listener
events.unbind(a, 'dblclick'); // remove all the `dblclick` listeners
events.unbind(a); // remove all event listeners

```

## API

### .bind(el, type, callback)

  Bind to `el`'s event `type` with `callback`,
  returns the `callback` passed.

### .unbind(el, type, callback)

  Unbind events from `el`, optionally specified by `type` and `callback`
  returns an array of unbound callbacks

## License

  MIT