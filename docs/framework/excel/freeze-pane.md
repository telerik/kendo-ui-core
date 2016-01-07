---
title: Freeze Rows and Columns
page_title: Freeze Rows and Columns | Kendo UI Excel Export
description: "Learn how to freeze rows and columns in the output Excel document while working with Kendo UI."
slug: freezerowsandcolumns_excelexport_kendoui
position: 3
---

# Freeze Rows and Columns

Kendo UI allows you to freeze both columns and rows via the [`freezePane`](/api/javascript/ooxml/workbook#configuration-sheets.freezePane) option.

## Rows

Freezing the first row of an Excel sheet is a common requirement. It allows you to scroll the rest of the document without losing the header.

Kendo UI enables row freezing via the [`rowSplit`](/api/javascript/ooxml/workbook#configuration-sheets.freezePane.rowSplit) option. Set that option to the number of rows you want to freeze.

The example below demonstrates how to freeze the top row in a worksheet.

###### Example

```html
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

Kendo UI enables column freezing via the [`colSplit`](/api/javascript/ooxml/workbook#configuration-sheets.freezePane.colSplit) option. Set that option to the number of columns you want to freeze.

The example below demonstrates how to freeze the first two columns and the top row in a worksheet.  

###### Example

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

Articles on the Excel export functionality in Kendo UI:

* [Introduction to the Excel Export Functionality]({% slug introduction_excelexport_kendoui %})
* [Customize the Appearance]({% slug appearance_excelexport_kendoui %})
* [Set the Column Width]({% slug columnwidth_excelexport_kendoui %})
* [Set the Colspan and Rowspan]({% slug colaspanandrowspan_excelexport_kendoui %})
* [Create Multiple Sheets]({% slug sheets_excelexport_kendoui %})
* [Export Kendo UI DataSource to Excel]({% slug exportdatasource_excelexport_kendoui %})
