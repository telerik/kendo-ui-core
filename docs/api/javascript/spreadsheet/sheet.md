---
title: Sheet
page_title: Configuration, methods and events of Kendo UI Spreadsheet Sheet Instance object
res_type: api
---

# kendo.spreadsheet.Sheet

Represents a sheet instance in the [Kendo UI Spreadsheet](/api/javascript/ui/spreadsheet) widget. Inherits from [Observable](/api/javascript/observable).

## Fields

### dataSource `kendo.data.DataSource`

The [DataSource](/framework/datasource/overview) instance to which the Sheet is bound to.


<div class="meta-api-description">
How do I configure dynamic data loading for a Kendo UI spreadsheet sheet? Configure and connect spreadsheet sheets to external data sources or database tables to enable dynamic loading, syncing, updating, and real-time data binding of rows and cells; control and access the linked data for programmatic reading, modifying, synchronizing, or refreshing content within sheets, ensuring seamless integration with underlying datasets, live data feeds, or APIs for automated updates and data-driven spreadsheet management.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>

      var dataSource = new kendo.data.DataSource({
        transport: {
          read:  {
            url: "https://demos.telerik.com/service/v2/core/Products"
          }
        }
      });

      $("#spreadsheet").kendoSpreadsheet();

      var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
      var sheet = spreadsheet.activeSheet();
      sheet.setDataSource(dataSource);

	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(sheet.dataSource);

    </script>

## Methods

### addDrawing

Adds a new drawing to this sheet.


<div class="meta-api-description">
How can I programmatically add custom shapes, images, or annotations to a Kendo UI spreadsheet? Add, insert, or embed shapes, images, annotations, or graphics onto a sheet programmatically by creating and attaching new visual elements to the sheet’s drawing layer. Enable adding new drawings that can be accessed, modified, or managed using drawing-related functions and APIs, supporting dynamic placement, editing, and control of embedded objects or visual overlays within the spreadsheet. Control embedding of custom images, diagrams, or annotations as part of the sheet content through automation or scripting interfaces.
</div>

#### Parameters

##### drawing `Object`

