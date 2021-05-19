---
title: Make Grid Cells Temporarily Blink Depending on DataItem Property
description: An example on how to make one of the Kendo UI Grid cells in a row blink if a certain condition is met.
type: how-to
page_title: Make Cells Temporarily Blink Depending on the DataItem Property | Kendo UI Grid for jQuery
slug: grid-blink-cell
tags: grid, blink, cell, highlight, background, color, css
ticketid: 1156788
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
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

How can I make some of the Grid cells blink by changing their background color if one of its properties matches certain criteria?

## Solution

1. Use the Kendo UI templates to check if a Boolean property is set to `true` and assign HTML classes to the relevant elements.
1. Subscribe to the `dataBound` event to manipulate the colors at the desired time intervals.

```dojo
<script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

<div id="example">
  <div id="grid"></div>

  <script>
    $(document).ready(function() {
      $("#grid").kendoGrid({
        dataSource: {
          data: products,
          schema: {
            model: {
              fields: {
                ProductName: {
                  type: "string"
                },
                UnitPrice: {
                  type: "number"
                },
                UnitsInStock: {
                  type: "number"
                },
                Discontinued: {
                  type: "boolean"
                }
              }
            }
          },
          pageSize: 20
        },
        height: 550,
        scrollable: true,
        sortable: true,
        filterable: true,
        pageable: {
          input: true,
          numeric: false
        },
        columns: [{
            field: "ProductName",
            template: "# if (!Discontinued) { # #=ProductName# # } else {# <span class='highlight'> #=ProductName# </span> #}#"
          },
          {
            field: "UnitPrice",
            title: "Unit Price",
            format: "{0:c}",
            width: "130px"
          },
          {
            field: "UnitsInStock",
            title: "Units In Stock",
            width: "130px"
          },
          {
            field: "Discontinued",
            width: "130px",
            hidden: true
          }
        ],
        dataBound: function() {
          $(".highlight").parents('td').css("background-color", "yellow");

          setTimeout(function() {
            $(".highlight").parents('td').css("background-color", "");
          }, 3000);

          //re-reading the datasource to check how the flashing would look like
          setTimeout(function() {
            $("#grid").data("kendoGrid").dataSource.read();
          }, 5000);
        }
      });
    });
  </script>
```

## See Also

* [API Reference of the dataBound Event](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound)
* [Overview of the Kendo UI Templates](https://docs.telerik.com/kendo-ui/framework/templates/overview)
