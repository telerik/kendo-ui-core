---
title: Touch Events
page_title: Touch Events | Kendo UI Hybrid Components
description: "Handle user-initiated touch events in the Hybrid UI framework of Kendo UI."
previous_url: /controls/hybrid/touch
slug: touchevents_hybridkendoui
position: 4
---

# Touch Events

The Kendo UI Touch component provides a cross-platform compatible API for handling user-initiated touch events, multi-touch gestures and event sequences such as drag, swipe, and others. On pointer-enabled devices, i.e. desktops and laptops, `mouse` events are treated as `touch` events.

## Getting Started

The Kendo UI Hybrid Application widget automatically initializes a Touch component for every element with a `role` data attribute set to `touch` present in the `views/layouts` markup. Alternatively, it can be initialized using jQuery plugin syntax in the containing mobile View `init` event handler.

### Handle Element Touch Events

###### Example

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

### Initialize the Touch Component

###### Example

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

Each `touch` event handler receives an event object as a parameter. The `touch` event has a `touch` property, which contains information about the touch event like its current coordinates, initial position, the DOM element, etc.

For a full list of the properties of the `touch` object, see the [`touchObject` API reference](/api/javascript/mobile/ui/touch).

The multi-touch gestures event object parameter has a `touches` property, which is an array of two `touch` objects. In addition, a `distance` and `center` properties are exposed.

### Access Touch Event Information

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

## Features and Scenarios

### Element Is Dragged Outside Its Boundaries

If the touch feature is instantiated with a small DOM element, the mouse/finger may leave the element boundaries while dragging. In this case, by default, the `dragend` event will be fired. The widget `global` configuration option would cause the touch functionality to track the events for the entire document surface until the finger is lifted.

### Sequences of Touch Events

The touch feature exposes four touch events&mdash;`touchstart`, `dragstart`, `drag`, and `dragend`, corresponding to the four stages of the touch sequence.

For a detailed event description and sample code, see the [`touch` component API reference](/api/javascript/mobile/ui/touch).

### Touch Events: tap, doubletap, hold

In addition to the `drag` events, the `tap`, `doubletap`, and `hold` events may be fired if users do not move their finger after pressing. The `hold` event minimum time and the `doubletap` maximum time between two successive taps can be set through the [`touch` configuration options](/api/javascript/mobile/ui/touch#configuration).

### Touch Events: swipe

If the `enableSwipe` configuration option is set to `true`, the Touch component recognizes horizontal swipes and fires the `swipe` event. The `swipe` minimum distance, maximum horizontal deviation, and maximum duration can be set through the [configuration options](/api/javascript/mobile/ui/touch#configuration).

> **Important**
>
> If the `enableSwipe` option is set to `true`, the `dragstart`, `drag`, and `dragend` events are not fired.

### Multi-Touch Gestures

If the `multiTouch` configuration option is set to `true`, the Touch component recognizes two-finger gestures, and fires the `gesturestart`, `gesturechange`, and `gestureend` events.

For a detailed description of each event, see the [`touch` API reference section](/api/javascript/mobile/ui/touch).

> **Important**
>
> Multi-touch gestures work only on platforms that support `multitouch` (iOS 4+, Android 4+). Currently, only two finger gestures are supported, as the majority of the available mobile platforms usually have system-wide actions attached to three-finger gestures.

## See Also

Other articles related to the appearance and styling of Kendo UI hybrid distribution:

* [Style the Hybrid UI Form Elements]({% slug forms_hybridkendoui %})
* [Apply CSS]({% slug styling_hybridkendoui %})
* [Define the Layout]({% slug layout_hybridkendoui %})
* [Hybrid UI Font Icons]({% slug hybridiconfonts_hybridkendoui %})
