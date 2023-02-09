---
title: Get the Selected Grid Rows Data
description: Learn how to get the dataItem for every selected row by using the change event of the Kendo UI Grid.
type: how-to
page_title: Get the DataItems of the Selected Rows - Kendo UI Grid for jQuery
slug: checkbox-selection-dataitems-selected-rows
tags: checkbox selection, grid, kendo ui
ticketid: 1116716
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Tested up to version 2017.2 621</td>
 </tr>
</table>

## Description

I want to create a shopping list by using the selected Grid rows and a Kendo UI ListBox. How can I achieve this functionality?

> The following example obtains the selected rows of the current page only.

## Solution

To get the `dataItem` for each selected row:

1. In the [`change`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/change) event handler, get and save the rows in a variable by using the [`select`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/select) method.
1. Loop through the rows by using the [`each`](https://api.jquery.com/each/) jQuery method.
1. Get every row data by using the [`dataItem`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/dataitem) method.
1. Push the `dataItem` to an array.
1. Add the selected items to the ListBox widget by using the [`data`](/api/javascript/data/datasource/methods/data) method.

```dojo
    <div id="example">
      <div id="grid"></div>
      <select id="listBox" style="width:856px;"></select>

      <script>
        function onChange(e) {
          var rows = e.sender.select(),
              items = [];

          rows.each(function(e) {
            var grid = $("#grid").data("kendoGrid");
            var dataItem = grid.dataItem(this);
            items.push(dataItem);
          });

          var listBox = $("#listBox").data("kendoListBox");
          listBox.dataSource.data(items);
        };

        $(document).ready(function() {
          $("#grid").kendoGrid({
            dataSource: {
              pageSize: 10,
              transport: {
                read: {
                  url: "https://demos.telerik.com/kendo-ui/service/Products",
                  dataType: "jsonp"
                }
              },
              schema: {
                model: {
                  id: "ProductID"
                }
              }
            },
            pageable: true,
            scrollable: false,
            persistSelection: true,
            sortable: true,
            change: onChange,
            columns: [{
              selectable: true,
              width: "50px"
            },
                      {
                        field: "ProductName",
                        title: "Product Name"
                      },
                      {
                        field: "UnitPrice",
                        title: "Unit Price",
                        format: "{0:c}"
                      },
                      {
                        field: "UnitsInStock",
                        title: "Units In Stock"
                      },
                      {
                        field: "Discontinued"
                      }
                     ]
          });

          $("#listBox").kendoListBox({
            dataSource: {
              data: []
            },
            template: "<div>#:ProductName# - $#:UnitPrice#</div>"
          });
        });
      </script>
    </div>
```

### Notes

The checkbox selectable column is available as of the Kendo UI R2 2017 SP1 release.

## Get the Selected Rows Data Across All Grid Pages

1. Get the `id` field values of the selected rows through the [`selectedKeyNames()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/selectedkeynames) method.
2. Traverse the Grid data to match the data items holding these `id` values.
3. Push the `dataItems` of the selected rows to an array.
4. Add the selected items to the ListBox widget by using the [`data`](/api/javascript/data/datasource/methods/data) method.

```dojo
    <div id="example">
      <button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" onclick="getSelectedRowsData()"><span class="k-button-text">Update List</span></button>
      <div id="grid"></div>
      <h4>Shopping List</h4>
      <select id="listBox" style="width:856px;"></select>

      <script>
        $(document).ready(function() {
          $("#grid").kendoGrid({
            dataSource: {
              pageSize: 10,
              transport: {
                read: {
                  url: "https://demos.telerik.com/kendo-ui/service/Products",
                  dataType: "jsonp"
                }
              },
              schema: {
                model: {
                  id: "ProductID"
                }
              }
            },
            pageable: true,
            scrollable: false,
            persistSelection: true,
            sortable: true,
            columns: [
              {
                selectable: true,
                width: "50px"
              },
              {
                field: "ProductName",
                title: "Product Name"
              },
              {
                field: "UnitPrice",
                title: "Unit Price",
                format: "{0:c}"
              },
              {
                field: "UnitsInStock",
                title: "Units In Stock"
              },
              {
                field: "Discontinued"
              }
            ]
          });

          $("#listBox").kendoListBox({
            dataSource: {
              data: []
            },
            template: "<div>#:ProductName# - $#:UnitPrice#</div>"
          });
        });

        function getSelectedRowsData() {
          //Get the id field values of the selected rows
          var keyNames = $("#grid").data("kendoGrid").selectedKeyNames();
          // convert string values to number
          var ids = keyNames.map(function (x) {
            return parseInt(x, 10);
          });
          var gridData = $("#grid").data("kendoGrid").dataSource.data();
          var selected =[];
          ids.forEach(function(number) {
            gridData.forEach(function(dataItem) {
              if(number === dataItem.id) {
                selected.push(dataItem)
              }
            })
          });
          var listBox = $("#listBox").data("kendoListBox");
          listBox.dataSource.data(selected);
        }
      </script>
    </div>
```

## See Also

* [Frequently Asked Questions on Checkbox Selection]({% slug frequently_asked_questions_grid %})
* [Grid Checkbox Selection Demo](https://demos.telerik.com/kendo-ui/grid/checkbox-selection)
* [API Reference for the columns.selectable Configuration](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.selectable)
