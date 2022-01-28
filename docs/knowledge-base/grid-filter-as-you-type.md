---
title: Filter Grid as You Type
page_title: Filter as You Type | Kendo UI Grid for jQuery
description: "An example on how to filter the jQuery Grid by Kendo UI on the fly, as the user types in the filter row textbox."
previous_url: /controls/data-management/grid/how-to/grid-filter-as-you-type, /web/grid/how-to/grid-filter-as-you-type, /controls/data-management/grid/how-to/filtering/grid-filter-as-you-type
slug: howto_filter_gridas_you_type_grid
tags: grid, filter, typing, row, textbox
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I filter the Kendo UI Grid as I type?

## Solution

Your project might require you to filter the Grid as the user types.

To achieve this behavior, provide for the following requirements:

* Enable the [row filtering mode](/api/javascript/ui/grid/configuration/filterable.mode).
* Use a custom [filter cell template](/api/javascript/ui/grid/configuration/columns.filterable.cell.template) for the desired Grid column.
* The purpose of the filter cell template is to attach a `data-value-update` attribute on the `input` event handler to the textbox (`args.element`) which will trigger the `change` event of the textbox. The `change` event will trigger the filtering functionality of the Grid.
* [Change the default `"eq"` operator](/api/javascript/ui/grid/configuration/columns.filterable.cell.operator) of the column with `"contains"`, `"startswith"` or any other [supported operator](/api/javascript/data/datasource/configuration/filter.operator).

The following example demonstrates how to filter the Grid on the fly, as the user types in the filter row textbox.

```dojo
    <div id="grid"></div>

    <script>

      $(function(){
        $("#grid").kendoGrid({
          dataSource: products,
          filterable: {
            mode: "row"
          },
          height: 400,
          columns: [{
            field: "ProductName",
            title: "Product Name",
            filterable: {
              cell: {
                operator: "contains",
                template: function (args) {
                  args.element.css("width", "90%").addClass("k-textbox").attr("data-value-update", "input");
                },
                showOperators: false
              }
            }
          }]
        });
      });

      var products = new kendo.data.DataSource({
        schema: {
          model: {
            id: "ProductID",
            fields: {
              ProductName: { type: "string" }
            }
          }
        },
        transport: {
          read: {
            url: "//demos.telerik.com/kendo-ui/service/products",
            dataType: "jsonp"
          }
        }
      });

    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
