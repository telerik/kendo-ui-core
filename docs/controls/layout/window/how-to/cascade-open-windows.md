---
title: Cascade Open Windows
page_title: Cascade Open Windows | Kendo UI Window
description: "Learn how to add a Close button to a modal Kendo UI Window."
slug: howto_cascadeopenwindows_window
---

# Cascade Open Windows

The example below demonstrates how to cascade open Kendo UI Windows on top of each other.

###### Example

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

## See Also

Articles and other how-to examples on Kendo UI Window:

* [Window JavaScript API Reference](/api/javascript/ui/window)
* [How to Add Auto-Resizing Splitter]({% slug howto_addautoresizingsplitter_window %})
* [How to Add Close Button inside Modal Windows]({% slug howto_addclosebutton_insidemodalwindows_window %})
* [How to Create Confirmation Dialog via Promises]({% slug howto_createconfirmationdialog_viapromises_window %})
* [How to Display Loading Indicator over Window]({% slug howto_displayloadingindicator_overwindow_window %})
* [How to Initialize the Grid]({% slug initialize_thegrid_window_widget %})
* [How to Post to Iframe]({% slug howto_posttoiframe_window %})
* [How to Restrict Window Positioning]({% slug howto_restrictpositioning_window %})
* [How to Use Custom Action Icons]({% slug howto_customactionicons_window %})
* [How to Use MVVM Binding for Window Data Editing]({% slug howto_usemvvmbinding_forwindowdataediting_mvvm_window %})
