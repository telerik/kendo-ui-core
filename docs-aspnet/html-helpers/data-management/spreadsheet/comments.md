---
title: Comments
page_title: Spreadsheet
description: "Define comments in cells in a Telerik UI Spreadsheet HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_spreadsheet_comments_aspnetcore
position: 2
---

# Comments

The Spreadsheet offers support for comments to be placed within each of its cells.

The following example demonstrates how a cell in the Spreadsheet can be initially [configured to contain a comment](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet/configuration/sheets.rows.cells.comment).

```
    @(Html.Kendo().Spreadsheet()
        .Name("spreadsheet")
        .Sheets(sheets =>
        {
            sheets.Add()
            .Name("Sheet1")
            .Columns(c =>
            {
                c.Add().Width(300);
            })
            .Rows(rows =>
            {
                rows.Add().Height(70).Cells(cells =>
                {
                    cells.Add()
                        .Value("This cell has a comment.")
                        .Bold(true)
                        .Comment("Comment set on the cell with the Spreadsheet initialization.");
                });
            });
        })
    )
```

## See Also

* [Server-Side API](/api/spreadsheet)
