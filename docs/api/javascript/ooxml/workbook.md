---
title: Workbook
page_title: Configuration and methods of kendo.ooxml.Workbook
res_type: api
---

# kendo.ooxml.Workbook

## Fields

### sheets `Array`

The [`sheets`](/api/javascript/ooxml/workbook#configuration-sheets) of the workbook. Every sheet represents a page from the final Excel file.


<div class="meta-api-description">
How to manage individual sheets in an Excel workbook using Kendo UI for jQuery? Access, retrieve, modify, add, or manage the collection of worksheet pages within a workbook, enabling control over individual sheets, tabs, or pages in an Excel file; handle sheet objects to read content, insert new sheets, update existing ones, organize or reorder sheets, and interact with the set of spreadsheet pages that comprise the entire workbook structure.
</div>

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


<div class="meta-api-description">
How to set author metadata in exported Excel files with Kendo UI for jQuery? Configure or set the author, creator name, or document origin metadata embedded within exported or saved spreadsheet files, enabling control over workbook author attribution, file properties visibility, and document metadata for identification, auditing, or organizational tagging purposes in generated Excel or spreadsheet documents.
</div>

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


<div class="meta-api-description">
How to set creation date and time for a Kendo UI workbook? Configure, set, or retrieve the creation date and time for a workbook to manage file metadata, timestamps, and export dates; control the workbook’s creation moment by assigning or accessing a JavaScript Date object representing when the file was first generated or modified, enabling customization of file properties related to creation time, export timestamps, or historical record keeping, with options to define a specific date or default to the current system date automatically.
</div>

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


<div class="meta-api-description">
How to embed images in Kendo UI workbook spreadsheet? Embed and manage pictures within spreadsheets by mapping unique image identifiers to their binary content, supporting formats like ArrayBuffer, Blob, or base64. Configure and reference images inline for drawing layers, import or export image data, access images by custom IDs, and integrate visuals programmatically in sheets. Control image embedding, retrieval, and association with sheet drawings through flexible binary data mappings, enabling image lookup, insertion, and manipulation linked to drawing references.
</div>

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


<div class="meta-api-description">
How do I change the text direction in Kendo UI Workbook from left to right to right to left? Control and configure text directionality and layout orientation in spreadsheet interfaces, enabling toggling between right-to-left and left-to-right reading orders, adjusting UI alignment, mirroring columns and rows, setting flow direction for languages such as Arabic or Hebrew, reversing content placement, managing bi-directional text support, customizing spreadsheet presentation for different cultures or locales, and ensuring proper layout rendering based on language preferences.
</div>

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


<div class="meta-api-description">
How do I access and manipulate individual sheets in a Kendo UI workbook? Control and organize the collection of spreadsheet pages within a workbook by adding, deleting, rearranging, or accessing individual sheets, which represent separate data tabs used for importing, exporting, or manipulating Excel file contents, enabling configuration of document structure, sheet order, and dynamic sheet management through code.
</div>

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


<div class="meta-api-description">
How to configure column settings in a Kendo UI for jQuery Workbook? Configure and customize spreadsheet columns by specifying column arrays that set individual widths, data formats, visibility (hidden or shown), and other column-specific settings to control layout, appearance, filtering, sorting, and export options within a sheet. Enable precise column-level control over the structure of your sheets during workbook setup by defining properties such as size, style, data type formatting, hidden state toggling, and display preferences, helping tailor the presentation and behavior of each column for rendering, printing, and data processing workflows. Adjust column layouts and presentation parameters programmatically to manage visibility, apply number or date formats, set fixed or auto widths, and influence how columns appear in exports or reports, optimizing sheet usability and data organization according to your configuration needs.
</div>

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


<div class="meta-api-description">
How do I enable automatic column width adjustment in Kendo UI for jQuery workbook? Automatically adjust or enable automatic resizing of spreadsheet columns based on the width of the cell contents, allowing columns to expand or shrink dynamically to fit all text or data within each cell, set or configure columns to auto-fit content length, control column sizing to prevent truncation or excessive whitespace by enabling content-based width adjustments, optimize column widths for improved readability and layout without manual resizing, activate responsive column width sizing that adapts to the values inside cells, toggle automatic column width stretching to match the longest entry in each column, ensure columns resize automatically to accommodate varying data lengths or text sizes within workbook sheets.
</div>

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


<div class="meta-api-description">
How do I change the position of a column in a Kendo UI Workbook sheet using its index? Control or configure the zero-based position of a column within a sheet, set or adjust the column order by specifying its index, reorder columns by changing their numeric placement, define where columns appear based on index values starting at zero, manipulate or assign column positions programmatically for precise layout control, shift or insert columns at specific zero-based locations, change or override default column order driven by array position, customize the sequence or arrangement of columns within workbook sheets, manage column positioning through index settings to enable dynamic column placement or sorting.
</div>

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


<div class="meta-api-description">
How do I set the width of columns in a Kendo UI workbook? Adjust, configure, or set the pixel width of columns within a spreadsheet or sheet in a workbook to control exact column sizing, enabling developers to specify numeric values for column width to customize layout, improve readability, or fit content precisely; this feature supports precise column dimension settings, dynamic column sizing, pixel-based width control, and customization during workbook or sheet initialization to ensure columns display at the desired size for various spreadsheet applications and UI configurations.
</div>

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


<div class="meta-api-description">
How do I access and manipulate drawings in a Kendo UI for jQuery Workbook? Access and manipulate all drawing elements embedded within a worksheet, including the ability to iterate through, retrieve, update, add, or delete visual objects, shapes, and graphical components tied to individual sheets in a workbook. Control and modify sheet-level drawings for purposes such as serialization, batch updates, custom rendering, or integrating with graphic data workflows. This encompasses managing collections of images, charts, annotations, overlays, and other visual objects linked to sheet data, enabling developers to dynamically handle graphical content as part of automated processing, exporting, or UI customization tasks within spreadsheet environments.
</div>

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


<div class="meta-api-description">
How to anchor a drawing in Excel-like spreadsheet with Kendo UI? Control or set the anchor point of a drawing by specifying which worksheet cell its top-left corner aligns with, allowing precise positioning, anchoring, or moving of images, shapes, charts, or other drawings relative to spreadsheet cells. Adjust, configure, or fix the drawing's position based on a specific cell reference to ensure consistent placement during edits, shifts, or resizing of the sheet content. Enable sheet-relative alignment of graphical objects by linking their top-left point to a designated cell, supporting use cases like dynamic repositioning, layout control, and synchronization of drawings with cell-based data.
</div>

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


<div class="meta-api-description">
How can I adjust the horizontal position of drawings in a Kendo UI workbook? Control the horizontal placement or positioning of drawings, images, or shapes inside spreadsheet cells by setting the precise number of pixels offset from the anchor cell’s left edge; adjust, shift, move, or fine-tune the drawing’s X-coordinate alignment relative to the cell for customized layout, pixel-based horizontal spacing, or layout tweaks in workbooks, spreadsheets, or grid-based interfaces.
</div>

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


<div class="meta-api-description">
How do I adjust the vertical position of a drawing in Kendo UI for jQuery Workbook? Control the vertical placement, adjustment, or positioning of a drawing relative to the top edge of its anchor cell in a workbook or spreadsheet, enabling precise shifting up or down by specifying pixel offsets, fine-tuning layout alignment, customizing overlay placement on cells, enabling vertical displacement of images or shapes tied to cells, setting or modifying how far drawings move away from the cell boundary along the Y-axis, managing vertical margin or padding inside spreadsheets, and adjusting drawing alignment in relation to cell top-left corners for exact visual arrangement.
</div>

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


<div class="meta-api-description">
How do I set the width of drawings in a Kendo UI spreadsheet? Adjust or set the horizontal size, width, or pixel dimensions of drawings on spreadsheet sheets to control layout, scaling, or display size when rendering, exporting, or printing; configure drawing width by specifying exact pixel values to resize images, charts, shapes, or annotations within worksheets, enabling precise control over visual presentation and ensuring consistent appearance across different outputs and screen resolutions.
</div>

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


<div class="meta-api-description">
How do I adjust the height of worksheet drawings in a Kendo UI for jQuery spreadsheet? Adjust or retrieve the vertical dimension of worksheet drawings measured in pixels, enabling precise control over drawing height for layout design, resizing, rendering, export size settings, and dynamic updates within spreadsheet components. This supports configuring or reading the pixel-based height to manage drawing scale, appearance, and placement on sheets, facilitating customization of visual elements sizing and integration in spreadsheet rendering and export workflows.
</div>

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


<div class="meta-api-description">
How do I set an image for a drawing in a Kendo UI Workbook sheet? Set or configure the visual content for a drawing in a spreadsheet by specifying which image to display, linking to an image identifier from a collection or gallery of stored images within the workbook, enabling control over embedded picture elements, graphics, icons, or visual references used in sheet annotations, diagrams, or overlays. This selection ties the drawing’s appearance to a predefined image resource, facilitating changes to embedded graphics, managing linked images in charts or custom visuals, and controlling which picture or illustration renders within a worksheet’s drawing layer for presentation, reporting, or data visualization purposes.
</div>

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


<div class="meta-api-description">
How do I freeze specific rows and columns in Kendo UI's Workbook? Control the ability to lock or freeze specific rows or columns in a spreadsheet to keep headers or key data visible while scrolling by configuring fixed rows or columns settings, setting frozen rows and columns, enabling pane freezing or locking, applying split or freeze pane views in worksheet grids, migrating from older freeze pane configurations to updated frozenRows and frozenColumns options, managing persistent header visibility, and customizing viewport locking for enhanced data navigation within workbook sheets.
</div>

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


<div class="meta-api-description">
How do I lock multiple columns on the left side of a Kendo UI spreadsheet? Set or configure the number of columns to lock or freeze on the left side of a spreadsheet for improved navigation and data visibility, controlling how many columns remain fixed while scrolling horizontally, often used to keep headers or key information in view; this setting defines column splits for freezing panes, enabling column locking in grids or sheets, and is a common feature for locking column sections to maintain context when working with wide tables or datasets.
</div>

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


<div class="meta-api-description">
How do I set the number of rows to keep fixed at the top in a Kendo UI Spreadsheet? Set or configure the number of rows to keep fixed or locked at the top of a spreadsheet or workbook view, enabling control over which rows remain visible when scrolling vertically. Adjust how many header or title rows stay frozen or pinned above the scrolling area for improved navigation and data reference. Manage the count of visible, non-scrolling rows in spreadsheet panes, commonly used for freezing header rows or important information. This setting determines how many rows remain statically displayed at the top in grid or sheet configurations, helping users keep track of key data while browsing large datasets. Transition or change the number of frozen top rows to maintain layout consistency during updates or migrations from older deprecated properties to newer alternatives.
</div>

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


<div class="meta-api-description">
How do I freeze columns in Kendo UI for jQuery workbook? Control and configure the number of leftmost columns that stay fixed or locked in place while scrolling horizontally in a spreadsheet or workbook sheet, enabling users to freeze or unfreeze columns to maintain visibility of key data during navigation. Adjust, set, or enable the count of frozen columns to keep certain columns always visible for easier reference, comparison, and data entry, including options to specify zero for no frozen columns or any positive number to fix a range of columns on the left. This feature helps with workbook layout customization, user interface control, and improving data readability by maintaining column headers or important data in view as you scroll across wide sheets.
</div>

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


<div class="meta-api-description">
How do I lock top rows in a Kendo UI spreadsheet so they don't scroll? Control the number of rows locked, pinned, or fixed at the top of a spreadsheet to keep header or important rows visible during vertical scrolling; configure how many rows remain stationary while navigating through data, enabling freezing or locking of top rows to maintain context and improve readability when viewing large tables or sheets.
</div>

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


<div class="meta-api-description">
How do I enable automatic filtering for sheets in a Kendo UI Workbook? Control and configure automatic filtering for spreadsheet sheets to set filter ranges, apply column-based filter criteria, enable Excel-like data filters, specify which rows or columns should be filtered, customize filter behavior for exporting or displaying data, activate sheet-level autofilter options, define dynamic filter conditions on data tables, adjust filtering rules for specific areas within a worksheet, manage filter states for export-ready spreadsheets, and apply conditional or multi-column filters to control visible data subsets in exported Excel documents.
</div>

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


<div class="meta-api-description">
How do I set the starting column index for filtering in Kendo UI Workbook? Set, configure, or control the starting column index for applying filters on workbook sheets, specifying where the filter range begins by selecting the initial column number. Enable precise control over which columns are included in filtering operations from the leftmost column onward, adjust or customize the first filtered column position in spreadsheet sheets, define the starting point of filter application using a numeric index, or determine the initial column to apply filter criteria in tabular data. This setting is useful for managing filter scope, configuring filter ranges, setting the initial column for data screening, and tailoring filter behavior when initializing or processing spreadsheet sheets.
</div>

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


<div class="meta-api-description">
How do I set the last column index for filtering in a Kendo UI Workbook sheet? Set or adjust the last column index for filtering within a sheet to control the range of columns subject to filter operations, specify the numeric endpoint for column filters, limit or extend which columns are included in filter criteria, customize filter boundaries by index to shape which column data is filtered, manage filter scope by defining the final column position in filter application, configure column filter limits through numeric indexes to include or exclude specific columns, determine the endpoint column in filtering setups to refine visible data, control the filtering range across columns by setting a numeric end boundary, set limits on column filters to optimize data views and apply precise filter scopes based on column positions.
</div>

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


<div class="meta-api-description">
How do I add clickable links to specific cells in a Kendo UI for jQuery spreadsheet? Add and manage clickable links within spreadsheet cells by defining a collection of hyperlinks that map URLs, email links, or document references directly to specific cell addresses or ranges on any sheet of a workbook. Configure, set, or update these interactive cell links individually, enabling navigation from cells to external websites, files, or locations with each cell containing a single hyperlink. Control link destinations, customize linked cell behavior, and associate precise hyperlink targets to sheet cells for seamless user redirection or reference within your spreadsheet environment.
</div>

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


<div class="meta-api-description">
How do I specify the target cell for a hyperlink in Kendo UI's Workbook using A1-style notation? Specify or configure the exact single cell where a hyperlink should be set using standard spreadsheet address formats like A1, B3, or AA2; control or assign the target cell for linking by providing a single-cell reference in A1-style notation to bind a clickable hyperlink directly to that location within a worksheet, enabling precise targeting of links to cells such as C5 or BA2, supporting scenarios where users need to set, identify, or manage link destinations at specific spreadsheet coordinates using familiar address syntax.
</div>

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


<div class="meta-api-description">
How to set the target URL for hyperlinks in a Kendo UI workbook sheet? Configure, set, or control the destination URL, link, or protocol that opens when clicking a hyperlink within a spreadsheet cell, including external web addresses, internal document anchors, or custom link schemes, enabling navigation behavior in workbook sheets through clickable cell hyperlinks.
</div>

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


<div class="meta-api-description">
How do I merge multiple cells in a Kendo UI Workbook sheet? Configure and control combining multiple adjacent cells into one unified cell within spreadsheet sheets by specifying rectangular cell ranges to merge, set or enable merged regions to display only the top-left cell’s content across the combined area, manage cell grouping during workbook setup or dynamically, customize how ranges of cells are joined and presented as a single entity, and handle cell span, integration, or consolidation for improved layout, formatting, or data visualization across multiple cells in tabular data.
</div>

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


<div class="meta-api-description">
How do I customize the sheet names in an exported workbook file using Kendo UI for jQuery? Control, configure, or specify the title, label, or tab name of each worksheet or sheet within an exported workbook file to customize how sheet names appear when saving or generating spreadsheets; adjust the sheet’s display name or tab label during export or initialization by setting a unique or descriptive string for easy identification, organization, or presentation of individual sheets inside the workbook output.
</div>

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


<div class="meta-api-description">
How can I access and modify individual rows in a Kendo UI Workbook spreadsheet? Control, access, and configure the rows within individual spreadsheet pages by managing the collection of row objects tied to each sheet, enabling setting, updating, or retrieving row data structures, layouts, and content arrays in a workbook’s sheets collection. This includes modifying row properties, inserting or deleting rows, and handling row-level configurations across multiple sheets during workbook setup or dynamic editing, supporting use cases where developers want to manipulate spreadsheet row information programmatically in an array-like format reflecting the sheet’s layout and data organization.
</div>

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


<div class="meta-api-description">
How do I access individual cells in a spreadsheet when using the Kendo UI for jQuery Workbook export? Accessing, reading, modifying, or mapping data to individual spreadsheet cells within rows and sheets, enabling retrieval and update of specific cell values or objects in Excel export workflows, supporting cell-level manipulation such as editing contents, formatting, or data binding before generating the final spreadsheet output, controlling precise cell references and layout within the workbook structure for custom data exports, and integrating with spreadsheet rendering components to ensure the exported Excel file reflects any changes or data mappings made at the cell level.
</div>

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


<div class="meta-api-description">
How to set background color of individual cells in Kendo UI Workbook using hex codes? Control or customize the fill color of individual cells by setting the background color with CSS-style hex codes beginning with # to highlight, color-code, or style spreadsheet cells; configure cell shading, set custom cell backgrounds, apply color formatting, or change cell fill colors dynamically within sheets and rows to enhance visual organization, readability, or thematic design of workbook data.
</div>

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


<div class="meta-api-description">
How can I customize the border at the bottom of a cell in a Kendo UI workbook sheet? Set or customize the bottom edge border of a spreadsheet cell to adjust its color, thickness, style, or visibility within workbook sheets, enabling precise control over the cell’s lower boundary appearance in rows and columns, useful for styling, formatting, or visually separating content by configuring cell border bottom lines in grids, tables, or Excel-like environments.
</div>

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


<div class="meta-api-description">
How can I set the bottom border color of a spreadsheet cell in Kendo UI for jQuery? Control, configure, or set the bottom border color of a spreadsheet cell using various CSS color formats including hex codes, RGB, RGBA, and named colors to customize cell border styling within a workbook sheet. Adjust or modify the cell's lower edge border appearance to highlight, differentiate, or enhance table layouts, data presentation, or UI themes by applying colors such as hexadecimal values like #ccff00 or standard CSS color names. Enable dynamic styling of cell bottom borders for tables, grids, or worksheets to improve visual clarity, emphasize data rows, or tailor spreadsheet aesthetics with flexible color input options recognized in front-end and spreadsheet applications.
</div>

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


<div class="meta-api-description">
How do I set the thickness of the bottom border in Kendo UI's Workbook cells? Set or adjust the thickness, width, or size of the bottom border line for individual cells or ranges within spreadsheet sheets, controlling how thick or thin the bottom cell border appears in pixels. Configure cell bottom border styles by specifying values that correspond to thin, medium, or thick line widths to customize the visual separation below cell content. Enable or change the bottom cell border thickness to affect how cell edges are visually outlined or emphasized in workbook sheets for improved readability, styling, or formatting consistency. Control bottom border size settings to highlight, underline, or differentiate cells by adjusting the border pixel dimensions between thin, medium, or thick presets.
</div>

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


<div class="meta-api-description">
How do I customize the left border of individual cells in a Kendo UI spreadsheet? Configure cell left edge border styling by setting color, thickness, dash or solid line patterns, and custom border styles for individual worksheet cells. Control, customize, or apply left-hand cell border formatting, lines, or edges in spreadsheet workbooks, enabling tailored left border visuals, including solid, dashed, or colored lines, for cell outlines on the left side. Adjust or define the left border appearance for cells to enhance spreadsheet layout, design, or visual separation in grid structures.
</div>

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


<div class="meta-api-description">
How do I change the color of the left border in individual cells within a Kendo UI spreadsheet? Set or customize the left border color of individual cells within spreadsheet rows and sheets to control cell edge styling, apply CSS color codes like hex, RGB, or named colors, configure visual highlights on the left cell boundary, enable precise border color adjustments for exported or displayed workbooks, and define consistent left cell border appearances across dynamic or static data grids for enhanced spreadsheet presentation and formatting.
</div>

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


<div class="meta-api-description">
How do I set the size of the left border for individual cells in a spreadsheet row using Kendo UI? Adjust, configure, or set the thickness, width, or size of the left border for individual cells in spreadsheet rows, controlling pixel-based border styles such as thin, medium, or thick left edges; customize cell border thickness to create consistent left side outlines by specifying numeric values for border width, enabling precise visual formatting of grid lines or cell outlines on the left side within workbook sheets.
</div>

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


<div class="meta-api-description">
How do I set the top border style of cells in a Kendo UI for jQuery spreadsheet? Configure or customize the top border styling of spreadsheet cells by setting the color, thickness, line style such as solid or dashed, and applying or binding this formatting dynamically to cell edges in tables or grid layouts. Control cell border appearance on the upper edge to highlight, separate, or visually structure data and adapt the top border design through code or style settings for enhanced sheet presentation and readability. Enable precise adjustment of the cell's upper edge outline to meet design, formatting, or UI requirements in spreadsheet or workbook interfaces.
</div>

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


<div class="meta-api-description">
How do I change the color of the top border in a spreadsheet cell using Kendo UI for jQuery? Set, change, or customize the top edge color of a spreadsheet cell’s border using various CSS-compatible color formats including hex codes like #ccff00, RGB, RGBA, HSL, and named colors to style or export workbook sheets; configure, control, or update the cell's upper border shading for visual formatting, design consistency, or data presentation in spreadsheets and grid-based layouts.
</div>

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


<div class="meta-api-description">
How do I set the thickness of the top border in a Kendo UI spreadsheet cell? Adjust or configure the thickness, width, or size of the top border line on individual spreadsheet cells, enabling control over the visual weight or thickness of cell outlines, from thin to medium or thick pixel sizes, by specifying numeric values for border thickness or line weight to customize cell border appearance, set border line widths for the upper edges of cells or rows in a worksheet, and control cell styling through precise numeric border sizing.
</div>

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


<div class="meta-api-description">
How to customize the right border of individual cells in a Kendo UI workbook sheet? Configure, customize, or set the right edge border style, thickness, color, and appearance of individual spreadsheet cells within workbook sheets, enabling control over cell right-border formatting, styling, and visual differentiation in rows and columns; adjust the right boundary line of cells for design, highlighting, or structural purposes in grid layouts, tables, or data sheets to manage how the cell's right edge looks during display or export.
</div>

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


<div class="meta-api-description">
How do I set the color of the right border in a cell using Kendo UI for jQuery? Customize, change, configure, or control the color of a cell’s right border in spreadsheet sheets, enabling setting border colors using CSS color formats like named colors, hex codes, rgb(), or rgba() values on individual cells or ranges. Adjust the style or appearance of right cell borders by specifying exact colors for Excel-like workbook sheets, facilitating precise visual formatting, border color themes, and right-edge highlighting in grid or table cells within workbook sheets.
</div>

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


<div class="meta-api-description">
How do I adjust the thickness of the right border in table cells using Kendo UI for jQuery? Adjust the thickness or width of the right border edge of table or spreadsheet cells by configuring pixel size, setting border thickness levels such as thin, medium, or thick for cell styling, formatting, or exporting purposes. Control the right-hand border line width for customizing cell outlines, borders, or visual separators in spreadsheet rows and columns by defining numeric values representing border thickness intensity around cells. Enable precise border sizing on the right side of cells to influence appearance, layout, and print/export clarity within workbooks or grid-based data displays.
</div>

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


<div class="meta-api-description">
How to make cells in Kendo UI Workbook display bold font? Enable or control bold font styling for individual spreadsheet cells by setting the text to bold or strong weight, apply bold formatting to cell contents within rows and sheets to emphasize text, configure or toggle boldface on specific cells for visual distinction during rendering or exporting, set or adjust font weight to bold in cell data for highlighting or emphasis in workbooks, customize cell styles to include bold text formatting across sheets and rows for enhanced readability and presentation.
</div>

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


<div class="meta-api-description">
How do I change the color of cell text in a Kendo UI workbook? Customize, set, or change the font color, text color, or cell text styling within spreadsheet cells by applying CSS-like hexadecimal color codes such as #ff00ff to individual cell objects in the workbook sheets’ rows and cells. Enable highlighting, formatting, or visual differentiation of cell content by specifying color properties that affect text appearance, allowing developers to control and manipulate the display color of cell fonts in spreadsheets, including assigning hex color values, customizing text color for data visualization, conditional formatting, or presentation purposes.
</div>

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


<div class="meta-api-description">
How do I set the number of columns that a single cell extends across in Kendo UI spreadsheet? Control or configure cell merging and horizontal spanning by setting the number of columns a single cell extends across within spreadsheet sheets, enabling merged cells, combined columns, or multi-column coverage for layout, display, editing, or export purposes; adjust column span dynamically to create wide cells covering multiple adjacent columns, customize spreadsheet layouts, manage cell width expansion, define multi-column merged cells, and influence rendering or data export behavior by setting this horizontal cell span count.
</div>

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


<div class="meta-api-description">
How to set font family in Kendo UI for jQuery spreadsheet cells? Control and customize the text appearance in spreadsheet cells by setting or configuring the font typeface, font family name, or CSS font stack used to render cell values, enabling options such as specifying a single font like Arial or Times New Roman or multiple fallback fonts like Helvetica, sans-serif to ensure consistent styling and visual presentation across different devices and environments. This includes changing, applying, or overriding the font style to suit design preferences, display requirements, or localization needs within rows, columns, or individual cells of the workbook.
</div>

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


<div class="meta-api-description">
How to update fontName property in workbook sheets using Kendo UI for jQuery? Configure or set the font family for cell text in workbook sheets by specifying font styling options, including how to update or migrate deprecated font properties such as fontName to the current fontFamily setting, controlling text appearance in spreadsheet cells, adjusting cell font styles, managing font customization or replacement across versions, ensuring compatibility by switching from legacy font parameters to modern font family controls, and enabling precise font selection and display in spreadsheet cells.
</div>

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


<div class="meta-api-description">
How do I change the font size in Kendo UI spreadsheet cells? Adjust or configure the text size, font scale, or character height within spreadsheet cells and rows by setting numeric pixel values that control how large or small text appears in sheets; customize, set, or enable specific font dimensions to ensure readable, scalable, or proportionate text rendering inside individual cells across workbook sheets during initialization or runtime.
</div>

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


<div class="meta-api-description">
How to apply Excel-compatible formatting strings to cell values in a Kendo UI Workbook? Configure and set cell display styles by applying Excel-compatible formatting strings to customize how numbers, dates, currencies, percentages, and other values appear within spreadsheet cells. Control cell value presentation with flexible, Excel-style format patterns, including built-in or custom number formats, enabling precise adjustments of how data looks in rows and sheets. Enable formatting that influences visual rendering of cell contents without relying on standard string interpolation syntax, supporting a wide range of numeric and date display options consistent with Excel conventions, perfect for initializing workbook display settings and tailoring data visualization in spreadsheet applications.
</div>

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


<div class="meta-api-description">
How can I set an Excel formula in a Kendo UI Workbook cell? Configure or assign Excel formulas to individual spreadsheet cells to perform calculations such as sums, averages, or conditional logic by specifying expressions like =SUM(A1:A3); enable dynamic cell value computations using formula expressions within workbook sheets to automate data processing, initialize or bind cell content with calculated results, define custom calculation logic, update formulas programmatically, control cell computations in grid-like structures, and apply Excel-compatible formula strings for real-time evaluation and display of computed values.
</div>

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


<div class="meta-api-description">
How to set horizontal alignment for cell content in Kendo UI Workbook? Control or configure horizontal text alignment within individual spreadsheet cells including left, center, or right alignment options for cell content in workbook sheets rows and cells structures; adjust or set cell text positioning horizontally to customize spreadsheet appearance, formatting, and layout; align text inside cells consistently across rows or columns with options to position content flush left, centered, or flush right; manage cell content alignment for better readability and visual structure in spreadsheet data presentations; this setting is used for horizontal arrangement of text in spreadsheet cells prior to newer alignment properties and may be relevant for legacy compatibility or specific sheet formatting needs.
</div>

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


<div class="meta-api-description">
How do I set the column position of a cell in a Kendo UI spreadsheet row using the index property? Configure or set the zero-based column position of a cell within a spreadsheet row to control its exact placement; specify the cell’s column index starting from zero to determine which column it occupies, with cells lacking an explicit index automatically filling the next available position in the row. Manage the order and arrangement of cells by explicitly assigning column positions to avoid conflicts or invalid layouts, especially when mixing cells with and without assigned indexes. Control the precise cell layout in a row by defining column indices, enabling custom column ordering, positioning, or reordering for cells, and ensuring consistent cell alignment within sheets when programmatically manipulating workbook data structures.
</div>

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


<div class="meta-api-description">
How do I make cell content in a Kendo UI spreadsheet appear italicized? Configure text styling to display a cell’s content in italic or slanted font, control whether spreadsheet cells show italicized characters, enable or disable italic font style for individual workbook cells, set or toggle cell text to appear slanted or oblique within spreadsheet rows and sheets, apply or remove italics formatting for cell content in a workbook, specify font style as italic to highlight or emphasize cell text, manipulate cell font attributes to include italic rendering, activate italicized text presentation in spreadsheet cells to customize appearance, manage the cell’s font style properties to switch between regular and italicized text within workbook sheets and rows.
</div>

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


<div class="meta-api-description">
How to set cell height for multiple rows in Kendo UI Workbook spreadsheet? Configure vertical cell merging by setting how many rows a single cell should cover within a spreadsheet sheet, enabling multi-row cell layouts, controlling cell height across rows, specifying vertical cell span for merged cells, adjusting row coverage for individual cells, managing cell block size vertically in worksheets, enabling multi-row cell formatting, setting cell extension over multiple rows, customizing cell height through row spanning, and defining vertical dimension of cells that combine or merge across spreadsheet rows.
</div>

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


<div class="meta-api-description">
How do I left-align text in cells using Kendo UI for jQuery? Control and customize horizontal text alignment within spreadsheet cells by setting content to align left, center, or right, enabling precise layout adjustments for cell data presentation, formatting, and styling. Configure or modify cell content alignment to achieve consistent appearance, proper justification, or visual organization in tables, grids, or workbooks, supporting scenarios such as centering headers, left-aligning text entries, or right-aligning numbers and values inside spreadsheet frameworks. Adjust or set horizontal alignment properties to dictate text positioning in cells, ensuring clarity, readability, and professional spreadsheet formatting.
</div>

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


<div class="meta-api-description">
How do I enable underlining of text in individual cells within a Kendo UI for jQuery spreadsheet? Control, enable, or disable underlining of text within individual spreadsheet cells by setting the cell's underline attribute to true or false, allowing for toggling underlined formatting on or off for content in specific rows and sheets. Adjust text decoration to highlight, emphasize, or style cell values with underlined fonts in workbooks, spreadsheets, or grid-based data structures, supporting customization of cell text appearance including options to set, apply, remove, or clear underline formatting at the cell level across different sheets and rows within a workbook environment.
</div>

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


<div class="meta-api-description">
How to enable word wrap in individual cells of a Kendo UI workbook? Configure cell text to automatically wrap within spreadsheet cells, allowing long or multiline content to display fully without overflow or truncation. Enable or disable multiline text wrapping in individual cells or rows so that cell content breaks onto multiple lines inside sheets for better readability and presentation. Control word wrap behavior to prevent horizontal scrolling by wrapping text dynamically, ensuring all content remains visible by adjusting cell height and line breaks. Set or toggle wrap text options to enhance editing, viewing, and printing of spreadsheet data with wrapped cell content that fits neatly inside each cell boundary.
</div>

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


<div class="meta-api-description">
How do I vertically align cell content in a Kendo UI for jQuery Workbook? Adjust vertical alignment or vertical anchor of spreadsheet cells by configuring cell positioning within rows and sheets, including options to set top, middle, bottom, or justify vertical placement; manage cell content alignment vertically for layout, formatting, and presentation needs, controlling how text or data is vertically arranged inside cells, ensuring proper content positioning in workbooks, and handling legacy or deprecated properties like earlier vertical alignment settings that may require updating to newer vertical alignment controls.
</div>

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


<div class="meta-api-description">
How do I align content vertically in a spreadsheet cell using Kendo UI for jQuery? Control and configure vertical positioning of content inside spreadsheet cells, enabling alignment at the top, middle, or bottom of each cell. Adjust cell text or object vertical placement within rows and sheets during initialization or dynamic updates by setting alignment options such as top alignment, center alignment, or bottom alignment. This vertical content alignment helps in formatting cell data presentation, styling spreadsheets, and ensuring consistent layout of cell contents across various worksheet rows and columns. Enable vertical content positioning inside cells for better visual arrangement, proper spacing, and alignment preferences in workbook sheets data grids.
</div>

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


<div class="meta-api-description">
How can I set and get cell values in Kendo UI for jQuery workbook sheets? Access, read, update, or modify the content stored within individual spreadsheet cells, including entering or retrieving text, numbers, dates, or formulas in workbook sheets; control or manipulate cell data values during workbook configuration, handle string encoding for safe HTML representation, and convert numeric or date entries to formatted string representations for display and processing purposes across rows and columns in spreadsheet components.
</div>

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


<div class="meta-api-description">
How do I set the position of a specific row in Kendo UI for jQuery's Workbook sheets? Control, set, or retrieve the zero-based position or order of a specific row within a worksheet's collection of rows to manage row placement, indexing, or sequence in spreadsheet manipulation, allowing identification or adjustment of row positions for dynamic data handling, row reordering, or programmatic access in workbook sheets.
</div>

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


<div class="meta-api-description">
How do I set row height in a Kendo UI for jQuery spreadsheet sheet? Adjust or configure the vertical size of rows in spreadsheet sheets by specifying numeric pixel values to set row height, control spacing between rows, customize row dimensions for layout consistency, enable precise row sizing for display or printing purposes, modify or scale row heights programmatically, optimize visual alignment and appearance of tabular data, and manage row height dynamically to fit content or design requirements within workbook sheets.
</div>

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


<div class="meta-api-description">
How do I configure the type of rows in a Kendo UI for jQuery Workbook? Control and configure the classification of grid rows within a workbook by specifying the row kind such as header rows for titles, footer rows for summaries, group-header rows for grouped section titles, group-footer rows for group summaries, or data rows containing the main content, enabling precise export formatting, row identification, mapping operations, and behavior differentiation between headers, footers, grouped segments, and data entries to support customized grid layouts and structured data processing.
</div>

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


<div class="meta-api-description">
How do I show grid lines in Kendo UI workbook spreadsheet sheets? Control the visibility of cell grid lines in spreadsheet sheets by enabling or disabling the display of the grid layout, configure whether the sheet renders the intersecting lines between cells, toggle the appearance of worksheet gridlines to improve readability or create a cleaner interface, set the option to show or hide the cell boundaries within a workbook for better data visualization, customize sheet presentation by managing gridline visibility during initialization or at runtime to suit user preferences or UI design needs.
</div>

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


<div class="meta-api-description">
How can I set the title of a worksheet in Kendo UI for jQuery? Set or change the name, label, or title of a worksheet or sheet within a workbook during setup or initialization, including configuring sheet identification, renaming tabs, customizing sheet headers, or controlling sheet display names programmatically; note that older syntax for defining sheet titles may be deprecated and replaced by updated naming properties, so handle sheet metadata, workbook organization, spreadsheet sheet aliases, and references when working with sheet names or titles in code or configuration files.
</div>

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


<div class="meta-api-description">
How can I export an Excel file from Kendo UI for jQuery as a base64 encoded data URL? Convert or export the current workbook into a base64 encoded data URL representing an Excel OOXML file that can be downloaded, previewed, or uploaded by setting as an anchor href, opening in a new tab, or sending via HTTP POST; serialize and generate this Excel file synchronously on the client side for instant use, enabling saving or sharing spreadsheet data without server processing, compatible specifically with JSZip 2.x libraries and useful for quick file generation, client-only Excel export, and immediate access to workbook content in a downloadable or transferable data URL string format.
</div>

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


<div class="meta-api-description">
How to export Kendo UI workbook data as a URL in .xlsx format asynchronously? Convert or export the current spreadsheet or workbook to an Excel file asynchronously, generating a data URL or data URI string that represents the entire workbook content in .xlsx format. Retrieve the Excel file’s base64-encoded URL for use cases such as downloading the file on the client side, previewing the workbook in a new browser tab, uploading the Excel data to remote storage, sending the file through APIs, or embedding and sharing the workbook snapshot. Enable asynchronous creation of Excel files from the workbook state and obtain string URLs that can be directly used for file handling, transfer, or display without blocking the UI.
</div>

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
