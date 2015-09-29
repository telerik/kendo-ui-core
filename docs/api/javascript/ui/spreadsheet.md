---
title: Spreadsheet
page_title: Configuration, methods and events of Kendo UI Spreadsheet
description: Code examples for Spreadsheet UI widget configuration. Learn how to use methods and which events to set once the Spreadsheet UI widget is initialized.
---

# kendo.ui.Spreadsheet

Represents the Kendo UI Spreadsheet widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### activeSheet `String`
The name of the currently active sheet.

Must match one of the (sheet names)[#configuration-sheets.name] exactly.

#### Example

```
    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">
        $("#spreadsheet").kendoSpreadsheet({
            activeSheet: "Budget",
            sheets: [{ name: "Food Order" }, { name: "Budget" }]
        });
    </script>
```

### columnWidth `Number` *(default: 64)*

#### Example

```
    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">
        $("#spreadsheet").kendoSpreadsheet({
            columnWidth: 100
        });
    </script>
```

### columns `Number` *(default: 50)*

#### Example

```
    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">
        $("#spreadsheet").kendoSpreadsheet({
            columns: 30
        });
    </script>
```


### headerHeight `Number` *(default: 20)*

#### Example

```
    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">
        $("#spreadsheet").kendoSpreadsheet({
            headerHeight: 50
        });
    </script>
```


### headerWidth `Number` *(default: 32)*

#### Example

```
    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">
        $("#spreadsheet").kendoSpreadsheet({
            headerWidth: 50
        });
    </script>
```


### rowHeight `Number` *(default: 20)*

#### Example

```
    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">
        $("#spreadsheet").kendoSpreadsheet({
            rowHeight: 50
        });
    </script>
```


### rows `Number` *(default: 200)*

#### Example

```
    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">
        $("#spreadsheet").kendoSpreadsheet({
            rows: 300
        });
    </script>
```

### sheets `Array`

#### Example

```
    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [
                { name: "S1" },
                { name: "S2" }
            ]
        });
    </script>
```

### sheets.activeCell `String`
The active cell in the sheet, e.g. `"A1"`.

> Setting the active sheet won't modify the sheet selection, so it may have to be set, too.

#### Example

```
    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [
                { name: "S1", activeCell: "B2", selection: "A1:B2" },
                { name: "S2", activeCell: "C3", selection: "A1:C3" }
            ]
        });
    </script>
```

### sheets.name `String`

The name of the sheet.

#### Example

```
    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [ { name: "S1" } ]
        });
    </script>
```

### sheets.columns `Array`

An array defining the columns in this sheet and their content.

#### Example

```
    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [ { columns: columns: [ { index: 1, width: 200 }] } ]
        });
    </script>
```

### sheets.columns.index `Number`

The zero-based index of the column. Required to ensure correct positioning.

#### Example

```
    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [ { columns: columns: [ { index: 1, width: 200 }] } ]
        });
    </script>
```

### sheets.columns.width `Number`

The width of the column in pixels. Defaults to [columnWidth](#configuration-columnWidth).

#### Example

```
    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [ { columns: columns: [ { index: 1, width: 200 }] } ]
        });
    </script>
```

### sheets.filter `Object`

### sheets.filter.columns `Array`

### sheets.filter.columns.criteria `String`

### sheets.filter.columns.filter `String`

### sheets.filter.columns.index `Number`

### sheets.filter.columns.logic `String`

### sheets.filter.columns.type `String`

### sheets.filter.columns.value `Number|String|Boolean|Date`

### sheets.filter.columns.values `Array`

### sheets.filter.ref `String`

### sheets.frozenColumns `Number`

#### Example

```
    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [ { frozenColumns: 3 } ]
        });
    </script>
```


### sheets.frozenRows `Number`

#### Example

```
    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [ { frozenRows: 3 } ]
        });
    </script>
```

### sheets.mergedCells `Array`

#### Example

```
    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [ { mergedCells: [ "A1:B2", "C3:D6" ] } ]
        });
    </script>
```

### sheets.rows `Array`


#### Initialize Spreadsheet with data, using `sheets.rows` configuration option

```
    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [
                {
                    name: "Populated" ,
                    rows: [
                        {
                            index: 2,
                            cells: [
                                { index: 3, background: "red", color: "green", value: "D3" },
                                { index: 10, color: "blue", value: "a value" }
                            ]
                        },
                        {
                            index: 5,
                            cells: [
                                { index: 0, color: "red", value: "A6" }
                            ]
                        }
                    ]
                }
            ]
        });
    </script>
```

### sheets.rows.cells `Array`

### sheets.rows.cells.background `String`

### sheets.rows.cells.borderBottom `Object`

### sheets.rows.cells.borderLeft `Object`

### sheets.rows.cells.borderTop `Object`

### sheets.rows.cells.borderRight `Object`

### sheets.rows.cells.color `String`

### sheets.rows.cells.fontFamily `String`

### sheets.rows.cells.fontSize `String`

### sheets.rows.cells.italic `Boolean`

### sheets.rows.cells.bold `Boolean`

### sheets.rows.cells.format `String`

### sheets.rows.cells.formula `String`

The cell formula **without the leading equals** sign, e.g. `"A1 * 10"`.

### sheets.rows.cells.index `Number`
The zero-based index of the cell. **Required** to ensure correct positioning.

### sheets.rows.cells.textAlign `String`
The text align setting for the cell content.

Available options are:
* `"left"`
* `"center"`
* `"right"`
* `"justify"`

### sheets.rows.cells.index `Number`

### sheets.rows.cells.textAlign `String`

### sheets.rows.cells.underline `Boolean`

### sheets.rows.cells.value `Number|String|Boolean|Date`

### sheets.rows.cells.validation `Object`
The validation rule applied to the cell.

#### Initialize Spreadsheet with validation data, using `sheets.rows` configuration option
```
    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [
                {
                    name: "Populated" ,
                    rows: [
                        {
                            index: 2,
                            cells: [
                                { index: 3, background: "red", color: "green", value: "D3" },
                                { index: 10, color: "blue", value: "a value" }
                            ]
                        },
                        {
                            index: 5,
                            cells: [
                                {
                                    index: 0,
                                    color: "red",
                                    value: "A6",
                                    validation: {
                                        from: "1",
                                        to: "2",
                                        comparerType: "between",
                                        dataType: "number",
                                        messageTemplate: "Number should match the validation."
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        });
    </script>
```
### sheets.rows.cells.validation.type `String`
Defines the validation type. The acceptable options are *reject* or *warning*

### sheets.rows.cells.validation.comparerType `String`
Defines the comparer type used to validate the cell value, e.g. "greaterThan", "between" and etc.

### sheets.rows.cells.validation.dataType `String`
Defines the data type of the cell value.

### sheets.rows.cells.validation.from `String`
Defines a *formula* or *value* used for the comparison process. Used as *only* if comparer type does not require second argument.

### sheets.rows.cells.validation.to `String`
Defines a *formula* or *value* used for the comparison process. Will be used if comparer type requies second argument.

### sheets.rows.cells.validation.allowNulls `String`
Specifies whether to allow nulls.

### sheets.rows.cells.validation.messageTemplate `String`
Defines the *hint* message that will be displayed if value is invalid.

### sheets.rows.cells.validation.titleTemplate `String`
Defines the *hint* title that will be displayed if value is invalid.

### sheets.rows.cells.verticalAlign `String`

The vertical align setting for the cell content.

Available options are:
* `"left"`
* `"center"`
* `"right"`
* `"justify"`

### sheets.rows.cells.wrap `Boolean`

### sheets.rows.height `Number`

#### Example

```
    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [
                {
                    name: "Populated" ,
                    rows: [
                        {
                            index: 2,
                            height: 100
                        }
                    ]
                }
            ]
        });
    </script>
```

### sheets.rows.index `Number`

### sheets.selection `String`
The selected range in the sheet, e.g. `"A1:B10"`.

#### Example

```
    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [ {selection: "B3:D4"} ]
        });
    </script>
```

### sheets.sort `Object`

### sheets.sort.columns `Array`

### sheets.sort.columns.ascending `Boolean`

### sheets.sort.columns.index `Number`

### sheets.sort.ref `String`

### toolbar `Boolean` *(default: true)*

#### Example

```
    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [ { toolbar: false } ]
        });
    </script>
```

## Methods

### activeSheet

#### Parameters

##### sheet `kendo.spreadsheet.Sheet` *optional*

#### Returns

`kendo.spreadsheet.Sheet` the active sheet.

#### Example

```
    <button>Select Sheet 2</button>
    <div id="spreadsheet"></div>


    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet({
            sheets: [ {selection: "B3:D4"}, { }, { } ]
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        $("button").click(function() {
            spreadsheet.activeSheet(spreadsheet.sheets()[1]);
        });
    </script>
```

### sheets

#### Returns

`Array` the available sheets.

#### Example

```
    <button>Console log sheets</button>
    <div id="spreadsheet"></div>


    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet({
            sheets: [ {selection: "B3:D4"}, { }, { } ]
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        $("button").click(function() {
            console.log(spreadsheet.sheets()[1]);
        });
    </script>
```

### saveAsExcel

Initiates the Excel export. Also fires the [`excelExport`](#events-excelExport) event.

> Calling this method could trigger the browser built-in popup blocker in some cases. To avoid that, always call it as a response to an end-user action e.g. button click.

#### Example - manually initiate Excel export

    <button id="export">Export to Excel</button>
    <div id="spreadsheet"></div>
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
                }],
            }]
        });
        $("#export").click(function(e) {
            var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
            spreadsheet.saveAsExcel();
        });
    </script>

    <!-- Load Pako ZLIB library to enable PDF compression -->
    <script src="http://cdn.kendostatic.com/2015.2.624/js/pako_deflate.min.js"></script>

