---
title: Touch
---

# Touch

The kendo Touch widget provides a cross-platform compatible API for handling user-initiated touch events, multi-touch gestures and event sequences (drag, swipe, etc.).
On pointer enabled devices (i.e. desktops and laptops), mouse events are treated as touch events.

## Getting Started

The mobile Application will automatically initialize a Touch widget for every element with a `role` data attribute set to `touch` present in the views/layouts' markup.
Alternatively, it can be initialized using jQuery plugin syntax in the containing mobile View **init event handler**.

### Handle element touch events

    <div data-role="view">
        <div data-role="touch" data-tap="onTap">
            Tap me
        </div>
    </div>

    <script>
        function onTap(e) {
            console.log(e.touch.target + " was tapped");
        }
    </script>

### Initialize touch widget

    <div data-role="view" data-init="initTouch">
        <div id="touch-surface">
            Tap me
        </div>
    </div>

    <script>
        function initTouch(e) {
            $("#touch-surface").kendoTouch({
                tap: function(e) {
                    console.log(e.touch.target + " was tapped");
                }
            });
        }
    </script>

## Touch Event Info

Each touch event handler receives an event object as a parameter. The touch event has a `touch` property,
which contains information about the touch event like its current coordinates, initial position,
the DOM element, etc.

For a full list of the properties of the Touch object, see the [Touch Object API reference](/api/mobile/touch/#TouchObject).

The multitouch gestures event object parameter has a `touches` property, which is an array of two touch objects.
In addition to that, a `distance` and `center` properties are exposed.

### Access Touch Event information

    <div data-role="view">
        <div data-role="touch" data-tap="onTap">
            Tap me
        </div>
    </div>

    <script>
        function onTap(e) {
            console.log("X coordinate": e.touch.x.location);
            console.log("Y coordinate": e.touch.y.location);
        }
    </script>

## Dragging Outside the Element Boundaries

If the Touch widget is instantiated with a small DOM element, the mouse/finger may leave the element boundaries while dragging.
In this case, by default, the `dragend` event will be fired.
The widget `global` configuration option would cause the touch widget to track the events for the entire document surface until the finger is lifted.

## Touch Events / Sequences

The Touch Widget exposes four touch events - `touchstart`, `dragstart`, `drag`, and `dragend`, corresponding to the four stages of the touch sequence.
For a detailed event description and sample code, please see the [touch widget API reference](/api/mobile/touch).

## Tap, Doubletap, and Hold Events

In addition to the drag events, `tap`, `doubletap` and `hold` events may be fired if the user does not move his/hers finger after pressing.
The `hold` event minimum time and the `doubletap` maximum time between two successive taps can be set through the [touch widget configuration options](/api/mobile/touch#configuration).

## Swipe Events

If the `enableSwipe` configuration option is set to **true**, the Touch widget recognizes horizontal swipes and fires the `swipe` event.
The swipe minimum distance, maximum horizontal deviation, and maximum duration can be set through the [configuration options](/api/mobile/touch#configuration).

**Notice**: if the `enableSwipe` option is set to true, the `dragstart`, `drag` and `dragend` events **will not be fired**.

## Multi-touch Gestures

If the `multiTouch` configuration option is set to **true**, the Touch widget will recognize two-finger gestures,
and fire `gesturestart`, `gesturechange` and `gestureend` events.

For a detailed description for each event, please see the [API Reference](/api/mobile/touch).

> Multi-touch gestures work only on platforms that support multitouch (iOS 4+, Android 4+). What's more, currently, only two finger gestures are supported,
as the majority of the currently available mobile platforms usually have system-wide actions attached to three finger gestures.
