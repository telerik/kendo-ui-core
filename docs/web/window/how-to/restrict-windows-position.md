---
title: Restrict Window positioning
page_title: Restrict Window positioning
description: Restrict Window positioning
---

# Restrict Window positioning

The example below demonstrates how to restrict the movement of the Window to a certain area

#### Example:

```html
    <div id="window">
      Window content
    </div>
    <script>
      $(function() {

        function onWindowDrag (e) {
          var windowWrapper = winObject.wrapper,
              windowPosition = windowWrapper.offset(),
              shouldOverridePosition = false,
              newTop = windowPosition.top,
              newLeft = windowPosition.left;

          if (windowPosition.top > 200) {
            shouldOverridePosition = true;
            newTop = 200;
          }

          if (windowPosition.left > 200) {
            shouldOverridePosition = true;
            newLeft = 200;
          }

          if (shouldOverridePosition) {
            windowWrapper.css({top: newTop, left: newLeft});
          }
        }

        var winObject = $("#window").kendoWindow({
          width: 600,
          height: 300,
          position: {
            top: 0,
            left: 0
          },
          title: "Kendo UI Window"
        }).data("kendoWindow");

        winObject.dragging._draggable.bind("drag", onWindowDrag);
        // dragging represents a WindowDragging object, which is a wrapper around a Kendo UI Draggable instance
        // _draggable represents the Draggable instance that you can bind events to
      });
    </script>
```