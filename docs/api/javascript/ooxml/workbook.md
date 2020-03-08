---
title: Workbook
page_title: Configuration and methods of kendo.ooxml.Workbook
res_type: api
---

# kendo.ooxml.Workbook

## Fields

### sheets `Array`

The [`sheets`](/api/javascript/ooxml/workbook#configuration-sheets) of the workbook. Every sheet represents a page from the final Excel file.

## Configuration

### creator `String` *(default: "Kendo UI")*

The creator of the workbook.

#### Example - setting the creator

    <script>
    var workbook = new kendo.ooxml.Workbook({
      creator: "John Doe",
      sheets: [
          {
              rows: [
                  { cells: [ { value: "foo" } ] }
              ]
          }
      ]
    });
    kendo.saveAs({
      dataURI: workbook.toDataURL(),
      fileName: "Test.xlsx"
    });
    </script>

### date `Date`

The date when the workbook is created. Defaults to `new Date()`.

#### Example - setting the date
    <script>
    var workbook = new kendo.ooxml.Workbook({
      date: new Date(2014, 5, 18)
      sheets: [
          {
              rows: [
                  { cells: [ { value: "foo" } ] }
              ]
          }
      ]
    });
    kendo.saveAs({
      dataURI: workbook.toDataURL(),
      fileName: "Test.xlsx"
    });
    </script>

### images `Object` *(default: null)*

An object containing any images used in the Spreadsheet.  The keys should be image ID-s (they are referenced by this ID in [`sheets.drawings`](/api/javascript/ooxml/workbook/configuration/sheets.drawings)) and the values should represent binary data.

#### Example - loading images in Workbook

    <script>
      var images = {
        testImage: "https://demos.telerik.com/kendo-ui/content/web/spreadsheet/sample-image.png"
      };

      var ids = Object.keys(images);
      var count = ids.length;

      if (count) {
        Object.keys(images).forEach(function(id){
          var url = images[id];

          loadBinary(url, function(data, contentType){
            images[id] = { type: contentType, data: data };
            next();
          });
        });
      } else {
        createWorkbook(); /* just in case there's no image */
      }

      function next() {
        if (--count <= 0) {
          createWorkbook();
        }
      }

      function loadBinary(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
          callback(xhr.response, xhr.getResponseHeader("Content-Type"));
        };
        xhr.onerror = function() {
          callback(null);
        };
        xhr.open("GET", url);
        xhr.responseType = "arraybuffer";
        xhr.send();
      }

      function createWorkbook() {
        var workbook = new kendo.ooxml.Workbook({
          images: images,
          sheets: [{
            name: "Food Order",
            drawings: [{
              topLeftCell: "E3",
              offsetX: 30,
              offsetY: 10,
              width: 450,
              height: 330,
              image: "testImage"
            }],
            rows: [
              {
                cells: [
                  {
                    value: "ID", background: "rgb(167,214,255)", textAlign: "center", color: "rgb(0,62,117)"
                  },
                  {
                    value: "Product", background: "rgb(167,214,255)", textAlign: "center", color: "rgb(0,62,117)"
                  }
                ]
              }]
          }]
        });

        kendo.saveAs({
          dataURI: workbook.toBlob(),
          fileName: "Test.xlsx"
        });
      }
    </script>

Note, we can reference the same image ID in two different drawings. See the [`sheets.drawings`](/api/javascript/ooxml/workbook/configuration/sheets.drawings) property for more information about a drawing's properties.

### rtl `Boolean` *(default: false)*

Sets the direction of the workbook. By default, the direction is left-to-right.

#### Example - setting the date

    <script>
    var workbook = new kendo.ooxml.Workbook({
      rtl: true,
      sheets: [
          {
              rows: [
                  { cells: [ { value: "foo" } ] }
              ]
          }
      ]
    });
    kendo.saveAs({
      dataURI: workbook.toDataURL(),
      fileName: "Test.xlsx"
    });
    </script>

### sheets `Array`

The sheets of the workbook. Every sheet represents a page from the final Excel file.

### sheets.columns `Array`

The column configuration.

