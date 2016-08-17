---
title: Enable and Disable Dragging at Runtime
page_title: Enable and Disable Dragging at Runtime | Kendo UI Drag and Drop
description: "Learn how to enable and disable the Kendo UI Drag and Drop functionality at runtime."
slug: howto_enableanddisabledraggingatruntime_intercativityandux
---

# Enable and Disable Dragging at Runtime

The example below demonstrates how to enable or disable the Kendo UI Drag and Drop functionality during runtime.

To disable and/or enable the Kendo UI Drag and Drop functionality, use a filter&mdash;initialize the Kendo UI Drag and Drop functionality on the parent container and use filter to specify which items should be draggable. Change the class of the items to enable and disable them.

###### Example

```html
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

Other articles on Kendo UI Drag and Drop functionality:

* [Draggable API Reference](/api/javascript/ui/draggable)
* [DropTarget API Reference](/api/javascript/ui/droptarget)
* [DropTargetArea API Reference](/api/javascript/ui/droptargetarea)
* [Overview of the Drag and Drop functionality]({% slug overview_kendoui_draganddrop_intercativityandux %})
