---
title: Capturing Drag Events in the jQuery Splitter
description: Learn how to capture drag events while using the jQuery Splitter component.
type: how-to
page_title: Tracking Drag Events with the jQuery Splitter Component
slug: jquery-splitter-drag-event
tags: splitter, kendo-ui, jquery, drag-event, draggable
res_type: kb
ticketid: 1689930
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Splitter for Progress® Kendo UI®</td>
</tr>
<tr>
<td>Version</td>
<td>Current</td>
</tr>
</tbody>
</table>

## Description

I want to capture drag events while using the jQuery Splitter component, similar to the `sizeChange` event in the Kendo UI for Angular Splitter. I have attempted to attach events to `kendoDraggable`, bind to `layoutChange`, and other methods, but none have successfully captured real-time drag events for the Splitbar.

This knowledge base article also answers the following questions:
- How can I capture the drag event while resizing a Splitbar in the jQuery Splitter?
- Is it possible to bind drag events to the Splitbar in the jQuery Splitter?
- What is the correct approach to handle Splitbar drag events in the jQuery Splitter?

## Solution

To capture drag events for the Splitbar in the jQuery Splitter, you need to access the Draggable widget of the Splitbar and bind to its [`drag`](/api/javascript/ui/draggable/events/drag), [`dragstart`](/api/javascript/ui/draggable/events/dragstart), and [`dragend`](/api/javascript/ui/draggable/events/dragend) events. Below is an implementation example:

### Example Code
```javascript
$(document).ready(function() {
    var splitter = $("#splitter").kendoSplitter().data("kendoSplitter");

    // Access the Draggable widget of the Splitbar
    splitter.resizing._resizable.draggable.bind("drag", function(e) {
        console.log("Drag event triggered");
    });

    splitter.resizing._resizable.draggable.bind("dragend", function(e) {
        console.log("Drag ended");
    });
});
```

This approach allows you to handle the drag events as the Splitbar is moved, enabling real-time tracking during resizing.

### Dojo Example
For a live demonstration, refer to the following Dojo example:

```dojo
<div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
      $(document).ready(function () {
        var splitter = $("#splitter")
          .kendoSplitter({
            panes: [{ collapsible: true }, {}],
            resize: function (e) {
              /* The result can be observed in the DevTools(F12) console of the browser. */
              console.log("Splitter pane has been resized");
            }
          })
          .data("kendoSplitter");

        // Access the Draggable widget of the Splitbar
        splitter.resizing._resizable.draggable.bind("dragstart", function (e) {
          console.log("Drag started");
        });

        splitter.resizing._resizable.draggable.bind("drag", function (e) {
          console.log(e);
          console.log("Drag started");
        });

        splitter.resizing._resizable.draggable.bind("dragend", function (e) {
          console.log("Drag ended");
        });
      });
    </script>
```

## See Also

- [Kendo UI for jQuery Splitter Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/splitter/overview)
- [Kendo UI jQuery Draggable API Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/draggable)
