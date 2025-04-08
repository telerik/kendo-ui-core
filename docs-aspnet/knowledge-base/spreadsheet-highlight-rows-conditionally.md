---
title: Highlighting Rows in the Spreadsheet Conditionally
description: Learn how to highlight rows conditionally in the {{ site.product }} Spreadsheet.
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
  <td>{{ site.product }} Spreadsheet</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.2.621 version</td>
 </tr>
</table>

## Description

How to highlight rows conditionally in the {{ site.product }} Spreadsheet?

## Solution

1. Hook up for the [`DataBound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet/events/databound) event of the Spreadsheet.
2. Traverse the rows, and if the record meets the condition, recolor all the cells in the row by using the [`background`](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/range/methods/background) method of the [`range`](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/range) object.  


```Razor Index.cshtml

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
```JS script.js
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

## More {{ site.framework }} Spreadsheet Resources

* [{{ site.framework }} Spreadsheet Documentation]({%slug htmlhelpers_spreadsheet_aspnetcore%})

* [{{ site.framework }} Spreadsheet Demos](https://demos.telerik.com/{{ site.platform }}/spreadsheet)

{% if site.core %}
* [{{ site.framework }} Spreadsheet Product Page](https://www.telerik.com/aspnet-core-ui/spreadsheet)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Spreadsheet Product Page](https://www.telerik.com/aspnet-mvc/spreadsheet)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Telerik REPL: Highlighting Rows in the Spreadsheet Conditionally](https://netcorerepl.telerik.com/GwOWOCFl48wKAzUb04)
* [Client-Side API Reference of the Spreadsheet for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
* [Server-Side API Reference of the Spreadsheet for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/spreadsheet)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
