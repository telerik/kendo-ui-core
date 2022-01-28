---
title: Expand Grids to Match the Height of TabStrip Containers within Splitter Panes
page_title: Match TabStrip Container Height | Kendo UI Grid for jQuery
description: "An example on how to expand the Kendo UI Grid for jQuery when it is located in a TabStrip container within a Splitter pane."
previous_url: /controls/data-management/grid/how-to/Layout/expand-grid-to-match-tabstrip-height-within-splitter-pane
slug: howto_expandtomatchtabstripinsplitter_grid
tags: grid, expand, match, height, tabstrip, container, splitter, pane
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

Your project might require you to expand the height of the Grid to match the height of its TabStrip container within a Splitter pane.

## Solution

To achieve this behavior:
* Make sure that the layout of the Splitter corresponds to the requirements of your project. If the Splitter has to expand to 100% in height, [resize it]({% slug overview_kendoui_splitter_widget %}##set-a-100-height-and-auto-resize).
* Expand the height of the TabStrip containers by using the approach in the [how-to example]({% slug howto_expandto100percentheightautoresize_tabstrip %}), which relies on the `window.resize` event. In this case, however, the [`resize` event has to be of the closest Splitter instance](https://docs.telerik.com/kendo-ui/api/javascript/ui/splitter/events/resize).
* Assuming that its `<div>` is 100% high and automatically expands vertically, call the `resize()` method of the Grid.   
For more information on how to resize individual Kendo UI widgets, refer to [this article]({% slug responsivewebdesign_integration_kendoui %}#individual-widget-resizing).   
For more information on how to set the Grid to 100% height and auto-resize it, refer to [this this article]({% slug height_kendoui_grid_widget %}).

> The `resize` method of the Splitter measures the height of the Grid's `<div>` element. It does not adjust the height of the scrollable data area because after the Splitter fires its [`resize`](/api/javascript/ui/splitter/events/resize) event, you have to adjust the layout of the TabStrip. Only after that can you call the `resize` method of the Grid.

The following example demonstrates how to expand a Grid that is located in a TabStrip container within a Splitter pane.

```dojo
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
               read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
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

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