This can contain the same properties as you can pass to
[`sheets.drawings`](/api/javascript/ui/spreadsheet#configuration-sheets.drawings)
configuration options.

#### Returns

`Object` an internal Drawing object containing the passed properties.  The
internals of this object are not intended to be public API at this point, but
you can pass this object reference to [`removeDrawing`](#methods-removeDrawing)
if you want to remove this drawing.

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();

    // Add a drawing to the sheet
    var drawing = sheet.addDrawing({
        topLeftCell: "B2",
        offsetX: 10,
        offsetY: 10,
        width: 200,
        height: 100,
        type: "image",
        src: "https://via.placeholder.com/200x100"
    });

    console.log("Drawing added:", drawing);
    </script>

### clearFilter

Clears the filters for the passed column index. If an array is passed, `clearFilter` will clear the filter for each column index.


<div class="meta-api-description">
How do I remove filters from specific columns in Kendo UI spreadsheet using the clearFilter method? Clear or reset filters on spreadsheet columns by removing any applied filtering criteria using column indexes, supporting clearing filters for single or multiple columns at once, enabling removal of active filter settings to restore original data views, managing and disabling column-specific filtering configurations, and controlling filtered data display by resetting one or more specified columns’ filter states.
</div>

#### Parameters

##### indexes `Number|Array`

The column index(es)

#### Example

    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.range("A1:B2").values([
            [1, 2],
            [2, 3]
        ]).filter({
            column: 1,
            filter: new kendo.spreadsheet.ValueFilter({
                values: [2]
            })
        }); // the filter will hide the second row

        sheet.clearFilter(1); // the clear filter will remove the applied filter for the second column.
    </script>

### columnWidth

Gets or sets the width of the column at the given index.


<div class="meta-api-description">
How do I dynamically adjust the width of a specific column in a Kendo UI spreadsheet by its index? Retrieve or set the width of a specific column by its index to control or modify column size dynamically during runtime, allowing programmatic adjustment of layout, resizing columns individually, customizing or configuring column widths, managing grid or spreadsheet column dimensions, changing column width by position, and enabling flexible column size updates within the sheet structure for responsive or precise layout control.
</div>

#### Parameters

##### index `Number`

The zero-based index of the column

##### width `Number` *optional*

If passed, the method will set the width of the column at the passed index.

#### Example

    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.columnWidth(1, 100);
    </script>

### batch

Suppresses triggering of change events for a sequence of actions. Triggers a single change event at the end of the sequence.

Greatly improves performance when calling multiple methods that change the sheet state, as the widget will be refreshed once.


<div class="meta-api-description">
How can I optimize updates to a Kendo UI spreadsheet by grouping multiple changes? Optimize multiple updates to a spreadsheet or tabular interface by grouping changes to avoid repetitive event triggers, allowing batch execution of state modifications that suppress individual update notifications and emit a single consolidated change event after all actions complete, improving performance and reducing UI refresh overhead by applying multiple edits, configurations, or state changes in one operation without intermediate redraws or event firing.
</div>

#### Parameters

##### callback `Function`

The sequence of actions that will be executed without triggering a change event.

##### changeEventArgs `Object`

The change event arguments that will be used for the change event triggered after the callback finishes executing.

#### Example

    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.batch(function() {
            for (var i = 0; i < 10; i += 2) {
                sheet.hideColumn(i);
                sheet.hideRow(i);
            }
        }, { layout: true });
    </script>

### deleteColumn

Deletes the contents of the column at the provided index and shifts the remaining contents of the sheet to the left.


<div class="meta-api-description">
How do I dynamically remove a column from a Kendo UI spreadsheet by its index? Remove a specific column by index from a spreadsheet, clearing its cells and shifting all subsequent columns and data leftward to maintain layout continuity, enabling tasks such as deleting columns, adjusting sheet structure, updating cell positions, reordering data, modifying columns dynamically, or managing spreadsheet content by eliminating unwanted vertical sections.
</div>

#### Parameters

##### index `Number`

The zero-based index of the column

#### Example

    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.range("A1:B2").values([ [1, 2], [2, 3] ]);

        sheet.deleteColumn(0);
    </script>

### deleteRow

Deletes the contents of the row at the provided index and shifts the remaining contents of the sheet up.


<div class="meta-api-description">
How do I programmatically remove rows from a Kendo UI spreadsheet? Delete a specific row by index to remove its data and shift all rows below upward, effectively closing the gap and reflowing the sheet’s content; this operation enables programmatic removal of rows, clearing row contents, adjusting row positions after row deletion, managing spreadsheet data updates, dynamically controlling row structures, and handling row-based modifications such as removing empty or unwanted rows and reorganizing sheet layout.
</div>

#### Parameters

##### index `Number`

The zero-based index of the row

##### skipDataSourceDelete `Boolean` *optional*

If passed `true`, the method does not delete item from the DataSource.

#### Example


    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.range("A1:B2").values([ [1, 2], [2, 3] ]);

        sheet.deleteRow(0);
    </script>


### fromJSON

Loads the sheet from an object in the format defined in the [sheet configuration](/api/javascript/ui/spreadsheet#configuration.sheets).

> The configuration and cell values will be merged.
>
> **Note:** the Sheet objects are not resizable.  If you use this method you must make sure that the JSON does not contain more rows or columns than defined when the `Spreadsheet` object has been constructed.  To reload a full spreadsheet from JSON, we recommend using Spreadsheet's [fromJSON](/api/javascript/ui/spreadsheet/methods/fromjson) method.


<div class="meta-api-description">
How do I merge spreadsheet data from JSON into a Kendo UI Spreadsheet component using the `fromJSON` method? Import, load, or merge spreadsheet data and sheet settings from JSON structures that match the sheet configuration schema, enabling dynamic updates or initial population of a single sheet’s cells, formatting, and layout within a spreadsheet component. Control how cell values, formulas, styles, and metadata integrate or overwrite existing sheet content without altering the overall spreadsheet framework, ensuring the imported JSON matches predefined row and column limits to avoid size conflicts. Facilitate seamless synchronization, data restoration, or partial updates by applying JSON-based configurations directly into a sheet instance while preserving sheet dimensions and preventing resizing, supporting workflows such as syncing external data, restoring saved sheets, or incrementally modifying individual sheets inside a larger workbook structure.
</div>

#### Parameters

##### data `Object`

The object to load data from.  This should be **the deserialized object**, not the JSON string.

#### Example - Merge sheet data

    <div id="spreadsheet"></div>
    <pre id="result"></pre>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          name: "Food Order",
          mergedCells: [
            "A1:C1"
          ],
          rows: [{
            height: 70,
            cells: [{
              value: "Order #231", bold: "true", fontSize: 32, textAlign: "center"
            }]
          }, {
            height: 25,
            cells: [{
              value: "Product", bold: "true", textAlign: "center"
            }, {
              value: "Quantity", bold: "true", textAlign: "center"
            }, {
              value: "Price", bold: "true", textAlign: "center"
            }]
          }],
          columns: [{
            width: 200
          }, {
            width: 115
          }, {
            width: 115
          }]
        }]
      });

      // Load sheet data
      var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
      var sheet = spreadsheet.sheetByIndex(0);
      sheet.fromJSON({
        rows: [{
          index: 2,
          cells: [{
            value: "Calzone"
          }, {
            value: 1
          }, {
            value: 12.29, format: "$#,##0.00"
          }]
        }, {
          index: 3,
          cells: [{
            value: "Margarita"
          }, {
            value: 2
          }, {
            value: 9.11, format: "$#,##0.00"
          }]
        }]
      });
    </script>

