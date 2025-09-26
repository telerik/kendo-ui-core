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


<div class="meta-api-description">
Control which child elements respond to touch or gesture events within a container by setting a selector that filters descendants based on tags, classes, or attributes, allowing you to enable, restrict, or target specific interactive elements like links, buttons, or draggable items for touch handling, gesture recognition, or event delegation inside complex nested structures, ensuring only intended components react to user input by configuring or specifying a query selector pattern that matches desired touchable children during component initialization.
</div>

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


<div class="meta-api-description">
Control and limit drag gesture recognition to a specific DOM element’s boundaries, enabling precise detection of touch movements only within designated areas such as buttons or narrow list items. Configure the drag tracking region to confine touch interactions, preventing unintended drags outside a targeted surface, which is essential for managing fine-grained touch input on small or constrained UI elements. Set, restrict, or enable drag event detection based on a particular element’s dimensions to improve touch responsiveness and interaction accuracy in complex layouts or compact interfaces.
</div>

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


<div class="meta-api-description">
Activate or configure multi-finger gesture support, specifically recognizing simultaneous two-finger touch inputs like pinch, rotate, or zoom gestures on touch-sensitive components, enabling detection and handling of gesture start, update, and end events. Control and enable multitouch capabilities to capture complex interactions such as dual-finger touch, multi-touch event tracking, gesture recognition during user interaction, and interaction with gestures involving more than one finger on touch devices. Set or adjust the behavior to respond to multi-touch inputs for enhanced user interface responsiveness and advanced touch event handling within touch-enabled applications.
</div>

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


<div class="meta-api-description">
Configure horizontal swipe gesture recognition on touch interfaces by enabling detection of fast left and right finger swipes, supporting swipe event handling for navigation, item dismissal, or custom responses to horizontal finger movements. Activate or disable horizontal swipe control, manage gesture inputs, distinguish quick left/right swiping actions, and handle or intercept swipe events while noting that enabling horizontal swipe can disable dragging events like dragstart, drag, and dragend. This setting helps control finger gesture behavior, swipe detection sensitivity, and touch interaction flow in user interfaces requiring horizontal swipe recognition and corresponding event responses.
</div>

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


<div class="meta-api-description">
Adjust the minimum horizontal swipe distance required to trigger swipe detection by setting a pixel threshold that defines how far a user’s finger must move on the X-axis before a swipe event fires. This controls gesture sensitivity for horizontal touch input, helping to filter out accidental swipes, fine-tune swipe responsiveness, customize drag distance for navigation gestures, and manage horizontal touch movement thresholds in mobile or touch-enabled interfaces.
</div>

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


<div class="meta-api-description">
Control or configure the maximum allowed vertical movement during horizontal swipe detection by setting the upper limit on vertical displacement to filter out unintended diagonal or vertical gestures; this threshold defines how much vertical drift or deviation in pixels is permissible for a swipe gesture to be recognized as horizontal, ensuring accurate swipe direction recognition, preventing misfires or false positives from gestures with excessive vertical motion, and enabling precise gesture handling by restricting the vertical component within a specific maximum delta.
</div>

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


<div class="meta-api-description">
Adjust or configure the maximum allowed time for swipe gestures to be recognized on touch inputs, setting an upper limit in milliseconds to distinguish quick swipes from slow or prolonged gestures, controlling gesture timing thresholds for detecting valid swipe actions, enabling rejection or filtering out of slow finger movements and long presses when interpreting touch swipes, defining the duration boundary to enforce responsiveness and precision in swipe detection across touch interfaces, managing swipe event sensitivity by limiting how long a swipe can last before it is ignored or discarded.
</div>

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


<div class="meta-api-description">
Adjust the duration or delay in milliseconds required to recognize a press-and-hold gesture on a touch interface, enabling control over how long a user must continuously press before a hold or long-press event triggers immediately upon timeout without waiting for release. Configure, set, or customize the minimum hold time to fine-tune touch input responsiveness for long presses, tap-and-hold interactions, press duration thresholds, or touch-and-hold gestures in mobile or touch-enabled applications. Optimize hold detection timing, control gesture recognition delay, or specify the interval before firing long-press or hold events to improve user experience and input accuracy.
</div>

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


<div class="meta-api-description">
Adjust the maximum time interval in milliseconds between two quick consecutive touch taps to recognize a double tap gesture on touch-enabled components, enabling configuration of how sensitive or lenient the system is to rapid tap sequences for triggering double tap events. Set or fine-tune the allowable delay between first and second taps to control double tap detection responsiveness, ensuring that double tap recognition only occurs if a user taps twice within the configured time frame, and disable or modify this delay to customize gesture handling and touch input responsiveness.
</div>

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


<div class="meta-api-description">
Abort or cancel active touch interactions and stop all subsequent touch event handlers like move, tap, end, or hold from executing; this method controls the termination of ongoing gestures, interrupts current touch sequences during events such as touchstart or dragmove, disables further gesture recognition, and prevents any additional touch processing or event propagation related to a finger or pointer interaction on touch-sensitive components.
</div>

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


