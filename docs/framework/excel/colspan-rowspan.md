---
title: Expanding Cells across Rows and Columns
page_title: Expanding Cells across Rows and Columns | Kendo UI Excel Export
description: "Learn how to make a cell occupy more than one column or row when exporting a Kendo UI component to Excel."
slug: colaspanandrowspan_excelexport_kendoui
position: 5
---

# Expanding Cells

By default, a cell is displayed in a single row and column.

However, you can configure a cell to occupy more than one row or column.

## Spanning across Columns

To expand a cell across two or more columns, set the [`colSpan`](/api/javascript/ooxml/workbook/configuration/sheets.rows.cells.colspan) option. As a result, all cells will follow shift to the right with the same number of columns as defined by the `colSpan`.

```dojo
<script>
var workbook = new kendo.ooxml.Workbook({
  sheets: [
    {
      rows: [
        {
          cells: [
            { value: "A1, B1 and C1", colSpan: 3 }, { value: "D1" }
          ]
        }
      ]
    }
  ]
});
kendo.saveAs({
    dataURI: workbook.toDataURL(),
    fileName: "Test.xlsx"
});
</script>
```

## Spanning across Rows

To expand a cell across two or more rows, set the [`rowSpan`](/api/javascript/ooxml/workbook/configuration/sheets.rows.cells.rowspan) option.

```dojo
<script>
var workbook = new kendo.ooxml.Workbook({
  sheets: [
    {
      rows: [
        {
          cells: [
            { value: "A1 and A2", rowSpan: 2 }, { value: "B1" }
          ]
        },
        {
          cells: [
            { value: "B2" }
          ]
        }
      ]
    }
  ]
});
kendo.saveAs({
    dataURI: workbook.toDataURL(),
    fileName: "Test.xlsx"
});
</script>
```

## Spanning across Rows and Columns

To span a cell across two or more rows and columns simultaneously, use both the `colSpan` and `rowSpan` options.

```dojo
<script>
var workbook = new kendo.ooxml.Workbook({
  sheets: [
    {
      rows: [
        {
          cells: [
            { value: "A1, B1, A2 and B2", rowSpan: 2, colSpan: 2 }
          ]
        }
      ]
    }
  ]
});
kendo.saveAs({
    dataURI: workbook.toDataURL(),
    fileName: "Test.xlsx"
});
</script>
```

## See Also

* [Introduction to the Excel Export Functionality]({% slug introduction_excelexport_kendoui %})
* [Customizing the Appearance]({% slug appearance_excelexport_kendoui %})
* [Freezing Rows and Columns]({% slug freezerowsandcolumns_excelexport_kendoui %})
* [Setting the Column Width]({% slug columnwidth_excelexport_kendoui %})
* [Creating Multiple Sheets]({% slug sheets_excelexport_kendoui %})
* [Exporting the Kendo UI DataSource to Excel]({% slug exportdatasource_excelexport_kendoui %})