### sheets.columns.autoWidth `Boolean` *(default: false)*

If set to `true`, the column will stretch to fit the contents of all cells.

#### Example - enabling the auto width

      <script>
      var workbook = new kendo.ooxml.Workbook({
        sheets: [
            {
                columns: [ { autoWidth: true } ],
                rows: [
                  { cells: [ { value: "short" } ] },
                  { cells: [ { value: "longer text value" } ] }
                ]
            }
        ]
      });
      kendo.saveAs({
        dataURI: workbook.toDataURL(),
        fileName: "Test.xlsx"
      });
      </script>

### sheets.columns.index `Number`

The zero-based index of the column in the sheet. Defaults to the index of the object in the array.

#### Example - setting the width of the second column

      <script>
      var workbook = new kendo.ooxml.Workbook({
        sheets: [{
            columns: [{
                width: 100,
                index: 1
            }]
        }]
      });
      kendo.saveAs({
        dataURI: workbook.toDataURL(),
        fileName: "Test.xlsx"
      });
      </script>

### sheets.columns.width `Number`

The width (in pixels) of the column.

#### Example - setting the column widths

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              columns: [ { width: 100 }, { width: 200 } ],
              rows: [
                {
                  cells: [
                    { value: "this column is 100px" }, { value: "this column is 200px" }
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

### sheets.drawings `Array`

An array which contains the drawings used in this sheet.

### sheets.drawings.topLeftCell `String`

A cell to which the drawing's top-left corner is anchored.

### sheets.drawings.offsetX `Number`

The horizontal offset from the anchor cell's top-left corner, in pixels.

### sheets.drawings.offsetY `Number`

The vertical offset from the anchor cell's top-left corner, in pixels.

### sheets.drawings.width `Number`

The drawing's width in pixels.

### sheets.drawings.height `Number`

The drawing's height in pixels.

### sheets.drawings.image `String`

The ID of the image to display.

### sheets.freezePane `Object`

Deprecated in versions 2015.3 and later. Use [`frozenColumns`](/api/javascript/ooxml/workbook#configuration-sheets.frozenColumns) and [`frozenRows`](/api/javascript/ooxml/workbook#configuration-sheets.frozenRows) instead.

### sheets.freezePane.colSplit `Number` *(default: 0)*

Deprecated in versions 2015.3 and later. Use [`frozenColumns`](/api/javascript/ooxml/workbook#configuration-sheets.frozenColumns) instead.

### sheets.freezePane.rowSplit `Number` *(default: 0)*

Deprecated in versions 2015.3 and later. Use [`frozenRows`](/api/javascript/ooxml/workbook#configuration-sheets.frozenRows) instead.

### sheets.frozenColumns `Number` *(default: 0)*

The number of the frozen columns in this sheet.

#### Example - freezing the columns

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [{
          frozenColumns: 2,
          rows: [
            { cells: [ { value: "Frozen column" }, { value: "Frozen column" }, { value: "Free column" }  ] }
          ]
      }]
    });

    kendo.saveAs({
      dataURI: workbook.toDataURL(),
      fileName: "Test.xlsx"
    });
    </script>

### sheets.frozenRows `Number` *(default: 0)*

The number of frozen rows in this sheet.

#### Example - freezing the rows

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [{
          frozenRows: 1,
          rows: [
            { cells: [ { value: "Frozen row" } ] },
            { cells: [ { value: "Free row" } ] }
          ]
      }]
    });

    kendo.saveAs({
      dataURI: workbook.toDataURL(),
      fileName: "Test.xlsx"
    });
    </script>


### sheets.filter `Object` *(default: null)*

The configuration of the Excel auto-filter. When set, the final document will be have auto-filtering enabled.

#### Example - enabling filtering

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              filter: { from: 0, to: 1 },
              rows: [
                { cells: [ { value: "First Name" }, { value: "Last Name" } ] },
                { cells: [ { value: "John" }, { value: "Doe" } ] },
                { cells: [ { value: "Jane" }, { value: "Doe" } ] }
              ]
          }
      ]
    });
    kendo.saveAs({
      dataURI: workbook.toDataURL(),
      fileName: "Test.xlsx"
    });
    </script>

