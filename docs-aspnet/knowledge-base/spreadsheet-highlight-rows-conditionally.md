---
title: Highlight rows in the Spreadsheet conditionally
description: "An example of how to highlight rows conditionally in the {{ site.product }} Spreadsheet."
type: how-to
page_title: Highlight rows in the Spreadsheet conditionally
slug: spreadsheet-highlight-rows-conditionally
tags: mvc, core, spreadsheet, highlight, rows, condition
res_type: kb
component: spreadsheet
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.prodcut }} Spreadsheet</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.2.621 version</td>
 </tr>
</table>

## Description

How to highlight rows conditionally in the {{ site.product }} Spreadsheet?

## Solution

1. Hook up for the [DataBound](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet/events/databound) event of the Spreadsheet.
2. Traverse the rows, and if the record meets the condition, recolor all the cells in the row by using the [background](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/range/methods/background) method of the [range](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/range) object.  


```Index.cshtml

    @(Html.Kendo().Spreadsheet()
        .Name("spreadsheet")
        .HtmlAttributes(new { style = "width:100%" })
        .Events(e => e
            .DataBound("onDataBound")
        )
        .Sheets(sheets =>
        {
            sheets.Add()
                .Name("Products")
                .DataSource<Kendo.Mvc.Examples.Models.SpreadsheetProductViewModel>(ds => ds
                    .Custom()
                    .Batch(true)
                    .Transport(t => t
                        .Read("onRead")
                    )
                    .Events(e => e.Change("onChange"))
                    .Schema(s => s
                        .Model(m =>
                        {
                            m.Id(p => p.ProductID);
                        })
                    )
                )
                .Columns(columns =>
                {
                    columns.Add().Width(100);
                    columns.Add().Width(415);
                    columns.Add().Width(145);
                    columns.Add().Width(145);
                    columns.Add().Width(145);
                })
                .Rows(rows =>
                {
                    rows.Add().Height(40).Cells(cells =>
                    {
                        cells.Add()
                            .Bold(true)
                            .Background("#9c27b0")
                            .TextAlign(SpreadsheetTextAlign.Center)
                            .Color("white");

                        cells.Add()
                            .Bold(true)
                            .Background("#9c27b0")
                            .TextAlign(SpreadsheetTextAlign.Center)
                            .Color("white");

                        cells.Add()
                            .Bold(true)
                            .Background("#9c27b0")
                            .TextAlign(SpreadsheetTextAlign.Center)
                            .Color("white");

                        cells.Add()
                            .Bold(true)
                            .Background("#9c27b0")
                            .TextAlign(SpreadsheetTextAlign.Center)
                            .Color("white");

                        cells.Add()
                            .Bold(true)
                            .Background("#9c27b0")
                            .TextAlign(SpreadsheetTextAlign.Center)
                            .Color("white");
                    });
                });
        })
    )

```
```Script.js
    function onDataBound(e) {
        var data=e.sheet.dataSource.view();
        data.forEach((item, ind)=>{
            if(item.Discontinued){
                var range = e.sheet.range(`A${ind+2}:E${ind+2}`);
                range.background("red");
            }
        })
        console.log("Data has been bound to sheet ", );
    }
```

For the complete implementation of the suggested approach, refer to the following [Telerik REPL](https://netcorerepl.telerik.com/GwOWOCFl48wKAzUb04) example.