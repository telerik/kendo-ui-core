---
title: Draggable
page_title: Draggable UI Widget | Kendo UI API Documentation
description: Configuration steps and types of events which are triggered in Kendo UI Draggable.
previous_url: /api/framework/draggable
res_type: api
component: drag-and-drop
---

# kendo.ui.Draggable

Represents the Kendo UI Draggable widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### axis `String`*(default: null)*

 Constrains the hint movement to either the horizontal (x) or vertical (y) axis. Can be set to either "x" or "y".


<div class="meta-api-description">
How do I restrict Kendo UI Draggable movement to only one axis? Control and restrict draggable element movement to a single dimension by configuring horizontal or vertical locking, limiting drag actions along the x-axis or y-axis, enabling directional constraints for drag interactions, setting movement boundaries to either left-right or up-down directions, enforcing axis-specific dragging behavior to prevent diagonal shifts, specifying single-axis drag control to guide UI element repositioning, enabling constrained drag motions for improved precision and user interface consistency, and adjusting drag functionality to only respond to horizontal or vertical pointer movements.
</div>

#### Example - initialize horizontally draggable element

    <div id="draggable"></div>

    <script>
      $("#draggable").kendoDraggable({
        hint: function(element) {
          return element.clone();
        },
        axis: "x"
      });
    </script>
    <style>
      #draggable {
        width: 50px;
        height: 50px;
        background-color: orange;
        border: 2px solid green;
      }
    </style>

### autoScroll `Boolean`*(default: false)*

If set to `true` the widget will auto-scroll the container when the mouse/finger is close to the top/bottom of it.


<div class="meta-api-description">
How to enable auto-scrolling of a scrollable container during drag-and-drop operations in Kendo UI for jQuery? Control automatic scrolling of a scrollable container while dragging items when the pointer or touch moves close to the container’s edges, enabling smooth auto-scroll-up or scroll-down actions during drag-and-drop operations. Configure seamless container scrolling that activates when dragging near top or bottom boundaries, allowing scroll acceleration on cursor or finger approach, facilitating continuous drag movement beyond visible content limits. Enable or disable dynamic container scrolling during drag gestures so the viewport automatically moves up or down as you drag items toward container edges, improving drag interactions within long or overflowed content areas. Adjust scroll behavior to detect pointer proximity to container edges, triggering scrolling during drag-and-drop, useful for lists, grids, or nested scroll views requiring automatic viewport adjustment driven by pointer or touch position.
</div>

#### Example - use autoScroll in a scrollable container

    <div style="width: 200px; height: 200px; overflow: auto">
        <div style="width: 1000px; height: 1000px;">
            <div id="draggable"></div>
        </div>
    </div>

    <script>
      $("#draggable").kendoDraggable({ hint: function(element) { return element.clone(); }, autoScroll: true });
    </script>

    <style>
      #draggable {
        width: 50px;
        height: 50px;
        background-color: orange;
        border: 2px solid green;
      }
    </style>

### clickMoveClick `Boolean` *(default: false)*

Determines whether the click move click interaction would be enabled as an alternative of the drag and drop move. By default the alternative is disabled.


<div class="meta-api-description">
How to enable click-to-move interaction pattern in Kendo UI drag-and-drop instead of traditional drag-and-drop behavior? Control whether items can be repositioned by selecting with one click and confirming the new location with a second click instead of dragging, enabling a click-to-move interaction pattern that replaces traditional drag-and-drop behavior. Configure this setting to enable moving elements through two-step click actions for accessibility, touch interfaces, or alternative input methods where drag motions may be harder to perform or undesired. This option supports workflows that require precise placement by clicking once to pick up and again to drop items, allowing toggling between drag-based and click-based item manipulation. Use cases include enabling click movement for components when drag gestures are not preferred, improving usability for keyboard, touch, or mouse users who benefit from discrete move confirmations.
</div>

