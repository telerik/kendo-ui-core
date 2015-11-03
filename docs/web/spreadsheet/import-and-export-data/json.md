---
title: Load and Save as JSON
page_title: Store Kendo UI Spreadsheet data as JSON | Kendo UI Documentation
description: Overview of the data persistence options in the Kendo UI Spreadsheet
position: 1
---

# Store Spreadsheet Data as JSON

The Spreadsheet component allows you to store and load data in a native JSON format.
The format follows the same structure as the [widget configuration](/api/javascript/ui/spreadsheet#configuration). It is designed to be used both for direct storage and as an [intermediate format](server-side-processing).

> An official JSON schema will be published once the component goes out of Beta.

Persisted information includes:
* Cell formulas, values, formatting and styling
* Row height and column width
* Sorting and filtering options
* Active sheet and selection

# Serialization API

The Spreadsheet client-side API includes the [fromJSON](/api/javascript/ui/spreadsheet#methods-fromJSON) and [toJSON](`http://localhost/kendo-ui/api/javascript/ui/spreadsheet#methods-toJSON`) methods for loading and storing the widget state.

To load the spreadsheet with data, pass an object matching the required schema, to `fromJSON`.
This will reset the widget and **clear all existing data**.

### Example - loading data using fromJSON:
```html
    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").getKendoSpreadsheet();
        spreadsheet.fromJSON({
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
    </script>
```

You can also choose to load data in a specific [sheet](/api/javascript/spreadsheet/sheet) only.
This will not affect the data in other sheets, apart from the formulas that refer to it.

### Example - loading sheet data using fromJSON:
```html
    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                name: "Inventory"
            }, {
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

        var spreadsheet = $("#spreadsheet").getKendoSpreadsheet();
        spreadsheet.sheetByName("Inventory").fromJSON({
            rows: [{
                cells: [{
                    value: "Chai", textAlign: "center"
                }, {
                    value: 12
                }]
            }]
        });
    </script>
```
