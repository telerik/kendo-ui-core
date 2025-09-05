---
title: Touch
res_type: api
component: touch
---

# kendo.ui.Touch

The kendo Touch widget exposes a cross-platform compatible API for handling user-initiated touch events, multi-touch gestures and event sequences (drag, swipe, etc.). Inherits from [Widget](/api/javascript/ui/widget).

> Unlike most mobile widgets, the Touch widget does not need an active mobile application instance.

## Configuration

### filter `String`

jQuery selector that specifies child elements that are touchable if a widget is attached to a container.

#### Example

    <ul id="list">
        <li class="touch">Foo</li>
        <li>Not selected</li>
        <li class="touch">Foo</li>
        <li>Not selected</li>
    </ul>

    <script>
    $("#list").kendoTouch({
        filter: ".touch",
        drag: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("you dragged a list item");
        }
    });
    </script>

### surface `jQuery` *(default: null)*

If specified, the user drags will be tracked within the surface boundaries.
This option is useful if the widget is instantiated on small DOM elements like buttons, or thin list items.

#### Example

    <ul id="list">
        <li>Foo</li>
        <li>Foo</li>
        <li>Foo</li>
        <li>Foo</li>
    </ul>

    <script>
    $("#list li").kendoTouch({
        surface: $("#list"),
        drag: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("you dragged a list item");
        }
    });
    </script>

### multiTouch `Boolean` *(default:  false)*

If set to true, the widget will capture and trigger the `gesturestart`, `gesturechange`, and `gestureend` events when the user touches the element with two fingers.

#### Example
    <div id="touch">
        Touch me with two fingers
    </div>

    <script>
    $("#touch").kendoTouch({
        multiTouch: true,
        gesturestart: function (e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("User touched the element with two fingers");
        }
    });
    </script>

### enableSwipe `Boolean` *(default:  false)*

If set to true, the Touch widget will recognize horizontal swipes and trigger the `swipe` event.

**Notice**: if the `enableSwipe` option is set to true, the `dragstart`, `drag` and `dragend` events will not be triggered.

#### Example

    <div id="touch">
        Swipe me
    </div>

    <script>
    $("#touch").kendoTouch({
        enableSwipe: true,
        swipe: function (e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("User swiped the element");
        }
    });
    </script>

### minXDelta `Number` *(default:  30)*

The minimum horizontal distance in pixels the user should swipe before the `swipe` event is triggered.

#### Example

    <div id="touch">
        Swipe me
    </div>

    <script>
    $("#touch").kendoTouch({
        enableSwipe: true,
        minXDelta: 50,
        swipe: function (e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("Long swipe");
        }
    });
    </script>

### maxYDelta `Number` *(default:  20)*

The maximum vertical deviation in pixels of the swipe event. Swipes with higher deviation are discarded.

#### Example

    <div id="touch">
        Swipe me
    </div>

    <script>
    $("#touch").kendoTouch({
        enableSwipe: true,
        maxYDelta: 50,
        swipe: function (e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("Loose shaky swipe");
        }
    });
    </script>

### maxDuration `Number` *(default:  1000)*

The maximum amount of time in milliseconds the swipe event can last. Slower swipes are discarded.

#### Example

    <div id="touch">
        Swipe me
    </div>

    <script>
    $("#touch").kendoTouch({
        enableSwipe: true,
        maxDuration: 500,
        swipe: function (e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("fast swipe");
        }
    });
    </script>

### minHold `Number` *(default:  800)*

The timeout in milliseconds before the `hold` event is fired.

**Notice**: the hold event will be triggered after the time passes, not after the user lifts his/hers finger.

#### Example

    <div id="touch">
        Press and hold here
    </div>

    <script>
    $("#touch").kendoTouch({
        minHold: 2000,
        hold: function (e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("holding for a while.");
        }
    });
    </script>

### doubleTapTimeout `Number` *(default: 400)*

The maximum period (in milliseconds) between two consecutive taps which will trigger the `doubletap` event.

#### Example

    <div id="touch">
        Double tap here
    </div>

    <script>
    $("#touch").kendoTouch({
        doubleTapTimeout: 2000,
        doubletap: function (e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("two taps");
        }
    });
    </script>

## Methods

### cancel

Cancels the current touch event sequence. Calling `cancel` in a `touchstart` or `dragmove` will disable subsequent move or tap/end/hold event handlers from being called.

#### Example

    <div id="touch">Touch here</div>

    <script>
        $("#touch").kendoTouch({
            touchstart: function(e) {
                e.sender.cancel(); // e.sender is a reference to the touch widget.
            },
            hold: function(e) {
                // this event handler will not be executed
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(e);
            }
        });
    </script>


### destroy

Prepares the **Touch** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the Touch element from DOM.

#### Example

    <div id="touch">Touch me</div>
    <script>
    var touch = $("#touch").kendoTouch({
        tap: function(e) {
            console.log("Touch tapped");
        }
    });
    
    // Get the Touch widget instance
    var touchWidget = touch.data("kendoTouch");
    
    // Destroy the Touch widget
    touchWidget.destroy();
    </script>

## Events

### touchstart

Fires when the user presses the element.

#### Example

    <div id="touch">Touch here</div>

    <script>
	/* The result can be observed in the DevTools(F12) console of the browser. */
    $("#touch").kendoTouch({ touchstart: function (e) { console.log(e); } });
    </script>

#### Event Data

##### e.touch `TouchEvent`

The touch event instance

##### e.event `jQueryEvent`

The jQuery event which triggered the touch event.

### dragstart

