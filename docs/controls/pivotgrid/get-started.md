---
title: Getting Started
page_title: jQuery PivotGrid Documentation - Getting Started with the PivotGrid
description: "Get started with the jQuery PivotGrid by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_pivotgrid_widget
position: 1
---

# Getting Started with the PivotGrid

This guide demonstrates how to get up and running with the Kendo UI for jQuery PivotGrid.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <div class="k-pivotgrid-wrapper">
      <div id="configurator"></div>
      <div id="pivotgrid"></div>
    </div>

    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
    <script>
      $(document).ready(function () {
        // A simple array of JSON objects.
        var data = products;
        var pivotgrid = $("#pivotgrid").kendoPivotGrid({
          filterable: true, // Enable filtering.
          sortable: true, // Enable sorting.
          columnWidth: 120, // Specify the width of each column.
          height: 570,
          dataSource: {
            data: data, // Bind to the array of json objects.
            schema: {
              model: {
                fields: {
                  ProductName: { type: "string" },
                  UnitPrice: { type: "number" },
                  UnitsInStock: { type: "number" },
                  Discontinued: { type: "boolean" },
                  CategoryName: { field: "Category.CategoryName" }
                }
              },
              cube: {
                dimensions: {
                  ProductName: { caption: "All Products" },
                  CategoryName: { caption: "All Categories" },
                  Discontinued: { caption: "Discontinued" }
                },
                // Define the measures.
                measures: {
                  "Sum": { field: "UnitPrice", format: "{0:c}", aggregate: "sum" },
                  "Average": { field: "UnitPrice", format: "{0:c}", aggregate: "average" }
                }
              }
            },
            // Configure the columns of the PivotGrid.
            columns: [{ name: "CategoryName", expand: true }, { name: "ProductName" } ],
            // Configure the rows of the PivotGrid.
            rows: [{ name: "Discontinued", expand: true }],
            // Configure the measures.
            measures: ["Sum"]
          }
        }).data("kendoPivotGrid");

        $("#configurator").kendoPivotConfigurator({
          dataSource: pivotgrid.dataSource,
          filterable: true, // Enable filtering in the configurator.
          sortable:true, // Enable sorting in the configurator.
          height: 570
        });
      });
    </script>
```

## 1. Create the HTML Structure for the Component

First, create a wrapping `div` element with the class `k-pivotgrid-wrapper`. Next, add two `div` elements—one for the PivotConfigurator and one for the PivotGrid.

```html
    <div class="k-pivotgrid-wrapper">
      <div id="configurator"></div>
      <div id="pivotgrid"></div>
    </div>
```

## 2. Initialize the PivotGrid

In this step, you will initialize the PivotGrid from the empty `<div>` element with id `pivotgrid`.

```javascript
    var pivotgrid = $("#pivotgrid").kendoPivotGrid({
        height: 570
    }).data("kendoPivotGrid");
```

## 3. Initialize the Configurator

Next, you will initialize the [PivotConfigurator](https://docs.telerik.com/kendo-ui/controls/pivotgrid/binding/configurator) from the empty `<div>` element with id `configurator`.

```javascript
    $("#configurator").kendoPivotConfigurator({
        height: 570
    });
```

## 4. Add the DataSource

With the above steps completed, you can now start populating the components with data. In this example, we are going to use an array of objects that is loaded from [this location](https://demos.telerik.com/kendo-ui/content/shared/js/products.js).

First, configure the [`dataSource`](https://docs.telerik.com/kendo-ui/api/javascript/data/pivotdatasource) in the PivotGrid component. 

```javascript
    var data = products; // The products are fetched from the above link.
    var pivotgrid = $("#pivotgrid").kendoPivotGrid({
        height: 570,
        dataSource: {
            data: data, // Bind to the array of json objects.
            schema: {
              model: {
                fields: {
                  ProductName: { type: "string" },
                  UnitPrice: { type: "number" },
                  UnitsInStock: { type: "number" },
                  Discontinued: { type: "boolean" },
                  CategoryName: { field: "Category.CategoryName" }
                }
              },
              cube: {
                // The dimensions configuration enables you to change the header titles of the columns and the rows.
                dimensions: {
                  ProductName: { caption: "All Products" },
                  CategoryName: { caption: "All Categories" },
                  Discontinued: { caption: "Discontinued" }
                },
                // The measures configuration enable you to specify the aggregates that will be used in the PivotGrid.
                measures: {
                  "Sum": { field: "UnitPrice", format: "{0:c}", aggregate: "sum" },
                  "Average": { field: "UnitPrice", format: "{0:c}", aggregate: "average" }
                }
              }
            },
            // Configure the columns of the PivotGrid.
            columns: [{ name: "CategoryName", expand: true }, { name: "ProductName" } ],
            // Configure the rows of the PivotGrid.
            rows: [{ name: "Discontinued", expand: true }],
            // Configure the measures.
            measures: ["Sum"]
          }
    }).data("kendoPivotGrid");
```

Next, copy the already configured `dataSource` over to the `configurator`. This will enable to users to modify the settings of the PivotGrid through the `configurator`.

```javascript
        $("#configurator").kendoPivotConfigurator({
          dataSource: pivotgrid.dataSource, // Use the dataSource configuration of the PivotGrid.
          height: 570
        });
```

## 5. Enable Sorting and Filtering

Among other functionalities, the PivotGrid supports sorting and filtering. The [sorting]({% slug sorting_kendoui_pivotgrid %}) configuration enables users to sort the data. The [filtering]({% slug filtering_kendoui_pivotgrid %}) configuration enables users to filter the data.

The user can sort and filter the data through both the PivotGrid headers and the PivotConfigurator.

```javascript
    var pivotgrid = $("#pivotgrid").kendoPivotGrid({
        height: 570,
        filterable: true, // Enable filtering.
        sortable: true, // Enable sorting.
        dataSource: {...}
        /* other configurations */
    }).data("kendoPivotGrid");

    $("#configurator").kendoPivotConfigurator({
        dataSource: pivotgrid.dataSource,
        filterable: true, // Enable filtering in the configurator.
        sortable:true, // Enable sorting in the configurator.
        height: 570
    });
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Kendo UI for jQuery Data PivotGrid](https://demos.telerik.com/kendo-ui/pivotgrid/index)

## See Also

* [JavaScript API Reference of the jQuery PivotGrid](/api/javascript/ui/pivotgrid)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