### frozenColumns

Gets or sets the amount of frozen columns displayed by the sheet.


<div class="meta-api-description">
How do I set the number of frozen columns in a Kendo UI spreadsheet widget? Control or retrieve the number of columns fixed or pinned on the left side of a data grid or spreadsheet to stay visible while scrolling horizontally, enabling dynamic locking or unlocking of columns for consistent header or key data display, adjusting frozen column counts in response to layout or content updates, synchronizing visible locked columns with UI state or custom functionality, and configuring how many columns remain static during navigation to improve user interface clarity and data comparison across wide datasets.
</div>

#### Parameters

##### count `Number` *optional*

The amount of columns to be frozen. Pass `0` to remove the frozen pane.

#### Returns

`Number` The current frozen columns. By default, returns `0`.

#### Example

    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.frozenColumns(5);
    </script>

### frozenRows

Gets or sets the amount of frozen rows displayed by the sheet.


<div class="meta-api-description">
How to freeze top rows in Kendo UI spreadsheet? Control, set, or retrieve the count of top rows that remain fixed or locked in place when scrolling vertically within a spreadsheet or grid interface, enabling users to freeze header rows or important top sections for constant visibility. Configure how many leading rows stay static at the sheet’s top during navigation, adjust or query the number of frozen rows to maintain persistent row visibility, lock specific rows from scrolling off-screen, and dynamically update the layout to enable or disable row freezing for improved data readability and interface usability. Enable programmatic access to manage, modify, or get the currently locked top rows that stay visible, supporting use cases like static headers, prominent row locking, or controlling vertical scroll behavior in tabular data structures.
</div>

#### Parameters

##### count `Number` *optional*

The amount of columns to be frozen. Pass `0` to remove the frozen pane.

#### Returns

`Number` The current frozen rows. By default, returns `0`.

#### Example

    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.frozenRows(5);
    </script>

### hideColumn

Hides the column at the provided index.


