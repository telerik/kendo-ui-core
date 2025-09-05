---
title: Workbook
page_title: Configuration and methods of kendo.ooxml.Workbook
res_type: api
---

# kendo.ooxml.Workbook

## Fields

### sheets `Array`

The [`sheets`](/api/javascript/ooxml/workbook#configuration-sheets) of the workbook. Every sheet represents a page from the final Excel file.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              name: "Sheet1",
              rows: [
                  { cells: [ { value: "Header 1" }, { value: "Header 2" } ] },
                  { cells: [ { value: "Data 1" }, { value: "Data 2" } ] }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "workbook.xlsx"
      });
    });
    </script>

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

    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
    });
    </script>

### date `Date`

The date when the workbook is created. Defaults to `new Date()`.

#### Example - setting the date
    <script>
    var workbook = new kendo.ooxml.Workbook({
      date: new Date(2014, 5, 18),
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

        workbook.toDataURLAsync().then(function(dataURL) {
          kendo.saveAs({
            dataURI: dataURL,
            fileName: "Test.xlsx"
          });
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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
    });
    </script>

### sheets `Array`

The sheets of the workbook. Every sheet represents a page from the final Excel file.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              name: "Products",
              rows: [
                  { cells: [ { value: "Product" }, { value: "Price" } ] },
                  { cells: [ { value: "Laptop" }, { value: 999.99 } ] },
                  { cells: [ { value: "Phone" }, { value: 599.99 } ] }
              ]
          },
          {
              name: "Summary", 
              rows: [
                  { cells: [ { value: "Total Items" }, { value: 2 } ] }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "multiple-sheets.xlsx"
      });
    });
    </script>

### sheets.columns `Array`

The column configuration.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              columns: [
                  { width: 100 },
                  { width: 200, autoWidth: false },
                  { width: 150 }
              ],
              rows: [
                  { cells: [ 
                      { value: "ID" }, 
                      { value: "Product Name" }, 
                      { value: "Price" } 
                  ] },
                  { cells: [ 
                      { value: 1 }, 
                      { value: "Laptop Computer" }, 
                      { value: 999.99 } 
                  ] }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "columns-example.xlsx"
      });
    });
    </script>

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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
    });
    </script>

### sheets.drawings `Array`

An array which contains the drawings used in this sheet.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      images: {
        "logo": {
          data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
          type: "image/png"
        }
      },
      sheets: [
          {
              drawings: [
                  {
                      topLeftCell: "B2",
                      offsetX: 10,
                      offsetY: 10,
                      width: 100,
                      height: 100,
                      image: "logo"
                  }
              ],
              rows: [
                  { cells: [ { value: "Data with image" } ] }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "drawings-example.xlsx"
      });
    });
    </script>

### sheets.drawings.topLeftCell `String`

A cell to which the drawing's top-left corner is anchored.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      images: {
        "chart": {
          data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
          type: "image/png"
        }
      },
      sheets: [
          {
              drawings: [
                  {
                      topLeftCell: "C3",
                      width: 150,
                      height: 100,
                      image: "chart"
                  }
              ],
              rows: [
                  { cells: [ { value: "A1" }, { value: "B1" }, { value: "C1" } ] },
                  { cells: [ { value: "A2" }, { value: "B2" }, { value: "C2" } ] },
                  { cells: [ { value: "A3" }, { value: "B3" }, { value: "Image will be here" } ] }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "anchor-cell-example.xlsx"
      });
    });
    </script>

### sheets.drawings.offsetX `Number`

The horizontal offset from the anchor cell's top-left corner, in pixels.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      images: {
        "icon": {
          data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
          type: "image/png"
        }
      },
      sheets: [
          {
              drawings: [
                  {
                      topLeftCell: "B2",
                      offsetX: 25,
                      offsetY: 10,
                      width: 50,
                      height: 50,
                      image: "icon"
                  }
              ],
              rows: [
                  { cells: [ { value: "Product" }, { value: "Icon will be offset 25px right" } ] }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "offset-x-example.xlsx"
      });
    });
    </script>

