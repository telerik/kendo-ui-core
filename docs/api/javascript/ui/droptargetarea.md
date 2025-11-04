---
title: DropTargetArea
page_title: API Reference for Kendo UI DropTargetArea
description: Kendo UI DropTargetArea documentation shows how to configure drop targets in the area and learn which events are fired when draggable interacts with one of the drop targets.
res_type: api
---

# kendo.ui.DropTargetArea

Represents the Kendo UI DropTargetArea widget. Inherits from [DropTarget](/api/javascript/ui/droptarget).

## Configuration

### group `String`*(default: "default")*

 Used to group sets of draggable and drop targets. A draggable with the same group value as a drop target will be accepted by the drop target.


<div class="meta-api-description">
How do I restrict which draggable items can be dropped into a specific target area in Kendo UI for jQuery? Control and configure drag-and-drop acceptance by assigning groups to draggable elements and drop zones, enabling filtering and restriction of which draggable items can be dropped in specific target areas. Grouping allows scoping drag sources and drop targets so that only items with matching group identifiers are accepted, supporting use cases like segmented drag-and-drop, selective dropping, connecting sets of draggable components to compatible drop zones, managing allowed drag targets, filtering draggables by category, and enforcing drag restrictions. This enables managing drag scope, selective drop acceptance, group-based drag constraints, and organizing drag-and-drop relationships by setting or matching group attributes or tags.
</div>

#### Example

    <p>Area accepts only draggable elements from orange group</p>
    <div id="area">
      <div id="leftArea"></div>
      <div id="rightArea"></div>
    </div>
    <div class="orange"></div>
    <div class="orange"></div>
    <div class="purple"></div>

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

      $("#area").kendoDropTargetArea({ 
          group: "orangeGroup",
          filter: "#leftArea, #rightArea",
          drop: onDrop
      });

      function onDrop(e) {
        e.draggable.destroy();
        e.draggable.element.css("opacity", 0.3);
      }
    </script>
    <style>
      .orange, .purple{
        width: 50px;
        height: 50px;
        border: 2px solid green;
        margin: 5px;
        display: inline-block;
      }
      .orange { background-color: orange; }
      .purple { background-color: purple; }
      #area {
          width: 300px;
          height: 300px;
          line-height: 300px;
          background-color: gray;
      }
      #leftArea, #rightArea {
        width: 140px;
        height: 100px;
        border: 2px solid green;
        margin: 2px;
        background-color: orange;
        display: inline-block;
        vertical-align: middle;
      }
    </style>

### filter `String`*(default: null)*

 Selector to filter the drop targets in the area. Every matched element acts as a drop target and fires events on the DropTargetArea. **Specifying the filter is mandatory.**


<div class="meta-api-description">
How can I restrict drop targets to specific elements within a Kendo UI DropTargetArea? Control which elements inside a drop target zone accept dragged items by setting a selector filter that defines allowed drop targets, enabling configuration through CSS or jQuery selectors to specify which child elements respond to drag-and-drop actions, manage event triggering on matched elements within the drop area, and restrict drops only to designated targets by filtering elements based on selectors to enable precise drop target customization and interaction handling.
</div>

#### Example

    <p>Area accepts only draggable elements from orange group</p>
    <div id="area">
      <div id="droptarget" class="orange"></div>
    </div>
    <div id="draggable" class="purple"></div>

    <script>
      $("#draggable").kendoDraggable({
        hint: function(element) {
          return element.clone();
        }
      });

      $("#area").kendoDropTargetArea({ 
          filter: "#droptarget",
          drop: onDrop
      });

      function onDrop(e) {
        e.dropTarget.toggleClass("orange").toggleClass("purple");
        e.draggable.element.toggleClass("orange").toggleClass("purple");
      }
    </script>
    <style>
      #draggable {
        width: 50px;
        height: 50px;
        border: 2px solid green;
        margin: 5px;
        display: inline-block;
      }
      .orange { background-color: orange; }
      .purple { background-color: purple; }
      #area {
          width: 300px;
          height: 300px;
          line-height: 300px;
          background-color: gray;
      }
      #droptarget {
        width: 100px;
        height: 100px;
        border: 2px solid green;
        margin: 0 96px;
        display: inline-block;
        vertical-align: middle;
      }
    </style>

## Events

### dragenter

Fired when draggable moves over one of the drop targets.
The `dragenter` event represents a jQuery `mousemove` event and contains all the event data of the [jQuery Event Object](https://api.jquery.com/category/events/event-object/).


<div class="meta-api-description">
How do I detect when a draggable element enters the drop target area in Kendo UI for jQuery? Detect when a draggable element enters or moves over a designated drop target area to trigger custom behaviors or logic, capturing pointer positions, target elements, and original event details whenever a drag operation overlaps the drop zone. Track drag movements, monitor when a draggable intersects with the drop target boundary, handle event data such as mouse coordinates and underlying elements during drag-and-drop interactions, and enable custom responses to the dragging entering the drop target region. Capture and process the event fired as draggable items transition over drop zones to implement interactive dragenter event handling with access to full event metadata for precise control and updated pointer tracking.
</div>

#### Example - modify the hint element on dragenter

    <div id="area">
      <div id="leftArea"></div>
      <div id="rightArea"></div>
    </div>
    <div class="purple"></div>
    <div class="purple"></div>

    <script>
      $(".purple").kendoDraggable({
        hint: function(element) {
          return element.clone();
        }
      });

      $("#area").kendoDropTargetArea({ 
        filter: "#leftArea, #rightArea",
        dragenter: function(e) {
          e.draggable.hint.css("opacity", 0.3);
        },
        dragleave: function(e) {
          e.draggable.hint.css("opacity", 1);
        }
      });

    </script>
    <style>
      .purple{
        width: 50px;
        height: 50px;
        border: 2px solid green;
        margin: 5px;
        display: inline-block;
      }
      .purple { background-color: purple; }
      #area {
          width: 300px;
          height: 300px;
          line-height: 300px;
          background-color: gray;
      }
      #leftArea, #rightArea {
        width: 140px;
        height: 100px;
        border: 2px solid green;
        margin: 2px;
        background-color: orange;
        display: inline-block;
        vertical-align: middle;
      }
    </style>