<div class="meta-api-description">
How to programmatically hide specific columns in Kendo UI spreadsheet component by index? Programmatically hide or conceal specific columns by index in a spreadsheet or grid component to dynamically control column visibility, manage layout adjustments, toggle column display based on user interactions or application conditions, enable hiding certain data columns for user interface customization, configure which columns are shown or hidden at runtime, set column visibility states by position, and update the sheet layout to reflect these changes automatically.
</div>

#### Parameters

##### index `Number`

The zero-based index of the column

#### Example

    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.range("A1:B2").values([ [1, 2], [2, 3] ]);

        sheet.hideColumn(1);
    </script>

### hideRow

Hides the row at the provided index.


<div class="meta-api-description">
How can I hide a specific row in a Kendo UI spreadsheet by its index? Control the visibility of individual rows by specifying their index to hide or conceal a particular row from display within a sheet or grid component, enabling dynamic hiding of rows for filtering, conditional display, or user interface adjustments with programmatic control to toggle row visibility on and off using index-based row targeting for granular row management and presentation control.
</div>

#### Parameters

##### index `Number`

The zero-based index of the row

#### Example

    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.range("A1:B2").values([ [1, 2], [2, 3] ]);

        sheet.hideRow(1);
    </script>

### insertColumn

Inserts a new, empty column at the provided index. The contents of the spreadsheet (including the ones in the current column index) are shifted to the right.


<div class="meta-api-description">
How do I insert a new column in Kendo UI spreadsheet at a specific index? Add or insert a new blank column at a specified index within a spreadsheet, shifting all existing columns and their contents to the right to make space; control column insertion position, enable column addition without overwriting, manage spreadsheet structure by adding columns dynamically, adjust table layouts by inserting columns at any point, and modify sheet data by pushing existing cells rightward when expanding columns.
</div>

#### Parameters

##### index `Number`

The zero-based index of the column

#### Example

    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.range("A1:B2").values([ [1, 2], [2, 3] ]);

        sheet.insertColumn(1);
    </script>

### insertRow

Inserts a new, empty row at the provided index. The contents of the spreadsheet (including the ones in the current row index) are shifted down.


<div class="meta-api-description">
How to dynamically add rows in Kendo UI spreadsheet without overwriting existing data? Insert a new blank row at a specified position within a spreadsheet or table, enabling developers to add rows dynamically without overwriting existing content, shift all rows downward starting from a certain index, control and configure row injection in grid-like data structures, create space in data sheets or tables by adding empty rows at chosen locations, and manage row insertion to update layouts while preserving current cell values and formatting.
</div>

#### Parameters

##### index `Number`

The zero-based index of the column

##### skipDataSourceInsert `Boolean` *optional*

If passed `true`, the method does not insert item in the DataSource.

#### Example

    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.range("A1:B2").values([ [1, 2], [2, 3] ]);

        sheet.insertRow(1);
    </script>

### range

Returns a [Range](/api/javascript/spreadsheet/range) for the given range specification.


<div class="meta-api-description">
How do I select multiple cells in a Kendo UI Spreadsheet using their A1 notation? Access or retrieve a specific block or area of cells from a spreadsheet sheet using various range identifiers, coordinates, or addresses to read data, update cell values, select multiple cells, apply styles or formatting, modify content, iterate through cells, control cell regions, or use range-related functions for batch operations. Enable extracting a subset of the sheet’s grid for manipulation, transformation, bulk editing, or targeted cell processing by specifying ranges via A1 notation, row and column indexes, or named ranges, supporting tasks like data input, selection, applying styling, and calling further methods that operate on cell collections within a spreadsheet tab.
</div>

#### Parameters

##### ref `String`

##### rowIndex `Number`

##### columnIndex `Number`

##### rowCount `Number` *optional*

##### columnCount `Number` *optional*

