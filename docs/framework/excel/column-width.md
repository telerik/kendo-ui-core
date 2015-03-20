---
title: Column Width
page_title: Set column width
description: Set the width of the columns, enable automatic width
position: 4
---

# Column width

By default all columns in Excel have the same width set (64px). If the cell value needs more space it will be clipped. This help topic shows how to set the column width in pixels or enable automatic width calculation.

## Set Column Width

The [width](/api/javascript/ooxml/workbook#configuration-sheets.columns.width) configuration option specifies the column width in pixels.

#### Example - set the column width

```html
<script>
var workbook = new kendo.ooxml.Workbook({
  sheets: [
    {
      columns: [
        { width: 100 }, { /* default width */ }, { width: 200 }
      ],
      rows: [
        {
          cells: [
            { value: "100 px" }, { value: "default" }, { value: "200px" }
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

## Automatic Column Width

You can enable automatic width calculation by setting the [autoWidth](/api/javascript/ooxml/workbook#configuration-sheets.columns.autoWidth) option to `true`.
Then the column will strech to accomodate the longest cell value.

#### Example - automatic column width

```html
<script>
var workbook = new kendo.ooxml.Workbook({
  sheets: [
    {
      columns: [
        { /* default width */ }, { autoWidth: true }
      ],
      rows: [
        {
          cells: [
            { value: "long text is clipped if autoWidth is not set to true" }, { value: "long text fits when autoWidth is set to true" }
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
