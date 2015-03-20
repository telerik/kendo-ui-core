---
title: Colspan and Rowspan
page_title: Set the cell collspan and rowspan
description: Make a cell occupy more than one row and column
position: 5
---

# Colspan and Rowspan

By default a cell is displays in a single row and column. This help article shows how to make a cell occupy more than one row or column.

## Colspan

Set the [colSpan](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.colSpan) option to make a cell occupy more than one column. All cells that follow will shift to the right with the same number of columns as the colSpan.

#### Example - make a cell occupy three columns

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

## Rowspan

Set the [rowSpan](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.rowSpan) option to make a cell occupy more than one row.

#### Example - make a cell occupy two rows

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

## Colspan and Rowspan

Setting both `colSpan` and `rowSpan` is also supported.


#### Example - set colSpan and rowSpan

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
