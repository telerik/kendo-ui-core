---
title: Initialize the Grid
page_title: Initialize the Grid | Kendo UI PanelBar
description: "Learn how to initialize the Grid inside the Kendo UI PanelBar by resizing it according to the dimensions of its container."
slug: initialize_thegrid_panelbar_widget
---

# Initialize the Grid

The example below demonstrates how to use the `activate` event when initializing the Grid within the PanelBar so as it is resized according to the dimensions of its container.

> **Important**  
> In addition to the Kendo UI PanelBar, this example can be applied to the TabStrip and Window widgets, which, too, act as hidden containers for the Grid.

###### Example

```html
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

      <script src="http://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
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

          //apply the activate event, which is thrown only after the animation is played out
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

Other articles on the Kendo UI PanelBar:

* [PanelBar JavaScript API Reference](/api/javascript/ui/panelbar)
* [Initialize the Grid inside a Hidden Container]({% slug appearance_kendoui_grid_widget %}#hidden-containers)
* [JavaScript API Reference: Configure PanelBar Animations](/api/javascript/ui/panelbar#configuration-animation)

For more runnable examples on the Kendo UI PanelBar widget, browse its [**How To** documentation folder]({% slug howto_use_custom_content_containers_in_the_panelbar_widget %}).
