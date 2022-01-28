---
title: Freezing Rows and Columns
page_title: Freezing Rows and Columns | Kendo UI Excel Export
description: "Learn how to freeze rows and columns in the output Excel document while working with Kendo UI."
slug: freezerowsandcolumns_excelexport_kendoui
position: 3
---

# Freezing Rows and Columns

Kendo UI allows you to freeze both columns and rows by using the [`freezePane`](/api/javascript/ooxml/workbook/configuration/sheets.freezepane) option.

## Rows

Freezing the first row of an Excel sheet is a common requirement. It allows you to scroll the rest of the document without losing the header. To freeze rows, set the [`rowSplit`](/api/javascript/ooxml/workbook/configuration/sheets.freezepane.rowsplit) option to the number of rows you want to freeze.

The following example demonstrates how to freeze the top row in a worksheet.

```dojo
<script>
var workbook = new kendo.ooxml.Workbook({
  sheets: [
    {
      freezePane: {
        rowSplit: 1
      },
      columns: [
        { autoWidth: true },
        { autoWidth: true }
      ],
      rows: [
        {
          cells: [
            { value: "Company Name" }, { value: "Contact" }
          ]
        },
        {
          cells: [
            { value: "Around the Horn" }, { value: "Thomas Hardy" }
          ]
        },
        {
          cells: [
            { value: "B's Beverages" }, { value: "Victoria Ashworth" }
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

## Columns

To freeze columns, set the [`colSplit`](/api/javascript/ooxml/workbook/configuration/sheets.freezepane.colsplit) option to the number of columns you want to freeze.

The following example demonstrates how to freeze the first two columns and the top row in a worksheet.

```
<script>
var workbook = new kendo.ooxml.Workbook({
  sheets: [
    {
      freezePane: {
        rowSplit: 1,
        colSplit: 2
      },
      columns: [
        { autoWidth: true }, { autoWidth: true }, { autoWidth: true }
      ],
      rows: [
        {
          cells: [
            { value: "Company Name" }, { value: "Contact" }, { value: "Contact Title" }
          ]
        },
        {
          cells: [
            { value: "Around the Horn" }, { value: "Thomas Hardy" }, { value: "Sales Representative" }
          ]
        },
        {
          cells: [
            { value: "B's Beverages" }, { value: "Victoria Ashworth" }, { value: "Sales Agent" }
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
* [Setting the Column Width]({% slug columnwidth_excelexport_kendoui %})
* [Spanning Cells across Rows and Columns]({% slug colaspanandrowspan_excelexport_kendoui %})
* [Creating Multiple Sheets]({% slug sheets_excelexport_kendoui %})
* [Exporting the Kendo UI DataSource to Excel]({% slug exportdatasource_excelexport_kendoui %})
