---
title: Initialize the Grid
page_title: Initialize the Grid | Kendo UI Window
description: "Learn how to initialize the Grid inside the Kendo UI Window widget by resizing it according to the dimensions of its container."
slug: initialize_thegrid_window_widget
---

# Initialize the Grid

The example below demonstrates how to use the `activate` event when initializing the Grid within the Window so as it is resized according to the dimensions of its container.

> **Important**  
> In addition to the Kendo UI Window, this example can be applied to the TabStrip and PanelBar widgets, which, too, act as hidden containers for the Grid.

###### Example

```html
    <body>
      <button id="openBtn">Open</button>
      <div id="wnd">
        <div id="grid"></div>
      </div>
      <script src="http://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
      <script>
  	    var wnd = $("#wnd").kendoWindow({
          height: 400,
          width: 600,
          visible: false
        }).data("kendoWindow");

        var grid = $("#grid").kendoGrid({
            dataSource: {
              data: products,
              pageSize: 5
          },
          height: 200,
          scrollable: true,
          columns: [
              "ProductName",
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "130px" },
              { field: "UnitsInStock", title: "Units In Stock", width: "130px" },
              { field: "Discontinued", width: "130px" }
            ]
          }).data("kendoGrid");

          //apply the activate event, which is thrown only after the animation is played out
          wnd.one("activate", function() {
                grid.resize();
          });

          $("#openBtn").click(function(e) {
                wnd.open();
          });
        </script>
    </body>
```

## See Also

Articles and how-to examples on Kendo UI Window:

* [Initialize the Grid inside a Hidden Container](/web/grid/appearance#initialize-the-grid-inside-a-hidden-container)    
* [JavaScript API Reference: Configuration of Window Animations](/api/javascript/ui/window#configuration-animation)
* [Window JavaScript Window API Reference](/api/javascript/ui/window)
* [How to Add Auto-Resizing Splitter]({% slug howto_addautoresizingsplitter_window %})
* [How to Add Close Button inside Modal Windows]({% slug howto_addclosebutton_insidemodalwindows_window %})
* [How to Cascade Open Windows]({% slug howto_cascadeopenwindows_window %})
* [How to Create Confirmation Dialog via Promises]({% slug howto_createconfirmationdialog_viapromises_window %})
* [How to Display Loading Indicator over Window]({% slug howto_displayloadingindicator_overwindow_window %})
* [How to Post to Iframe]({% slug howto_posttoiframe_window %})
* [How to Restrict Window Positioning]({% slug howto_restrictpositioning_window %})
* [How to Use Custom Action Icons]({% slug howto_customactionicons_window %})
* [How to Use MVVM Binding for Window Data Editing]({% slug howto_usemvvmbinding_forwindowdataediting_mvvm_window %})
