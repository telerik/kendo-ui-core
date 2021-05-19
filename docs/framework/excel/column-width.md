---
title: Column Width
page_title: Column Width | Kendo UI Excel Export
description: "Learn how to set the width of the columns and enable automatic width while exporting Kendo UI components to Excel."
slug: columnwidth_excelexport_kendoui
position: 4
---

# Column Width

By default, all columns in Excel have the same width of 64px.

If the cell value needs more space, it will be clipped. This article provides information on how to set the column width in pixels or enable automatic width calculation.

## Setting Fixed Column Widths

To manually set the column width in pixels, use the [`width`](/api/javascript/ooxml/workbook/configuration/sheets.columns.width) option.

```dojo
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

## Automatically Adjusting Widths to Content

To enable the automatic width calculation, set the [`autoWidth`](/api/javascript/ooxml/workbook/configuration/sheets.columns.autowidth) option to `true`. When set, the he column stretches to accommodate the longest cell value.

```dojo
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

* [Introduction to the Excel Export Functionality]({% slug introduction_excelexport_kendoui %})
* [Customizing the Appearance]({% slug appearance_excelexport_kendoui %})
* [Freezing Rows and Columns]({% slug freezerowsandcolumns_excelexport_kendoui %})
* [Spanning Cells across Rows and Columns]({% slug colaspanandrowspan_excelexport_kendoui %})
* [Creating Multiple Sheets]({% slug sheets_excelexport_kendoui %})
* [Exporting the Kendo UI DataSource to Excel]({% slug exportdatasource_excelexport_kendoui %})
