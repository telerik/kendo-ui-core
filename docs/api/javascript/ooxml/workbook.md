---
title: Workbook
page_title: Configuration and methods of kendo.ooxml.Workbook
---

# kendo.ooxml.Workbook

## Fields

### sheets `Array`

The sheets of the workbook. Every sheet represents a page from the final Excel file.

See [sheets configuration](#configuration-sheets).

## Configuration

### creator `String` *(default: "Kendo UI")*

The creator of the workbook.

#### Example - set the creator

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

The date when the workbook is created. The default value is `new Date()`.

#### Example - set the date
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

### sheets `Array`

The sheets of the workbook. Every sheet represents a page from the final Excel file.

### sheets.columns `Array`

The column configuration.

### sheets.columns.autoWidth `Boolean` *(default: false)*

If set to true the column will stretch to fit the contents of all cells.

#### Example - enable auto width

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

### sheets.columns.width `Number`

The width of the column in pixels.

#### Example - set the column widths

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

### sheets.freezePane `Object`

Frozen rows and columns configuration.

#### Example - freeze rows and columns

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              columns: [ { autoWidth: true }, { autoWidth: true }, { autoWidth: true } ],
              freezePane: { colSplit: 2, rowSplit: 1 },
              rows: [
                { cells: [ { value: "Frozen row" }, { value: "Frozen row" }, { value: "Frozen row" }  ] },
                { cells: [ { value: "Frozen column" }, { value: "Frozen column" }, { value: "Free column" }  ] }
              ]
          }
      ]
    });
    kendo.saveAs({
      dataURI: workbook.toDataURL(),
      fileName: "Test.xlsx"
    });
    </script>

### sheets.freezePane.colSplit `Number` *(default: 0)*

Number of columns to freeze from the left.

### sheets.freezePane.rowSplit `Number` *(default: 0)*

Number of rows to freeze from the top.

### sheets.filter `Object` *(default: null)*

Excel auto filter configuration. When set the final document will have auto filtering enabled.

#### Example - enable filtering

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

### sheets.rows `Array`

The array of rows of the sheet.

#### Example - specify the rows of the sheet

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

The cells of the every row. Each cell represents a cell from the final Excel document.

### sheets.rows.cells.background `String` *(default: null)*

Sets the background color of the cell. Supports hex CSS-like values that start with "#" e.g. "#ff00ff".

#### Example - set the cell background color

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

### sheets.rows.cells.bold `Boolean` *(default: false)*

Setting it to `true` makes the cell value bold.

#### Example - make the cell text bold

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

The text color of the cell. Supports hex CSS-like values that start with "#" e.g. "#ff00ff".

#### Example - set the cell text color
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

#### Example - make a cell span over two columns
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

### sheets.rows.cells.fontName `String` *(default: "Calibri")*

Sets the font used to display the cell value.

#### Example - set the font name

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              rows: [
                { cells: [ { value: "Arial", fontName: "Arial" } ] }
              ]
          }
      ]
    });
    kendo.saveAs({
      dataURI: workbook.toDataURL(),
      fileName: "Test.xlsx"
    });
    </script>

### sheets.rows.cells.fontSize `Number` *(default: 11)*

Sets the font size in pixels.

#### Example - set the font size

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

The [Create a custom number format](https://support.office.com/en-us/article/Create-a-custom-number-format-78f2a361-936b-4c03-8772-09fab54be7f4) page describes the formats that Excel supports.

#### Example - set the cell format

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

### sheets.rows.cells.hAlign `String`

Sets the horizontal alignment of the cell value. Supported values are `"left"`, `"center"` and `"right"`.

#### Example - set the horizontal alignment

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              columns: [ { width: 200 } ],
              rows: [
                { cells: [ { value: "Left", hAlign: "left" } ] },
                { cells: [ { value: "Center", hAlign: "center" } ] },
                { cells: [ { value: "Right", hAlign: "right" } ] }
              ]
          }
      ]
    });
    kendo.saveAs({
      dataURI: workbook.toDataURL(),
      fileName: "Test.xlsx"
    });
    </script>

### sheets.rows.cells.italic `Boolean` *(default: false)*

Setting it to `true` italicizes the cell value.

#### Example - make the cell text italic

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

#### Example - make a cell span over two rows
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

### sheets.rows.cells.underline `Boolean` *(default: false)*

Setting it to `true` underlines the cell value.

#### Example - make the cell text underline

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

Setting it to `true` wraps the cell value.

#### Example - make the cell text underline

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

Sets the vertical alignment of the cell value. Supported values are `"top"`, `"center"` and `"bottom"`.

#### Example - set the horizontal alignment

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              columns: [ { width: 200 } ],
              rows: [
                { cells: [
                  { rowSpan: 2, value: "Top", vAlign: "top" },
                  { rowSpan: 2, value: "Middle", vAlign: "center" },
                  { rowSpan: 2, value: "Bottom", vAlign: "bottom" }
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

The value of the cell. Numbers and dates will be formatted as strings. String values are HTML encoded.

#### Example - set the cell values

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

### sheets.title `String`

Sets the title of the exported workbook sheet.

#### Example - set the sheet title

    <script>
  		var workbook = new kendo.ooxml.Workbook({
   		 sheets: [
        	{
            	columns: [ { autoWidth: true } ],
          		title: "My custom sheet title",
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

## Methods

### toDataURL

Creates an Excel file that represents the current workbook and returns it as a data URL.

#### Returns

`String` the Excel file as data URL.

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
    var dataURL = workbook.toDataURL()
    kendo.saveAs({
      dataURI: dataURL,
      fileName: "Test.xlsx"
    });
    </script>



