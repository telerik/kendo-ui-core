---
title: Freeze Columns and Rows
page_title: Freeze columns and rows in the output Excel workbook
position: 3
---

# Freeze Rows and Columns

Kendo UI allows you to freeze both colums and rows via the [freezePane](/api/javascript/ooxml/workbook#configuration-sheets.freezePane) option.

## Rows

Freezing the first row of an Excel sheet is a common requirement. It allows the user to scroll the rest of the document without losing the header.

Kendo UI enables row freezing via the [rowSplit](/api/javascript/ooxml/workbook#configuration-sheets.freezePane.rowSplit) option.
Set that option to the number of rows you want to freeze.

### Example - freeze the top row

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

### Columns

Kendo UI enables column freezing via the [colSplit](/api/javascript/ooxml/workbook#configuration-sheets.freezePane.colSplit) option.
Set that option to the number of columns you want to freeze.

#### Example - freeze the first two columns and the top row

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