#### Example

    <div id="draggable"></div>

    <script>
      $("#draggable").kendoDraggable({
        clickMoveClick: true
      });
    </script>
    <style>
      #draggable {
        width: 50px;
        height: 50px;
        background-color: orange;
        border: 2px solid green;
      }
    </style>

### container `String | jQuery`*(default: null)*

If set, the hint movement is constrained to the container boundaries.


<div class="meta-api-description">
How can I restrict a Kendo UI draggable element to move within a specific container? Control and restrict the draggable element's movement within a specific container or boundary area, enabling configuration to confine drag actions to a parent element or defined region, setting limits so the drag indicator or hint cannot move beyond container edges, constraining draggable interactions to designated zones, restricting drag movement inside defined containers or bounding boxes, managing where draggable feedback appears by bounding it within a chosen element, and ensuring drag operations stay inside set limits to avoid overflow or unintended placement.
</div>

#### Example

    <div id="container">
      <div id="draggable"></div>
    </div>

    <script>
      $("#draggable").kendoDraggable({
        hint: function(element) {
          return element.clone();
        },
        container: $("#container")
      });
    </script>
    <style>
      #container {
        width: 200px;
        height: 200px;
        border: 1px dashed red;
      }
      #draggable {
        width: 50px;
        height: 50px;
        background-color: orange;
        border: 2px solid green;
      }
    </style>

### cursorOffset `Object`*(default: null)*

 If set, specifies the offset of the hint relative to the mouse cursor/finger.
By default, the hint is initially positioned on top of the draggable source offset. The option accepts an object with two keys: `top` and `left`.


<div class="meta-api-description">
How to adjust the position of a draggable element's preview in Kendo UI? Adjust or configure the offset position of a draggable element’s preview or hint relative to the pointer location by specifying horizontal and vertical displacement values, enabling control over how far the drag indicator is shifted from the mouse cursor or touch point during drag-and-drop interactions; this setting helps customize the placement of the drag preview by setting top and left offsets, allowing developers to fine-tune or move the draggable feedback away from the default position directly on the draggable source, useful when precise alignment or visibility of the drag hint relative to the user’s pointer is required in drag-and-drop interfaces.
</div>

#### Example

    <div id="draggable"></div>

    <script>
      $("#draggable").kendoDraggable({
        hint: function(element) {
          return element.clone();
        },
        cursorOffset: { top: 30, left: 100 }
      });
    </script>
    <style>
      #draggable {
        width: 50px;
        height: 50px;
        background-color: orange;
        border: 2px solid green;
      }
    </style>

### distance `Number`*(default: 5)*

 The required distance that the mouse should travel in order to initiate a drag.


<div class="meta-api-description">
How do I prevent accidental drags in Kendo UI drag-and-drop interactions? Configure the minimum pixel movement or drag threshold needed to initiate dragging actions, specifying how far the mouse or pointer must move before a drag event starts to prevent unintentional or accidental drags, control sensitivity for drag-and-drop interactions, adjust the required cursor displacement to enable dragging, tune the pixel distance for user gesture recognition, set the movement tolerance to distinguish clicks from drags, define the activation distance for drag initiation, and manage drag sensitivity on mouse or touch inputs to improve user experience and precise drag control.
</div>

#### Example

    <div id="draggable"></div>

    <script>
      $("#draggable").kendoDraggable({
        hint: function(element) {
          return element.clone();
        },
        distance: 50
      });
    </script>
    <style>
      #draggable {
        width: 50px;
        height: 50px;
        background-color: orange;
        border: 2px solid green;
      }
    </style>

### filter `Selector`

Selects child elements that are draggable if a widget is attached to a container.


<div class="meta-api-description">
How can I specify which elements inside a draggable container can be moved using CSS selectors? Control which child elements inside a draggable container can be moved by specifying CSS selectors to filter and enable dragging only on those matching descendants, allowing selective drag activation, restricting drag targets, configuring draggable items within a parent container, delegating drag functionality to certain elements, setting drag zones, and customizing which nested elements respond to drag gestures while ignoring others.
</div>

