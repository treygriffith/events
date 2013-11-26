/**
 * Module dependencies
 */
var event = require('event');

/**
 * Exports
 */
module.exports = Events;

/**
 * Create a new events manager
 */
function Events() {
  this._nodes = [];
  this._events = [];
}

/**
 * Bind event listener to an element
 * @api public
 * @param  {DOM Node}   el  DOM Node to add a listener to
 * @param  {String}   evt Event to listen for.
 * @param  {Function} fn  Callback to be triggered when the event occurs.
 * @return {Function}       Attached listener
 */
Events.prototype.bind = function (el, evt, fn) {
  var events = this._initNode(el);

  events[evt] = events[evt] || [];
  events[evt].push(fn);

  event.bind(el, evt, fn);

  return fn;
};

/**
 * Unbind event listener(s) from an element
 * @api public
 * @param  {DOM Node}   el  DOM Node to remove listeners from
 * @param  {String}   evt Optional event to remove listeners for. If omitted, removes listeners for all events
 * @param  {Function} fn  Specific listener to remove. If omitted, removes all listeners for an event
 * @return {Array}       Listeners removed
 */
Events.prototype.unbind = function (el, evt, fn) {
  var unbound = []
    , events
    , i;

  if(!~this._nodes.indexOf(el)) return unbound;

  events = this._events[this._nodes.indexOf(el)];

  if(!evt) {
    for(evt in events) {
      unbound = unbound.concat(this.unbind(el, evt, fn));
    }

    return unbound;
  }
  
  if(!events[evt] || !events[evt].length) return unbound;

  i = events[evt].length;

  while(i--) {
    if(!fn || fn === events[evt][i]) {
      event.unbind(el, evt, events[evt][i]);
      unbound.push(events[evt][i]);
      events[evt].splice(i, 1);
    }
  }

  return unbound;
};

/**
 * Initialize event management for a DOM node
 * @api private
 * @param  {DOM Node} el DOM node to manage events for
 * @return {Object}    Dictionary of events managed for this element
 */
Events.prototype._initNode = function (el) {
  var index = this._nodes.indexOf(el);

  if(!~index) index = (this._nodes.push(el) - 1);

  this._events[index] = this._events[index] || {};

  return this._events[index];
};

