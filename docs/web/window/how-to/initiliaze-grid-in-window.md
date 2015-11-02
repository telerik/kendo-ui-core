---
title: Initialize the Grid
page_title: Initialize the Grid | Kendo UI Window Widget
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

* [Initialize the Grid inside a Hidden Container](/web/grid/appearance#initialize-the-grid-inside-a-hidden-container)    
* [API Reference on the Configuration of Window Animations](/api/javascript/ui/window#configuration-animation)
