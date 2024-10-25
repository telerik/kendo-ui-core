---
title: Compare PivotGridV2 Cells on the Same Row
description: "Learn how to compare the values between the cells of the Kendo UI for jQuery PivotGridV2 on the same row."
type: how-to
page_title: Compare PivotGridV2 Cell Values on the Same Row
slug: pivotgrid-compare-cells-on-same-row
tags: kendoui,  pivotgridv2, compare, cell, values, same, row
res_type: kb
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® PivotGridV2 for jQuery</td>
		</tr>
	</tbody>
</table>


## Description

How can I compare the cell values of the Kendo UI for jQuery PivotGridV2 on the same row and apply background color based on the result?

## Solution

To achieve the desired scenario:

1. Obtain a reference to the `td` elements of the row by using the [`dataBound`](/api/javascript/ui/pivotgridv2/events/databound) event of the component.
1. Retrieve the values from the cells and compare them.

The following example demonstrates the full implementation of the suggested approach:

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
          dataBound: function(e) {
            let rows = this.element.find("tr");

            rows.each((i, row) => {
              let cells = $(row).find("td");
              let col1Val = Number($(cells[0]).text().trim());
              let col3Val = Number($(cells[2]).text().trim());
              if(!isNaN(col1Val) && !isNaN(col3Val)) {

                if(col1Val < col3Val) {
                  $(row).find("td:eq(0)").css("background-color", "red");
                  $(row).find("td:eq(0)").css("color", "white");
                  $(row).find("td:eq(2)").css("background-color", "green");
                  $(row).find("td:eq(2)").css("color", "white");
                } else if(col1Val > col3Val) {
                  $(row).find("td:eq(2)").css("background-color", "red");
                  $(row).find("td:eq(2)").css("color", "white");
                  $(row).find("td:eq(0)").css("background-color", "green");
                  $(row).find("td:eq(0)").css("color", "white");
                }
              }

            });
          },
          dataSource: {
            data: revenue,
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
                  "Sum": { field: "Revenue", aggregate: "sum" },
                  "Average": { field: "Revenue", aggregate: "average" }
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
          configuratorPosition: "bottom"
        });
      });
    </script>
```
