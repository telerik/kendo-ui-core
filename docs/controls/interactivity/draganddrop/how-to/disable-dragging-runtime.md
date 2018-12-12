---
title: Enable and Disable Dragging at Runtime
page_title: Enable and Disable Dragging at Runtime | Kendo UI Drag-and-Drop
description: "Learn how to enable and disable the Kendo UI Drag and Drop functionality at runtime."
slug: howto_enableanddisabledraggingatruntime_intercativityandux
---

# Enable and Disable Dragging at Runtime

Your project might require you to enable or disable the Kendo UI Drag-and-Drop functionality during runtime.

To achieve this behavior:

1. Initialize the Drag-and-Drop feature on the parent container.
2. Use a filter to specify which items will be draggable.
3. Change the class of the items to enable and disable them.

The following example demonstrates how to accomplish this scenario.

###### Example

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

* [API Reference of the Draggable](/api/javascript/ui/draggable)
* [DropTarget API Reference](/api/javascript/ui/droptarget)
* [DropTargetArea API Reference](/api/javascript/ui/droptargetarea)
* [Overview of the Drag and Drop Functionality]({% slug overview_kendoui_draganddrop_intercativityandux %})
