/**
 * Kendo UI Observable Class
 *
 * Provides event binding, unbinding, and triggering functionality.
 * This is the foundation for all event-driven components in Kendo UI.
 *
 * Extends Class and supports both ES6 and legacy extend() patterns.
 *
 
 *
 * @example
 * // ES6 class inheritance
 * class MyComponent extends Observable {
 *     doSomething() {
 *         this.trigger("change", { value: 42 });
 *     }
 * }
 *
 * @example
 * // Legacy extend pattern
 * const MyComponent = Observable.extend({
 *     init: function() {
 *         Observable.fn.init.call(this);
 *         this.value = 0;
 *     },
 *     setValue: function(val) {
 *         this.value = val;
 *         this.trigger("change", { value: val });
 *     }
 * });
 *
 * const component = new MyComponent();
 * component.bind("change", function(e) {
 *     console.log("Value changed to:", e.value);
 * });
 * component.setValue(42);
 */
import { Class } from "./class";
// Type constants for typeof checks
const STRING = "string";
const FUNCTION = "function";
/**
 * preventDefault helper function.
 * Called on event object to prevent default action.
 * Uses regular function to preserve `this` context (the event object).
 */
function preventDefault() {
    this._defaultPrevented = true;
}
/**
 * isDefaultPrevented helper function.
 * Called on event object to check if default was prevented.
 * Uses regular function to preserve `this` context (the event object).
 */
function isDefaultPrevented() {
    return this._defaultPrevented === true;
}
/**
 * Observable class for event handling.
 * All Kendo UI widgets and data components inherit from this class.
 */
export class Observable extends Class {
    /**
     * Constructor - initializes the Observable's _events storage.
     */
    constructor() {
        super();
        this._events = {};
    }
    /**
     * Initialize the Observable instance.
     * Sets up the internal _events storage.
     * Accepts any arguments to allow subclasses to override with different signatures.
     *
     * Note: For direct Observable usage, this is called by the constructor.
     * For subclasses, they should call Observable.fn.init.call(this) in their init.
     */
    init(..._args) {
        this._events = {};
    }
    /**
     * Binds one or more event handlers to the observable.
     *
     * Supports multiple calling patterns:
     * - bind("event", handler)
     * - bind(["event1", "event2"], handler)
     * - bind({ event1: handler1, event2: handler2 })
     * - bind("event", handler, true) // one-time binding
     *
     * @param eventName - Event name, array of names, or object map
     * @param handlers - Handler function or map of handlers
     * @param one - If true, handler is removed after first invocation
     * @returns this for chaining
     */
    bind(eventName, handlers, one) {
        const that = this;
        let idx;
        let length;
        let original;
        let handler;
        const handlersIsFunction = typeof handlers === FUNCTION;
        let events;
        // Handle object syntax: bind({ change: handler, update: handler })
        if (handlers === undefined) {
            const eventMap = eventName;
            for (idx in eventMap) {
                that.bind(idx, eventMap[idx]);
            }
            return that;
        }
        // Convert single event name to array
        const eventNames = typeof eventName === STRING
            ? [eventName]
            : eventName;
        for (idx = 0, length = eventNames.length; idx < length; idx++) {
            const currentEventName = eventNames[idx];
            handler = handlersIsFunction
                ? handlers
                : handlers[currentEventName];
            if (handler) {
                if (one) {
                    // Wrap handler for one-time binding
                    // IMPORTANT: Use IIFE to capture currentEventName and handler in closure
                    original = handler;
                    handler = (function (evtName, originalHandler) {
                        const wrappedHandler = function () {
                            that.unbind(evtName, wrappedHandler);
                            originalHandler.apply(that, arguments);
                        };
                        wrappedHandler.original = originalHandler;
                        return wrappedHandler;
                    })(currentEventName, original);
                }
                events = that._events[currentEventName] = that._events[currentEventName] || [];
                events.push(handler);
            }
        }
        return that;
    }
    /**
     * Binds an event handler that will be removed after first invocation.
     *
     * @param eventNames - Event name or array of names
     * @param handlers - Handler function or map of handlers
     * @returns this for chaining
     */
    one(eventNames, handlers) {
        return this.bind(eventNames, handlers, true);
    }
    /**
     * Binds an event handler at the beginning of the handler list.
     * The handler will be invoked before other handlers.
     *
     * @param eventName - Event name or array of names
     * @param handlers - Handler function or map of handlers
     * @returns this for chaining
     */
    first(eventName, handlers) {
        const that = this;
        let idx;
        const eventNames = typeof eventName === STRING
            ? [eventName]
            : eventName;
        const length = eventNames.length;
        let handler;
        const handlersIsFunction = typeof handlers === FUNCTION;
        let events;
        for (idx = 0; idx < length; idx++) {
            const currentEventName = eventNames[idx];
            handler = handlersIsFunction
                ? handlers
                : handlers[currentEventName];
            if (handler) {
                events = that._events[currentEventName] = that._events[currentEventName] || [];
                events.unshift(handler);
            }
        }
        return that;
    }
    /**
     * Triggers an event, invoking all bound handlers.
     *
     * @param eventName - Name of the event to trigger
     * @param e - Optional event data object
     * @returns true if preventDefault() was called, false otherwise
     */
    trigger(eventName, e) {
        const that = this;
        let events = that._events[eventName];
        let idx;
        const length = events ? events.length : 0;
        if (events) {
            // Create or extend event object
            const eventObj = (e || {});
            eventObj.sender = that;
            eventObj._defaultPrevented = false;
            eventObj.preventDefault = preventDefault;
            eventObj.isDefaultPrevented = isDefaultPrevented;
            // Clone array to allow modifications during iteration
            // (e.g., unbinding in a handler)
            events = events.slice();
            for (idx = 0; idx < length; idx++) {
                events[idx].call(that, eventObj);
            }
            // Check if preventDefault was called by a handler
            return eventObj._defaultPrevented === true;
        }
        return false;
    }
    /**
     * Unbinds event handlers.
     *
     * - unbind() - removes all handlers for all events
     * - unbind("event") - removes all handlers for specific event
     * - unbind("event", handler) - removes specific handler
     *
     * @param eventName - Optional event name
     * @param handler - Optional specific handler to remove
     * @returns this for chaining
     */
    unbind(eventName, handler) {
        const that = this;
        const events = eventName ? that._events[eventName] : undefined;
        let idx;
        if (eventName === undefined) {
            // Unbind all events
            that._events = {};
        }
        else if (events) {
            if (handler) {
                // Unbind specific handler (iterate backwards for safe removal)
                for (idx = events.length - 1; idx >= 0; idx--) {
                    if (events[idx] === handler || events[idx].original === handler) {
                        events.splice(idx, 1);
                    }
                }
            }
            else {
                // Unbind all handlers for this event
                that._events[eventName] = [];
            }
        }
        return that;
    }
}
/**
 * Make Observable methods ENUMERABLE by deleting and reassigning them.
 *
 * ES6 class methods are non-enumerable by default, which breaks legacy patterns
 * like `$.extend({}, observableInstance, ...)` which copies properties using
 * for...in loops. By deleting and reassigning, we create enumerable properties.
 */
const proto = Observable.prototype;
const methods = ['init', 'bind', 'one', 'first', 'trigger', 'unbind'];
methods.forEach(method => {
    const fn = proto[method];
    Object.defineProperty(proto, method, {
        value: fn,
        writable: true,
        configurable: true,
        enumerable: true
    });
});
// Set up static fn reference (jQuery-like pattern)
Observable.fn = Observable.prototype;
