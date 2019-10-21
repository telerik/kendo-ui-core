---
title: Initialize a Grid in the PanelBar
page_title: Initialize a Grid in the PanelBar | Kendo UI PanelBar
description: "Learn how to initialize the Grid inside the Kendo UI PanelBar by resizing it according to the dimensions of its container."
slug: initialize_thegrid_panelbar_widget
---

# Initialize a Grid in the PanelBar

The following example demonstrates how to use the `activate` event when initializing the Grid within the PanelBar so as it is resized according to the dimensions of its container.

> In addition to the Kendo UI PanelBar, this example can be applied to the TabStrip and Window widgets, which, too, act as hidden containers for the Grid.

```dojo
    <body>
      <button id="openBtn">Open</button>

      <ul id="panelbar">
        <li id="item1">Item 1
          <div id="grid"></div>
        </li>
        <li id="item2">Item 2
          <ul>
            <li>Sub Item 1</li>
            <li>Sub Item 2</li>
            <li>Sub Item 3</li>
          </ul>
        </li>
      </ul>

      <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
      <script>
        var panelbar = $("#panelbar").kendoPanelBar().data("kendoPanelBar");

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

          // Apply the activate event which is thrown only after the animation is completed.
          panelbar.one("activate", function() {
          	grid.resize();
          });

          $("#openBtn").click(function(e) {
          	panelbar.expand($("#item1"));
          });
        </script>
    </body>
```

## See Also

* [Basic Usage of the PanelBar (Demo)](https://demos.telerik.com/kendo-ui/panelbar/index)
* [Using the API of the PanelBar (Demo)](https://demos.telerik.com/kendo-ui/panelbar/api)
* [JavaScript API Reference of the PanelBar](/api/javascript/ui/panelbar)
