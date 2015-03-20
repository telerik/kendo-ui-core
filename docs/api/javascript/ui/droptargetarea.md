---
title: DropTargetArea
page_title: API Reference for Kendo UI DropTargetArea
description: Kendo UI DropTargetArea documentation shows how to configure drop targets in the area and learn which events are fired when draggable interacts with one of the drop targets.
---

# kendo.ui.DropTargetArea

## Configuration

### group `String`*(default: "default")*

 Used to group sets of draggable and drop targets. A draggable with the same group value as a drop target will be accepted by the drop target.

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
The `dragenter` event represents a jQuery `mousemove` event and contains all the event data of the [jQuery Event Object](http://api.jquery.com/category/events/event-object/).

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
The `dragleave` event represents a jQuery `mousemove` event and contains all the event data of the [jQuery Event Object](http://api.jquery.com/category/events/event-object/).

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
The `drop` event represents a jQuery `mouseup` event and contains all the event data of the [jQuery Event Object](http://api.jquery.com/category/events/event-object/).

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
