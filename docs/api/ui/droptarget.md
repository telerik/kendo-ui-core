---
title: DropTarget
page_title: Drop interaction with jQuery | Kendo UI DropTarget API Reference
description: Learn how to group sets of draggable and drop targets, destroy all DropTarget instances from a group and handle events, fired once draggable interacts with the drop target.
res_type: api
---

# kendo.ui.DropTarget

Represents the Kendo UI DropTarget widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### group `String`*(default: "default")*

 Used to group sets of draggable and drop targets. A draggable with the same group value as a drop target will be accepted by the drop target.


<div class="meta-api-description">
How do I restrict drag-and-drop interactions between specific elements in Kendo UI? Control and restrict drag-and-drop interactions by assigning matching group identifiers to draggable elements and drop zones, enabling filtering or enabling drop targets to accept only specific draggable items based on shared group names or categories, supporting scenarios like grouping drag sources and drop targets, setting allowed drop areas, configuring which elements can be dropped where, and managing drag-and-drop permissions through group matching or filtering rules.
</div>

#### Example

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

## Methods

### destroyGroup

Destroys all DropTarget instances from the group with the given name.


<div class="meta-api-description">
How do I remove all instances of grouped drop zones in Kendo UI drag-and-drop functionality? Delete or remove all instances of drag-and-drop targets linked by a shared group identifier, enabling bulk cleanup or unregistration of grouped drop zones when resetting, reconfiguring, or dismantling drag-and-drop functionality; control group-based target lifecycle, purge specific collections of drop handlers, disable or clear grouped drag targets by group name, and manage batch removal of drag target sets to maintain or update interactive regions in user interfaces.
</div>

#### Example - destroy group's DropTargets and detach events

    <div class="orange"></div>
    <div class="orangeArea"></div>
    <div class="orangeArea"></div>

    <script>
      $(".orange").kendoDraggable({
        group: "orangeGroup",
        hint: function(element) {
          return element.clone();
        }
      });

      $(".orangeArea").kendoDropTarget({ group: "orangeGroup", drop: onDrop });

      function onDrop(e) {
        e.draggable.destroy();
        e.draggable.element.remove();
      }

      //destroy components and detach events
      kendo.ui.DropTarget.destroyGroup("orangeGroup");
    </script>
    <style>
      .orange {
        width: 50px;
        height: 50px;
        border: 2px solid green;
        margin: 5px;
      }
      .orangeArea {
        width: 200px;
        height: 200px;
        border: 2px solid green;
        margin: 5px;
      }
      .orange, .orangeArea { background-color: orange; }
    </style>

## Events

### dragenter

