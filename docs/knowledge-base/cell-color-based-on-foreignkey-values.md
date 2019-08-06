---
title: Set Cell Color Based on ForeignKey Values in the Grid
page_title: ForeignKey Values Cell Color | Kendo UI Grid for jQuery
description: "An example on how to set the color of a text cell based on ForeignKey values in the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/cell-color-based-on-foreignkey-values, /controls/data-management/grid/how-to/Layout/cell-color-based-on-foreignkey-values
slug: howto_set_cell_color_basedon_foreignkey_values_grid
tags: grid, cell, color, foreignkey, values
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress  Kendo UI Grid for jQuery</td>
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

How can I set the color of a text cell based on ForeignKey values in the Grid?

## Solution

The following example demonstrates how to set the color of a text cell based on ForeignKey values in the Grid.

```dojo
    <style>
    .red{
    	color:red;
    }

    .green {
    	color:green;
    }
    </style>
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js" type="text/javascript"></script>
    <div id="example">
      <div id="grid"></div>

      <script>
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

        $(document).ready(function () {
          var dataSource = new kendo.data.DataSource({
            pageSize: 20,
            data: products,
            autoSync: true,
            schema: {
              model: {
                id: "ProductID",
                fields: {
                  ProductID: { editable: false, nullable: true },
                  ProductName: { validation: { required: true} },
                  CategoryID: { field: "CategoryID", type: "number", defaultValue: 1 },
                  UnitPrice: { type: "number", validation: { required: true, min: 1} }
                }
              }
            }
          });

          $("#grid").kendoGrid({
            dataSource: dataSource,
            filterable: true,
            groupable: true,
            pageable: true,
            height: 540,
            toolbar: ["create"],
            columns: [
              { field: "ProductName", title: "Product Name" },
              { field: "CategoryID", width: "200px", values: categories, title: "Category",attributes: {
                class: "#=ProductID % 2 ? 'red' : 'green' # #console.log(data)#"
              },
               template:  function(dataItem) {
                 var value = dataItem.CategoryID;

                 var text = $.grep(categories, function(item) {                                 
                   return item.value == value;
                 })[0].text;

                 return text;
               }
              },
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "200px" },
              { command: "destroy", title: " ", width: "150px"}],
            editable: true
          });
        });
      </script>
    </div>

```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
