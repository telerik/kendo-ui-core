---
title: Storing Data as JSON
page_title: jQuery Spreadsheet Documentation | Storing Data as JSON
description: "Get started with the jQuery Spreadsheet by Kendo UI and learn about the data persistence options in the Kendo UI Spreadsheet widget."
slug: loadand_saveas_json_spreadsheet_widget
position: 1
---

# Storing Data as JSON

The Spreadsheet allows you to store and load data in a native JSON format.

## Getting Started

The format follows the same structure as the [widget configuration](/api/javascript/ui/spreadsheet#configuration). It is designed to be used both for direct storage and as an [intermediate format]({% slug serverside_processing_spreadsheet_widget %}).

> Once the Spreadsheet goes out of its Beta version, an official JSON schema will be published.

The information that is persisted includes:

* Cell formulas, values, formatting and styling.
* Row height and column width.
* Sorting and filtering options.
* Active sheet and selection.

## Using the Serialization API

The Spreadsheet client-side API includes the [`fromJSON`](/api/javascript/ui/spreadsheet/methods/fromjson) and [`toJSON`](/api/javascript/ui/spreadsheet/methods/tojson) methods for loading and storing its state. To load the Spreadsheet with data, pass an object matching the required schema to `fromJSON`. This resets the widget and clears all existing data.

The following example demonstrates how to load data by using `fromJSON`.

```dojo
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

You can also choose to load data only in a specific [sheet](/api/javascript/spreadsheet/sheet). This will not affect the data located in the other sheets, apart from the formulas that refer to it.

The following example demonstrates how to load sheet data by using `fromJSON`.

```dojo
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

* [Server-Side Import and Export in the Spreadsheet (Demo)](https://demos.telerik.com/kendo-ui/spreadsheet/server-side-import-export)
* [Spreadsheet JavaScript API Reference](/api/javascript/ui/spreadsheet)
