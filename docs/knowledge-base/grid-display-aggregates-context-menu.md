---
title: How To Display Aggregates in the Footer Based on Selection in ContextMenu in the Grid
description: Learn how to add custom ContextMenu commands and display aggregates in the footer in Kendo UI Grid
type: how-to
page_title: Add Custom ContextMenu Commands and Display Aggregates in the Footer - Kendo UI PanelBar for jQuery
slug: grid-display-aggregates-context-menu
tags: grid, contextmenu, aggregates, custom, command
ticketid: 1607509 
res_type: kb
components: ["grid"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
</table>

## Description

I want to add custom commands in the Grid context menu. Based on the selection in the context menu I would like to display aggregates in the Grid footer.

## Solution

1. To achieve the desired behavior you can add a [`footerTemplates`](/api/javascript/ui/grid/configuration/columns.footertemplate) in the columns with an empty `span` element with custom class.
1. You can also add custom commands to the [`contextMenu.body`](/api/javascript/ui/grid/configuration/contextmenu.body).
1. When an item in the ContextMenu is selected you can find the current column index and the field of the selected column.
1. Based on the selected custom command you can find the needed aggregate and construct a string containing the needed information. You can use that string to change the content of the footer template of the respective column. 

```dojo
    <div id="grid"></div>

    <script>
      $(document).ready(function () {

        var dataSource = new kendo.data.DataSource({
          transport: {
            read: "https://demos.telerik.com/service/v2/core/Orders"
          },
          schema: {
            model: {
              fields: {
                OrderID: { type: "number" },
                Freight: { type: "number" },
                ShipName: { type: "string" },
                OrderDate: { type: "date" },
                ShipCity: { type: "string" }
              }
            }
          },
          pageSize: 10,
          aggregate: [
            { field: "Freight", aggregate: "sum" },
            { field: "Freight", aggregate: "average" },
            { field: "OrderID", aggregate: "sum" },
            { field: "OrderID", aggregate: "average" }
          ]
        });

        $("#grid").kendoGrid({
          dataSource: dataSource,
          contextMenu: {
            body: [
              { name: "MyCustomPrevPage", text: "Average", icon: "formula-fx", command: "CustomAvgCommand" },
              { name: "MyCustomNextPage", text: "Total", icon: "sum", command: "CustomTotalCommand" }                        
            ]
          },
          editable: false,
          pageable: true,
          columns: [
            {
              field:"OrderID",               
              footerTemplate: "<span class='ft'></span>",
            },
            {
              field: "ShipCity",
              title: "Ship City",
              footerTemplate: "<span class='ft'></span>",
            },
            {
              field: "Freight",
              title: "Freight",
              footerTemplate: "<span class='ft'></span>",
            }
          ]          
        });


        kendo.ui.grid.commands["CustomTotalCommand"] = kendo.ui.grid.GridCommand.extend({
          exec: function () {
            let that = this,
                grid = that.grid,
            		target = this.options.target,
            		colindex = $(target).index(),
            		currentField = $("#grid").data('kendoGrid').options.columns[colindex].field,
                aggregates = $("#grid").data('kendoGrid').dataSource.aggregates(),
                aggregatesCurrentField = aggregates[currentField],
                currentAggr = '',
                content = '';

            if(aggregatesCurrentField){
               currentAggr = aggregatesCurrentField.sum,
              content = "Total : " + currentAggr;
            }else{
              content = 'No such aggr'
            }            
            
            $('.ft:eq('+ colindex +')').text(content)         
          }
        });

        kendo.ui.grid.commands["CustomAvgCommand"] = kendo.ui.grid.GridCommand.extend({
          exec: function () {
            let that = this,
                grid = that.grid,
            		target = this.options.target,
            		colindex = $(target).index(),
            		currentField = $("#grid").data('kendoGrid').options.columns[colindex].field,
                aggregates = $("#grid").data('kendoGrid').dataSource.aggregates(),
                aggregatesCurrentField = aggregates[currentField],
                currentAggr = '',
                content = '';
         
            if(aggregatesCurrentField != undefined){
              currentAggr = aggregatesCurrentField.average
              content = "Average : " + currentAggr;
            }else{
              content = 'No such aggr'
            }
            
            $('.ft:eq('+ colindex +')').text(content)    
          }
        });

      });
    </script>
```

## See Also

* [Grid API Reference](/api/javascript/ui/grid)
* [Grid Context Menu](https://docs.telerik.com/kendo-ui/controls/grid/context-menu)
* [Grid Context Menu Demo](https://demos.telerik.com/kendo-ui/grid/context-menu)
