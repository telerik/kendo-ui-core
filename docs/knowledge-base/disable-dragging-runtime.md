---
title: Enable and Disable Dragging at Runtime
page_title: Enable and Disable Dragging at Runtime 
description: "Learn how to enable and disable the Kendo UI Drag and Drop functionality at runtime."
slug: howto_enableanddisabledraggingatruntime_intercativityandux
previous_url: /controls/editors/validator/how-to/disable-dragging-runtime
tags: telerik, kendo, jquery, drag, and, drop, enable, and, disable, dragging, at, runtime
component: draganddrop
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Drag and Drop for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I enable and disable the Kendo UI Drag and Drop functionality at runtime?

## Solution

To achieve the desired scenario:

1. Initialize the Drag and Drop feature on the parent container.
2. Use a filter to specify which items will be draggable.
3. Change the class of the items to enable and disable them.

The following example demonstrates the implementation of the suggested approach.

```dojo
  <button id="btn">Enable/Disable</button>
  <div id="parent">
    <div class="draggable">Foo</div>
    <div class="draggable">Bar</div>
  </div>
  <script>
    $("#parent").kendoDraggable({
      filter: ".draggable:not(.disabled)",
      hint: function(element) { return element.clone(); }
    });
    $("#btn").click(function() {
      $("#parent").children().toggleClass("disabled");
    });
  </script>
```

## See Also

* [Basic Usage of the Drag-and-Drop (Demo)](https://demos.telerik.com/kendo-ui/dragdrop/index)
* [API Reference of Draggable](/api/javascript/ui/draggable)
* [API Reference of DropTarget](/api/javascript/ui/droptarget)
* [API Reference of DropTargetArea](/api/javascript/ui/droptargetarea)