### sheets.filter.from `Number`

The index of the first filterable column.

### sheets.filter.to `Number`

The index of the last filterable column.

### sheets.mergedCells `Array`

A range of cells that will be merged into one. The value of the first cell in the range will be displayed in the new merged cell.

    <script>
      var workbook = new kendo.ooxml.Workbook({
        sheets: [{
          mergedCells: ["A1:D1"],
          rows: [
            { cells: [ { value: "Document Title" }  ] },
            { cells: [ { value: 22 }, { value: 33 }, { value: 44 }, {value: 55}  ] }
          ]
        }]
      });

      kendo.saveAs({
        dataURI: workbook.toDataURL(),
        fileName: "Test.xlsx"
      });
    </script>

### sheets.name `String`

Sets the name of the exported workbook sheet.

#### Example - setting the name of the sheet

    <script>
        var workbook = new kendo.ooxml.Workbook({
         sheets: [
            {
                columns: [ { autoWidth: true } ],
                name: "My custom sheet name",
                rows: [
                    { cells: [ { value: "short" } ] },
                    { cells: [ { value: "longer text value" } ] }
                ]
            }
        ]
    });
    kendo.saveAs({
        dataURI: workbook.toDataURL(),
        fileName: "Test.xlsx"
    });
    </script>

### sheets.rows `Array`

The array of the sheet rows.

#### Example - specifying the rows of the sheet

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              rows: [
                { cells: [ { value: "John" }, { value: "Doe" } ] },
                { cells: [ { value: "Jane" }, { value: "Doe" } ] }
              ]
          }
      ]
    });
    kendo.saveAs({
      dataURI: workbook.toDataURL(),
      fileName: "Test.xlsx"
    });
    </script>

### sheets.rows.cells `Array`

The cells of each row. Each cell represents a cell from the final Excel document.

### sheets.rows.cells.background `String` *(default: null)*

Sets the background color of the cell. Supports hex CSS-like values that start with `#`, for example, `#ff00ff`.

#### Example - setting the background color of the cell

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              rows: [
                { cells: [ { value: "Red", background: "#ff0000" } ] }
              ]
          }
      ]
    });
    kendo.saveAs({
      dataURI: workbook.toDataURL(),
      fileName: "Test.xlsx"
    });
    </script>

### sheets.rows.cells.borderBottom `Object`

The style information for the bottom border of the cell.

### sheets.rows.cells.borderBottom.color `String`

The color of the bottom border of the cell. While many standard CSS formats are supported, the canonical form is `#ccff00`.

### sheets.rows.cells.borderBottom.size `Number`

The width (in pixels) of the border.

The allowed values are:
* `1` - Results in a "thin" border.
* `2` - Results in a "medium" border.
* `3` - Results in a "thick" border.

#### Example - adding a bottom border to the cell

    <script>
    var workbook = new kendo.ooxml.Workbook({
    sheets: [
     {
         rows: [
           { cells: [ { value: "Border", borderBottom: { color: "#ff0000", size: 3 } } ] }
         ]
     }
    ]
    });
    kendo.saveAs({
    dataURI: workbook.toDataURL(),
    fileName: "Test.xlsx"
    });
    </script>

### sheets.rows.cells.borderLeft `Object`

The style information for the left border of the cell.

### sheets.rows.cells.borderLeft.color `String`

The color of the left border of the cell. While many standard CSS formats are supported, the canonical form is `#ccff00`.

### sheets.rows.cells.borderLeft.size `Number`

The width (in pixels) of the border.

The allowed values are:
* `1` - Results in a "thin" border.
* `2` - Results in a "medium" border.
* `3` - Results in a "thick" border.

#### Example - adding a left border to the cell

    <script>
    var workbook = new kendo.ooxml.Workbook({
    sheets: [
     {
         rows: [
           { cells: [ { value: "Border", borderLeft: { color: "#ff0000", size: 3 } } ] }
         ]
     }
    ]
    });
    kendo.saveAs({
    dataURI: workbook.toDataURL(),
    fileName: "Test.xlsx"
    });
    </script>

