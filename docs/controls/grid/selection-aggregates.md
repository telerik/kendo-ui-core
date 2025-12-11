---
title: Selection Aggregates
page_title: jQuery Grid Documentation - Selection Aggregates
description: "Get started with the jQuery Grid by Kendo UI and learn how to enable selection aggregates that allow users to see precalculated aggregates when they select cells or rows in the Grid table."
components: ["grid"]
slug: selection_aggregates_kendoui_grid_component
position: 11
---

# Selection Aggregates

The Grid enables you to select single or multiple cells or rows and calculate different metrics based on the selected data.

This functionality allows you to get a quick snapshot of some of the more important aggregates of the selected data. You can use the built-in approach and display these metrics at the bottom of the Grid or create your own elements that will display the data.

The Grid supports the following built-in aggregates for all selected cells:

* `max`&mdash;The greatest number. Valid for numeric fields.
* `min`&mdash;The smallest number. Valid for numeric fields.
* `sum`&mdash;The sum of all numbers. Valid for numeric fields.
* `average`&mdash;The average of all numbers. Valid for numeric fields.
* `count`&mdash;The total number of cells.
* `earliest`&mdash;The earliest date. Valid for `Date` fields.
* `latest`&mdash;The latest date. Valid for `Date` fields.
* `isTrue`&mdash;The total number of boolean fields with true value.
* `isFalse`&mdash;The total number of boolean fields with false value.

## Requirements

* The Grid must be [`selectable`](/api/javascript/ui/grid/configuration/selectable) where the [`cellAgregates`] property is specified. The aggregates work with `cell`, `row`, and `checkbox` selection.
* The [`schema.model.id`](/api/javascript/data/datasource/configuration/schema#schemamodel) field must be defined when the [`selectable`](/api/javascript/ui/grid/configuration/selectable) is set to `cell`.

The aggregates are configured inside the selectable configuration of the Grid through the [`cellAggregates`](/api/javascript/ui/grid/configuration/selectable.cellaggregates) property. 

```
selectable: { 
    mode: "multiple row", 
    cellAggregates: true 
}
```
You can also pass an array to the `cellAggregates` property in case you want to calculate only some of the aggregates. 

```
selectable: { 
    mode: "multiple row", 
    cellAggregates: ["sum", "count", "earliest", "isTrue"] 
}
```

## Displaying Selection Aggregates in Status Bar

The Grid allow you to render the selection aggregates in a built-in bar under the table cells - Status Bar.

To show the selection aggregates in the Status Bar, define a template by using [`statusBarTemplate`](/api/javascript/ui/grid/configuration/statusBarTemplate), and return the desired HTML result.

The following example demonstrates how to access the calculated cell aggregates and display them in an external `div` element.

```dojo
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

    <div id="status-bar-aggregates"></div>


    <script type="module">
      $(document).ready(function() {
        $("#status-bar-aggregatese").kendoGrid({
          dataSource: {
            data: products,
            schema: {
              model: {
                fields: {
                  ProductName: { type: "string" },
                  UnitPrice: { type: "number" },
                  UnitsInStock: { type: "number" },
                  Discontinued: { type: "boolean" }
                }
              }
            },
            pageSize: 15
          },
          height: 550,
          persistSelection: true,
          selectable: {
            mode: "multiple cell",
            cellAggregates: true
          },
          statusBarTemplate: ({ aggregates }) => {
            var result = "";
            for (const aggregate in aggregates) {
              const value = aggregates[aggregate];
              if (value || value === 0) {
                result +=  `<div class="k-selection-aggregates-item"><span class="k-selection-aggregates-item-text">${aggregate}: </span><span class="k-selection-aggregates-item-value">${formatAggregate(aggregates[aggregate], aggregate)}</span></div>`;
              }
            }
            return result;
          },
          scrollable: true,
          columns: [
            { field: "ProductName", title: "Product Name" },
            { field: "UnitsInStock", title: "Units In Stock", format: "{0:MM/dd/yyyy}", width: "150px" },
            { field: "Discontinued", title: "Discontinued", attributes: { class: "k-text-center !k-justify-content-center" }, width: "130px" },
            { field: "UnitPrice", title: "Unit Price", width: "150px" }
          ]
        });
      });

      function formatAggregate(aggregate, key) {
        if (key === "average" || key === "sum" || key === "max" || key === "min") {
          return kendo.toString(aggregate, "n");
        }
        if (key === "earliest" || key === "latest") {
          return kendo.toString(aggregate, "dd/MM/yyyy");
        }
        return aggregate;
      }
    </script>
```

## Displaying Selection Aggregates Externally

To display the aggregates within a custom element or component, handle the Grid [`change`](/api/javascript/ui/grid/events/change) event and access the precalculated aggregates from the exposed event data.

The following example demonstrates how to access the calculated cell aggregates and display them in an external `div` element.

```
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

    <div id="external-el"></div>
    <br />
    <div id="external-aggregates"></div>

    <script type="module">
      $(document).ready(function() {
        let aggregates;
        $("#external-aggregates").kendoGrid({
          dataSource: {
            data: products,
            schema: {
              model: {
                fields: {
                  ProductName: { type: "string" },
                  UnitPrice: { type: "number" },
                  UnitsInStock: { type: "number" },
                  Discontinued: { type: "boolean" }
                }
              }
            },
            pageSize: 10
          },
          height: 400,
          persistSelection: true,
          selectable: {
            mode: "multiple cell",
            cellAggregates: true
          },
          scrollable: true,
          columns: [
            { field: "ProductName", title: "Product Name" },
            { field: "UnitsInStock", title: "Units In Stock", format: "{0:MM/dd/yyyy}", width: "150px" },
            { field: "Discontinued", title: "Discontinued", attributes: { class: "k-text-center !k-justify-content-center" }, width: "130px" },
            { field: "UnitPrice", title: "Unit Price", width: "150px" }
          ],
          change: function(e) {
            aggregates = e.cellAggregates; // Access the calculated cell aggregates
            $("#external-el").html(aggregatesTemplate(aggregates));
          }
        });
      });

      function aggregatesTemplate(aggregates) {
        var result = '<div class="k-d-flex k-gap-sm">External Aggregates: ';
        for (const aggregate in aggregates) {
          const value = aggregates[aggregate];
          if (value || value === 0) {
            result +=  `<div class="k-selection-aggregates-item"><span class="k-selection-aggregates-item-text">${aggregate}: </span><span class="k-selection-aggregates-item-value">${formatAggregate(aggregates[aggregate], aggregate)}</span></div>`;
          }
        }
        result += '</div>';
        return result;
      }

      function formatAggregate(aggregate, key) {
        if (key === "average" || key === "sum" || key === "max" || key === "min") {
          return kendo.toString(aggregate, "n");
        }
        if (key === "earliest" || key === "latest") {
          return kendo.toString(aggregate, "dd/MM/yyyy");
        }
        return aggregate;
      }
    </script>
```

## KB Articles on Aggregates

* [Calculate Custom Aggregates by Unique Value in Grid]({% slug grid-custom-aggregate-by-unique-value %})
* [Find Out More in the Knowledge Base](/knowledge-base)

## See Also

* [Grid Checkbox Selection (Demo)](https://demos.telerik.com/kendo-ui/grid/checkbox-selection)
* [Grid Selection & Export (Demo)](https://demos.telerik.com/kendo-ui/grid/selection-export)
* [Grid Aggregates (Demo)](https://demos.telerik.com/kendo-ui/grid/aggregates)
* [JavaScript API Reference of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
