---
title: Setting Pattern Style and Color for Cells in Excel Export with Kendo UI Grid
description: Learn how to customize the pattern style and color of cells when exporting data from the Kendo UI Grid to an Excel file using jQuery.
type: how-to
page_title: How to Set Pattern Style and Color in Excel Export - Kendo UI Grid
slug: set-pattern-style-color-excel-export-kendo-ui-grid
tags: kendo-ui, grid, excel-export, pattern-style, color
res_type: kb
ticketid: 1651731
---

## Environment

| Product | Kendo UI for jQuery Grid |
| --- | --- |
| Version | Current |

## Description

When exporting data from the [Grid for Progress® Kendo UI®](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid) to an Excel file using jQuery, I need to set the pattern color and style of a cell. How can I customize the background color of cells based on their values or other conditions?

This KB article also answers the following questions:
- How to apply conditional styling to cells in an Excel export?
- How to set the background color for specific cells in Excel files generated from the Kendo UI Grid?
- How to use the excelExport event to customize the appearance of cells in exported Excel files?

## Solution

To customize the background color of cells in the exported Excel file, you need to handle the `excelExport` event of the Kendo UI Grid. In the event handler, modify the `e.workbook` object to apply the desired styles.

Use the `sheets.rows.cells.background` configuration to set the background color of cells. Below is an example where the background color is set to red (`#FF0000`) for cells containing the value "Alice Mutton".

```javascript
$("#grid").kendoGrid({
  excelExport: function(e) {
    e.workbook.sheets[0].rows.forEach(row => {
      row.cells.forEach(cell => {
        // Apply background color to cells with 'Alice Mutton'
        if(cell.value && typeof cell.value == "string" && cell.value === "Alice Mutton"){
          cell.background = "#FF0000";
        }
      });
    });
  }
});
```

For a live demonstration, refer to this Dojo demo: [https://dojo.telerik.com/IxAraqaz](https://dojo.telerik.com/IxAraqaz).

## See Also

- [Grid excelExport Event Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/excelexport)
- [Workbook sheets.rows.cells.background Configuration](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook/configuration/sheets.rows.cells.background)
