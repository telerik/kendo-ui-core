---
title: Restrict the Positioning of the Window
page_title: Restrict the Positioning of the Window
description: "Learn how to restrict the movement of a Kendo UI Window to a certain area."
slug: howto_restrictpositioning_window
previous_url: /controls/layout/window/how-to/restrict-windows-position
tags: telerik, kendo, jquery, window, restrict, the, positioning, of 
component: window
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Window for jQuery</td>
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

How can I restrict the movement of a Kendo UI Window to a certain area?

## Solution

The example below demonstrates how to achieve the desired scenario.


```dojo
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

          if (windowPosition.top > 50 || windowPosition.top < 0) {
            shouldOverridePosition = true;
            newTop = 50;
          }

          if (windowPosition.left > 50 || windowPosition.left < 0) {
            shouldOverridePosition = true;
            newLeft = 50;
          }

          if (shouldOverridePosition) {
            winObject.setOptions({
              position: {
                top: newTop,
                left: newLeft
              }
            });
          }
        }

        var winObject = $("#window").kendoWindow({
          width: 600,
          height: 300,
          position: {
            top: 0,
            left: 0
          },
          title: "Kendo UI Window",
          dragend: onWindowDrag
        }).data("kendoWindow");
      });
    </script>
```

## See Also

* [Window JavaScript API Reference](/api/javascript/ui/window)
* [How to Add Close Button inside Modal Windows]({% slug howto_addclosebutton_insidemodalwindows_window %})
* [How to Create Confirmation Dialog via Promises]({% slug howto_createconfirmationdialog_viapromises_window %})
* [How to Initialize the Grid]({% slug initialize_thegrid_window_widget %})
* [How to Post to Iframe]({% slug howto_posttoiframe_window %})