If the parameter is a `string`, it should represent an [A1](https://msdn.microsoft.com/en-us/library/bb211395.aspx) or [RC notation](https://excelribbon.tips.net/T008803_Understanding_R1C1_References) reference of the cells.

If the parameters are `Numbers`, the first two would represent the row index (the first parameter) and the column index (the second parameter) of the top-left cell of the `range`. If there are only two parameters, only one cell will be included in the `range`. If the other two `Numbers` are also present, they will represent the number of rows (the third parameter) and number of columns (the forth parameter) that would be included in the `range`, starting from the specified top-left cell. If the third or the forth parameter is set to 0 or 1, only one row / column will be included in the `range`.

#### Returns

`kendo.spreadsheet.Range` a range object, which may be used to manipulate the cell state further.

#### Example - Using string parameter

    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        // set contents of the A1:B2 range
        sheet.range("A1:B2").values([ [1, 2], [2, 3] ]);
    </script>

#### Example - Using Number parameters

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        // select the B3:C6 range
        sheet.range(2,1,4,2).select();
    </script>

### removeDrawing

Removes a drawing previously added with [`addDrawing`](#methods-addDrawing).


<div class="meta-api-description">
How to programmatically remove a drawing from a Kendo UI for jQuery spreadsheet sheet? Delete or detach a specific drawing element that was previously added to a sheet or canvas, enabling control over graphical overlays, removing visual objects, clearing or updating drawings by reference, undoing or managing added illustrations dynamically, programmatically eliminating shapes or annotations from the drawing layer, handling removal of graphical components after initialization, modifying or resetting drawings via stored drawing instances, and managing visual content on sheets by specifying and removing particular drawing objects.
</div>

#### Parameters

##### drawing `Object`

The drawing object.

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();

    // Add a drawing to the sheet
    var drawing = sheet.addDrawing({
        topLeftCell: "B2",
        offsetX: 10,
        offsetY: 10,
        width: 200,
        height: 100,
        type: "image",
        src: "https://via.placeholder.com/200x100"
    });

    // Later, remove the drawing
    sheet.removeDrawing(drawing);
    console.log("Drawing removed");
    </script>

### resize

Resize the sheet to accommodate the specified number of rows and columns. If the
new dimensions are smaller than the current ones, any existing data in the rows
or columns that are to be removed will be discarded.


<div class="meta-api-description">
How do I resize a Kendo UI spreadsheet to dynamically fit my data? Adjust grid or table size by setting the number of rows and columns, enable resizing to expand or shrink the spreadsheet layout dynamically, control sheet dimensions to fit specific row and column counts, configure grid capacity to increase or decrease available cells, handle data truncation when reducing size by removing overflowing rows or columns, update sheet structure for custom row and column adjustments, manage grid resizing for layout optimization or data fitting, modify sheet area to accommodate new dimensions, set spreadsheet size to predefined or dynamic values, and perform layout recalculations when changing the number of rows and columns to scale or limit the sheet accordingly.
</div>

#### Parameters

##### newRows `Number`

The new number of rows.

##### newColumns `Number`

The new number of columns.

#### Example

    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">
        $("#spreadsheet").kendoSpreadsheet({ rows: 10, columns: 5 });
        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        var sheet = spreadsheet.activeSheet();

        sheet.resize(1000, 30);
        // the sheet will now contain 1000 rows and 30 columns
    </script>

### rowHeight

Gets or sets the height of the row at the given index.


<div class="meta-api-description">
How to change row height in Kendo UI spreadsheet? Adjust or retrieve the vertical size, height, or spacing of a specific row by its index in a spreadsheet or data grid, enabling programmatic control over row dimensions to customize layout, improve readability, modify spacing between rows, set print formatting, or dynamically resize rows based on content, with functions to query current row height or update it directly by specifying row position and new height value.
</div>

#### Parameters

##### index `Number`

The zero-based index of the row

##### width `Number` *optional*

If passed, the method will set the height of the row at the passed index.

#### Example


    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.rowHeight(1, 100);
    </script>


### selection

Returns a range with the current active selection.


<div class="meta-api-description">
How do I programmatically get the currently selected cells in a Kendo UI for jQuery spreadsheet? access the currently selected cells or active range within a spreadsheet or grid interface, retrieve selection coordinates or boundaries, identify which cells are highlighted or chosen by the user, read cell spans or merged areas within the selection, programmatically get or update the user's current selection range, persist or store the active selection state for later use, obtain details about the highlighted cell group for processing or manipulation, track which part of the sheet is focused or selected during runtime, enable selection-based features or actions by fetching the selection data, and control or query the current selection range dynamically in the sheet component environment.
</div>

#### Returns

`kendo.spreadsheet.Range` the selection range.

#### Example


    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.range("A1:B2").select();

        var selection = sheet.selection(); // A1:B2 range
    </script>


### setDataSource

Binds the sheet to a DataSource instance. For more information on the data-binding Spreadsheet functionality, refer to the [article on binding the Spreadsheet to a data source](/controls/spreadsheet/import-and-export-data/bind-to-data-source).


<div class="meta-api-description">
How do I dynamically load data into a Kendo UI Spreadsheet sheet using setDataSource? Configure and attach a data source to a spreadsheet sheet to dynamically load, bind, and synchronize tabular data, enabling interactive operations such as sorting, filtering, paging, and real-time updates of rows and columns by connecting to existing data collections or data sources; set or update the underlying data provider to control spreadsheet content and behavior based on external or in-memory datasets, integrating with data-binding workflows and enhancing data management within spreadsheet components through declarative or programmatic data source linkage.
</div>

#### Parameters

##### dataSource `kendo.data.DataSource`

The DataSource instance.

#### Example

    <div id="spreadsheet"></div>
    <script>

      var dataSource = new kendo.data.DataSource({
        transport: {
          read:  {
            url: "https://demos.telerik.com/service/v2/core/Products"
          }
        }
      });

      $("#spreadsheet").kendoSpreadsheet();

      var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
      var sheet = spreadsheet.activeSheet();
      sheet.setDataSource(dataSource);

    </script>


##### columns `Array` *optional*

Columns configuration.

###### Example


    <div id="spreadsheet"></div>
    <script>

      var dataSource = new kendo.data.DataSource({
        transport: {
          read:  {
            url: "https://demos.telerik.com/service/v2/core/Products"
          }
        }
      });

      $("#spreadsheet").kendoSpreadsheet();

      var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
      var sheet = spreadsheet.activeSheet();
      sheet.setDataSource(dataSource, [ "ProductName", "UnitPrice" ]);

    </script>


###### Example - reorder columns and change column titles


    <div id="spreadsheet"></div>
    <script>
      var dataSource = new kendo.data.DataSource({
        transport: {
          read:  {
            url: "https://demos.telerik.com/service/v2/core/Products"
          }
        }
      });

      $("#spreadsheet").kendoSpreadsheet();

      var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
      var sheet = spreadsheet.activeSheet();
      sheet.setDataSource(dataSource, [
          { field: "UnitPrice", title: "Price" },
          { field: "ProductName", title: "Name" }
      ]);

    </script>


### showGridLines

Gets or sets a flag indicating if the grid lines should be visible.


<div class="meta-api-description">
How do I control grid line visibility in Kendo UI spreadsheet component? Set, retrieve, toggle, or control visibility of grid lines in spreadsheet or sheet components, enabling dynamic show or hide of cell grid outlines, configuring boolean flags to display or suppress grid borders for better readability or clean layouts, adjusting grid line appearance programmatically or interactively during runtime, managing visual cell separators to customize sheet presentation, and querying current grid line state to determine if cell boundaries are visible or hidden.
</div>

#### Parameters

##### showGridLines `Boolean` *optional*

If passed, the method will toggle the display of the grid lines according to the value.

#### Returns

`Boolean` True if the grid lines are currently visible, false otherwise.

#### Example


    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">
        $("#spreadsheet").kendoSpreadsheet();
        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        var sheet = spreadsheet.activeSheet();

        sheet.showGridLines(false);
    </script>


### toJSON
Serializes the sheet in the format defined in the [sheet configuration](/api/javascript/ui/spreadsheet#configuration.sheets).


<div class="meta-api-description">
How do I serialize a Kendo UI Spreadsheet's current state to JSON for saving or syncing? Convert or serialize a spreadsheet’s current state, including configuration, data, and settings, into a JSON format for saving, exporting, backing up, syncing, or transferring between applications and servers, enabling recreation, restoration, duplication, or synchronization of the sheet’s structure and content across different environments or sessions.
</div>

#### Example - Serialize the sheet as JSON

    <div id="spreadsheet"></div>
    <pre id="result"></pre>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                name: "Food Order",
                mergedCells: [
                    "A1:G1"
                ],
                rows: [{
                    height: 70,
                    cells: [{
                        value: "My Company", fontSize: 32, textAlign: "center"
                    }]
                }]
            }]
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        var sheet = spreadsheet.sheetByIndex(0);
        var data = sheet.toJSON();
        var json = JSON.stringify(data, null, 2);

        $("#spreadsheet").remove();
        $("#result").text(json);
    </script>

### unhideColumn

Shows the hidden column at the provided index. Does not have any effect if the column is already visible.


<div class="meta-api-description">
How do I programmatically make a hidden column visible again in Kendo UI for jQuery? Reveal or restore a hidden column by specifying its index to programmatically make columns visible again after being hidden, control column visibility dynamically, toggle hidden columns back into view, enable showing previously collapsed or concealed columns, manage and update column display states based on user interactions or application logic, reinstate column visibility after hiding, and handle scenarios where columns need to be unhidden within grid or sheet components.
</div>

#### Parameters

##### index `Number`

The zero-based index of the column

#### Example


    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.range("A1:B2").values([ [1, 2], [2, 3] ]);

        sheet.hideColumn(1);
        sheet.unhideColumn(1); // reverts upper call
    </script>


### unhideRow

Shows the hidden row at the provided index. Does not have any effect if the row is already visible.


<div class="meta-api-description">
How can I unhide specific rows in my Kendo UI spreadsheet by index? Reveal or restore visibility of specific hidden rows in a spreadsheet or grid by specifying their index, enabling row unhide functionality to make previously concealed rows visible again, controlling row display states, toggling hidden rows back to shown status, adjusting grid or sheet views to expose selected rows, managing row visibility programmatically without affecting other rows, setting or enabling individual row visibility, showing rows that were hidden by index, and handling display toggles for rows within tabular data structures.
</div>

#### Parameters

##### index `Number`

The zero-based index of the row

#### Example


    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.range("A1:B2").values([ [1, 2], [2, 3] ]);

        sheet.hideRow(1);
        sheet.unhideRow(1); // reverts upper call
    </script>


## Events

### change

Fires when the configuration or the data of the sheet change.


<div class="meta-api-description">
How can I monitor changes to data in Kendo UI spreadsheet? Monitor and respond to updates or modifications in spreadsheet data, configuration settings, or user inputs within a sheet environment. Detect changes triggered by user edits, programmatic updates, autosave events, or configuration alterations and enable event-driven handling for validation, synchronization, re-rendering, or dynamic update workflows. Listen for data mutations, property adjustments, or interactive changes to trigger custom logic that keeps sheet content current and consistent across different states or components. Configure event handlers to capture and process real-time modifications in sheet data models, settings, or user-driven changes for seamless integration and responsive app behavior.
</div>

#### Event Data

##### e.sender `kendo.spreadsheet.Sheet`

The sheet instance.

#### Example - subscribe to the "change" event during initialization


    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.bind("change", function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("sheet state changed");
        });

        sheet.range("A1:B2").values([ [1, 2], [2, 3] ]);
    </script>

