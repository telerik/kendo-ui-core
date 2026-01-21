---
title: Merging Rows in Exported Excel in Kendo UI for jQuery Grid
description: Learn how to merge rows in the exported Excel file based on specific criteria in Kendo UI for jQuery Grid.
type: how-to
page_title: Combining Rows in Excel Export for Kendo UI Grid
meta_title: Combining Rows in Excel Export for Kendo UI Grid
slug: merging-rows-excel-export-kendo-ui-jquery-grid
tags: grid, kendo-ui-for-jquery, excel-export, merging-rows, customization
res_type: kb
ticketid: 1662996
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td >Kendo UI for jQuery Grid </td>
</tr>
<tr>
<td> Version </td>
<td> 2025.4.1217 </td>
</tr>
</tbody>
</table>

## Description

I need to export a [Kendo UI for jQuery Grid](https://www.telerik.com/kendo-jquery-ui/documentation/controls/grid/overview) to Excel and merge certain rows based on a condition. Specifically, if `addchgInd == "Y"`, the corresponding records should appear in the same row in the Excel file, combined as "Additional Charges". How can I achieve this functionality?

This knowledge base article also answers the following questions:
- How to merge rows in Excel export for Kendo UI Grid?
- How to customize exported Excel rows in Kendo UI Grid?
- How to apply logic to combine rows in Kendo UI Grid Excel export?

## Solution

To achieve this, use the [`excelExport`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/events/excelexport) event of the Kendo UI for jQuery Grid to modify the workbook configuration object before the file is generated.

### Steps to Merge Rows:

1. Define the `excelExport` event handler in the grid configuration.
2. Access the workbook's sheets and rows within the handler.
3. Apply custom logic to identify rows that meet the condition (`addchgInd == "Y`) and merge them.
4. Replace the identified rows with a new row containing the combined data.

### Code Example:

```dojo
  <div id="grid"></div>
  <script>
  $("#grid").kendoGrid({
    toolbar: ["excel"],
    excel: {
        fileName: "MergedRowsExport.xlsx",
        filterable: true
    },
    dataSource: {
        data: [
            { addchgInd: "Y", description: "Additional Charge Code 1" },
            { addchgInd: "Y", description: "Additional Charge Code 2" },
            { addchgInd: "N", description: "Regular Charge" }
        ],
        schema: {
            model: {
                fields: {
                    addchgInd: { type: "string" },
                    description: { type: "string" }
                }
            }
        }
    },
    columns: [
        { field: "addchgInd", title: "Add Charge Indicator" },
        { field: "description", title: "Description" }
    ],
    excelExport: function(e) {
        const sheet = e.workbook.sheets[0];

        // Safety checks
        if (!sheet || !sheet.rows || sheet.rows.length < 2) {
            console.warn("Not enough rows to merge.");
            return;
        }

        const mergedRows = [];
        for (let i = 0; i < sheet.rows.length; i++) {
            const currentRow = sheet.rows[i];
            const nextRow = sheet.rows[i + 1];

            if (nextRow && currentRow.cells[0].value === "Y" && nextRow.cells[0].value === "Y") {
                mergedRows.push({
                    type: "data",
                    cells: [
                        { value: "Y", background: "#dfdfdf", color: "#333" },
                        { value: `${currentRow.cells[1].value} and ${nextRow.cells[1].value}` }
                    ]
                });
                i++; // Skip the next row as it is merged
            } else {
                mergedRows.push(currentRow);
            }
        }

        // Replace all rows with the merged rows
        sheet.rows = mergedRows;
    }
 });
</script>
```

### Key Points in the Code:

- The [`excelExport`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/events/excelexport) event provides access to the workbook's structure.
- Rows are iterated and checked for the specified condition (`addchgInd == "Y`).
- Matching rows are merged into a single row by combining their cell values.
- The workbook's rows array is updated with the modified rows.

## See Also

- [Kendo UI for jQuery Grid Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/grid/overview)
- [Excel Export Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/grid/export/excel-export)
- [Customizing Excel Export in Kendo UI Grid](https://www.telerik.com/kendo-jquery-ui/documentation/controls/grid/export/excel-export-customization)
