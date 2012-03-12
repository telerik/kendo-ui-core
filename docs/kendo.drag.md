# Kendo.Drag

The Kendo.Drag component provides a cross-browser, touch-friendly way to handle mouse and touch drag events.


## Getting Started

The kendo.Drag constructor accepts an element and a object with configuration options. Review the API reference for a full list of the configuration options.

<div class="code-sample">
    <h4 class="code-title">Initialize Kendo.Drag instance</h4>
    <pre class="code">
var drag = new Kendo.Drag($("#foo"), {
    start: function(e) { ... },
    move: function(e) { ... },
    // ...
})
    </pre>
</div>

## Drag Event Lifecycle

The Drag component raises five events: `start`, `move`, `end`, `tap`, `cancel`.

An important thing to notice is that the `start` event gets fired after the *first* `mousemove`/`touchmove` event.
This allows detection of accidental short mouse/finger drag events.

Once a `start` event is fired, `move` and `end` events are guaranteed to be fired.
The only exception is the case when the consumer of the events cancels the event lifecycle using the `cancel` *method*. In this case, the `cancel` *event* gets fired.

If the user presses and releases the mouse (or the equivalent gesture on touch enabled devices) without any movement,
or the movement distance is below the threshold specified, the `tap` event is fired.

## DOM Event Cancellation

By default, the Drag component does not call `preventDefault` on any of the DOM events it binds to. However, there are several cases where this might be necessary, for example:

 * To prevent default scrolling on touch devices;
 * To avoid text selection when dragging elements.

To prevent the default effect of the respective DOM events, the event handler can call `preventDefault` on the Drag event parameter.

<div class="code-sample">
    <h4 class="code-title">Prevent default browser behavior on mousemove/touchmove</h4>
    <pre class="code">
var drag = new Kendo.Drag($("#foo"));

drag.bind("move", function(e) {
    e.preventDefault();
});
    </pre>
</div>

## Drag Event Coordinates and Information

In each event handler, the Drag component passes its data in the event handler parameter. The event information is grouped in two axis object instances — `x` and `y`.
Each axis instance has the following fields:

* `location` - the offset of the mouse/touch relative to the *entire document* (pageX/Y);
* `startLocation` - the offset of the mouse/touch relative to the document when the drag started;
* `client` - the offset of the mouse/touch relative to the *viewport* (clientX/Y);
* `delta` - the change from the previous event location
* `velocity` - the pixels per millisecond speed of the current move.
  For instance, the mobile ScrollView widget considers a drag with velocity below 0.8 a slow one, while velocity above 1.6 is a fast one.

<div class="code-sample">
    <h4 class="code-title">Access event coordinates in drag move event</h4>
    <pre class="code">
var drag = new Kendo.Drag($("#foo"));

drag.bind("move", function(e) {
    console.log(e.x.location);
    console.log(e.y.location);
});
    </pre>
</div>

## Handle Dragging Outside the Element Boundaries

If the Drag component is bound to a small DOM element, the mouse finger may leave element boundaries while dragging.
In this case, by default, the Drag component will trigger the `end` event.
The `global` configuration option would cause the drag to track the events for the entire document surface until the mouse is released.
This is the behavior of the kendo Draggable widget.

<div class="code-sample">
    <h4 class="code-title">Handle drag events for the entire document.</h4>
    <pre class="code">
var drag = new Kendo.Drag($("#foo"), { global: true });
    </pre>
</div>

## Nest Elements with Drag Listeners

If several Drag components are bound to nested elements, dragging the innermost element will trigger multiple drag events as the DOM events bubble.
To prevent this behavior, call the drag `capture` method in the `start` event handler.

<div class="code-sample">
    <h4 class="code-title">Capture innermost drag event</h4>
    <pre class="code">
&lt;div id=&quot;foo&quot;&gt;
    &lt;div id=&quot;bar&quot;&gt;
    &lt;/div&gt;
&lt;/div&gt;

var drag = new Kendo.Drag($("#bar"), {
    start: function(e) {
        e.capture();
    }
});

// This drag won't trigger any events, as the inner element captures every drag.
var drag = new Kendo.Drag($("#foo"));
    </pre>
</div>

## Cancel Drag Event Cycle

In some conditions the drag event consumer may decide not to handle the current drag.
For instance, the mobile ScrollView skips handling of vertical drag gestures.
In this case, the drag `cancel` method can be used. Once this method is called, the drag instance raises `cancel` event.
*No subsequent* `move` and `end` events are raised for that drag gesture.

<div class="code-sample">
    <h4 class="code-title">Cancel drag event lifecycle</h4>
    <pre class="code">
var drag = new Kendo.Drag($("#foo"), {
    start: function(e) {
        e.cancel();
    }
});
    </pre>
</div>
