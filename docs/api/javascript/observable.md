---
title: Observable
res_type: api
---


# kendo.Observable

Provides support for firing events. Inherits from [kendo.Class](/api/javascript/class).

## Methods

### bind

Attaches a handler to an event.


<div class="meta-api-description">
How do I use the `bind` method to attach event listeners to a Kendo UI data source? Configure event listeners or subscribe to component events by attaching handlers or callback functions to specific named events on a data source, enabling you to react dynamically to changes, updates, or user interactions by registering single functions or mapping multiple event-handler pairs after initialization. This supports event-driven programming patterns, allowing control over data changes, notifications, event subscriptions, and custom response logic in reactive components or data-bound interfaces.
</div>

#### Parameters

##### eventName `String`

The name of the event.

##### handler `Function`

A function to execute each time the event is triggered. That function should have a single parameter which will contain any event specific data.

> Important: The context (`this`) of the `handler` function is set to the observable object itself.

#### Example - subscribing to an event

    <script>
    var obj = new kendo.Observable();
    obj.bind("myevent", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.sender === obj); // outputs "true"
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(this === obj); // also outputs "true"
    });
    obj.trigger("myevent"); // causes the handler to be executed
    </script>

### one

Attaches a handler to an event. The handler is executed only once.


<div class="meta-api-description">
How to attach a single-use event handler to my Kendo UI Datasource? Configure a single-use event handler that listens for a specific event only once, triggering a callback on the first occurrence and then automatically removing itself to prevent multiple executions or manual unsubscription. This enables subscribing to an event a single time, attaching one-time listeners or one-off callbacks that respond immediately but do not persist, ideal for scenarios requiring a single event response without ongoing event handling or the need to explicitly detach handlers from data streams, observables, or event emitters.
</div>

#### Parameters

##### eventName `String`

The name of the event.

##### handler `Function`

A function to execute each time the event is triggered. That function should have a single parameter which will contain any event specific data.

> Important: The context (`this`) of the `handler` function is set to the observable object itself.

#### Example - subscribing to an event

    <script>
    var obj = new kendo.Observable();
    var numberOfCalls = 0;
    obj.one("myevent", function() {
        numberOfCalls ++; // increment the counter every time the handler is executed
    });
    obj.trigger("myevent"); // fire the event
    obj.trigger("myevent"); // fire the event
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(numberOfCalls); // outputs "1"
    </script>

### trigger

Executes all handlers attached to the given event.


<div class="meta-api-description">
How to programmatically trigger events in Kendo UI for jQuery's observable data source? Invoke or emit events programmatically to execute all listeners or handlers attached to a specific event on an observable data source, enabling the firing of events, triggering callbacks, and initiating custom event-driven workflows from code; configure, call, or run event handlers dynamically, simulate event occurrences, activate listeners tied to event names, and control event propagation within observable patterns for reactive programming, event management, or asynchronous processing scenarios.
</div>

#### Parameters

##### eventName `String`

The name of the event to trigger.

##### eventData `Object`

Optional event data which will be passed as an argument to the event handlers.

#### Example - trigger an event

    <script>
    var obj = new kendo.Observable();
    obj.bind("myevent", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.data); // outputs "data"
    });
    obj.trigger("myevent", { data: "data" });
    </script>

### unbind

Remove a previously attached event handler.


<div class="meta-api-description">
How do I stop an event listener from firing in a Kendo UI DataSource? Stop or cancel event listeners, unsubscribe callbacks, detach handlers, remove or disable notifications, unregister functions previously bound to observable events, and control event subscription to prevent future invocations or updates by unlinking or turning off previously attached listener methods or callbacks that were set to trigger on changes or events.
</div>

#### Parameters

##### eventName `String` *(optional)*

The name of the event. If not specified all handlers of all events will be removed.

##### handler `Function` *(optional)*

The handler which should no longer be executed. If not specified all handlers listening to that event will be removed.

#### Example
    <script>
    var obj = new kendo.Observable();
    var numberOfCalls = 0;
    function handler(e) {
        numberOfCalls ++;
    }
    obj.bind("myevent", handler); // subscribe to the event
    obj.trigger("myevent"); // fire the event
    obj.unbind("myevent", handler); // unsubscribe from the event
    obj.trigger("myevent"); // fire the event
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(numberOfCalls); // outputs "1"
    </script>