Fired when draggable moves over the drop target.
The `dragenter` event represents a jQuery `mousemove` event and contains all the event data of the [jQuery Event Object](https://api.jquery.com/category/events/event-object/).


<div class="meta-api-description">
How can I detect when a draggable item is moving over a drop target area using Kendo UI for jQuery? Detect when a draggable item moves over or enters a drop target area by capturing the dragenter event, enabling detection of pointer position, validating if the dragged data can be accepted, controlling default event behavior with methods like preventDefault or stopPropagation, and triggering visual responses such as highlights or feedback to indicate valid drop zones during drag-and-drop interactions.
</div>

#### Example - modify draggable hint and dropTarget element

    <div class="draggable orange"></div>
    <div class="target orange"></div>

    <script>
      $(".draggable").kendoDraggable({
        hint: function(element) {
          return element.clone();
        }
      });

      $(".target").kendoDropTarget({ 
          dragenter: function(e) {
              e.draggable.hint.css("opacity", 0.5); //modify the draggable hint
              e.dropTarget.removeClass("orange").addClass("purple"); //modify dropTarget element
          },
          dragleave: function(e) {
              e.draggable.hint.css("opacity", 1); //modify the draggable hint
              e.dropTarget.removeClass("purple").addClass("orange"); //modify dropTarget element

          }
      });

    </script>
    <style>
      .draggable {
        width: 50px;
        height: 50px;
        border: 2px solid green;
        margin: 5px;
      }
      .target {
        width: 200px;
        height: 200px;
        border: 2px solid green;
        margin: 5px;
      }
      .orange { background-color: orange; }
      .purple { background-color: purple; }
    </style>

#### Event Data

##### e.draggable `kendo.ui.Draggable`

The Draggable instance that enters the drop target.

##### e.dropTarget `jQuery`

The DropTarget element.

##### e.target `Element`

The Draggable element.

### dragleave

Fired when draggable moves out of the drop target.
The `dragleave` event represents a jQuery `mousemove` event and contains all the event data of the [jQuery Event Object](https://api.jquery.com/category/events/event-object/).


<div class="meta-api-description">
What is the purpose of the dragleave event in Kendo UI's drag-and-drop functionality? Capture and respond to when a dragged element exits or moves away from a designated drop zone, enabling you to track drag leave interactions, clear visual highlights or drag indicators, manage drag-and-drop state changes, handle drag exit events, and process event data related to the draggable leaving the target area. Detect and react to drag movements leaving a drop area to update UI feedback, perform cleanup tasks, or trigger custom logic during drag-and-drop operations, with access to comprehensive event details similar to standard jQuery mouse event information.
</div>

#### Example - modify draggable hint and dropTarget element

    <div class="draggable orange"></div>
    <div class="target orange"></div>

    <script>
      $(".draggable").kendoDraggable({
        hint: function(element) {
          return element.clone();
        }
      });

      $(".target").kendoDropTarget({ 
          dragenter: function(e) {
              e.draggable.hint.css("opacity", 0.5); //modify the draggable hint
              e.dropTarget.removeClass("orange").addClass("purple"); //modify dropTarget element
          },
          dragleave: function(e) {
              e.draggable.hint.css("opacity", 1); //modify the draggable hint
              e.dropTarget.removeClass("purple").addClass("orange"); //modify dropTarget element

          }
      });

    </script>
    <style>
      .draggable {
        width: 50px;
        height: 50px;
        border: 2px solid green;
        margin: 5px;
      }
      .target {
        width: 200px;
        height: 200px;
        border: 2px solid green;
        margin: 5px;
      }
      .orange { background-color: orange; }
      .purple { background-color: purple; }
    </style>

#### Event Data

##### e.draggable `kendo.ui.Draggable`

The Draggable instance that leaves the drop target.

##### e.dropTarget `jQuery`

The DropTarget element.

##### e.target `Element`

The Draggable element.

### drop

Fired when draggable is dropped over the drop target.
The `drop` event represents a jQuery `mouseup` event and contains all the event data of the [jQuery Event Object](https://api.jquery.com/category/events/event-object/).


<div class="meta-api-description">
How to trigger an event when a draggable element is dropped on a drop target in Kendo UI for jQuery? Detect and manage when a draggable element is released or dropped onto a designated drop area, capturing user interactions that involve drag-and-drop operations; trigger handlers on mouse release or drop actions over target zones with full event details including cursor position, event targets, original event context, and comprehensive event metadata for customizing responses to items being dropped, enabling developers to track, control, or respond to drag-and-drop completion using event listeners that access standard mouse and event properties within web interfaces.
</div>

#### Example - disable draggable component after it has been dropped

    <div class="draggable orange"></div>
    <div class="draggable orange"></div>
    <div class="draggable orange"></div>
    <br />
    <div class="target orange"></div>

    <script>
      $(".draggable").kendoDraggable({
        hint: function(element) {
          return element.clone();
        }
      });

      $(".target").kendoDropTarget({ 
          drop: function(e) {
              e.draggable.destroy(); //detach events
              e.draggable.element.css("opacity", 0.3); //change opacity
          }
      });

    </script>
    <style>
      .draggable {
        width: 50px;
        height: 50px;
        border: 2px solid green;
        margin: 5px;
        float: left;
      }
      .target {
        width: 200px;
        height: 200px;
        border: 2px solid green;
        margin: 50px;
      }
      .orange { background-color: orange; }
      .purple { background-color: purple; }
    </style>

#### Event Data

##### e.draggable `kendo.ui.Draggable`

The Draggable instance that leaves the drop target.

##### e.dropTarget `jQuery`

The DropTarget element.

##### e.target `Element`

The Draggable element.
