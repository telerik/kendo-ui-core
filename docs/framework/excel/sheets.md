---
title: Sheets
page_title: Create multiple sheets in the Excel workbook
description: This article shows how to create multiple sheets in an Excel workbook
position: 6
---

# Sheets

To define multiple sheets in an Excel workbook use the [sheets](/api/javascript/ooxml/workbook#configuration-sheets) option. Every item from that array represents a new sheet with its own rows and cells.

#### Example - create multiple sheets

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
