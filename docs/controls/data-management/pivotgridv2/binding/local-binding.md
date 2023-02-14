---
title: Local Binding
page_title: jQuery PivotGridV2 Documentation - Local Binding
description: "Get started with the jQuery PivotGridV2 by Kendo UI and learn how to bind it to a local array of data."
slug: localbinding_kendoui_pivotgridv2
position: 4
---

# Local Binding

In this article, you will learn how to bind the PivotGridV2 to an array of data.

* [Demo page for the PivotGridV2 Local Binding](https://demos.telerik.com/kendo-ui/pivotgridv2/local-flat-data-binding)

## Data Array

The data array represents an array of objects with several fields. These fields can be used as PivotGridV2 dimensions.

The following code snippet showcases a small data sample from the [Local Binding demo](https://demos.telerik.com/kendo-ui/pivotgridv2/local-flat-data-binding).

```javascript
[{ "Country": "United States", "Sector": "Consumer Services", "Revenue": 5572312, "Year": 2015 },
{ "Country": "Poland", "Sector": "Finance", "Revenue": 933671, "Year": 2020 },
{ "Country": "Greece", "Sector": "Food", "Revenue": 7635202, "Year": 2019 },
{ "Country": "Greece", "Sector": "Consumer Services", "Revenue": 8492182, "Year": 2015 }]
```

The following code snippet showcases how you can bind the array of data to the PivotGridV2.

```javascript
$("#pivotgrid").kendoPivotGrid({
    dataSource: {
    data: [
        { "Country": "United States", "Sector": "Consumer Services", "Revenue": 5572312, "Year": 2015 },
        { "Country": "Poland", "Sector": "Finance", "Revenue": 933671, "Year": 2020 },
        { "Country": "Greece", "Sector": "Food", "Revenue": 7635202, "Year": 2019 },
        { "Country": "Greece", "Sector": "Consumer Services", "Revenue": 8492182, "Year": 2015 }
        ]
    }
});
```

## Columns and Rows

You can construct the PivotGridV2 table by using the fields from the sample data in the [previous section](#data-array).

   1. Configure the [`schema`](/api/javascript/data/pivotdatasource/configuration/schema#schemacube).

   ```javascript
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
            }
   ```

   2. Configure the columns, rows, and measures.

   ```javascript
            columns: [{ name: "Year", expand: true }, { name: "Sector" } ],
            rows: [{ name: "Country", expand: true }],
            measures: ["Sum", "Average"]
   ```

## Demo

The following example showcases the full implementation of the previous steps.

```dojo
<div>
    <div id="container">
        <div id="pivotgrid"></div>
        <div id="configurator"></div>
        <div id="pivotbutton"></div>
    </div>
</div>

<script src="https://demos.telerik.com/kendo-ui/content/shared/js/countries-revenue.js"></script>
<script>
    $(document).ready(function () {
        var pivotgrid = $("#pivotgrid").kendoPivotGridV2({
                columnWidth: 120,
                height: 570,
                dataSource: {
                    data: revenue, // Use the full array of data.
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
                    columns: [{ name: "Year" }, { name: "Sector", expand: true } ],
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

## Known Limitations

When you bind the PivotGridV2 to a flat data structure, the component processes the data on the client (browser) and creates a client cube representation [(configuration)](/api/javascript/data/pivotdatasource/configuration/schema#schemacube). This means that the widget uses the processing power of the browser to project the data and produce the required categorized data output. Even though the PivotGridV2 does not restrict the maximum amount of data that you can bind to it, the data has limits that are directly related to the browser's capability to handle the loaded dataset.

The symptoms for an overloaded browser are:
- The browser is loading extremely slowly or gets unresponsive for a long time.
- The browser is crashing when loading or updating the dimensions/measures.

If you observe any of these symptoms, this means you have hit the processing limit of the browser. To work around this issue, use a dedicated [OLAP](https://en.wikipedia.org/wiki/Online_analytical_processing) solution like Microsoft [SSAS](https://technet.microsoft.com/en-us/library/ms175609(v=sql.90).aspx).