#### Example

    <div id="container">
      <div class="draggable"></div>
      <div class="static"></div>
      <div class="static"></div>
      <div class="static"></div>
      <div class="draggable"></div>
    </div>
    <script>
      $("#container").kendoDraggable({
        filter: ".draggable",
        hint: function(element) {
          return element.clone();
        }
      });
    </script>
    <style>
      .draggable, .static {
        width: 50px;
        height: 50px;
        border: 2px solid green;
        margin: 5px;
      }
      .draggable { background-color: orange; }
      .static{ background-color: purple; }
    </style>

### group `String`*(default: "default")*

 Used to group sets of draggable and drop targets. A draggable with the same group value as a drop target will be accepted by the drop target.


<div class="meta-api-description">
How do I enable multiple elements to be dragged together in Kendo UI for jQuery? Control and configure drag-and-drop behaviors by setting or enabling group identifiers that define which elements can be dragged and dropped together, connect or restrict drag sources and drop targets within shared or distinct groups, scope drag operations to specific sections or containers, manage interactions between draggable items and valid drop zones by matching group keys, and customize or set group-based drag constraints for selective element dragging and drop acceptance across different parts of the interface.
</div>

#### Example - grouping draggable elements

    <div class="orange"></div>
    <div class="orange"></div>
    <div class="purple"></div>
    <div class="purple"></div>
    <div id="orangeArea"></div>
    <div id="purpleArea"></div>

    <script>
      $(".orange").kendoDraggable({
        group: "orangeGroup",
        hint: function(element) {
          return element.clone();
        }
      });

      $(".purple").kendoDraggable({
        group: "purpleGroup",
        hint: function(element) {
          return element.clone();
        }
      });

      $("#orangeArea").kendoDropTarget({ group: "orangeGroup", drop: onDrop });
      $("#purpleArea").kendoDropTarget({ group: "purpleGroup", drop: onDrop });

      function onDrop(e) {
        e.draggable.destroy();
        e.draggable.element.remove();
      }
    </script>
    <style>
      .orange, .purple{
        width: 50px;
        height: 50px;
        border: 2px solid green;
        margin: 5px;
      }
      #orangeArea, #purpleArea {
        width: 200px;
        height: 200px;
        border: 2px solid green;
        margin: 5px;
      }
      .orange, #orangeArea { background-color: orange; }
      .purple, #purpleArea { background-color: purple; }
    </style>

### hint `Function | jQuery`

Provides a way for customization of the drag indicator. If a function is supplied, it receives one argument - the draggable element's jQuery object.


<div class="meta-api-description">
How to customize the drag indicator in Kendo UI Draggable? Control and customize the visual representation or preview displayed during drag-and-drop operations by setting custom content, templates, or dynamic logic for the drag indicator or drag preview; enable configuring the draggable element’s appearance while dragging using functions or static values to modify, generate, or reference the drag feedback element, allowing tailored user experiences such as custom drag images, dynamic previews based on the dragged item, or completely replacing the default drag cue in interactive drag-and-drop interfaces.
</div>

#### Example - customizing draggable tooltip

    <div id="draggable"></div>

    <script>
      $("#draggable").kendoDraggable({
        hint: function(element) {
          var hintElement = $("<div id='hint'></div>");
          hintElement.css({
            "background-image": "url('https://www.telerik.com/image/kendo-logo.png')",
            "width": "230px",
            "height": "80px"
          });
          return hintElement;
        }
      });
    </script>
    <style>
      #draggable {
        width: 50px;
        height: 50px;
        background-color: orange;
        border: 2px solid green;
      }
    </style>

### holdToDrag `Boolean` *(default: false)*

Suitable for touch oriented user interface, in order to avoid collision with the touch scrolling gesture.
When set to `true`, the widget will be activated after the user taps and holds the finger on the element for a short amount of time.

