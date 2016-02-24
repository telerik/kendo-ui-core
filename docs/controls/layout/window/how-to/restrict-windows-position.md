---
title: Restrict Window Positioning
page_title: Restrict Window Positioning | Kendo UI Window
description: "Learn how to restrict the movement of a Kendo UI Window to a certain area."
slug: howto_restrictpositioning_window
---

# Restrict Window Positioning

The example below demonstrates how to restrict the movement of a Kendo UI Window to a certain area.

###### Example

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

## See Also

Articles and other how-to examples on Kendo UI Window:

* [Window JavaScript API Reference](/api/javascript/ui/window)
* [How to Add Auto-Resizing Splitter]({% slug howto_addautoresizingsplitter_window %})
* [How to Add Close Button inside Modal Windows]({% slug howto_addclosebutton_insidemodalwindows_window %})
* [How to Cascade Open Windows]({% slug howto_cascadeopenwindows_window %})
* [How to Create Confirmation Dialog via Promises]({% slug howto_createconfirmationdialog_viapromises_window %})
* [How to Display Loading Indicator over Window]({% slug howto_displayloadingindicator_overwindow_window %})
* [How to Initialize the Grid]({% slug initialize_thegrid_window_widget %})
* [How to Post to Iframe]({% slug howto_posttoiframe_window %})
* [How to Use Custom Action Icons]({% slug howto_customactionicons_window %})
* [How to Use MVVM Binding for Window Data Editing]({% slug howto_usemvvmbinding_forwindowdataediting_mvvm_window %})
