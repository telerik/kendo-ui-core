---
title: Enable/Disable dragging at runtime
page_title: Enable/Disable dragging at runtime
description: How to enable/disable Kendo UI Draggable dragging at runtime
---

# Enable/Disable dragging at runtime

The example below demonstrates how to enable/disable dragging at runtime.

In order to disable and/or enable the draggable functionality you may use a filter - initialize the draggable widget on the parent container and use filter to specify which items should be draggable. Change the class of the items in order to enable/disable them.

#### Example:

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
