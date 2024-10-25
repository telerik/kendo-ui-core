---
title: Update Aggregates on Change
page_title: Update Aggregates on Change - Kendo UI for jQuery Data Grid
description: "Learn how to update the aggregates shown by the Kendo UI jQuery Grid when a value is changed."
previous_url: /controls/data-management/grid/how-to/update-aggregates-on-change, /controls/data-management/grid/how-to/various/update-aggregates-on-change
slug: howto_update_aggregatesonchange_grid
tags: update, aggregates, when, value, changes, grid
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
</table>

## Description

How can I re-draw only the Grid footer while the group footers show the new aggregates without rebinding the entire Grid?

## Solution

To achieve the desired scenarion, use the following suggested implemetation. Note that upon changing the group fields, the Grid requires a full refresh.

```dojo

    <div id="grid"></div>
    <script>
      $(document).ready(function() {
        var categories = [{
          "value": 1,
          "text": "Beverages"
        },{
          "value": 2,
          "text": "Condiments"
        },{
          "value": 3,
          "text": "Confections"
        },{
          "value": 4,
          "text": "Dairy Products"
        },{
          "value": 5,
          "text": "Grains/Cereals"
        },{
          "value": 6,
          "text": "Meat/Poultry"
        },{
          "value": 7,
          "text": "Produce"
        },{
          "value": 8,
          "text": "Seafood"
        }];
        $("#grid").kendoGrid({
          dataSource: {
            type: "odata",
            transport: {
              read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
            },
            schema:{
              model: {
                fields: {                    
                  ProductName: { type: "string" },
                  UnitPrice: { type: "number" },
                  UnitsOnOrder: { type: "number" },
                  CategoryID: { type: "number" }
                }
              }
            },
            pageSize: 20,
            group: [{
              field: "CategoryID", aggregates: [
                { field: "UnitPrice", aggregate: "sum" }
              ],
            }, {
              field: "UnitsOnOrder", aggregates: [
                { field: "UnitPrice", aggregate: "sum" }
              ]
            }],
            aggregate: [{ field: "UnitPrice", aggregate: "sum" }],

            change: function (e) {
              if (e.field && e.action == "itemchange") {
                var grid = $("#grid").data("kendoGrid");
                var model = e.items[0];
                var groupFooterIndex = 0;
                var groupFooters = grid.tbody.children(".k-group-footer");                                    

                function updateGroupFooters(items) {
                  var updatedSubGroup;
                  var updatedElement;
                  for (var idx = 0; idx < items.length; idx++) {
                    var item = items[idx];
                    if (item.hasSubgroups) {
                      updatedSubGroup = updateGroupFooters(item.items);
                    }
                    if (updatedSubGroup || $.inArray(model, item.items) !== -1) {
                      updatedElement = true;                        
                      groupFooters.eq(groupFooterIndex).replaceWith(grid.groupFooterTemplate(item.aggregates));
                    }
                    groupFooterIndex++;                    
                  }
                  return updatedElement;
                }  

                updateGroupFooters(this.view());

                grid.footer.find(".k-footer-template").replaceWith(grid.footerTemplate(this.aggregates()));

                grid.refresh();
              }
            }
          },
          editable: true,
          sortable: true,
          scrollable: false,
          pageable: true,
          columns: [
            {field: "CategoryID", title: "Category", values: categories, hidden: true},
            { field: "ProductName", title: "Product Name" },

            { field: "UnitPrice", title: "Unit Price", aggregates: ["sum"], footerTemplate: "Sum: #=sum#",
             groupFooterTemplate: "Sum: #=sum#" }           
          ]
        });
      });
    </script>

```

## See Also

* [JavaScript API Reference of the Data Grid](/api/javascript/ui/grid)