### sheets.drawings.offsetY `Number`

The vertical offset from the anchor cell's top-left corner, in pixels.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      images: {
        "banner": {
          data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
          type: "image/png"
        }
      },
      sheets: [
          {
              drawings: [
                  {
                      topLeftCell: "A1",
                      offsetX: 10,
                      offsetY: 15,
                      width: 200,
                      height: 40,
                      image: "banner"
                  }
              ],
              rows: [
                  { cells: [ { value: "Banner will be offset 15px down" } ] }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "offset-y-example.xlsx"
      });
    });
    </script>

### sheets.drawings.width `Number`

The drawing's width in pixels.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      images: {
        "logo": {
          data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
          type: "image/png"
        }
      },
      sheets: [
          {
              drawings: [
                  {
                      topLeftCell: "B2",
                      offsetX: 5,
                      offsetY: 5,
                      width: 120,
                      height: 80,
                      image: "logo"
                  }
              ],
              rows: [
                  { cells: [ { value: "Company" }, { value: "Logo (120px wide)" } ] }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "drawing-width-example.xlsx"
      });
    });
    </script>

### sheets.drawings.height `Number`

The drawing's height in pixels.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      images: {
        "chart": {
          data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
          type: "image/png"
        }
      },
      sheets: [
          {
              drawings: [
                  {
                      topLeftCell: "C2",
                      offsetX: 0,
                      offsetY: 0,
                      width: 150,
                      height: 100,
                      image: "chart"
                  }
              ],
              rows: [
                  { cells: [ { value: "Year" }, { value: "Sales" }, { value: "Chart (100px high)" } ] }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "drawing-height-example.xlsx"
      });
    });
    </script>

### sheets.drawings.image `String`

The ID of the image to display.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      images: {
        "productImage": {
          data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
          type: "image/png"
        },
        "companyLogo": {
          data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
          type: "image/png"
        }
      },
      sheets: [
          {
              drawings: [
                  {
                      topLeftCell: "B2",
                      width: 100,
                      height: 100,
                      image: "productImage"
                  },
                  {
                      topLeftCell: "D2", 
                      width: 80,
                      height: 50,
                      image: "companyLogo"
                  }
              ],
              rows: [
                  { cells: [ { value: "Product" }, { value: "Image" }, { value: "Brand" }, { value: "Logo" } ] }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "image-id-example.xlsx"
      });
    });
    </script>

### sheets.freezePane `Object`

Deprecated in versions 2015.3 and later. Use [`frozenColumns`](/api/javascript/ooxml/workbook#configuration-sheets.frozenColumns) and [`frozenRows`](/api/javascript/ooxml/workbook#configuration-sheets.frozenRows) instead.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              freezePane: {
                  colSplit: 2,
                  rowSplit: 1
              },
              rows: [
                  { cells: [ { value: "Frozen Row" }, { value: "Frozen Row" }, { value: "Frozen Row" } ] },
                  { cells: [ { value: "Frozen Col" }, { value: "Frozen Col" }, { value: "Free Cell" } ] },
                  { cells: [ { value: "Frozen Col" }, { value: "Frozen Col" }, { value: "Free Cell" } ] }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "freeze-pane-example.xlsx"
      });
    });
    </script>

### sheets.freezePane.colSplit `Number` *(default: 0)*

Deprecated in versions 2015.3 and later. Use [`frozenColumns`](/api/javascript/ooxml/workbook#configuration-sheets.frozenColumns) instead.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              freezePane: {
                  colSplit: 3
              },
              rows: [
                  { cells: [ 
                      { value: "Frozen 1" }, 
                      { value: "Frozen 2" }, 
                      { value: "Frozen 3" }, 
                      { value: "Scrollable" } 
                  ] }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "col-split-example.xlsx"
      });
    });
    </script>

