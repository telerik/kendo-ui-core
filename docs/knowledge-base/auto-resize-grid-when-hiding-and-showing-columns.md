---
title: Resize to Match the Visible Column Widths When Hiding or Showing Grid Columns
page_title:  Resize When Hiding Columns | Kendo UI Grid for jQuery
description: "An example on how to match the visible column widths when hiding or showing columns in the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/Layout/auto-resize-grid-when-hiding-and-showing-columns
slug: howto_resize_grid_when_hiding_columns_grid
tags: grid, match, visible, column, width
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
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I resize the Grid to match the visible column widths when hiding or showing columns while the sum of the column widths is less than the initial width of the Grid?

## Solution 1

You could enforce a min-width style to the table element using only CSS:

```
  <style>
    #grid table {
      min-width:100%;
    }
  </style>
```

```dojo
   <style>
    #grid table {
      min-width:100%;
    }
  </style>
	<div id="example">
      <div id="grid"></div>

      <script>
        $(document).ready(function() {
          var grid = $("#grid").kendoGrid({
            dataSource: {
              type: "odata",
              transport: {
                read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
              },
              schema: {
                model: {
                  fields: {
                    OrderID: { type: "number" },
                    ShipCountry: { type: "string" },
                    ShipName: { type: "string" },
                    ShipAddress: { type: "string" }
                  }
                }
              },
              pageSize: 30,
              serverPaging: true,
              serverFiltering: true,
              serverSorting: true
            },
            height: 550,
            sortable: true,
            filterable: true,
            columnMenu: true,
            pageable: true,
            columns: [ {
              field: "OrderID",
              title: "Order ID",
              width: 120
            }, {
              field: "ShipCountry",
              title: "Ship Country",
              width: 320
            }, {
              field: "ShipName",
              title: "Ship Name",
              width: 320
            },  {
              field: "ShipAddress",
              filterable: false,
              width: 320
            }
                     ]
          }).data('kendoGrid');
        });
      </script>
    </div>
```

## Solution 2

This approach prevents the appearance of white space in the widget when the sum of the widths of the visible columns is less than the initial width of the Grid.

1. Store the initial width of the Grid in a variable.
1. To call the method that performs the necessary calculations, use the [`dataBound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound), [`columnShow`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/columnshow), and [`columnHide`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/columnhide) events.

To access and loop through the columns, the `setGridWidth()` method:
* Uses the [`columns`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#fields-columns) field of the Grid.
* Calculates the sum of the visible column widths.
* Adds the width of the vertical scrollbar when necessary.

```dojo
	<div id="example">
      <div id="grid"></div>

      <script>
        $(document).ready(function() {
          var initialGridWidth;
          function setGridWidth(e){
            var cols = e.sender.columns;
            var currentColWidth = cols.reduce(function(prev, cur){
              if(!cur.hidden){
                return prev += cur.width;
              } else {
                return prev;
              }
            }, 0);

            if(currentColWidth > initialGridWidth){
              e.sender.wrapper.width(initialGridWidth);
            } else {
              e.sender.wrapper.width(currentColWidth + kendo.support.scrollbar());
            }
          }

          var grid = $("#grid").kendoGrid({
            dataSource: {
              type: "odata",
              transport: {
                read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
              },
              schema: {
                model: {
                  fields: {
                    OrderID: { type: "number" },
                    ShipCountry: { type: "string" },
                    ShipName: { type: "string" },
                    ShipAddress: { type: "string" }
                  }
                }
              },
              pageSize: 30,
              serverPaging: true,
              serverFiltering: true,
              serverSorting: true
            },
            height: 550,
            sortable: true,
            dataBound: function(e){
              setGridWidth(e);
            },
            columnShow: function(e){
              setGridWidth(e);
            },
            columnHide: function(e){
              setGridWidth(e);
            },
            filterable: true,
            columnMenu: true,
            pageable: true,
            columns: [ {
              field: "OrderID",
              title: "Order ID",
              width: 120
            }, {
              field: "ShipCountry",
              title: "Ship Country",
              width: 320
            }, {
              field: "ShipName",
              title: "Ship Name",
              width: 320
            },  {
              field: "ShipAddress",
              filterable: false,
              width: 320
            }
                     ]
          }).data('kendoGrid');

          initialGridWidth = grid.wrapper.width();
        });
      </script>
    </div>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