The *draggable* will also be activated by pressing, holding and lifting the finger without any movement. Dragging it afterwards will initiate the drag immediately.
The activated mode can be canceled by calling [`cancelHold`](/api/javascript/ui/draggable/methods/cancelhold).


<div class="meta-api-description">
How to enable delayed drag gesture in Kendo UI for jQuery Draggable widget? Enable or configure a touch-based delayed drag gesture to prevent interference with touch scrolling, allowing users to start dragging by pressing and holding briefly before moving, with options to initiate drag on hold and lift without movement, support canceling hold activation, and control how touch interactions convert into draggable actions for improved touch device usability and conflict avoidance with scrolling gestures.
</div>

#### Example - hold to drag

    <div id="draggable"></div>

    <p id="alert" style="display:none">dragToHold activated...</p>

    <script>
      $("#draggable").kendoDraggable({
        holdToDrag: true,
        hold: function(e) {
            $("#draggable").css("background", "#f00");
            $("#alert").show();
        },
        hint: function(element) {
          var hintElement = $("<div id='hint'></div>");
          hintElement.css({
            background: "#3c0",
            width: 200,
            height: 200
          });
          return hintElement;
        }
      });
    </script>

    <style>
      #draggable {
        width: 200px;
        height: 200px;
        background: #f90;
        border: 2px solid #c60;
      }
    </style>

### ignore `Selector`

Specifies child elements for which the drag will not be initialized. Useful if the draggable contains input elements.


<div class="meta-api-description">
How do I prevent buttons within a draggable container from triggering drag actions? Control and configure exceptions to drag initiation by specifying elements that should not trigger dragging, enabling you to disable drag start on nested interactive components like buttons, links, inputs, or any child elements within a draggable container, preventing accidental drag actions and ensuring certain areas remain static or clickable without interference from drag gestures.
</div>

#### Example

    <div id="container">
        <input type="text" />
        <div>Foo</div>
    </div>

    <script>
      $("#container").kendoDraggable({
        ignore: "input",
        hint: function(element) {
          return element.clone();
        }
      });
    </script>
    <style>
        #container {
            width: 50px;
            height: 50px;
            border: 2px solid green;
            margin: 5px;
        }
        #container input
        {
            width: 90%;
        }
    </style>

## Methods

### cancelHold

Has effect only when `holdToDrag` is set to `true`. Cancels the activated state of the widget, caused by pressing and holding.


<div class="meta-api-description">
How can I programmatically stop a hold-to-drag process in Kendo UI for jQuery? Abort or stop an active hold-to-drag process, cancel a drag activation triggered by pressing and holding when hold-to-drag mode is enabled, halt or interrupt a drag initiation caused by long press, prevent dragging from starting due to user touch and hold gestures, disable the current drag start triggered by sustained press, cancel ongoing hold gestures that would trigger drag, override or reset the dragging state activated by hold interaction, interrupt hold-to-drag detection to avoid unintended drags, control and manage touch-and-hold drag initiation by stopping it programmatically, stop or revert drag activation after hold detection to integrate with other UI events or custom logic.
</div>

#### Example - cancel activated draggable

    <p>Hold the draggable square to activate it...</p>

    <div id="draggable"></div>

    <p><button type="button" class="k-button" id="cancel">Cancel Draggable activated state</button></p>

    <script>
      $("#cancel").click(function() {
          $("#draggable").data("kendoDraggable").cancelHold();
          $("#draggable").removeClass("active-draggable");
      });

      $("#draggable").kendoDraggable({
        holdToDrag: true,
        hold: function(e) {
            $("#draggable").addClass("active-draggable");
        },
        hint: function(element) {
          var hintElement = $("<div id='hint'></div>");
          hintElement.css({
            background: "#f00",
            width: 200,
            height: 200
          });
          return hintElement;
        }
      });
    </script>

    <style>
      #draggable {
        width: 200px;
        height: 200px;
        background: #f90;
        border: 2px solid #c30;
      }

      #draggable.active-draggable {
        background: #f00;
      }
    </style>

