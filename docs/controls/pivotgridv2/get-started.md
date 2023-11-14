---
title: Getting Started
page_title: jQuery PivotGridV2 Documentation - Getting Started with the PivotGridV2
description: "Get started with the jQuery PivotGridV2 by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_pivotgridv2_widget
position: 1
---

# Getting Started with the PivotGridV2

This guide demonstrates how to get up and running with the Kendo UI for jQuery PivotGridV2.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <div id="container">
      <div id="pivotgrid"></div>
      <div id="configurator"></div>
      <div id="pivotbutton"></div>
    </div>

    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/countries-revenue.js"></script>
    <script>
      $(document).ready(function () {
        var data = revenue;
        var pivotgrid = $("#pivotgrid").kendoPivotGridV2({
          columnWidth: 120,
          height: 570,
          dataSource: {
            data: data,
            sort: { field: "Year", dir: "asc" },
            schema: {
              model: {
                fields: {
                  Country: { type: "string" },
                  Revenue: { type: "number" },
                  Year: { type: "number" },
                  Sector: { type: "string" }
                }
              },
              cube: {
                dimensions: {
                  Country: { caption: "All Countries" },
                  Sector: { caption: "All Sectors" },
                  Year: { caption: "All Years" }
                },
                measures: {
                  "Sum": { field: "Revenue", format: "{0:c}", aggregate: "sum" },
                  "Average": { field: "Revenue", format: "{0:c}", aggregate: "average" }
                }
              }
            },
            columns: [{ name: "Year", expand: true }, { name: "Sector" } ],
            rows: [{ name: "Country", expand: true }],
            measures: ["Sum", "Average"]
          }
        }).data("kendoPivotGridV2");

        $("#configurator").kendoPivotConfiguratorV2({
          dataSource: pivotgrid.dataSource,
          filterable: true,
          sortable: true
        });

        $("#pivotbutton").kendoPivotConfiguratorButton({
          configurator: "configurator"
        });

        $("#container").kendoPivotContainer({
          configuratorPosition: "left"
        });
      });
    </script>
```

## 1. Create the HTML Structure for the Component

First, create a wrapping `div` element with an id `container`. Next, add three `div` elements—one for the PivotGridV2, one for the PivotConfiguratorV2, and one for the PivotConfiguratorButton.

```html
    <div id="container">
      <div id="pivotgrid"></div>
      <div id="configurator"></div>
      <div id="pivotbutton"></div>
    </div>
```

## 2. Initialize the PivotGridV2

In this step, you will initialize the PivotGridV2 from the empty `<div>` element with id `pivotgrid`.

```javascript
    var pivotgrid = $("#pivotgrid").kendoPivotGridV2({
        height: 570
    }).data("kendoPivotGridV2");
```

## 3. Initialize the Configurator, Configurator Button, and Container

In this step, you will initialize the [PivotConfiguratorV2](https://docs.telerik.com/kendo-ui/controls/pivotgridv2/binding/configurator) from the empty `<div>` element with id `configurator`.

Next, you will initialize the configurator button from the empty `<div>` element with the id `pivotbutton`. The purpose of the button is to enable the user to hide and show the configurator.

Lastly, you will initialize the container button from the `<div>` element with id `container`.

```javascript
        $("#configurator").kendoPivotConfiguratorV2({
          /* configurations */
        });

        $("#pivotbutton").kendoPivotConfiguratorButton({
          configurator: "configurator"
        });

        $("#container").kendoPivotContainer({
          configuratorPosition: "left"
        });
```

## 4. Add the DataSource

With the above steps completed, you can now start populating the components with data. In this example, we are going to use an array of objects that is loaded from [this location](https://demos.telerik.com/kendo-ui/content/shared/js/countries-revenue.js).

First, configure the [`dataSource`](https://docs.telerik.com/kendo-ui/api/javascript/data/pivotdatasourcev2) in the PivotGridV2 component. 

```javascript
    var data = products; // The products are fetched from the above link.
    var pivotgrid = $("#pivotgrid").kendoPivotGridV2({
        height: 570,
        dataSource: {
            data: data, // Bind to the array of json objects.
            sort: { field: "Year", dir: "asc" }, // Apply a default sort.
            schema: {
              model: {
                fields: {
                  Country: { type: "string" },
                  Revenue: { type: "number" },
                  Year: { type: "number" },
                  Sector: { type: "string" }
                }
              },
              cube: {
                // The dimensions configuration enables you to change the header titles of the columns and the rows.
                dimensions: {
                  Country: { caption: "All Countries" },
                  Sector: { caption: "All Sectors" },
                  Year: { caption: "All Years" }
                },
                // The measures configuration enable you to specify the aggregates that will be used in the PivotGridV2.
                measures: {
                  "Sum": { field: "Revenue", format: "{0:c}", aggregate: "sum" },
                  "Average": { field: "Revenue", format: "{0:c}", aggregate: "average" }
                }
              }
            },
            // Configure the columns of the PivotGridV2.
            columns: [{ name: "Year", expand: true }, { name: "Sector" } ],
            // Configure the rows of the PivotGridV2.
            rows: [{ name: "Country", expand: true }],
            // Configure the measures.
            measures: ["Sum", "Average"]
          }
    }).data("kendoPivotGridV2");
```

Next, copy the already configured `dataSource` over to the `configurator`. This will enable to users to modify the settings of the PivotGridV2 through the `configurator`.

```javascript
        $("#configurator").kendoPivotConfiguratorV2({
          dataSource: pivotgrid.dataSource, // Use the dataSource configuration of the PivotGridV2.
        });
```

## 5. Enable Filtering

Among other functionalities, the PivotGridV2 supports filtering. The [filtering]({% slug filtering_kendoui_pivotgridv2 %}) configuration enables users to filter the data in the component.

The user can filter the data through both the PivotGridV2 headers and the PivotConfiguratorV2.

```javascript
    var pivotgrid = $("#pivotgrid").kendoPivotGridV2({
        height: 570,
        filterable: true, // Enable filtering.
        sortable: true, // Enable sorting.
        dataSource: {...}
        /* other configurations */
    }).data("kendoPivotGridV2");

    $("#configurator").kendoPivotConfiguratorV2({
        dataSource: pivotgrid.dataSource,
        filterable: true, // Enable filtering in the configurator.
        sortable:true, // Enable sorting in the configurator.
    });
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Kendo UI for jQuery Data PivotGridV2](https://demos.telerik.com/kendo-ui/pivotgridv2/index)

## See Also

* [JavaScript API Reference of the jQuery PivotGridV2](/api/javascript/ui/pivotgridv2)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