### sheets.freezePane.rowSplit `Number` *(default: 0)*

Deprecated in versions 2015.3 and later. Use [`frozenRows`](/api/javascript/ooxml/workbook#configuration-sheets.frozenRows) instead.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              freezePane: {
                  rowSplit: 2
              },
              rows: [
                  { cells: [ { value: "Header Row 1" } ] },
                  { cells: [ { value: "Header Row 2" } ] },
                  { cells: [ { value: "Scrollable Data" } ] },
                  { cells: [ { value: "More Data" } ] }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "row-split-example.xlsx"
      });
    });
    </script>

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

    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
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

    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
    });
    </script>

### sheets.filter.from `Number`

The index of the first filterable column.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              filter: {
                  from: 1,
                  to: 3
              },
              rows: [
                  { cells: [ 
                      { value: "ID" }, 
                      { value: "Name" }, 
                      { value: "Category" }, 
                      { value: "Price" } 
                  ] },
                  { cells: [ 
                      { value: 1 }, 
                      { value: "Product A" }, 
                      { value: "Electronics" }, 
                      { value: 100 } 
                  ] }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "filter-from-example.xlsx"
      });
    });
    </script>

### sheets.filter.to `Number`

The index of the last filterable column.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              filter: {
                  from: 0,
                  to: 2
              },
              rows: [
                  { cells: [ 
                      { value: "Product" }, 
                      { value: "Quantity" }, 
                      { value: "Total" }, 
                      { value: "Notes" } 
                  ] },
                  { cells: [ 
                      { value: "Laptop" }, 
                      { value: 5 }, 
                      { value: 5000 }, 
                      { value: "In stock" } 
                  ] }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "filter-to-example.xlsx"
      });
    });
    </script>

### sheets.hyperlinks `Array`

Specify a collection of hyperlinks that will be applied to the corresponding cells. You can set only one link per cell.

#### Example - Add hyperlinks to cells A1 and A2

    <script>
      var workbook = new kendo.ooxml.Workbook({
        sheets: [
          {
            hyperlinks: [{ref: "A1", target: "https://google.com"}, {ref: "A2", target: "https://youtube.com"}],
            rows: [
              { cells: [ { value: "Google" } ] },
              { cells: [ { value: "Youtube" } ] }
            ]
          }
        ]
      });

      workbook.toDataURLAsync().then(dataURI => {
        kendo.saveAs({
          dataURI,
          fileName: "Test.xlsx"
        });
      });
    </script>

### sheets.hyperlinks.ref `String`

The cell to which the link must be applied. Examples - "A1", "A2", "B3", "AA2", "BA2", "C5".

#### Example - Set the cell reference

    <script>
      var workbook = new kendo.ooxml.Workbook({
        sheets: [
          {
            hyperlinks: [{ref: "A1", target: "https://google.com"}, {ref: "A2", target: "https://youtube.com"}],
            rows: [
              { cells: [ { value: "Google" } ] },
              { cells: [ { value: "Youtube" } ] }
            ]
          }
        ]
      });

      workbook.toDataURLAsync().then(dataURI => {
        kendo.saveAs({
          dataURI,
          fileName: "Test.xlsx"
        });
      });
    </script>

### sheets.hyperlinks.target `String`

The target link that will be opened when the cell is clicked.

#### Example - Set the target url

    <script>
      var workbook = new kendo.ooxml.Workbook({
        sheets: [
          {
            hyperlinks: [{ref: "A1", target: "https://google.com"}, {ref: "A2", target: "https://youtube.com"}],
            rows: [
              { cells: [ { value: "Google" } ] },
              { cells: [ { value: "Youtube" } ] }
            ]
          }
        ]
      });

      workbook.toDataURLAsync().then(dataURI => {
        kendo.saveAs({
          dataURI,
          fileName: "Test.xlsx"
        });
      });
    </script>

### sheets.mergedCells `Array`

A range of cells that will be merged into one. The value of the first cell in the range will be displayed in the new merged cell.

