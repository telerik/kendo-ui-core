---
title: Cascade Open Windows
page_title: Implement a Cascading Feature for Open Windows 
description: "Learn how to cascade opened Kendo UI for jQuery Windows."
slug: howto_cascadeopenwindows_window
previous_url: /controls/layout/window/how-to/cascade-open-windows
tags: telerik, kendo, jquery, window, cascade, opened, windows
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

How can I cascade opened Kendo UI for jQuery Windows on top of each other?

## Solution

The example below demonstrates how to achieve the desired scenario.


```dojo
   <script>
      $(document).ready(function() {
        for (var i = 0; i < 6; i++){
          var win = $("<div> </div>").appendTo("body");
          win.kendoWindow({
            width: "400px",
            title: "Window",
            visible:true,
            actions: [
              "Close"
            ]
          });
        }
        cascadeWindows();
      });

      function cascadeWindows(){
        var x = 10, y = 10;
        $("[data-role=window]").each(function(){
          var win = $(this).data("kendoWindow");
          if (win.options.visible) {
            win.setOptions({
              position: {
                top: y,
                left: x
              }
            });
            win.toFront();

            x += 14;
            y += 14;
          }
        });
      }
    </script>
```

## See Also

* [Window JavaScript API Reference](/api/javascript/ui/window)
* [How to Post to Iframe]({% slug howto_posttoiframe_window %})
* [How to Restrict Window Positioning]({% slug howto_restrictpositioning_window %})
* [How to Use Custom Action Icons]({% slug howto_customactionicons_window %})
