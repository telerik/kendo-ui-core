---
title: Displaying Dynamic Image Count in Buttons within Kendo UI for jQuery Grid Rows
description: Learn how to add a dynamic image count in a circle to buttons in each row of a Kendo UI for jQuery Grid.
type: how-to
page_title: How to Add Dynamic Image Count Badges to Buttons in Kendo UI for jQuery Grid Rows
slug: dynamic-image-count-in-buttons-kendo-ui-jquery-grid
tags: kendo, ui, jquery , grid, button, dynamic, image, count, badge
res_type: kb
ticketid: 1672491
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery Grid</td>
</tr>
<tr>
<td>Version</td>
<td>2024.4.1112</td>
</tr>
</tbody>
</table>

## Description

I need to update the button label in each row of a Kendo UI for jQuery Grid to include the image count. The image count, displayed within a circle, should be dynamic for each row, varying according to the data item associated with the row.

This knowledge base article also answers the following questions:
- How can I display a badge with a dynamic number on a button inside a Kendo UI for jQuery Grid?
- What is the way to include dynamic content in button labels in a Kendo UI for jQuery Grid?
- Can I use a badge to show dynamic data on buttons within a Kendo UI for jQuery Grid?

## Solution

To achieve the dynamic display of an image count in a badge shape on buttons within the Kendo UI for jQuery Grid rows, you can utilize the Kendo UI for jQuery Button with a badge configuration. This approach involves customizing the `dataBound` event of the Grid to iterate through each row and update the button's badge text based on the data item's specific property. 

The following example demonstrates how to dynamically update the button's label with an image count in a circle for each row:

```dojo
<div id="example">
      <div id="grid"></div>

      <script>
        $(document).ready(function () {
          var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
              dataSource = new kendo.data.DataSource({
                transport: {
                  read:  {
                    url: crudServiceBaseUrl + "/Products",
                    dataType: "jsonp"
                  },
                },
                pageSize: 20,
              });

          $("#grid").kendoGrid({
            dataSource: dataSource,
            pageable: true,
            height: 550,
            columns: [
              "ProductName",
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120 },
              { field: "Discontinued", width: 120 },
              { command: { 
                template: "<button class='button' type='button'>Units In Stock</button>"
              }, title: " ", width: "150px" }
            ],
            dataBound: function() {
              var grid = this;
              grid.table.find("tr").each(function () {
                var dataItem = grid.dataItem(this);

                $(this).find(".button").kendoButton({
                  badge: {
                    text: dataItem.UnitsInStock,
                    shape: "circle",
                  }
                });
              });
            }
          });
        });
      </script>

      <style type="text/css">
        .k-grid tbody tr {
          line-height: 28px;
        }
      </style>
    </div>
```

Ensure to replace `UnitsInStock` with the field name from your data source that contains the image count for each row.

## See Also

- [Kendo UI for jQuery Grid Overview](https://docs.telerik.com/kendo-ui/controls/grid/overview)
- [Kendo UI for jQuery Button Overview](https://docs.telerik.com/kendo-ui/controls/button/overview)

