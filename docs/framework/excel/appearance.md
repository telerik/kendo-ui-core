---
title: Appearance
page_title: Appearance | Kendo UI Excel Export
description: "Learn how to change the look and feel of the cells while exporting Kendo UI components to Excel."
slug: appearance_excelexport_kendoui
position: 2
---

# Appearance

By default, Excel shows all cells according to their default font settings&mdash;color, font name, and size.

## Customization

### Configuration Options

Kendo UI allows you to change the appearance of the cells via the following configuration options:

* [`background`](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.background)&mdash;This option sets the background color of the cell.
* [`bold`](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.bold)&mdash;Displays the cell value in bold.
* [`color`](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.color)&mdash;Sets the cell text color.
* [`fontName`](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.fontName)&mdash;Sets the font used to display the cell value.
* [`fontSize`](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.fontSize)&mdash;Sets the font size of the cell value.
* [`hAlign`](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.hAlign)&mdash;Sets the horizontal text alignment.
* [`italic`](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.italic)&mdash;Dispalys the cell value in italic.
* [`underline`](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.underline)&mdash;Displays the cell value as underlined.
* [`vAlign`](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.vAlign)&mdash;Sets the vertical text alignment.

The example below demonstrates how to customize the appearance of the cells.

###### Example

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

## See Also

Articles on the Excel export functionality in Kendo UI:

* [Introduction to the Excel Export Functionality]({% slug introduction_excelexport_kendoui %})
* [Freeze Rows and Columns]({% slug freezerowsandcolumns_excelexport_kendoui %})
* [Set the Column Width]({% slug columnwidth_excelexport_kendoui %})
* [Set the Colspan and Rowspan]({% slug colaspanandrowspan_excelexport_kendoui %})
* [Create Multiple Sheets]({% slug sheets_excelexport_kendoui %})
* [Export Kendo UI DataSource to Excel]({% slug exportdatasource_excelexport_kendoui %})