## Events

### drag

Fired while dragging. The `drag` event represents a jQuery `mousemove` event and contains all the event data of the [jQuery Event Object](https://api.jquery.com/category/events/event-object/).


<div class="meta-api-description">
How can I track mouse movements during drag actions in Kendo UI? Track and respond to ongoing pointer movement during drag actions by capturing continuous drag events that provide detailed mouse or pointer coordinates and event data, enabling developers to monitor cursor positions, update element locations or interfaces in real time, synchronize application state with user interactions, intercept and modify dragging behavior, handle mousemove-like events during drag operations, implement dynamic UI updates while dragging, configure drag event handlers for seamless user input tracking, and control or cancel drags based on live pointer movement information.
</div>

#### Example - bind during the initialization

    <div id="draggable"></div>

    <script>
      $("#draggable").kendoDraggable({
        hint: function(element) {
          return element.clone();
        },
        drag: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("x: ", e.screenX, "y: ", e.screenY);
        }
      });
    </script>
    <style>
      #draggable {
        width: 50px;
        height: 50px;
        background-color: orange;
        border: 2px solid green;
      }
    </style>

#### Example - hook up to the event via bind method after initialization

    <div id="draggable"></div>

    <script>
      $("#draggable").kendoDraggable({
        hint: function(element) {
          return element.clone();
        }
      });

      $("#draggable").data("kendoDraggable").bind("drag", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("x: ", e.screenX, "y: ", e.screenY);
      });
    </script>
    <style>
      #draggable {
        width: 50px;
        height: 50px;
        background-color: orange;
        border: 2px solid green;
      }
    </style>

#### Event Data

##### e.target `Element`

The draggable element.

##### e.sender `kendo.ui.Draggable`

The Draggable instance which fired the event.

### dragcancel

Fired when item drag is canceled by pressing the Escape key.
The `dragcancel` event represents a jQuery `keyup` event and contains all the event data of the [jQuery Event Object](https://api.jquery.com/category/events/event-object/).


<div class="meta-api-description">
How to handle drag cancel events in Kendo UI for jQuery? Detect and handle when a drag operation is interrupted or aborted by keyboard input such as pressing Escape, enabling cancellation of dragging actions and rollback of UI changes. Capture drag cancel events, keyboard abort signals, and user-initiated interruption during drag-and-drop interactions, listening for keyup, cancel, or escape key triggers to manage cleanup or restore element states after drag cancellation. Monitor and respond to drag cancellations through event handlers that receive comprehensive event data, allowing control over aborted drag workflows and enabling developers to implement custom undo, revert, or abort logic on drag exit caused by escape or other keyboard inputs.
</div>

#### Example

    <div id="draggable"></div>

    <script>
      $("#draggable").kendoDraggable({
        hint: function(element) {
          return element.clone();
        },
        dragcancel: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("'Esc' key pressed! Dragging is cancelled.");
        }
      });
    </script>
    <style>
      #draggable {
        width: 50px;
        height: 50px;
        background-color: orange;
        border: 2px solid green;
      }
    </style>

#### Event Data

##### e.sender `kendo.ui.Draggable`

The Draggable instance which fired the event.

### dragend

Fired when item drag ends.
The `dragend` event represents a jQuery `mouseup` event and contains all the event data of the [jQuery Event Object](https://api.jquery.com/category/events/event-object/).


<div class="meta-api-description">
What triggers when a dragging interaction in Kendo UI's drag-and-drop widget ends? Detect when a dragging interaction finishes, trigger actions on drag completion, handle drag end events, listen for drag release or drop moments, respond to mouseup during dragging, access event data at drag conclusion, perform cleanup after drag operations, update UI or state when dragging stops, examine mouse position and target element after drag, manage draggable item release actions with full event details.
</div>

#### Example - show draggable element on dragend

    <div id="draggable"></div>

    <script>
      $("#draggable").kendoDraggable({
        hint: function(element) {
          return element.clone();
        },
        dragstart: function(e) {
          e.currentTarget.hide();
        },
        dragend: function(e) {
          e.currentTarget.show();
        }
      });
    </script>
    <style>
      #draggable {
        width: 50px;
        height: 50px;
        background-color: orange;
        border: 2px solid green;
      }
    </style>

