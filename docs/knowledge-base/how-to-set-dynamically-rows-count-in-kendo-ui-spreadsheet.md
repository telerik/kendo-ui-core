---
title: Set Rows Count Dynamically in DataSource Bound Kendo UI Spreadsheet
description: This article demonstrates how to set the rows count dynamically in the Kendo UI Spreadsheet bound to datasource.
type: how-to
page_title: How to Set Rows Count Dynamically in the Kendo UI Spreadsheet
slug: how-to-set-dynamically-rows-count-in-kendo-ui-spreadsheet
tags: kendo-ui, spreadsheet, rows, datasource, setdatasource, dynamically
res_type: kb
ticketid: 1683653
---

## Environment
<table>
<tbody>
<tr>
<td>Product</td>
<td>Progress® Kendo UI® Spreadsheet</td>
</tr>
<tr>
<td>Version</td>
<td>2025.1.227</td>
</tr>
</tbody>
</table>

## Description
When attempting to load data into the Kendo UI Spreadsheet, it appears that only 200 rows of data are loaded, even though the data contains 250+ records. This limitation occurs due to the default row configuration of the Spreadsheet component.

This knowledge base article also answers the following questions:
- How can I display more than 200 rows in the Kendo UI Spreadsheet?
- Is there a method to dynamically set the row count based on the data source in the Kendo UI Spreadsheet?

## Solution
To load more than the default 200 rows in the Kendo UI Spreadsheet, dynamically set the rows count based on the number of items in the data source. Use the[ `setDataSource`](/api/javascript/spreadsheet/sheet/methods/setdatasource) method to load the data into the Spreadsheet. This approach involves fetching the data, determining the count, and then configuring the Spreadsheet to accommodate the number of rows equivalent to the data items. Follow the steps below to implement this solution:

1. Fetch the data from the dataSource.
2. Determine the number of items in the dataSource.
3. [Insert a new sheet](api/javascript/ui/spreadsheet/methods/insertsheet) with the row count set to the number of items.
4. Remove the initial sheet.
5. Set the dataSource for the new sheet.

Here is an example code snippet:
```javascript
 dataSource.fetch(function () {
        var data = this.data();
        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        spreadsheet.insertSheet({
          rows: data.length,
          name: "AdjustedRows",
        });
        var initialSheet = spreadsheet.activeSheet();
        spreadsheet.removeSheet(initialSheet);
        spreadsheet.sheetByName("AdjustedRows").setDataSource(dataSource);
      });
```

Below you will find a runnable example:

```dojo
<div id="container">
      <div id="spreadsheet"></div>
    </div>

    <script>
      var dataSource = new kendo.data.DataSource({
        type: "odata",
        transport: {
          read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders",
        },
        schema: {
          model: {
            fields: {
              OrderID: { type: "number" },
              Freight: { type: "number" },
              ShipName: { type: "string" },
              OrderDate: { type: "date" },
              ShipCity: { type: "string" },
            },
          },
        },
        requestStart: function (e) {
          kendo.ui.progress($("#container"), true);
        },
      });

      $("#spreadsheet").kendoSpreadsheet();

      dataSource.fetch(function () {
        var data = this.data();
        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        spreadsheet.insertSheet({
          rows: data.length,
          name: "AdjustedRows",
        });
        var initialSheet = spreadsheet.activeSheet();
        spreadsheet.removeSheet(initialSheet);
        spreadsheet.sheetByName("AdjustedRows").setDataSource(dataSource);
        kendo.ui.progress($("#container"), false);
      });
    </script>
```


## See Also
- [Spreadsheet Configuration](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet/configuration)
- [Spreadsheet setDataSource Method](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/sheet/methods/setdatasource)
- [Spreadsheet removeSheet Method](/api/javascript/ui/spreadsheet/methods/removesheet)
- [Official Documentation for Kendo UI Spreadsheet](https://docs.telerik.com/kendo-ui/controls/data-management/spreadsheet/overview)
