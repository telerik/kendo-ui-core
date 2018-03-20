---
title: Make Grid Cell Blink Temporarily Depending on DataItem Property
description: An example on how to make one of the cells in a row blink if a certain condition is met
type: how-to
page_title: Make Grid Cell Blink Temporarily Depending on DataItem Property
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

I'm working on an application that uses the Kendo UI Grid and I would like to have some cells blink by changing their background color if one of its properties matches certain criteria.

## Solution

In order to implement the functionality you describe we take advantage of Kendo UI Templates to check if a boolean property is set to true and assign HTML classes to the relevant elements; then, by subscribing to the `dataBound` event, we can manipulate their colors at intervals of time of our choosing:

```html
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

* [dataBound event API Reference.](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound)
* [Kendo UI Templates Overview.](https://docs.telerik.com/kendo-ui/framework/templates/overview)
