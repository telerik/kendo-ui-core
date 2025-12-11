---
title: Export Links To Excel
page_title: Export Links To Excel - Kendo UI for jQuery Grid
description: "Learn how to export links to Excel in the Kendo UI for jQuery Grid."
slug: export_grid_links_to_excel
tags: grid, export, excel, links, hyperlink, hyperlinks, link, url
type: how-to
res_type: kb
components: ["grid"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
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

I have a Grid column that contains a hyperlink. The link is clickable in the Grid, however when I export the data to Excel I can no longer click it. I want to be able to click on the exported links, how do I do that?

## Solution

The [`Workbook API`](/api/javascript/ooxml/workbook/configuration/sheets.hyperlinks) exposes a configuration that enables you to set hyperlinks to specific cells. You can combine this configuration with the [`excelExport`](/api/javascript/ui/grid/events/excelexport) event of the Grid to make the links clickable in the exported file.

1. Configure a column with links.
2. Attach the `excelExport` event to the Grid.
3. Generate the `hyperlinks` array by using information from the already generated workbook.

```dojo
    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        toolbar: ["excel"],
        columns: [
          { field: "name" },
          { field: "myLink", template: ({ myLink }) => `<a href="${myLink}">${myLink}</a>` }
        ],
        dataSource: [
          { name: "Jane Doe", myLink: "https://google.com" },
          { name: "John Doe", myLink: "https://facebook.com" }
        ],
        excelExport: function(e) {
          let columnIndex = 1, // The myLink column is in the first index.
              colName = getColumnName(columnIndex), // We need the excel column name to use as a reference. E.g. A, B, C, D, AA, AB, AC, BA, BB, etc.
              sheet = e.workbook.sheets[0];

          // Create a hyperlink for each cell under the "link" column.
          sheet.hyperlinks = constructHyperlinks(sheet.rows, columnIndex, colName);

        }
      });

      function constructHyperlinks(rows, colIndex, colName) {
        const result = [];

        rows.forEach((row, i) => {
          if (row.type === "data") {
            const value = row.cells[colIndex].value,
                  colRef = colName + (i + 1); // A1,B1,C1, etc. are the headers. We want to start from A2, B2, etc.

            result.push({ ref: colRef, target: value });
          }
        });
        return result;
      }


      // https://stackoverflow.com/a/8241071
      // This is an optional method that enables you to convert the current Grid column index to a corresponding Excel column name - A, B, C ... AA, AB ... BA, BB ... CA, CC, etc.
      function getColumnName(n) {
        var ordA = 'A'.charCodeAt(0);
        var ordZ = 'Z'.charCodeAt(0);
        var len = ordZ - ordA + 1;

        var s = "";
        while(n >= 0) {
          s = String.fromCharCode(n % len + ordA) + s;
          n = Math.floor(n / len) - 1;
        }
        return s;
      }
    </script>
```

## See Also

* [Workbook API Reference](/api/javascript/ooxml/workbook)
* [JavaScript API Reference of the jQuery Grid](/api/javascript/ui/grid)
