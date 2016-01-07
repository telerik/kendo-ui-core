---
title: Colspan and Rowspan
page_title: Colspan and Rowspan | Kendo UI Excel Export
description: "Learn how to make a cell occupy more than one column or row when exporting a Kendo UI component to Excel."
slug: colaspanandrowspan_excelexport_kendoui
position: 5
---

# Colspan and Rowspan

By default, a cell is displayed in a single row and column. However, you are able to make a cell occupy more than one row or column, as explained in this article.

## Extend Cells to More Than One Column or Row

### Set the colSpan

Set the [`colSpan`](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.colSpan) option to make a cell occupy more than one column. When done, all cells that follow shift to the right with the same number of columns as defined by the `colSpan`.

The example below demonstrates how to make a cell occupy three columns.

###### Example

```html
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

### Set the rowSpan

Set the [`rowSpan`](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.rowSpan) option to make a cell occupy more than one row.

The example below demonstrates how to make a cell occupy two rows.

###### Example

```html
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

## Extend Cells to More Than One Column and Row

### Set Both Colspan and Rowspan

Setting both `colSpan` and `rowSpan` is also supported, as demonstrated in the example below.

###### Example

```html
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

Articles on the Excel export functionality in Kendo UI:

* [Introduction to the Excel Export Functionality]({% slug introduction_excelexport_kendoui %})
* [Customize the Appearance]({% slug appearance_excelexport_kendoui %})
* [Freeze Rows and Columns]({% slug freezerowsandcolumns_excelexport_kendoui %})
* [Set the Column Width]({% slug columnwidth_excelexport_kendoui %})
* [Create Multiple Sheets]({% slug sheets_excelexport_kendoui %})
* [Export Kendo UI DataSource to Excel]({% slug exportdatasource_excelexport_kendoui %})
