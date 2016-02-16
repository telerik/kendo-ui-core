---
title: Store Data as JSON
page_title: Store Data as JSON | Kendo UI Spreadsheet
description: "Overview of the data persistence options in the Kendo UI Spreadsheet widget."
slug: loadand_saveas_json_spreadsheet_widget
position: 1
---

# Store Data as JSON

The Spreadsheet component allows you to store and load data in a native JSON format. The format follows the same structure as the [widget configuration](/api/javascript/ui/spreadsheet#configuration). It is designed to be used both for direct storage and as an [intermediate format](server-side-processing).

> **Important**  
> An official JSON schema will be published once the component goes out of Beta.

Persisted information includes:

* Cell formulas, values, formatting and styling.
* Row height and column width.
* Sorting and filtering options.
* Active sheet and selection.

## Serialization API

The Spreadsheet client-side API includes the [`fromJSON`](/api/javascript/ui/spreadsheet#methods-fromJSON) and [`toJSON`](http://localhost/kendo-ui/api/javascript/ui/spreadsheet#methods-toJSON) methods for loading and storing the widget state.

To load the spreadsheet with data, pass an object matching the required schema, to `fromJSON`. This will reset the widget and clear all existing data.

The example below demonstrates how to load data by using `fromJSON`.

###### Example

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

You can also choose to load data in a specific [sheet](/api/javascript/spreadsheet/sheet) only. This will not affect the data located in the other sheets, apart from the formulas that refer to it.

The example below demonstrates how to load sheet data by using `fromJSON`.

###### Example

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

## See Also

Other articles on Kendo UI Spreadsheet:

* [API Reference](/api/javascript/ui/spreadsheet)
* [Data Source Binding]({% slug bind_todata_source_spreadsheet_widget %})
* [Export to Excel]({% slug export_toexcel_spreadsheet_widget %})
* [Server-Side Processing]({% slug serverside_processing_spreadsheet_widget %})
* [Custom Functions]({% slug custom_functions_spreadsheet_widget %})
* [Cell Formatting]({% slug cell_formatting_spreadsheet_widget %})
