---
title: Appearance
page_title: Customize the appearance of the cells
description: This article shows how to change the look and feel of the cells
position: 2
---

# Customize The Appearance

By default Excel shows all cells with the default font settings (color, font name and size).

Kendo UI allows you to change the appearance of the cells via the following configuration options:

* [background](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.background) - sets the background color of the cell.
* [bold](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.bold) - the cell value is displayed in bold.
* [color](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.color) - sets the cell text color.
* [fontName](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.fontName) - sets the font used to display the cell value.
* [fontSize](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.fontSize) - sets the font size of the cell value.
* [hAlign](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.hAlign) - sets the horizontal text alignment.
* [italic](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.italic) - the cell value is displayed in italic.
* [underline](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.underline) - the cell value is underlined.
* [vAlign](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.vAlign) - sets the vertical text alignment.

#### Example - customize the cell appearance

```html
<script>
var workbook = new kendo.ooxml.Workbook({
  sheets: [
    {
      columns: [ { autoWidth: true } ],
      rows: [
        {
          cells: [
            {
              value: "bold and italic",
              bold: true,
              italic: true
            }
          ]
        },
        {
          cells: [
            {
              value: "red text on blue background",
              color: "#ff0000",
              background: "#0000ff"
            }
          ]
        },
        {
          cells: [
            {
              value: "Arial 20px",
              fontSize: 20,
              fontName: "Arial"
            }
          ]
        },
        {
          cells: [
            {
              value: "Right aligned",
              hAlign: "right"
            }
          ]
        },
        {
          cells: [
            {
              value: "Centered horizontally and vertically",
              vAlign: "center",
              hAlign: "center",
              rowSpan: 2
            }
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