### sheetByName

#### Parameters

##### name `String`

#### Returns

`kendo.spreadsheet.Sheet` the sheet that match the name.


#### Example

```
    <button>Get sheet</button>
    <div id="spreadsheet"></div>


    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet({
            sheets: [ { name: "S1", selection: "B3:D4"}, { name: "S2" }, { name: "S3" } ]
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        $("button").click(function() {
            console.log(spreadsheet.sheetByName("S1"));
        });
    </script>
```

### sheetIndex

#### Parameters

##### sheet `kendo.spreadsheet.Sheet`

#### Returns

`Number` the sheet index.

#### Example

```
    <button>Get sheet index</button>
    <div id="spreadsheet"></div>


    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet({
            sheets: [ { name: "S1", selection: "B3:D4"}, { name: "S2" }, { name: "S3" } ]
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        $("button").click(function() {
            console.log(spreadsheet.sheetIndex(spreadsheet.sheetByName("S2")));
        });
    </script>
```

### sheetByIndex

#### Parameters

##### index `Number`

#### Returns

`kendo.spreadsheet.Sheet` the sheet that match the index.

#### Example

```
    <button>Get sheet by index</button>
    <div id="spreadsheet"></div>


    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet({
            sheets: [ { name: "S1", selection: "B3:D4"}, { name: "S2" }, { name: "S3" } ]
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        $("button").click(function() {
            console.log(spreadsheet.sheetByIndex(1));
        });
    </script>
```

