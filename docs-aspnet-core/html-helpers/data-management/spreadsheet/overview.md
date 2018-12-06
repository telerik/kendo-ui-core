---
title: Overview
page_title: Spreadsheet | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI Spreadsheet HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/spreadsheet
slug: htmlhelpers_spreadsheet_aspnetcore
position: 1
---

# Spreadsheet HtmlHelper Overview

The Spreadsheet HtmlHelper extension is a server-side wrapper for the [Kendo UI Spreadsheet](https://demos.telerik.com/kendo-ui/spreadsheet/index) widget.

It enables you to configure the Kendo UI Spreadsheet widget from server-side code. The [Spreadsheet](http://docs.telerik.com/kendo-ui/controls/data-management/spreadsheet/overview) allows you to edit and visualize tabular data by using cell formatting options, styles, and themes.

For more information on the HtmlHelper, refer to the article on the [Spreadsheet HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/spreadsheet/overview).

## Basic Usage

The following example demonstrates how to define the Spreadsheet by using the Spreadsheet HtmlHelper.

###### Example

```Razor
@(Html.Kendo().Spreadsheet()
    .Name("spreadsheet")
    .Sheets(sheets => {
        sheets.Add()
            .Name("Food Order")
            .MergedCells("A1:F1", "C15:E15")
            .Columns(columns =>
            {
                columns.Add().Width(100);
                columns.Add().Width(215);
                columns.Add().Width(115);
                columns.Add().Width(115);
                columns.Add().Width(115);
                columns.Add().Width(155);
            })
            .Rows(rows =>
            {
                rows.Add().Height(50).Cells(cells =>
                {
                    cells.Add()
                        .Value("My Company")
                        .FontSize(25)
                        .Background("rgb(142,196,65)")
                        .TextAlign(SpreadsheetTextAlign.Center)
                        .Color("white");
                });

                rows.Add().Height(25).Cells(cells =>
                {
                    cells.Add()
                        .Value("ID")
                        .Background("rgb(212,223,50)")
                        .TextAlign(SpreadsheetTextAlign.Center);

                    cells.Add()
                        .Value("Product")
                        .Background("rgb(212,223,50)")
                        .TextAlign(SpreadsheetTextAlign.Center);

                    cells.Add()
                        .Value("Quantity")
                        .Background("rgb(212,223,50)")
                        .TextAlign(SpreadsheetTextAlign.Center);

                    cells.Add()
                        .Value("Price")
                        .Background("rgb(212,223,50)")
                        .TextAlign(SpreadsheetTextAlign.Center);

                    cells.Add()
                        .Value("Tax")
                        .Background("rgb(212,223,50)")
                        .TextAlign(SpreadsheetTextAlign.Center);

                    cells.Add()
                        .Value("Amount")
                        .Background("rgb(212,223,50)")
                        .TextAlign(SpreadsheetTextAlign.Center);
                });
            });
        })
)
```
```Controller
    public class SpreadsheetController : Controller
    {
        public ActionResult Index()
        {                            
            return View();
        }
    }
```

## Configuration

The following example demonstrates the basic configuration of the Spreadsheet HtmlHelper and how to get the Spreadsheet instance.

###### Example

```
@(Html.Kendo().Spreadsheet()
    .Name("spreadsheet")
    .Rows(10)
    .Columns(10)
    .Sheetsbar(true)
    .Toolbar(true)
    .HtmlAttributes(new { style = "width:100%" })
    .Toolbar(t => t.Home(true).Data(false).Insert(false))
    .Excel(excel => excel
        .ProxyURL(Url.Action("Index_Save", "Spreadsheet"))
    )
    .Pdf(pdf => pdf
        .ProxyURL(Url.Action("Index_Save", "Spreadsheet"))
    )
   .Sheets(sheets =>
   {
       sheets.Add()
           .Name("Food Order")
           .MergedCells("A1:F1", "C15:E15")
           .Columns(columns =>
           {
               columns.Add().Width(100);
               columns.Add().Width(215);
               columns.Add().Width(115);
               columns.Add().Width(115);
               columns.Add().Width(115);
               columns.Add().Width(155);
           })
           .Rows(rows =>
           {
               rows.Add().Height(50).Cells(cells =>
               {
                   cells.Add()
                       .Value("My Company")
                       .FontSize(25)
                       .Background("rgb(142,196,65)")
                       .TextAlign(SpreadsheetTextAlign.Center)
                       .Color("white");
               });

               rows.Add().Height(25).Cells(cells =>
               {
                   cells.Add()
                       .Value("ID")
                       .Background("rgb(212,223,50)")
                       .TextAlign(SpreadsheetTextAlign.Center);

                   cells.Add()
                       .Value("Product")
                       .Background("rgb(212,223,50)")
                       .TextAlign(SpreadsheetTextAlign.Center);

                   cells.Add()
                       .Value("Quantity")
                       .Background("rgb(212,223,50)")
                       .TextAlign(SpreadsheetTextAlign.Center);

                   cells.Add()
                       .Value("Price")
                       .Background("rgb(212,223,50)")
                       .TextAlign(SpreadsheetTextAlign.Center);

                   cells.Add()
                       .Value("Tax")
                       .Background("rgb(212,223,50)")
                       .TextAlign(SpreadsheetTextAlign.Center);

                   cells.Add()
                       .Value("Amount")
                       .Background("rgb(212,223,50)")
                       .TextAlign(SpreadsheetTextAlign.Center);
               });
           });
   })
)

<script type="text/javascript">
$(function() {
    //Notice that the Name() of the Spreadsheet is used to get its client-side instance.
    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
});
</script>
```

## See Also

* [JavaScript API Reference of the Spreadsheet](http://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
* [Spreadsheet HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/spreadsheet/overview)
* [Spreadsheet Official Demos](http://demos.telerik.com/aspnet-core/spreadsheet/index)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
