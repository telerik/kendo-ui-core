---
title: Add Close Button inside Modal Windows
page_title: Add Close Button inside Modal Windows | Kendo UI Window
description: "Learn how to add a Close button to a modal Kendo UI Window."
slug: howto_addclosebutton_insidemodalwindows_window
---

# Add Close Button inside Modal Windows

The example below demonstrates how to add a **Close** button to a modal Kendo UI Window.

###### Example

```html
    <div id="example">
      <div id="window">
        <button class="k-button close-button">Close</button>
      </div>
      <button class="k-button open-button">Open window</button>

      <script>
        $(document).ready(function() {
          var wnd = $("#window");

          $(".open-button").bind("click", function() {
            wnd.data("kendoWindow").open();
            $(this).hide();
          });

          $(".close-button").click(function(){
            // call 'close' method on nearest kendoWindow
            $(this).closest("[data-role=window]").data("kendoWindow").close();
            // the above is equivalent to:
            //$(this).closest(".k-window-content").data("kendoWindow").close();
          });

          if (!wnd.data("kendoWindow")) {
            wnd.kendoWindow({
              modal: true,
              title: "Dialog window",
              close: function() {
                $(".open-button").show();
              },
              visible: false
            });
          }
        });
      </script>
    </div>
```

## See Also

Articles and other how-to examples on Kendo UI Window:

* [Window JavaScript API Reference](/api/javascript/ui/window)
* [How to Add Auto-Resizing Splitter]({% slug howto_addautoresizingsplitter_window %})
* [How to Cascade Open Windows]({% slug howto_cascadeopenwindows_window %})
* [How to Create Confirmation Dialog via Promises]({% slug howto_createconfirmationdialog_viapromises_window %})
* [How to Display Loading Indicator over Window]({% slug howto_displayloadingindicator_overwindow_window %})
* [How to Initialize the Grid]({% slug initialize_thegrid_window_widget %})
* [How to Post to Iframe]({% slug howto_posttoiframe_window %})
* [How to Restrict Window Positioning]({% slug howto_restrictpositioning_window %})
* [How to Use Custom Action Icons]({% slug howto_customactionicons_window %})
* [How to Use MVVM Binding for Window Data Editing]({% slug howto_usemvvmbinding_forwindowdataediting_mvvm_window %})