#### Event Data

##### e.sender `kendo.ui.Draggable`

The Draggable instance which fired the event.

##### e.target `Element`

The draggable element.

### dragstart

Fired when item drag starts.
The `dragstart` event represents a jQuery `mousedown` event and contains all the event data of the [jQuery Event Object](https://api.jquery.com/category/events/event-object/).


<div class="meta-api-description">
How do I prevent a drag operation from starting with Kendo UI Draggable? Detect when a user begins dragging an item by capturing the initial drag event that signals the start of a drag-and-drop operation, enabling setup of drag state, triggering custom logic, or preventing the drag before it proceeds. This event corresponds to the moment a mouse button is pressed down on a draggable element, providing access to all underlying event details such as pointer coordinates, event propagation control, and interaction data commonly found in mouse or pointer down events. It supports use cases like initializing drag metadata, enabling drag-and-drop workflows, intercepting drag initiation for validation, and linking drag start behavior with custom UI responses or canceling the drag interactively.
</div>

#### Example - hide draggable element on dragend

    <div id="draggable"></div>

    <script>
      $("#draggable").kendoDraggable({
        hint: function(element) {
          return element.clone();
        },
        dragstart: function(e) {
          e.currentTarget.hide();
        },
        dragend: function(e) {
          e.currentTarget.show();
        }
      });
    </script>
    <style>
      #draggable {
        width: 50px;
        height: 50px;
        background-color: orange;
        border: 2px solid green;
      }
    </style>

#### Event Data

##### e.sender `kendo.ui.Draggable`

The Draggable instance which fired the event.

##### e.target `Element`

The draggable element.

### hold

Fired before the `dragStart` event.
The `hold` event represents a jQuery `mousedown` event and contains all the event data of the [jQuery Event Object](https://api.jquery.com/category/events/event-object/).

> **Important**
>
> As of the Kendo UI R3 2019 SP1 release, setting the holdToDrag option to `false` does not cancel the [hold event](https://docs.telerik.com/kendo-ui/api/javascript/ui/draggable/events/hold).


<div class="meta-api-description">
How to intercept drag initiation in Kendo UI for jQuery? Intercept and handle the initial pointer press or mouse down interaction before a drag operation starts, capturing event details like cursor position, target element, modifier keys, and native event data to enable custom pre-drag logic, visual feedback, timers, or conditional cancellation of drag initiation; control, listen for, or respond to the early press event that triggers before drag start, useful for customizing user interactions on draggable elements, modifying or inspecting pointer events, and implementing hold-to-drag behaviors or gesture recognition prior to actual dragging.
</div>

#### Example - hold to drag

    <div id="draggable"></div>

    <script>
      $("#draggable").kendoDraggable({
        holdToDrag: true,
        hold: function(e) {
            $("#draggable").css("background", "red");
        },
        hint: function(element) {
          var hintElement = $("<div id='hint'></div>");
          hintElement.css({
            "background-image": "url('https://demos.telerik.com/kendo-ui/content/web/combobox/tShirt.png')",
        	"width": "248px",
        	"height": "289px"
          });
          return hintElement;
        }
      });
    </script>

    <style>
      #draggable {
        width: 50px;
        height: 50px;
        background-color: orange;
        border: 2px solid green;
      }
    </style>

#### Event Data

##### e.sender `kendo.ui.Draggable`

The Draggable instance which fired the event.

##### e.target `Element`

The draggable element.
