---
title: Getting Started
page_title: jQuery Draggable Documentation - Getting Started with the Draggable
description: "Get started with the jQuery Draggable by Kendo UI and learn how to create and initialize the component."
slug: getting_started_kendoui_draggable_widget
position: 1
---

# Getting Started with the Draggable

This guide demonstrates how to get up and running with the Kendo UI for jQuery Draggable.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
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
```

## 1. Create an Empty Div Element

First, create an empty `div` element on the page from which the Draggable component will be initialized. 

```html
<div id="draggable"></div>
```

## 2. Initialize the Draggable 

In this step, you will initialize the Draggable from the `<div>` element. All settings of the Draggable will be provided in the script statement. You have to describe its layout, configuration, and event handlers in JavaScript.


```html
<div id="draggable"></div>

<script>
    // Target the div element by using jQuery and then call the kendoDraggable() method.
    $("#draggable").kendoDraggable();
</script>
```

Once the basic initialization is completed, you can start adding additional configurations to the Draggable. 

## 3. Add the Hint Function 

The [`hint`] option allows you to display a copy of the element you are dragging.

```html
<div id="draggable"></div>

<script>
    // Target the div element by using jQuery and then call the kendoDraggable() method.
    $("#draggable").kendoDraggable({
        hint: function(element){
            return element.clone();
        }
    });
</script>
```

## 4. Add a DropTargetArea Component

You can specify a DropTargetArea component to serve as an area where the Draggable can be dropped.

```html
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
```

## 5. Add Styles to the Components

For a better visualization of the scenario, you can add styles to the Draggable and DropTargetArea components.

```html
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
```

## Next Steps 

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the Draggable](https://demos.telerik.com/kendo-ui/dragdrop/index)

## See Also 

* [JavaScript API Reference of the Draggable](/api/javascript/ui/draggable)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>