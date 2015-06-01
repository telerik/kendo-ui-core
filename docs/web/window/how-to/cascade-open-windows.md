---
title: Cascade opened windows
page_title: Cascade opened windows
description: Cascade opened windows
---

# Cascade opened Kendo UI Windows

The example below demonstrates how to cascade opened Kendo UI Window components on top of each other.

#### Example:

```html
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
