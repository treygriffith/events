
var Events = require('events');
var domify = require('domify');
var assert = require('assert');
var trigger = require('trigger-event');

describe('Event Management', function(){

  it('should bind an event to a DOM node', function(next){
    var events = new Events();
    var el = domify("<div></div>");

    events.bind(el, 'click', function (e) {

      // not true in IE<9
      assert(this === el);
      next();
    });

    trigger(el, 'click');
  });

  it('should unbind all event listeners', function(){
    var events = new Events();
    var el = domify("<div></div>");

    events.bind(el, 'click', function (e) {
      assert(false);
    });

    events.bind(el, 'dblclick', function (e) {
      assert(false);
    });

    events.unbind(el);

    trigger(el, 'click');
    trigger(el, 'dblclick');
  });

  it('should unbind all listeners for an event', function (next) {
    var events = new Events();
    var el = domify("<div></div>");

    events.bind(el, 'click', function (e) {
      assert(this === el);
      next();
    });

    events.bind(el, 'dblclick', function (e) {
      assert(false);
    });

    events.bind(el, 'dblclick', function (e) {
      assert(false);
    });

    events.unbind(el, 'dblclick');

    trigger(el, 'dblclick');
    trigger(el, 'click');
  });

  it('should unbind a single listener', function (next) {
    var events = new Events();
    var el = domify("<div></div>");

    var listener = function (e) {
      assert(false);
    };

    events.bind(el, 'click', function (e) {
      assert(this === el);
      next();
    });

    events.bind(el, 'click', listener);

    events.unbind(el, 'click', listener);

    trigger(el, 'click');
  });
});