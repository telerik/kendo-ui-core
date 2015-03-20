---
title: Add close button inside a modal Window
page_title: Add close button inside a modal Window
description: Add close button inside a modal Window
---

# Add close button inside a modal Window

The example below demonstrates how to add close button to a modal Window

#### Example:

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
            $(this).closest("[data-role=window]").kendoWindow("close");
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