#### Example

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

    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
    });
    </script>

### sheets.rows.cells `Array`

The cells of each row. Each cell represents a cell from the final Excel document.

#### Example - specify the cells of each row

    <script>
      var workbook = new kendo.ooxml.Workbook({
        sheets: [{
          rows: [
            { cells: [ { value: "Document Title" }  ] },
            { cells: [ { value: 22 }, { value: 33 }, { value: 44 }, {value: 55}  ] }
          ]
        }]
      });
    
      workbook.toDataURLAsync().then(function(dataURL) {
        kendo.saveAs({
          dataURI: dataURL,
          fileName: "Test.xlsx"
        });
      });
    </script>

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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
    });
    </script>

### sheets.rows.cells.borderBottom `Object`

The style information for the bottom border of the cell.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              rows: [
                  { cells: [ 
                      { value: "Cell with bottom border", borderBottom: { color: "#0066cc", size: 2 } } 
                  ] },
                  { cells: [ 
                      { value: "Regular cell below" } 
                  ] }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "border-bottom-example.xlsx"
      });
    });
    </script>

### sheets.rows.cells.borderBottom.color `String`

The color of the bottom border of the cell. While many standard CSS formats are supported, the canonical form is `#ccff00`.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              rows: [
                  { cells: [ 
                      { value: "Red border", borderBottom: { color: "#ff0000", size: 1 } },
                      { value: "Green border", borderBottom: { color: "#00ff00", size: 1 } },
                      { value: "Blue border", borderBottom: { color: "#0000ff", size: 1 } }
                  ] }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "border-colors-example.xlsx"
      });
    });
    </script>

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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
    });
    </script>

### sheets.rows.cells.borderLeft `Object`

The style information for the left border of the cell.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              rows: [
                  { cells: [ 
                      { value: "No border" },
                      { value: "Left border", borderLeft: { color: "#ff6600", size: 3 } }
                  ] }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "border-left-example.xlsx"
      });
    });
    </script>

### sheets.rows.cells.borderLeft.color `String`

The color of the left border of the cell. While many standard CSS formats are supported, the canonical form is `#ccff00`.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              rows: [
                  { cells: [ 
                      { value: "Purple", borderLeft: { color: "#800080", size: 2 } },
                      { value: "Orange", borderLeft: { color: "#ff8000", size: 2 } },
                      { value: "Teal", borderLeft: { color: "#008080", size: 2 } }
                  ] }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "left-border-colors-example.xlsx"
      });
    });
    </script>

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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
    });
    </script>

### sheets.rows.cells.borderTop `Object`

The style information for the top border of the cell.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              rows: [
                  { cells: [ 
                      { value: "Top border", borderTop: { color: "#cc0066", size: 2 } }
                  ] },
                  { cells: [ 
                      { value: "Regular cell" } 
                  ] }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "border-top-example.xlsx"
      });
    });
    </script>

### sheets.rows.cells.borderTop.color `String`

The color of the top border of the cell. While many standard CSS formats are supported, the canonical form is `#ccff00`.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              rows: [
                  { cells: [ 
                      { value: "Maroon", borderTop: { color: "#800000", size: 1 } },
                      { value: "Navy", borderTop: { color: "#000080", size: 1 } },
                      { value: "Lime", borderTop: { color: "#00ff00", size: 1 } }
                  ] }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "top-border-colors-example.xlsx"
      });
    });
    </script>

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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
    });
    </script>

### sheets.rows.cells.borderRight `Object`

The style information for the right border of the cell.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              rows: [
                  { cells: [ 
                      { value: "Right border", borderRight: { color: "#009900", size: 3 } },
                      { value: "Next cell" }
                  ] }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "border-right-example.xlsx"
      });
    });
    </script>

### sheets.rows.cells.borderRight.color `String`