Fires when the user starts dragging the element.

#### Example

    <div id="touch">Touch here</div>

    <script>
	/* The result can be observed in the DevTools(F12) console of the browser. */
    $("#touch").kendoTouch({ dragstart: function (e) { console.log(e); } });
    </script>


#### Event Data

##### e.touch `TouchEvent`

The touch event instance

##### e.event `jQueryEvent`

The jQuery event which triggered the touch event.

### drag

Fires each time the user drags (within the element boundaries).

#### Example

    <div id="touch">Touch here</div>

    <script>
	/* The result can be observed in the DevTools(F12) console of the browser. */
    $("#touch").kendoTouch({ drag: function (e) { console.log(e); } });
    </script>

#### Event Data

##### e.touch `TouchEvent`

The touch event instance

##### e.event `jQueryEvent`

The jQuery event which triggered the touch event.

### dragend

Fires when the user lifts his/hers finger, or drags outside of the element boundaries.

#### Example

    <div id="touch">Touch here</div>

    <script>
	/* The result can be observed in the DevTools(F12) console of the browser. */
    $("#touch").kendoTouch({ dragend: function (e) { console.log(e); } });
    </script>

#### Event Data

##### e.touch `TouchEvent`

The touch event instance

##### e.event `jQueryEvent`

The jQuery event which triggered the touch event.

### tap

Fires when the user taps on the element. A touch sequence is considered a tap if the user does not perform dragging.

#### Example

    <div id="touch">Touch here</div>

    <script>
	/* The result can be observed in the DevTools(F12) console of the browser. */
    $("#touch").kendoTouch({ tap: function (e) { console.log(e); } });
    </script>

#### Event Data

##### e.touch `TouchEvent`

The touch event instance

##### e.event `jQueryEvent`

The jQuery event which triggered the touch event.

### doubletap

Fires when the user quickly taps twice on the element.

> The two taps should be at a maximum distance of 3 pixels.

#### Example

    <div id="touch">Touch here</div>

    <script>
	/* The result can be observed in the DevTools(F12) console of the browser. */
    $("#touch").kendoTouch({ doubletap: function (e) { console.log(e); } });
    </script>

#### Event Data

##### e.touch `TouchEvent`

The touch event instance

##### e.event `jQueryEvent`

The jQuery event which triggered the touch event.

### hold

Fires when the user presses and holds  his/hers finger on the element for a minimum amount of time.

The minimum amount can be configured through the `minHold` configuration option.

#### Example

    <div id="touch">Touch here</div>

    <script>
	/* The result can be observed in the DevTools(F12) console of the browser. */
    $("#touch").kendoTouch({ hold: function (e) { console.log(e); } });
    </script>

#### Event Data

##### e.touch `TouchEvent`

The touch event instance

##### e.event `jQueryEvent`

The jQuery event which triggered the touch event.

### swipe

Fires when the user performs a horizontal swipe on the element.

For this event to be triggered, the `enableSwipe` configuration option should be set to `true`.

> The `minXDelta`, `maxYDelta` and `maxDuration` configuration options determine when the drag event sequence is considered a swipe.

#### Example

    <div id="touch">Touch here</div>

    <script>
	/* The result can be observed in the DevTools(F12) console of the browser. */
    $("#touch").kendoTouch({ enableSwipe: true, swipe: function (e) { console.log(e); } });
    </script>

#### Event Data

##### e.touch `TouchEvent`

The touch event instance

##### e.event `jQueryEvent`

The jQuery event which triggered the touch event.

##### e.direction `String`

The swipe event direction. Can be either `left` or `right`.

### gesturestart

Fires when the user presses the element with two fingers (or presses with a second finger while a first finger is still touching the element).

#### Example

    <div id="touch">
        Touch me with two fingers
    </div>

    <script>
    $("#touch").kendoTouch({
        multiTouch: true,
        gesturestart: function (e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("User touched the element with two fingers");
        }
    });
    </script>

#### Event Data

##### e.touches `Array`

An array containing the active touches.

##### e.event `jQueryEvent`

The jQuery event which triggered the touch event.

##### e.distance `Number`

The distance (in pixels) between the two touches.

##### e.center `Point`

The center point between the two touches. The point has two properties, `x` and `y`, which contain the x and the y coordinate, respectively.

### gesturechange

Fires when the user moves a finger while multiple fingers are touching the element.

#### Example

    <div id="touch">
        Touch me with two fingers
    </div>

    <script>
    $("#touch").kendoTouch({
        multiTouch: true,
        gesturechange: function (e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e);
        }
    });
    </script>

#### Event Data

##### e.touches `Array`

An array containing the active touches.

##### e.event `jQueryEvent`

The jQuery event which triggered the touch event.

##### e.distance `Number`

The distance (in pixels) between the two touches

##### e.center `Point`

The center point between the two touches. The point has two properties, `x` and `y`, which contain the x and the y coordinate, respectively.

### gestureend

Fires when the user lifts the second finger from the element.
**Notice**: After the last finger is moved, the `dragend` event is fired.

#### Example

    <div id="touch">
        Touch me with two fingers
    </div>

    <script>
    $("#touch").kendoTouch({
        multiTouch: true,
        gestureend: function (e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e);
        }
    });
    </script>

#### Event Data

##### e.touches `Array`

An array containing the active touches

##### e.event `jQueryEvent`

The jQuery event which triggered the touch event.

##### e.distance `Number`

The distance (in pixels) between the two touches

##### e.center `Point`

The center point between the two touches. The point has two properties, `x` and `y`, which contain the x and the y coordinate, respectively.
