---
title: Column Width
page_title: Column Width | Kendo UI Excel Export
description: "Learn how to set the width of the columns and enable automatic width while exporting Kendo UI components to Excel."
slug: columnwidth_excelexport_kendoui
position: 4
---

# Column Width

By default, all columns in Excel have the same width set (64px). If the cell value needs more space, it will be clipped. This article shows how to set the column width in pixels, or enable automatic width calculation.

## Configuration

### Set Column Width

The [`width`](/api/javascript/ooxml/workbook#configuration-sheets.columns.width) configuration option specifies the column width in pixels.

The example below demonstrates how to set the width of a column in a worksheet.

###### Example

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

### Enable Automatic Column Width

Enable the automatic width calculation by setting the [`autoWidth`](/api/javascript/ooxml/workbook#configuration-sheets.columns.autoWidth) option to `true`, as demonstrated in the example below. When set, the he column stretches to accommodate the longest cell value.

###### Example

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

## See Also

Articles on the Excel export functionality in Kendo UI:

* [Introduction to the Excel Export Functionality]({% slug introduction_excelexport_kendoui %})
* [Customize the Appearance]({% slug appearance_excelexport_kendoui %})
* [Freeze Rows and Columns]({% slug freezerowsandcolumns_excelexport_kendoui %})
* [Set the Colspan and Rowspan]({% slug colaspanandrowspan_excelexport_kendoui %})
* [Create Multiple Sheets]({% slug sheets_excelexport_kendoui %})
* [Export Kendo UI DataSource to Excel]({% slug exportdatasource_excelexport_kendoui %})
