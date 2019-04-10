---
title: Exporting Tabular Data to PDF
page_title: Exporting Tabular Data to PDF | Kendo UI Drawing Library
description: "Learn how to export a wide Kendo UI Grid into PDF."
slug: tabulardata_drawingapi
position: 5
---

# Exporting Tabular Data to PDF

The built-in PDF export option of the Kendo UI Grid exports as many columns as it can fit on a page with a defined page size.

The default export mechanism of the Grid uses the `drawDOM` function which renders HTML content. However, `drawDOM` cannot do horizontal page splitting and, as a result, wide content gets truncated. To work around this issue, you can fit the content on the page by using the `scale` argument but if the Grid is too wide, this approach will result in making the text too small.

To export a table with a large number of columns to PDF, load the Kendo UI Spreadsheet and use the `kendo.spreadsheet.drawTabularData` static method which utilizes the print layout algorithm of the Spreadsheet widget.

The `kendo.spreadsheet.drawTabularData` function takes a data source and a column object array, and produces a Drawing group which can then be saved as a multi-page PDF. By default, the order of the pages is from left to right and from top to bottom.

> The suggested approach is independent from the Kendo UI Grid implementations and requires only a data source and column titles. The approach does not support more advanced Grid features such as HTML row or cell templates.

To control the generated table, use any of the following options:

- `dataSource`&mdash;Must be a data source which contains tabular data. For example, the data source of the Grid.
- `columns`&mdash;Must be a columns description of the Grid, that is, an array of objects which contains a title and a field. The title and the field serve to display the header row which is repeated on every page.
- `guidelines`&mdash;Controls whether the Grid lines are displayed. By default, `guidelines` is set to `true`.
- `guideColor`&mdash;Sets the color of Grid lines in a CSS notation.
- `headerBackground`&mdash;Stes the background color for headers.
- `headerColor`&mdash;Sets the text color for the headers.
- `oddBackground`&mdash;Sets the background for the odd rows.
- `evenBackground`&mdash;Sets the background for the even rows.
- `fontFamily`&mdash;Sets the font family. By default, `fontFamily` is set to `Arial`.
- `fontSize`&mdash;Sets the font size. By default, `fontSize` is set to `12`.
- `paperSize`&mdash;Sets the paper size. By default, `paperSize` is set to `A4`.
- `margin`&mdash;Sets content margin. By default, `margin` is set to `1cm`.
- `landscape`&mdash;Sets the paper orientation. By default, `landscape` is set to `true`.
- `fitWidth`&mdash;Determines whether to fit content on paper width. This will scale down content if needed to avoid horizontal splitting. By default, `fitWidth` is set to `false`.
- `scale`&mdash;Sets a scale factor. No scale is set by default. By default, `scale` is set to `1`.
- `rowHeights`&mdash;Determines the row height in screen pixels. By default, `rowHeights` is set to `20`.

```dojo
<button onclick="saveTabularData()">Export PDF</button>
<div id="grid"></div>
<script>
  function saveTabularData() {
    kendo.spreadsheet.drawTabularData({
      dataSource: grid.dataSource,
      columns: grid.columns,
      headerBackground: "#567",
      headerColor: "#fff",
      evenBackground: "#eee",
    }).then(function(group){
      kendo.pdf.saveAs(group, "test.pdf");
    });
  }

  $(document).ready(function() {
    window.grid = $("#grid").kendoGrid({
      dataSource: {
        type: "odata",
        transport: {
          read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
        },
        schema: {
          model: {
            fields: {
              OrderID: { type: "number" },
              Freight: { type: "number" },
              ShipName: { type: "string" },
              OrderDate: { type: "date" },
              ShipCity: { type: "string" }
            }
          }
        }
      },
      height: 550,
      filterable: true,
      sortable: true,
      pageable: true,
      columns: [
        {
          field:"OrderID",
          filterable: false
        },
        {
          field: "CustomerID",
          title: "Customer ID"
        },
        {
          field: "Freight",
          title: "Freight"
        },
        {
          field: "OrderDate",
          title: "Order Date",
          format: "{0:MM/dd/yyyy}"
        }, {
          field: "ShipName",
          title: "Ship Name"
        }, {
          field: "ShipRegion",
          title: "Ship Region"
        }, {
          field: "ShipCity",
          title: "Ship City"
        }, {
          field: "ShipAddress",
          title: "Ship Address"
        }, {
          field: "ShipPostalCode",
         	title: "PO Code"
        }, {
          field: "ShipCountry",
          title: "Ship Country"
        }
      ]
    }).getKendoGrid();
  });
</script>
```

## See Also

* [Overview of the Drawing Library]({% slug overview_kendoui_drawingapi %})
* [Drawing Basic Shapes]({% slug basicshapes_drawingapi %})
* [Exporting Drawings to PDF]({% slug pdfderawingexport_drawingapi %})
* [Drawing DOM Elements]({% slug drawingofhtmlelements_drawingapi %})