### sheets.rows.cells.borderTop `Object`

The style information for the top border of the cell.

### sheets.rows.cells.borderTop.color `String`

The color of the top border of the cell. While many standard CSS formats are supported, the canonical form is `#ccff00`.

### sheets.rows.cells.borderTop.size `Number`

The width (in pixels) of the border.

The allowed values are:
* `1` - Results in a "thin" border.
* `2` - Results in a "medium" border.
* `3` - Results in a "thick" border.

#### Example - adding a top border to the cell

    <script>
    var workbook = new kendo.ooxml.Workbook({
    sheets: [
     {
         rows: [
           { cells: [ { value: "Border", borderTop: { color: "#ff0000", size: 3 } } ] }
         ]
     }
    ]
    });
    kendo.saveAs({
    dataURI: workbook.toDataURL(),
    fileName: "Test.xlsx"
    });
    </script>

### sheets.rows.cells.borderRight `Object`

The style information for the right border of the cell.

### sheets.rows.cells.borderRight.color `String`

The color of the right border of the cell. While many standard CSS formats are supported, the canonical form is `#ccff00`.

### sheets.rows.cells.borderRight.size `Number`

The width (in pixels) of the border.

The allowed values are:
* `1` - Results in a "thin" border.
* `2` - Results in a "medium" border.
* `3` - Results in a "thick" border.

#### Example - adding a right border to the cell

    <script>
    var workbook = new kendo.ooxml.Workbook({
    sheets: [
     {
         rows: [
           { cells: [ { value: "Border", borderRight: { color: "#ff0000", size: 3 } } ] }
         ]
     }
    ]
    });
    kendo.saveAs({
    dataURI: workbook.toDataURL(),
    fileName: "Test.xlsx"
    });
    </script>

### sheets.rows.cells.bold `Boolean` *(default: false)*

Setting `sheets.rows.cells.bold` to `true` makes the cell content bold.

#### Example - making the cell content bold

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              rows: [
                { cells: [ { value: "Bold", bold: true } ] }
              ]
          }
      ]
    });
    kendo.saveAs({
      dataURI: workbook.toDataURL(),
      fileName: "Test.xlsx"
    });
    </script>

### sheets.rows.cells.color `String` *(default: null)*

The text color of the cell. Supports hex CSS-like values that start with `#`, for example, `#ff00ff`.

#### Example - setting the cell text color

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              rows: [
                { cells: [ { value: "red", color: "#ff0000" } ] }
              ]
          }
      ]
    });
    kendo.saveAs({
      dataURI: workbook.toDataURL(),
      fileName: "Test.xlsx"
    });
    </script>

### sheets.rows.cells.colSpan `Number` *(default: 1)*

Sets the number of columns that a cell occupies.

#### Example - making a cell span over two columns

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              columns: [ { width: 100}, { width: 100 } ],
              rows: [
                { cells: [ { value: "Occupies two columns", colSpan: 2 } ] }
              ]
          }
      ]
    });
    kendo.saveAs({
      dataURI: workbook.toDataURL(),
      fileName: "Test.xlsx"
    });
    </script>

### sheets.rows.cells.fontFamily `String` *(default: "Calibri")*

Sets the font for displaying the cell value.

#### Example - setting the font name

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              rows: [
                { cells: [ { value: "Arial", fontFamily: "Arial" } ] }
              ]
          }
      ]
    });
    kendo.saveAs({
      dataURI: workbook.toDataURL(),
      fileName: "Test.xlsx"
    });
    </script>

### sheets.rows.cells.fontName `String` *(default: "Calibri")*

Deprecated in versions 2015.3 and later. Use [`fontFamily`](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.fontFamily) instead.

### sheets.rows.cells.fontSize `Number` *(default: 11)*

Sets the font size in pixels.

#### Example - setting the font size

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              rows: [
                { cells: [ { value: "20px", fontSize: 20 } ] }
              ]
          }
      ]
    });
    kendo.saveAs({
      dataURI: workbook.toDataURL(),
      fileName: "Test.xlsx"
    });
    </script>

