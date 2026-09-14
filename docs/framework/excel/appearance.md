---
title: Appearance
page_title: Appearance - Kendo UI Excel Export
description: "Learn how to change the look and feel of the cells while exporting Kendo UI components to Excel."
components: ["general"]
slug: appearance_excelexport_kendoui
position: 2
---

# Appearance

By default, Excel shows all cells according to their default color, font name, and size settings.

Kendo UI allows you to change the appearance of the cells by using the following configuration options:

* [`background`](/api/ooxml/workbook/configuration/sheets/rows/cells#sheetsrowscellsbackground)&mdash;This option sets the background color of the cell.
* [`bold`](/api/ooxml/workbook/configuration/sheets/rows/cells#sheetsrowscellsbold)&mdash;Displays the cell value in bold.
* [`color`](/api/ooxml/workbook/configuration/sheets/rows/cells#sheetsrowscellscolor)&mdash;Sets the cell text color.
* [`fontName`](/api/ooxml/workbook/configuration/sheets/rows/cells#sheetsrowscellsfontname)&mdash;Sets the font used to display the cell value.
* [`fontSize`](/api/ooxml/workbook/configuration/sheets/rows/cells#sheetsrowscellsfontsize)&mdash;Sets the font size of the cell value.
* [`hAlign`](/api/ooxml/workbook/configuration/sheets/rows/cells#sheetsrowscellshalign)&mdash;Sets the horizontal text alignment.
* [`italic`](/api/ooxml/workbook/configuration/sheets/rows/cells#sheetsrowscellsitalic)&mdash;Displays the cell value in italic.
* [`underline`](/api/ooxml/workbook/configuration/sheets/rows/cells#sheetsrowscellsunderline)&mdash;Displays the cell value as underlined.
* [`vAlign`](/api/ooxml/workbook/configuration/sheets/rows/cells#sheetsrowscellsvalign)&mdash;Sets the vertical text alignment.

```dojo
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
workbook.toDataURLAsync().then(function (dataURL) {
  kendo.saveAs({
    dataURI: dataURL,
    fileName: "Test.xlsx",
  });
});
</script>
```

## See Also

* [Introduction to the Excel Export Functionality]({% slug introduction_excelexport_kendoui %})
* [Freezing Rows and Columns]({% slug freezerowsandcolumns_excelexport_kendoui %})
* [Setting the Column Width]({% slug columnwidth_excelexport_kendoui %})
* [Spanning Cells across Rows and Columns]({% slug colaspanandrowspan_excelexport_kendoui %})
* [Creating Multiple Sheets]({% slug sheets_excelexport_kendoui %})
* [Exporting the Kendo UI DataSource to Excel]({% slug exportdatasource_excelexport_kendoui %})