### insertSheet

#### Parameters

##### options `Object`

#### Returns

`kendo.spreadsheet.Sheet` the inserted sheet.


### moveSheetToIndex

#### Parameters

##### sheet `kendo.spreadsheet.Sheet`

##### index `Number`

#### Example
```
    <button>Move Sheet</button>
    <div id="spreadsheet"></div>


    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet({
            sheets: [ { name: "S1", selection: "B3:D4"}, { name: "S2" }, { name: "S3" } ]
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        $("button").click(function() {
            var secondSheet = spreadsheet.sheetByIndex(1);
            spreadsheet.moveSheetToIndex(secondSheet, 0);
        });
    </script>
```


### removeSheet

#### Parameters

##### sheet `kendo.spreadsheet.Sheet`

#### Example
```
    <button>Remove Sheet</button>
    <div id="spreadsheet"></div>


    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet({
            sheets: [ { name: "S1", selection: "B3:D4"}, { name: "S2" }, { name: "S3" } ]
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        $("button").click(function() {
            var secondSheet = spreadsheet.sheetByIndex(1);
            spreadsheet.removeSheet(secondSheet);
        });
    </script>
```

### renameSheet

#### Parameters

##### sheet `kendo.spreadsheet.Sheet`

##### newSheetName `String`

#### Example
```
    <button>Rename Sheet</button>
    <div id="spreadsheet"></div>


    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet({
            sheets: [ { name: "S1", selection: "B3:D4"}, { name: "S2" }, { name: "S3" } ]
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        $("button").click(function() {
            var secondSheet = spreadsheet.sheetByIndex(1);
            spreadsheet.renameSheet(secondSheet, "New sheet");
        });
    </script>
```

#### Returns

`kendo.spreadsheet.Sheet` the renamed sheet.

### toJSON

#### Returns

`Object` the serialized sheets.

### fromJSON

#### Parameters

##### options `Object`

## Events

### render

### excelExport

Fired when the user clicks the "Export to Excel" toolbar button.

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.data `Array`

The array of data items used to create the Excel workbook.

##### e.workbook `kendo.ooxml.Workbook`

The Excel [workbook configuration object](/api/javascript/ooxml/workbook#configuration). Used to initialize a `kendo.ooxml.Workbook` class. Modifications of the workbook will reflect in the output Excel document.

##### e.preventDefault `Function`

If invoked the spreadsheet will not save the generated file.

#### Example - subscribe to the "excelExport" event during initialization

    <div id="spreadsheet"></div>
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
                }],
            }],
            excelExport: function(e) {
                e.workbook.fileName = "Spreadsheet.xlsx";
            }
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        spreadsheet.saveAsExcel();
    </script>

#### Example - subscribe to the "excelExport" event after initialization

    <div id="spreadsheet"></div>
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
                }],
            }]
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        spreadsheet.bind("excelExport", function(e) {
            e.workbook.fileName = "Spreadsheet.xlsx";
        });

        spreadsheet.saveAsExcel();
    </script>

