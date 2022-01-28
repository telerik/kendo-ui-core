---
title: Use Grid Filtering with Dynamic Default Values
page_title: Filter with Dynamic Default Values | Kendo UI Grid for jQuery
description: "An example on how to use dynamic default field values in the jQuery Grid by Kendo UI when you apply its filtering functionality."
previous_url: /controls/data-management/grid/how-to/use-filtering-with-dynamic-default-values, /controls/data-management/grid/how-to/filtering/use-filtering-with-dynamic-default-values
slug: howto_gridfiltering_dynamicdefaultvalues_grid
tags: use, grid, filtering, dynamic, default, values
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

How can I use dynamic default field values in the jQuery Grid by Kendo UI when its filtering functionality is applied?

## Solution

Your project might require you to apply a specific approach to the Grid when you use its filtering functionality.

For example, you might need to:
* Display the filtered filed value as default when a new record is added.
* Show the latest record that is added to the Grid.

The following example demonstrates how to use dynamic default field values in a Grid when you apply its filtering functionality. To see how it works:
1. Filter the Grid by its **Category** column in a way it is equal to a given value.
2. Click **Add new record**.

As a result, the default category of the new record matches the current (filtered) category and a new row is added to the Grid.

```dojo
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
              schema: {
                model: {
                  id: "ProductID",
                  fields: {
                    ProductID: { editable: false, nullable: true },
                    ProductName: { validation: { required: true} },
                    CategoryID: {
                      field: "CategoryID",
                      type: "number",
                      defaultValue: function(e) {
                        if(typeof this.CategoryID === "function") {
                          var grid = $("#grid").data("kendoGrid");
                          var ds = grid.dataSource;
                          var filter = ds.filter();

                          if(filter && filter.filters[0].field === "CategoryID") {
                            return filter.filters[0].value;
                          } else {
                            return 1;
                          }
                        }
                      }
                    },
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
                { field: "ProductName", title: "Product Name", filterable: false },
                { field: "CategoryID", width: "200px", values: categories, title: "Category" },
                { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "200px" , filterable: false},
                { command: "destroy", title: " ", width: "110px"}],
              editable: "popup"
            });
          });
        </script>
          </div>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
