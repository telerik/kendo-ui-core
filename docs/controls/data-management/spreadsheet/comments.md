---
title: Comments
page_title: Comments | Kendo UI Spreadsheet
description: "Define comments in cells in a Kendo UI Spreadsheet widget."
slug: comments_spreadsheet_widget
position: 3
---

# Comments

The Spreadsheet offers support for comments to be placed within each of its cells.

## Configuration

The below example demonstrates how a cell in the Spreadsheet could be initially [configured to contain a comment](/api/javascript/ui/spreadsheet/configuration/sheets.rows.cells.comment):

###### Example

```dojo
    <div id="spreadsheet"></div>

    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                columns: [{
                    width: 300
                }],
                rows: [{
                    cells: [{
                        value: "This cell has a comment.",
                        bold: true,
                        comment: "Comment set on the cell with the Spreadsheet initialization."
                    }]
                }]
            }]
        });
    </script>
```

## See Also

* [Overview]({% slug overview_spreadsheet_widget %})
* [Custom Cell Editors]({% slug custom_editors_spreadsheet_widget %})
* [Images]({% slug images_spreadsheet_widget %})
* [Custom Functions]({% slug custom_functions_spreadsheet_widget %})
* [Cell Formatting]({% slug cell_formatting_spreadsheet_widget %})
* [Data Source Binding]({% slug bind_todata_source_spreadsheet_widget %})
* [Export to Excel]({% slug export_toexcel_spreadsheet_widget %})
* [Server-Side Processing]({% slug serverside_processing_spreadsheet_widget %})
* [User Guide]({% slug user_guide_spreadsheet_widget %})
* [Spreadsheet JavaScript API Reference](/api/javascript/ui/spreadsheet)