The color of the right border of the cell. While many standard CSS formats are supported, the canonical form is `#ccff00`.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              rows: [
                  { cells: [ 
                      { value: "Crimson", borderRight: { color: "#dc143c", size: 2 } },
                      { value: "Gold", borderRight: { color: "#ffd700", size: 2 } },
                      { value: "Silver", borderRight: { color: "#c0c0c0", size: 2 } }
                  ] }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "right-border-colors-example.xlsx"
      });
    });
    </script>

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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
    });
    </script>

### sheets.rows.cells.fontName `String` *(default: "Calibri")*

Deprecated in versions 2015.3 and later. Use [`fontFamily`](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.fontFamily) instead.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              rows: [
                  { cells: [ 
                      { value: "Arial Font", fontName: "Arial" },
                      { value: "Times Font", fontName: "Times New Roman" },
                      { value: "Default Font" }
                  ] }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "font-name-example.xlsx"
      });
    });
    </script>

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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
    });
    </script>

### sheets.rows.cells.hAlign `String`

Deprecated in versions 2015.3 and later. Use [`textAlign`](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.textAlign) instead.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              rows: [
                  { cells: [ 
                      { value: "Left", hAlign: "left" },
                      { value: "Center", hAlign: "center" },
                      { value: "Right", hAlign: "right" }
                  ] }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "horizontal-align-example.xlsx"
      });
    });
    </script>

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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
    });
    </script>

### sheets.rows.cells.vAlign `String` *(default: "bottom")*

Deprecated in versions 2015.3 and later. Use [`verticalAlign`](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.verticalAlign) instead.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              rows: [
                  { 
                      height: 50,
                      cells: [ 
                          { value: "Top", vAlign: "top" },
                          { value: "Center", vAlign: "center" },
                          { value: "Bottom", vAlign: "bottom" }
                      ] 
                  }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "vertical-align-example.xlsx"
      });
    });
    </script>

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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
    });
    </script>

### sheets.rows.type `String`

Used to distinguish between the various row types in the Grid. The supported values are:

- "header"
- "footer"
- "group-header"
- "group-footer"
- "data"

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              rows: [
                  { 
                      type: "header",
                      cells: [ { value: "Header Row" } ] 
                  },
                  { 
                      type: "data",
                      cells: [ { value: "Data Row 1" } ] 
                  },
                  { 
                      type: "data",
                      cells: [ { value: "Data Row 2" } ] 
                  },
                  { 
                      type: "footer",
                      cells: [ { value: "Footer Row" } ] 
                  }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "row-types-example.xlsx"
      });
    });
    </script>

### sheets.showGridLines `Boolean` *(default: true)*

A Boolean value which indicates if the grid lines of the sheet will be displayed.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              name: "With Grid Lines",
              showGridLines: true,
              rows: [
                  { cells: [ { value: "A1" }, { value: "B1" } ] },
                  { cells: [ { value: "A2" }, { value: "B2" } ] }
              ]
          },
          {
              name: "No Grid Lines",
              showGridLines: false,
              rows: [
                  { cells: [ { value: "A1" }, { value: "B1" } ] },
                  { cells: [ { value: "A2" }, { value: "B2" } ] }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "grid-lines-example.xlsx"
      });
    });
    </script>

### sheets.title `String`

Deprecated in versions 2015.3 and later. Use [`name`](/api/javascript/ooxml/workbook#configuration-sheets.name) instead.

#### Example

    <script>
    var workbook = new kendo.ooxml.Workbook({
      sheets: [
          {
              title: "Sales Report",
              rows: [
                  { cells: [ { value: "Quarter" }, { value: "Sales" } ] },
                  { cells: [ { value: "Q1" }, { value: 100000 } ] },
                  { cells: [ { value: "Q2" }, { value: 120000 } ] }
              ]
          }
      ]
    });
    
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "sheet-title-example.xlsx"
      });
    });
    </script>

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
    workbook.toDataURLAsync().then(function(dataURL) {
      kendo.saveAs({
        dataURI: dataURL,
        fileName: "Test.xlsx"
      });
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
