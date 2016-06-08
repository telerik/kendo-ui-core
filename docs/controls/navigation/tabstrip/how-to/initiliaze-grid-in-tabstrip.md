---
title: Initialize Grids in TabStrips
page_title: Initialize Grids in TabStrips | Kendo UI TabStrip
description: "Learn how to initialize the Grid inside the Kendo UI TabStrip by resizing it according to the dimensions of its container."
slug: initialize_thegrid_tabstrip_widget
---

# Initialize Grids in TabStrips

The example below demonstrates how to use the `activate` event when initializing the Grid within the TabStrip so as it is resized according to the dimensions of its container.

> **Important**  
>
> In addition to the Kendo UI TabStrip, this example can be applied to the PanelBar and Window widgets, which, too, act as hidden containers for the Grid.

###### Example

```html
     <body>
      <button id="openBtn">Open</button>

      <div id="tabstrip">
        <ul>
          <li id="tab1">Tab 1</li>
          <li id="tab2">Tab 2</li>
        </ul>
        <div><div id="grid"></div></div>
        <div>Content 2</div>
      </div>

      <script src="http://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
      <script>
        var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");

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
          tabstrip.one("activate", function() {
          	grid.resize();
          });

          $("#openBtn").click(function(e) {
          	tabstrip.expand($("#tab1"));
          });
        </script>
    </body>
```

## See Also

Other related articles and how-to examples on Kendo UI TabStrip:

* [Initialize the Grid inside a Hidden Container](/web/grid/appearance#initialize-the-grid-inside-a-hidden-container)    
* [JavaScript API Reference: Configure TabStrip Animations](/api/javascript/ui/tabstrip#configuration-animation)
* [How to Add Close Button to Tabs]({% slug howto_addclosebuttontotabs_tabstrip %})
* [How to Disable TabStrip Content Scrolling]({% slug howto_disablecontentscrolling_tabstrip %})
* [How to Display Buttons at the Bottom]({% slug howto_displaybuttonsatthebottom_tabstrip %})
* [How to Expand to 100% Height and Auto-Resize]({% slug howto_expandto100percentheightautoresize_tabstrip %})
* [How to Scroll TabStrip with Keyboard]({% slug howto_scrolltabstripwithkeyboard_tabstrip %})