<div class="meta-api-description">
Remove all event listeners and associated data from a touch interaction instance to prevent memory leaks when uninstalling or cleaning up components; handle detaching touch event handlers, releasing resources, clearing jQuery data attributes, and triggering cleanup routines on nested or child interactive elements to ensure thorough component teardown before page or DOM removal without physically deleting the underlying HTML element.
</div>

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


<div class="meta-api-description">
Detect when a user begins pressing or touching an element by capturing the initial touch event with full access to coordinates, target details, and modifier keys, enabling developers to configure responses such as gesture initiation, drag and drop start, selection activation, or interception of default browser behavior through event control like preventDefault and stopPropagation for early interaction handling, touch detection, tap start recognition, and touch input management on interactive components.
</div>

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


<div class="meta-api-description">
Detect initiating a drag gesture on touch-enabled interfaces, capturing when a user begins to move or slide their finger to start dragging an element on a touchscreen. Enable handling the start of drag operations on mobile or touch devices, configuring custom behaviors triggered right at drag initiation, such as setting drag state, updating UI elements dynamically, or integrating with drag-and-drop workflows. Support detecting drag gestures automatically as fingers move, allowing interception of the initial drag action to control interactive touch-based drag logic and trigger custom event handlers during the moment a drag starts on touch targets.
</div>

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


<div class="meta-api-description">
Detect continuous touch or pointer dragging actions within an element by capturing real-time movement updates and incremental position changes during user drag gestures on touch devices or pointer input. Track finger or cursor dragging inside element boundaries to enable responsive drag-and-drop functionality, handle multitouch drags, respond to gesture movement, process drag events continuously for UI updates, set custom drag handlers, and control dynamic element repositioning based on ongoing touch or pointer movement. This supports use cases such as swipe detection, drag tracking, gesture control, and interactive touch interfaces requiring live monitoring of drag motions.
</div>

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


<div class="meta-api-description">
Detect when a touch drag operation completes, including when the user lifts their finger or moves the drag outside element boundaries, to enable stopping animations, finalizing element positions, cancelling drag actions, updating component state, running cleanup tasks, handling touchend events, managing drag completion workflows, and triggering any post-drag logic needed for smooth interactive touch experiences.
</div>

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


<div class="meta-api-description">
Detect and respond to quick, intentional touch interactions without dragging by capturing tap events on interface elements, enabling functionality such as button activation, item selection, single taps for gestures, or short touch presses that differentiate from swipes or drags, allowing developers to configure or listen for instantaneous touch inputs that trigger actions only when users tap without moving their finger.
</div>

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


<div class="meta-api-description">
Detect, capture, or respond to rapid two-tap gestures on a touch interface, enabling recognition of quick double-taps within a small distance threshold to trigger specific behaviors or actions; configure event listeners or handlers to identify when users tap twice rapidly on an element, useful for implementing custom double-tap interactions, shortcuts, or gesture-based controls that depend on timing and proximity of taps, supporting ideas like toggling features, zooming, or activating functions with a swift pair of touches on touchscreen devices.
</div>

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


<div class="meta-api-description">
detect long press or hold gestures on touch elements, trigger actions when finger remains on screen for a specified duration, configure minimum press time threshold, respond to press-and-hold events with custom handlers like opening context menus, canceling default actions, enabling hold-sensitive interactions, recognize sustained touch input, set hold interval to control gesture recognition sensitivity, handle long touch inputs for enhanced UI control and interactive behavior on touch devices or components
</div>

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


<div class="meta-api-description">
Detect and respond to horizontal swipe gestures on touch-enabled elements by configuring gesture recognition, enabling swipe detection, and setting thresholds such as minimum horizontal movement, maximum vertical deviation, and maximum gesture duration to distinguish swipes from other touch interactions; use this to build navigational controls, dismiss interfaces with slide actions, trigger custom event handlers, or implement user input handling based on left or right finger swipes across touch surfaces.
</div>

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


<div class="meta-api-description">
Recognize when a user initiates a multi-touch gesture by detecting the start of a two-finger press or second finger touch on an element to enable pinch, rotate, zoom, or complex gesture handling; capture this event to begin tracking gesture interactions, manage multi-touch input, configure gesture recognition, or intercept touch behavior before it completes, supporting scenarios like custom gesture-based controls, preventing default touch actions, and initiating responsive touch-based UI features.
</div>

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


<div class="meta-api-description">
Capture and handle multi-finger touch movements such as pinching, rotating, or scaling gestures on touch-enabled elements by detecting changes while multiple fingers remain in contact. Track continuous gesture updates to respond dynamically to user interactions, adjust transformations like zoom or rotation in real time, manage gesture deltas, enable custom pinch-zoom or rotate controls, and override default touch behaviors during multi-touch manipulation. Monitor movement changes during complex touch inputs to implement responsive touch gesture handling, control UI scaling and rotation smoothly, and react to simultaneous finger movements on touch surfaces.
</div>

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


<div class="meta-api-description">
Detect when a multi-touch gesture finishes on a touch-enabled element by capturing the event triggered when the user lifts the second finger during gestures like pinch, zoom, or rotate, enabling responses to the conclusion of two-finger interactions; useful for implementing gesture completion handlers, gesture recognition end detection, or coordinating with drag-end events that follow after all fingers are lifted.
</div>

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
