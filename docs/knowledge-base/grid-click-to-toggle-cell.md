---
title: Toggle Content of Cell on Click
description: An example on how to toggle the contents of a Grid's cell on click
type: how-to
page_title: Toggle Content of Cell on Click
slug: grid-click-to-toggle-cell
tags: grid, click, toggle, cell, content
ticketid: 1153472
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

I'm working on an application that uses the Kendo UI Grid and would like to Click on a Cell to toggle its contents between two different properties of the DataItem

## Solution

The described functionality can be implemented by using a Kendo UI Template for the cell, that shows different properties depending on the value of a boolean field; when clicked, we change said value and the Template will update automatically:

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
                },
                QuantityPerUnit: {
                  type: "string"
                }
              }
            },
            parse: function(response) {
              var products = [];
              for (var i = 0; i < response.length; i++) {
                var product = {
                  ProductName: response[i].ProductName,
                  UnitPrice: response[i].UnitPrice,
                  UnitsInStock: response[i].UnitsInStock,
                  Discontinued: false,
                  QuantityPerUnit: response[i].QuantityPerUnit
                };
                products.push(product);
              }
              return products;
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
            template: "<div onclick='cellClick(this)'><a>#if(Discontinued){# - <b>Quantity per unit:</b> #: QuantityPerUnit # #}else{# #: ProductName # #}#</a></div>",
            title: "<b>Product Name</b> (Click to see quantity per unit)"
          },
          {
            field: "UnitPrice",
            title: "Unit Price",
            format: "{0:c}",
            width: "230px"
          },
          {
            field: "UnitsInStock",
            title: "Units In Stock",
            width: "230px"
          },
          {
            field: "Discontinued",
            hidden: true
          },
          {
            field: "QuantityPerUnit",
            hidden: true
          }
        ]
      });
    });

    //We use the discontinued variable to Toggle between properties in cell
    function cellClick(e) {
      var grid = $("#grid").data("kendoGrid");
      var dataItem = grid.dataItem($(e).closest("tr"));
      if (dataItem.Discontinued) {
        dataItem.set("Discontinued", false);
      } else {
        dataItem.set("Discontinued", true);
      }
    }
  </script>
</div>
```

## See Also

* [Kendo UI Templates Overview.](https://docs.telerik.com/kendo-ui/framework/templates/overview)
