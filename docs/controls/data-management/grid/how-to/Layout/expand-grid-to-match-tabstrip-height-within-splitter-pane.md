---
title: Expand Grids to Match the Height of TabStrip Containers within Splitter Panes
page_title: Expand Grids to Match the Height of TabStrip Containers within Splitter Panes | Kendo UI Grid
description: "Learn how to expand Kendo UI Grids that are located in Kendo UI TabStrip containers within a Kendo UI Splitter pane."
slug: howto_expandtomatchtabstripinsplitter_grid
---

# Expand Grids to Match the Height of TabStrip Containers within Splitter Panes

To expand a Kendo UI Grid in height so it matches the height if its Kendo UI TabStrip container within a Kendo UI Splitter pane, take the following steps:
* Make sure that the layout of the Splitter corresponds to the requirements of your project. If the Splitter has to expand to 100% in height, [resize it]({% slug overview_kendoui_splitter_widget %}##set-a-100-height-and-auto-resize).
* Expand the height of the TabStrip containers by using the approach in the [how-to example]({% slug howto_expandto100percentheightautoresize_tabstrip %}), which relies on the `window.resize` event. In this case, however, the [`resize` event has to be of the closest Splitter instance](http://docs.telerik.com/kendo-ui/api/javascript/ui/splitter#events-resize).
* Assuming that its `<div>` is 100% high and automatically expands vertically, call the `resize()` method of the Grid.   
For more information on how to resize individual Kendo UI widgets, refer to [this article]({% slug responsivewebdesign_integration_kendoui %}#individual-widget-resizing).   
For more information on how to set the Grid to 100% height and auto-resize it, refer to [this this article]({% slug appearance_kendoui_grid_widget %}#set-a-100-height-and-auto-resize).

> **Important**
>
> Note that the `resize` method of the Splitter will measure the height of the Grid's `<div>` and will not adjust the height of the scrollable data area because after the Splitter fires its `resize` event, you have to adjust the layout of the TabStrip. Only after that can you call the `resize` method of the Grid.

The example below demonstrates how to expand Kendo UI Grids that are located in Kendo UI TabStrip containers within a Kendo UI Splitter pane.

###### Example

```html
    <style>
        html,
        body,
          #splitter,
          #grid,
          #tabstrip-parent,
          #tabstrip {
              margin: 0;
              padding: 0;
              border-width: 0;
              height: 100%; /* DO NOT USE !important for setting the Grid height! */
            }

        html
            {
            font: 14px sans-serif;
            overflow: hidden;
            }
    </style>

        <div id="splitter">
        <div id="left-pane">left pane</div>
        <div id="right-pane">
        <div id="tabstrip">
           <ul>
             <li class="k-state-active">Item 1</li>
             <li>Item 2</li>
           </ul>
         <div style="padding:0;overflow:hidden">
           <div id="grid"></div>
         </div>
         <div>
           Content 2
         </div>
        </div>
        </div>
        </div>

    <script>

        function expandContentDivs(divs) {
        var visibleDiv = divs.filter(":visible");

        var verticalSpace = tabStripElement.innerHeight()
                   - tabStripElement.children(".k-tabstrip-items").outerHeight()
                   - parseFloat(visibleDiv.css("padding-top"))
                   - parseFloat(visibleDiv.css("padding-bottom"))
                   - parseFloat(visibleDiv.css("border-top-width"))
                   - parseFloat(visibleDiv.css("border-bottom-width"))
                   - parseFloat(visibleDiv.css("margin-bottom"));

        divs.height(Math.floor(verticalSpace));
        // all of the above padding/margin/border calculations can be replaced by a single hard-coded number for improved performance
          }

        function resizeTabsAndGrid() {
        if (tabStripElement) {
           expandContentDivs(tabStripElement.children(".k-content"));
          }

        var grid = $("#grid").data("kendoGrid");
        if (grid && grid.wrapper.is(":visible")) {
         grid.resize();
            }
          }

        $("#splitter").kendoSplitter({
        //resize: resizeTabAndGrid, // the nested widgets are not initialized yet, will attach the handler later
          panes: [
               { size: 100 },
               { scrollable: false }
            ]
          });

        $("#grid").kendoGrid({
          dataSource: {
             type: "odata",
             transport: {
               read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
           },
             schema: {
               model: {
                 fields: {
                   OrderID: { type: "number" },
                   ShipName: { type: "string" },
                   ShipCity: { type: "string" }
               }
             }
           },
                 pageSize: 25,
                 serverPaging: true,
                 serverFiltering: true,
                 serverSorting: true
              },
                filterable: true,
                sortable: true,
                resizable: true,
                pageable: true,
                columns: [{
                   field:"OrderID",
                   filterable: false,
                   width: 200
              },
               "ShipName",
               "ShipCity"
                  ]
          });

        var tabStripElement = $("#tabstrip").kendoTabStrip({
            activate: resizeTabsAndGrid,
            animation: {
             open: {
               effects: "fade"
             }
            }
        });

        tabStripElement.parent().attr("id", "tabstrip-parent");

        var tabStrip = tabStripElement.data("kendoTabStrip");

        var splitter = $("#splitter").data("kendoSplitter");
        splitter.bind("resize", resizeTabsAndGrid);
        resizeTabAndGrid();

    </script>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples related to its layout:

* [Kendo UI Grid JavaScript API Reference](/api/javascript/ui/grid)
* [How to Adjust Row Height with Virtual Scrolling]({% slug howto_adjust_row_height_withvirtual_scrolling_grid %})
* [How to Apply Minimum Width during Column Resize]({% slug howto_apply_min_width_during_column_resize_grid %})
* [How to Change Group Header Position with Locked Columns]({% slug howto_change_group_header_position_wthlocked_columns_grid %})
* [How to Create and Use Auto Layout]({% slug howto_create_and_use_autolayout_grid %})
* [How to Disable Resizing for Specific Columns]({% slug howto_disable_column_resizing_grid %})
* [How to Hide the Vertical Scrollbar When Not Needed]({% slug howto_hide_vertical_scrollbar_grid %})
* [How to Use FontAwesome Icons in Custom Command Buttons]({% slug howto_use_fontawesomeiconsin_custom_command_buttons_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
