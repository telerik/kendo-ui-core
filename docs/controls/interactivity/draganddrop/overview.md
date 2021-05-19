---
title: Overview
page_title: jQuery Drag-and-Drop Documentation | Drag-and-Drop Overview
description: "Get started with the jQuery Drag-and-Drop by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_draganddrop_intercativityandux
position: 1
---

# Drag-and-Drop Overview

Kendo UI for jQuery provides options to handle drag-and-drop scenarios by combining the `kendoDraggable` and `kendoDropTarget` controls.  

`kendoDraggable` enables the Draggable functionality and allows a DOM element to be moved by using the mouse or a finger on touch devices.

`kendoDropTarget` creates the droppable zones and marks a DOM element as a drop target for the Draggable. The `DropTargetArea` enables you to create multiple `DropTarget` elements that are located in the area container which is a useful scenario when the `DropTarget` elements are added dynamically.

* [Demo page for the Drag-and-Drop](https://demos.telerik.com/kendo-ui/dragdrop/index)

## Initializing the Drag-and-Drop

The following example demonstrates how to initialize the Draggable widget.

> In order for the user to have a visual indication of the dragged item, specify the `hint` configuration option.

    <div id="draggable" style="width: 200px; height: 200px; background-color: #0ff;">drag me</div>
    <script>
        var draggable = $("#draggable").kendoDraggable({
          hint: function(element) {
            return element.clone();
          }
        });
    </script>

The following example demonstrates how to initialize the DropTarget widget.

> If the DropTarget element is initially empty, set the `height` or `min-height` properties of the element through CSS. The user will not be able to drag on targets with a zero height.

    <div id="listB"></div>
    <script>
        $("#listB").kendoDropTarget();
    </script>
    <style>
        #listB {
            width: 300px;
            height: 280px;
            border: 3px solid black;
            border-radius: 3px;
        }
    </style>

The following example demonstrates how to initialize DropTargetArea element.

> Specify the `filter` option for the DropTargetArea.

    <div id="area">
      <div class="orange"></div>
      <div class="purple"></div>
      <div class="orange"></div>
      <div class="purple"></div>
    </div>

    <div id="draggable"></div>

    <script>
      $("#draggable").kendoDraggable({
        hint: function(element) {
          return element.clone();
        }
      });

      $("#area").kendoDropTargetArea({
          filter: ".orange",
          drop: onDrop
      });

      function onDrop(e) {
        e.dropTarget.removeClass("orange").addClass("purple");
      }
    </script>

    <style>
      #draggable {
        width: 50px;
        height: 50px;
        border: 2px solid green;
        margin: 5px;
        display: inline-block;
        background-color: orange;
      }
      .orange, .purple {
        width: 50px;
        height: 50px;
        margin: 10px;
        display: inline-block;
      }
      .orange { background-color: orange; }
      .purple { background-color: purple; }
      #area {
          width: 300px;
          height: 300px;
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

## See Also

* [Basic Usage of the Drag-and-Drop (Demo)](https://demos.telerik.com/kendo-ui/dragdrop/index)
* [API Reference of Draggable](/api/javascript/ui/draggable)
* [API Reference of DropTarget](/api/javascript/ui/droptarget)
* [API Reference of DropTargetArea](/api/javascript/ui/droptargetarea)