#### Event Data

##### e.draggable `kendo.ui.Draggable`

Reference to the Draggable instance that enters a drop target.

##### e.dropTarget `jQuery`

The current DropTarget element in the area that initiated the event.

##### e.target `Element`

The current Draggable element.

### dragleave

Fired when draggable moves out of one of the drop targets.
The `dragleave` event represents a jQuery `mousemove` event and contains all the event data of the [jQuery Event Object](https://api.jquery.com/category/events/event-object/).


<div class="meta-api-description">
What happens when a draggable item exits a drop target area in Kendo UI for jQuery? Detect and handle when a draggable element exits or leaves a drop target area, enabling you to monitor drag-and-drop interactions, cancel pending drop operations, update visual cues or UI feedback, and execute logic when the dragged item moves away from or out of defined drop zones. This event supports tracking drag movements, managing the drag lifecycle, controlling drop validity, responding to dragover changes, and integrating with mouse or pointer events for dynamic user interface updates and interaction control during drag-and-drop workflows.
</div>

#### Example - modify the hint element on dragenter

    <div id="area">
      <div id="leftArea"></div>
      <div id="rightArea"></div>
    </div>
    <div class="purple"></div>
    <div class="purple"></div>

    <script>
      $(".purple").kendoDraggable({
        hint: function(element) {
          return element.clone();
        }
      });

      $("#area").kendoDropTargetArea({ 
        filter: "#leftArea, #rightArea",
        dragenter: function(e) {
          e.draggable.hint.css("opacity", 0.3);
        },
        dragleave: function(e) {
          e.draggable.hint.css("opacity", 1);
        }
      });

    </script>
    <style>
      .purple{
        width: 50px;
        height: 50px;
        border: 2px solid green;
        margin: 5px;
        display: inline-block;
      }
      .purple { background-color: purple; }
      #area {
          width: 300px;
          height: 300px;
          line-height: 300px;
          background-color: gray;
      }
      #leftArea, #rightArea {
        width: 140px;
        height: 100px;
        border: 2px solid green;
        margin: 2px;
        background-color: orange;
        display: inline-block;
        vertical-align: middle;
      }
    </style>

#### Event Data

##### e.draggable `kendo.ui.Draggable`

Reference to the Draggable instance that enters a drop target.

##### e.dropTarget `jQuery`

The current DropTarget element in the area that initiated the event.

##### e.target `Element`

The current Draggable element.

### drop

Fired when draggable is dropped over one of the drop targets.
The `drop` event represents a jQuery `mouseup` event and contains all the event data of the [jQuery Event Object](https://api.jquery.com/category/events/event-object/).


<div class="meta-api-description">
How can I detect when a draggable element is released over a drop zone in Kendo UI? Detect when a draggable element is released over a drop zone by handling the drop action event, capturing the moment an item is dropped onto a target to enable drag and drop interactions such as moving elements, accepting or rejecting drops, triggering UI updates, or running custom logic; supports capturing precise event details like mouse position, target identification, and event metadata to control drop behavior and respond to user actions involving draggable release within drop areas during drag and drop operations.
</div>

#### Example - modify the dropTarget and draggable element on successful drop

    <p>Area accepts only draggable elements from orange group</p>
    <div id="area">
      <div id="droptarget" class="orange"></div>
    </div>
    <div id="draggable" class="purple"></div>

    <script>
      $("#draggable").kendoDraggable({
        hint: function(element) {
          return element.clone();
        }
      });

      $("#area").kendoDropTargetArea({ 
          filter: "#droptarget",
          drop: onDrop
      });

      function onDrop(e) {
        e.dropTarget.toggleClass("orange").toggleClass("purple");
        e.draggable.element.toggleClass("orange").toggleClass("purple");
      }
    </script>
    <style>
      #draggable {
        width: 50px;
        height: 50px;
        border: 2px solid green;
        margin: 5px;
        display: inline-block;
      }
      .orange { background-color: orange; }
      .purple { background-color: purple; }
      #area {
          width: 300px;
          height: 300px;
          line-height: 300px;
          background-color: gray;
      }
      #droptarget {
        width: 100px;
        height: 100px;
        border: 2px solid green;
        margin: 0 96px;
        display: inline-block;
        vertical-align: middle;
      }
    </style>

#### Event Data

##### e.draggable `kendo.ui.Draggable`

Reference to the Draggable instance that enters a drop target.

##### e.dropTarget `jQuery`

The current DropTarget element in the area that initiated the event.

##### e.target `Element`

The current Draggable element.
