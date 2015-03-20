---
title: DropTarget
page_title: Drop interaction with jQuery | Kendo UI DropTarget API Reference
description: Learn how to group sets of draggable and drop targets, destroy all DropTarget instances from a group and handle events, fired once draggable interacts with the drop target.
---

# kendo.ui.DropTarget

## Configuration

### group `String`*(default: "default")*

 Used to group sets of draggable and drop targets. A draggable with the same group value as a drop target will be accepted by the drop target.

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
The `dragenter` event represents a jQuery `mousemove` event and contains all the event data of the [jQuery Event Object](http://api.jquery.com/category/events/event-object/).

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
The `dragleave` event represents a jQuery `mousemove` event and contains all the event data of the [jQuery Event Object](http://api.jquery.com/category/events/event-object/).

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
The `dragleave` event represents a jQuery `mouseup` event and contains all the event data of the [jQuery Event Object](http://api.jquery.com/category/events/event-object/).

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
