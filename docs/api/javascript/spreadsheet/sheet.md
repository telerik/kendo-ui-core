---
title: Sheet
page_title: Configuration, methods and events of Kendo UI Spreadsheet Sheet Instance object
---

# kendo.spreadsheet.Sheet

Represents a sheet instance in the [Kendo UI Spreadsheet](/api/javascript/ui/spreadsheet) widget. Inherits from [Observable](/api/javascript/observable).

## Methods

### clearFilter

Clears the filters for the passed column index. If an array is passed, `clearFilter` will clear the filter for each column index.

#### Parameters

##### indexes `Number|Array`

The column index(es)

#### Example

```
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
```

### columnWidth

Gets or sets the width of the column at the given index.

#### Parameters

##### index `Number`

The zero-based index of the column

##### width `Number` *optional*

If passed, the method will set the width of the column at the passed index.

#### Example

```
    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.columnWidth(1, 100);
    </script>
```

### batch

Suppresses triggering of change events for a sequence of actions. Triggers a single change event at the end of the sequence.

Greatly improves performance when calling multiple methods that change the sheet state, as the widget will be refreshed once.

#### Parameters

##### callback `Function`

The sequence of actions that will be executed without triggering a change event.

##### changeEventArgs `Object`

The change event arguments that will be used for the change event triggered after the callback finishes executing.

#### Example

```
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
```

### deleteColumn

Deletes the contents of the column at the provided index and shifts the remaining contents of the sheet to the left.

#### Parameters

##### index `Number`

The zero-based index of the column

##### Example

```
    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.range("A1:B2").values([ [1, 2], [2, 3] ]);

        sheet.deleteColumn(0);
    </script>
```
### deleteRow

Deletes the contents of the row at the provided index and shifts the remaining contents of the sheet up.

#### Parameters

##### index `Number`

The zero-based index of the row

#### Example

```
    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.range("A1:B2").values([ [1, 2], [2, 3] ]);

        sheet.deleteRow(0);
    </script>
```

### fromJSON

Loads the sheet from an object in the format defined in the [sheet configuration](/api/javascript/ui/spreadsheet#configuration.sheets).

> The configuration and cell values will be merged.

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

#### Parameters

##### count `Number` *optional*

The amount of columns to be frozen. Pass `0` to remove the frozen pane.

#### Returns

`Number` The current frozen columns. By default, returns `0`.

#### Example

```
    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.frozenColumns(5);
    </script>
```

### frozenRows

Gets or sets the amount of frozen rows displayed by the sheet.

#### Parameters

##### count `Number` *optional*

The amount of columns to be frozen. Pass `0` to remove the frozen pane.

#### Returns

`Number` The current frozen rows. By default, returns `0`.

#### Example

```
    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.frozenRows(5);
    </script>
```

### hideColumn

Hides the column at the provided index.

#### Parameters

##### index `Number`

The zero-based index of the column

#### Example

```
    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.range("A1:B2").values([ [1, 2], [2, 3] ]);

        sheet.hideColumn(1);
    </script>
```

### hideRow

Hides the row at the provided index.

#### Parameters

##### index `Number`

The zero-based index of the row

#### Example

```
    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.range("A1:B2").values([ [1, 2], [2, 3] ]);

        sheet.hideRow(1);
    </script>
```

### insertColumn

Inserts a new, empty column at the provided index. The contents of the spreadsheet (including the ones in the current column index) are shifted to the right.

#### Parameters

##### index `Number`

The zero-based index of the column

#### Example

```
    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.range("A1:B2").values([ [1, 2], [2, 3] ]);

        sheet.insertColumn(1);
    </script>
```

### insertRow

Inserts a new, empty row at the provided index. The contents of the spreadsheet (including the ones in the current row index) are shifted down.

#### Parameters

##### index `Number`

The zero-based index of the column

#### Example

```
    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.range("A1:B2").values([ [1, 2], [2, 3] ]);

        sheet.insertRow(1);
    </script>
```

### range

Returns a [Range](/api/javascript/spreadsheet/range) for the given range specification.

#### Parameters

##### ref `String`

[A1](https://msdn.microsoft.com/en-us/library/bb211395.aspx) or [RC notation](http://excelribbon.tips.net/T008803_Understanding_R1C1_References.html) reference of the cells.

#### Returns

`kendo.spreadsheet.Range` a range object, which may be used to manipulate the cell state further.

#### Example
```
    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        // set contents of the A1:B2 range
        sheet.range("A1:B2").values([ [1, 2], [2, 3] ]);
    </script>
```

### rowHeight

Gets or sets the height of the row at the given index.

#### Parameters

##### index `Number`

The zero-based index of the row

##### width `Number` *optional*

If passed, the method will set the height of the row at the passed index.

#### Example

```
    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.rowHeight(1, 100);
    </script>
```

### selection

Returns a range with the current active selection.

#### Returns

`kendo.spreadsheet.Range` the selection range.

#### Example

```
    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.range("A1:B2").select();

        var selection = sheet.selection(); // A1:B2 range
    </script>
```

### toJSON
Serializes the sheet in the format defined in the [sheet configuration](/api/javascript/ui/spreadsheet#configuration.sheets).

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

#### Parameters

##### index `Number`

The zero-based index of the column

#### Example

```
    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.range("A1:B2").values([ [1, 2], [2, 3] ]);

        sheet.hideColumn(1);
        sheet.unhideColumn(1); // reverts upper call
    </script>
```

### unhideRow

Shows the hidden row at the provided index. Does not have any effect if the row is already visible.

#### Parameters

##### index `Number`

The zero-based index of the row

#### Example

```
    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.range("A1:B2").values([ [1, 2], [2, 3] ]);

        sheet.hideRow(1);
        sheet.unhideRow(1); // reverts upper call
    </script>
```

## Events

### change

Fires when the configuration or the data of the sheet change.

#### Event Data

##### e.sender `kendo.spreadsheet.Sheet`

The sheet instance.

#### Example - subscribe to the "change" event during initialization

```
    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.bind("change", function() {
            console.log("sheet state changed");
        });

        sheet.range("A1:B2").values([ [1, 2], [2, 3] ]);
    </script>
```
