---
title: Comments
page_title: Spreadsheet | Telerik UI for ASP.NET Core HtmlHelpers
description: "Define comments in cells in a Kendo UI Spreadsheet HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_spreadsheet_comments_aspnetcore
position: 2
---

# Comments

The Spreadsheet offers support for comments to be placed within each of its cells.

## Configuration

The example below demonstrates how a cell in the Spreadsheet can be initially [configured to contain a comment](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet/configuration/sheets.rows.cells.comment):

###### Example

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
                        .Bold(true);
                        .Comment("Comment set on the cell with the Spreadsheet initialization.");
                });
            });
        })
    )
```

## See Also

* [Overview of the Spreadsheet HtmlHelper]({% slug htmlhelpers_spreadsheet_aspnetcore %})
* [JavaScript API Reference of the Spreadsheet](http://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
* [Spreadsheet Official Demos](http://demos.telerik.com/aspnet-core/spreadsheet/index)
