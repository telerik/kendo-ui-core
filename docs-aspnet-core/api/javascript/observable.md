---
title: Observable
---


# kendo.Observable

Provides support for firing events. Inherits from [kendo.Class](/api/javascript/class).

## Methods

### bind

Attaches a handler to an event.

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
        console.log(e.sender === obj); // outputs "true"
        console.log(this === obj); // also outputs "true"
    });
    obj.trigger("myevent"); // causes the handler to be executed
    </script>

### one

Attaches a handler to an event. The handler is executed only once.

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
    console.log(numberOfCalls); // outputs "1"
    </script>

### trigger

Executes all handlers attached to the given event.

#### Parameters

##### eventName `String`

The name of the event to trigger.

##### eventData `Object`

Optional event data which will be passed as an argument to the event handlers.

#### Example - trigger an event

    <script>
    var obj = new kendo.Observable();
    obj.bind("myevent", function(e) {
        console.log(e.data); // outputs "data"
    });
    obj.trigger("myevent", { data: "data" });
    </script>

### unbind

Remove a previously attached event handler.

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
    console.log(numberOfCalls); // outputs "1"
    </script>
