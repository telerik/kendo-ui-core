---
title: Comments
page_title: jQuery Spreadsheet Documentation | Comments
description: "Get started with the jQuery Spreadsheet by Kendo UI and define the comments in its cells."
slug: comments_spreadsheet_widget
position: 3
---

# Comments

The Spreadsheet offers support for comments to be placed within each of its cells.

The following example demonstrates how a cell in the Spreadsheet can be initially [configured to contain a comment](/api/javascript/ui/spreadsheet/configuration/sheets.rows.cells.comment).

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

* [Adding Cell Comments to the Spreadsheet (Demo)](https://demos.telerik.com/kendo-ui/spreadsheet/cell-comments)
* [Spreadsheet JavaScript API Reference](/api/javascript/ui/spreadsheet)
