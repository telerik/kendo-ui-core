---
title: Sheets
page_title: Sheets | Kendo UI Excel Export
description: "Learn how to create multiple sheets when exporting a Kendo UI component to Excel."
slug: sheets_excelexport_kendoui
position: 6
---

# Sheets

To create multiple sheets in an Excel workbook, use the [`sheets`](/api/javascript/ooxml/workbook#configuration-sheets) option, as demonstrated in the example below. Every item from that array represents a new sheet with its own rows and cells.

###### Example

```html
<script>
var workbook = new kendo.ooxml.Workbook({
  sheets: [
    {
      columns: [
        { autoWidth: true },
        { autoWidth: true }
      ],
      title: "Customers",
      rows: [
        {
          cells: [
            { value: "Company Name" },
            { value: "Contact" }
          ]
        },
        {
          cells: [
            { value: "Around the Horn" },
            { value: "Thomas Hardy" }
          ]
        },
        {
          cells: [
            { value: "B's Beverages" },
            { value: "Victoria Ashworth" }
          ]
        }
      ]
    },
    {
      title: "Employees",
      columns: [
        { autoWidth: true },
        { autoWidth: true }
      ],
      rows: [
        {
          cells: [
            { value: "First Name" },
            { value: "Last Name" }
          ]
        },
        {
          cells: [
            { value: "Andrew" },
            { value: "Fuller" }
          ]
        },
        {
          cells: [
            { value: "Nancy" },
            { value: "Davolio" }
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
* [Set the Colspan and Rowspan]({% slug colaspanandrowspan_excelexport_kendoui %})
* [Export Kendo UI DataSource to Excel]({% slug exportdatasource_excelexport_kendoui %})
