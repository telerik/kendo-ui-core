---
title: Draggable
page_title: Draggable UI Widget | Kendo UI API Documentation
description: Configuration steps and types of events which are triggered in Kendo UI Draggable.
previous_url: /api/framework/draggable
---

# kendo.ui.Draggable

## Configuration

### axis `String`*(default: null)*

 Constrains the hint movement to either the horizontal (x) or vertical (y) axis. Can be set to either "x" or "y".

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

### container `jQuery`

If set, the hint movement is constrained to the container boundaries.

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

#### Example - customizing draggable tooltip

    <div id="draggable"></div>

    <script>
      $("#draggable").kendoDraggable({
        hint: function(element) {
          var hintElement = $("<div id='hint'></div>");
          hintElement.css({
            "background-image": "url('http://www.telerik.com/image/kendo-logo.png')",
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
The activated mode can be canceled by calling [`cancelHold`](#methods-cancelHold).

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

Fired while dragging. The `drag` event represents a jQuery `mousemove` event and contains all the event data of the [jQuery Event Object](http://api.jquery.com/category/events/event-object/).

#### Example - bind during the initialization

    <div id="draggable"></div>

    <script>
      $("#draggable").kendoDraggable({
        hint: function(element) {
          return element.clone();
        },
        drag: function(e) {
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
The `dragcancel` event represents a jQuery `keyup` event and contains all the event data of the [jQuery Event Object](http://api.jquery.com/category/events/event-object/).

#### Example

    <div id="draggable"></div>

    <script>
      $("#draggable").kendoDraggable({
        hint: function(element) {
          return element.clone();
        },
        dragcancel: function(e) {
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
The `dragend` event represents a jQuery `mouseup` event and contains all the event data of the [jQuery Event Object](http://api.jquery.com/category/events/event-object/).

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
The `dragstart` event represents a jQuery `mousedown` event and contains all the event data of the [jQuery Event Object](http://api.jquery.com/category/events/event-object/).

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

Triggered only when `holdToDrag` is set to `true`. Fired before the `dragStart` event.
The `hold` event represents a jQuery `mousedown` event and contains all the event data of the [jQuery Event Object](http://api.jquery.com/category/events/event-object/).

#### Example - hold to drag

    <div id="draggable"></div>

    <script>
      $("#draggable").kendoDraggable({
        holdToDrag: true,
        hold: function(e) {
            $("draggable").css("background", "red");
        },
        hint: function(element) {
          var hintElement = $("<div id='hint'></div>");
          hintElement.css({
            "background-image": "url('http://demos.telerik.com/kendo-ui/content/web/combobox/tShirt.png')",
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