### sheets.rows.cells.format `String`

Sets the format that Excel uses to display the cell value.

> The format option does not follow the `{0:}` syntax that `kendo.format` uses.

For more information on the formats that Excel supports, refer to the page on [creating a custom number format](https://support.office.com/en-us/article/Create-or-delete-a-custom-number-format-78f2a361-936b-4c03-8772-09fab54be7f4?ui=en-US&rs=en-US&ad=US).

#### Example - setting the cell format

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              rows: [
                { cells: [ { value: new Date(), format: "yy-MM-dd" } ] }
              ]
          }
      ]
    });
    kendo.saveAs({
      dataURI: workbook.toDataURL(),
      fileName: "Test.xlsx"
    });
    </script>

### sheets.rows.cells.formula `String`

Sets the formula that Excel uses to compute and display the cell content.

#### Example - setting the cell formula

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              rows: [
                  { cells: [ { value: 1 }, { formula: "=SUM(A:A)" } ] },
                  { cells: [ { value: 2 } ] }
              ]
          }
      ]
    });
    kendo.saveAs({
      dataURI: workbook.toDataURL(),
      fileName: "Test.xlsx"
    });
    </script>

### sheets.rows.cells.hAlign `String`

Deprecated in versions 2015.3 and later. Use [`textAlign`](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.textAlign) instead.

### sheets.rows.cells.index `Object`

The zero-based index of the cell in the row. Records which miss an index will be placed in the first available cell on the row.

> Mixing indexed with non-indexed cells might cause invalid results. To use both, place the indexed cells at the end of the array.

#### Example - listing cells by index

      <script>
      var workbook = new kendo.ooxml.Workbook({
        sheets: [{
          rows: [{
              cells: [
                  { value: "B1", index: 1 },
                  { value: "E1", index: 4 }
              ]
          }]
        }]
      });
      kendo.saveAs({
        dataURI: workbook.toDataURL(),
        fileName: "Test.xlsx"
      });
      </script>

### sheets.rows.cells.italic `Boolean` *(default: false)*

Setting `sheets.rows.cells.italic` to `true` renders the cell content in italics.

#### Example - rendering the cell content in italics

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              rows: [
                { cells: [ { value: "Italic", italic: true } ] }
              ]
          }
      ]
    });
    kendo.saveAs({
      dataURI: workbook.toDataURL(),
      fileName: "Test.xlsx"
    });
    </script>

### sheets.rows.cells.rowSpan `Number` *(default: 1)*

Sets the number of rows that a cell occupies.

#### Example - making a cell span over two rows

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              columns: [ { width: 200 } ],
              rows: [
                { cells: [ { value: "Occupies two rows", rowSpan: 2 } ] }
              ]
          }
      ]
    });
    kendo.saveAs({
      dataURI: workbook.toDataURL(),
      fileName: "Test.xlsx"
    });
    </script>

### sheets.rows.cells.textAlign `String`

Sets the horizontal alignment of the cell content.

The supported values are:

* `"left"`
* `"center"`
* `"right"`

#### Example - setting the horizontal alignment

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              columns: [ { width: 200 } ],
              rows: [
                { cells: [ { value: "Left", textAlign: "left" } ] },
                { cells: [ { value: "Center", textAlign: "center" } ] },
                { cells: [ { value: "Right", textAlign: "right" } ] }
              ]
          }
      ]
    });
    kendo.saveAs({
      dataURI: workbook.toDataURL(),
      fileName: "Test.xlsx"
    });
    </script>

### sheets.rows.cells.underline `Boolean` *(default: false)*

Setting `sheets.rows.cells.underline` to `true` underlines the cell content.

#### Example - making the cell content underlined

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              rows: [
                { cells: [ { value: "Uderline", underline: true } ] }
              ]
          }
      ]
    });
    kendo.saveAs({
      dataURI: workbook.toDataURL(),
      fileName: "Test.xlsx"
    });
    </script>

### sheets.rows.cells.wrap `Boolean` *(default: false)*

