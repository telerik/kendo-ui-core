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

### columnWidth `Number` *(default: 64)*

### columns `Number` *(default: 50)*

### headerHeight `Number` *(default: 20)*

### headerWidth `Number` *(default: 32)*

### rowHeight `Number` *(default: 20)*

### rows `Number` *(default: 200)*

### sheets `Array`

### sheets.activeCell `String`
The active cell in the sheet, e.g. "A1".

### sheets.name `String`
The name of the sheet.

### sheets.columns `Array`

### sheets.columns.index `Number`

### sheets.columns.width `Number`

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

### sheets.frozenRows `Number`

### sheets.mergedCells `Array`

### sheets.rows `Array`

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

### sheets.rows.cells.index `Number`

### sheets.rows.cells.textAlign `String`

### sheets.rows.cells.underline `Boolean`

### sheets.rows.cells.value `Number|String|Boolean|Date`

### sheets.rows.cells.verticalAlign `String`

### sheets.rows.cells.wrap `Boolean`

### sheets.rows.height `Number`

### sheets.rows.index `Number`

### sheets.selection `String`
The selected range in the sheet, e.g. "A1:B10".

### sheets.sort `Object`

### sheets.sort.columns `Array`

### sheets.sort.columns.ascending `Boolean`

### sheets.sort.columns.index `Number`

### sheets.sort.ref `String`

### toolbar `Boolean` *(default: true)*

## Methods

### activeSheet

#### Parameters

##### sheet `kendo.spreadsheet.Sheet` *optional*

#### Returns

`kendo.spreadsheet.Sheet` the active sheet.

### sheets

#### Returns

`Array` the available sheets.

### sheetByName

#### Parameters

##### name `String`

#### Returns

`kendo.spreadsheet.Sheet` the sheet that match the name.

### sheetIndex

#### Parameters

##### sheet `kendo.spreadsheet.Sheet`

#### Returns

`Number` the sheet index.

### sheetByIndex

#### Parameters

##### index `Number`

#### Returns

`kendo.spreadsheet.Sheet` the sheet that match the index.

### insertSheet

#### Parameters

##### options `Object`

#### Returns

`kendo.spreadsheet.Sheet` the inserted sheet.

### moveSheetToIndex

#### Parameters

##### sheet `kendo.spreadsheet.Sheet`

##### index `Number`

### removeSheet

#### Parameters

##### sheet `kendo.spreadsheet.Sheet`

### renameSheet

#### Parameters

##### sheet `kendo.spreadsheet.Sheet`

##### newSheetName `String`

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
