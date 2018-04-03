---
title: Printing tabular data in PDF
page_title: Printing tabular data in PDF | Kendo UI Drawing API
description: "Learn how to export a wide grid into PDF"
slug: tabulardata_drawingapi
position: 5
---

# Printing tabular data in PDF

Sometimes you might need to export to PDF a table with a large number of columns, however, the built-in PDF Export of the Kendo UI Grid will export as many columns as it can fit on a page with a defined page size. The default grid export mechanism uses the `drawDOM` function, which renders HTML content, but one limitation of `drawDOM` is that it cannot do horizontal page splitting, so the wide content will be truncated. An option is to use the `scale` argument to fit the content on page, but that still won't work when the grid is really wide because it can make the text too small.

For such situations we provide a static method that uses the Spreadsheet's print layout algorithm (therefore this feature requires the Kendo UI Spreadsheet to be loaded).

## kendo.spreadsheet.drawTabularData

This function takes a data source and a columns object array and produces a Drawing Group which can then be saved as a multi-page PDF. Pages are ordered left-to-right, top-to-bottom.

> This method is independent from the Kendo UI Grid widget; it only requires the data
> source and column titles.  It does not support more advanced grid features
> such as HTML templates for rows/cells, it can only print the data.

There are a number of parameters that control the aspect of the generated table:

- `dataSource` — must be a data source containing tabular data, for example, a grid's data source.
- `columns` — must be a grid's columns description (an array of objects containing title and field). These serve to display the header row, which is repeated on every page.
- `guidelines` — controls whether the grid lines are displayed *(default: true)*
- `guideColor` — the color of grid lines in CSS notation
- `headerBackground` — background color for headers
- `headerColor` - text color for headers
- `oddBackground` - background for odd rows
- `evenBackground` - background for even rows
- `fontFamily` - the font family *(default: "Arial")*
- `fontSize` - the font size *(default: 12)*
- `paperSize` - the paper size *(default: A4)*
- `margin` - content margin *(default: "1cm")*
- `landscape` — the paper orientation *(default: true)*
- `fitWidth` — whether to fit content on paper width. This will scale down content if needed to avoid horizontal splitting. *(default: false)*
- `scale` — a scale factor. No scale is set by default. *(default: 1)*
- `rowHeights` — the row height in screen pixels *(default 20)*

###### Example:

```html
    <script src="https://kendo.cdn.telerik.com/2018.1.221/js/pako_deflate.min.js"></script>  
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

    <script>
      kendo.pdf.defineFont({
        "DejaVu Sans" : "https://kendo.cdn.telerik.com/2018.1.221/styles/fonts/DejaVu/DejaVuSans.ttf"
      });
    </script>
    <button onclick="saveTabularData()" class="k-button"><span class="k-icon k-i-pdf"></span>Export PDF</button>
    <div id="grid"></div>
    <script>
      function saveTabularData() {
        kendo.spreadsheet.drawTabularData({
          dataSource: grid.dataSource,
          columns: grid.columns,
          headerBackground: "#567",
          headerColor: "#fff",
          evenBackground: "#eee"
        }).then(function(group){
          kendo.pdf.saveAs(group, "test.pdf");
        });
      }

      $(document).ready(function() {
        window.grid = $("#grid").kendoGrid({
          dataSource: {
            pageSize: 20,
            data: products,
            autoSync: true,
            schema: {
              model: {
                id: "ProductID",
                fields: {
                  CategoryID: { from: "Category.CategoryID" },
                  CategoryName: { from: "Category.CategoryName" }
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
              field:"ProductID",
              filterable: false
            },
            {
              field: "CategoryID",
              title: "Category ID"
            },
            {
              field: "CategoryName",
              title: "Category Name"
            },
            {
              field: "ProductName",
              title: "Product Name"
            },
            {
              field: "SupplierID",
              title: "Supplier ID"
            }, {
              field: "QuantityPerUnit",
              title: "Quantity Per Unit"
            }, {
              field: "UnitPrice",
              title: "Unit Price"
            }, {
              field: "UnitsInStock",
              title: "Units In Stock"
            }, {
              field: "UnitsOnOrder",
              title: "Units On Order"
            }, {
              field: "ReorderLevel",
              title: "Reorder Level"
            }, {
              field: "Discontinued",
              title: "Discontinued"
            }
          ]
        }).getKendoGrid();
      });
    </script>
```