Setting `sheets.rows.cells.wrap` to `true` wraps the cell content.

#### Example - wrapping the cell content

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              rows: [
                { cells: [ { value: "Long value", wrap: true } ] }
              ]
          }
      ]
    });
    kendo.saveAs({
      dataURI: workbook.toDataURL(),
      fileName: "Test.xlsx"
    });
    </script>

### sheets.rows.cells.vAlign `String` *(default: "bottom")*

Deprecated in versions 2015.3 and later. Use [`verticalAlign`](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.verticalAlign) instead.

### sheets.rows.cells.verticalAlign `String` *(default: "bottom")*

Sets the vertical alignment of the cell content.

The supported values are:

* `"top"`
* `"center"`
* `"bottom"`

#### Example - setting the horizontal alignment

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              columns: [ { width: 200 } ],
              rows: [
                { cells: [
                  { rowSpan: 2, value: "Top", verticalAlign: "top" },
                  { rowSpan: 2, value: "Middle", verticalAlign: "center" },
                  { rowSpan: 2, value: "Bottom", verticalAlign: "bottom" }
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

### sheets.rows.cells.value `Date|Number|String|Boolean`

The value (content) of the cell. Numbers and dates are formatted as strings. String values are HTML-encoded.

#### Example - setting the cell values

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              rows: [
                { cells: [ { value: "Name" }, { value: "Birthday" }, { value: "Age" } ] },
                { cells: [ { value: "John" }, { value: new Date(1980, 1, 5) }, { value: 34 } ] }
              ]
          }
      ]
    });
    kendo.saveAs({
      dataURI: workbook.toDataURL(),
      fileName: "Test.xlsx"
    });
    </script>

### sheets.rows.index `Number`

The zero-based index of the row in the sheet. Defaults to the index of the object in the array.

#### Example - setting row height by index

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [{
          rows: [{
              cells: [{ value: "this row is 100px high" }],
              height: 100,
              index: 1
          }]
      }]
    });
    kendo.saveAs({
      dataURI: workbook.toDataURL(),
      fileName: "Test.xlsx"
    });
    </script>

### sheets.rows.height `Number`

The row height (in pixels).

#### Example - setting the height of the rows

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [{
          rows: [{
              cells: [{ value: "this row is 100px high" }],
              height: 100
          }, {
              cells: [{ value: "this row is 200px high" }],
              height: 200
          }]
      }]
    });
    kendo.saveAs({
      dataURI: workbook.toDataURL(),
      fileName: "Test.xlsx"
    });
    </script>

### sheets.rows.type `String`

Used to distinguish between the various row types in the Grid. The supported values are:

- "header"
- "footer"
- "group-header"
- "group-footer"
- "data"

### sheets.showGridLines `Boolean` *(default: true)*

A Boolean value which indicates if the grid lines of the sheet will be displayed.

### sheets.title `String`

Deprecated in versions 2015.3 and later. Use [`name`](/api/javascript/ooxml/workbook#configuration-sheets.name) instead.

## Methods

### toDataURL

Creates an Excel file that represents the current workbook and returns it as a data URL.

> The `toDataURL` method supports only JSZip 2.x versions. To use JSZip 3.x versions, call the [`toDataURLAsync`](/api/javascript/ooxml/workbook/methods/todataurlasync) method instead.

#### Returns

`String` - the Excel file as data URL.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              rows: [
                  { cells: [ { value: "foo" } ] }
              ]
          }
      ]
    });
    var dataURL = workbook.toDataURL();
    kendo.saveAs({
      dataURI: dataURL,
      fileName: "Test.xlsx"
    });
    </script>

### toDataURLAsync

Creates an Excel file that represents the current workbook and returns a `Promise` that is resolved with the data URL.

#### Returns

`Promise` - A promise that will be resolved with the Excel file as data URL.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              rows: [
                  { cells: [ { value: "foo" } ] }
              ]
          }
      ]
    });

    workbook.toDataURLAsync().then(function(dataURL) {
        kendo.saveAs({
          dataURI: dataURL,
          fileName: "Test.xlsx"
        });
    });

    </script>
