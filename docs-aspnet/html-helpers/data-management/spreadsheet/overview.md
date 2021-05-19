---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Spreadsheet HtmlHelper for {{ site.framework }}."
previous_url: /helpers/html-helpers/spreadsheet, /helpers/data-management/spreadsheet/overview
slug: htmlhelpers_spreadsheet_aspnetcore
position: 1
---

# Spreadsheet HtmlHelper Overview

The Telerik UI Spreadsheet HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Spreadsheet widget.

The Spreadsheet allows you to edit and visualize tabular data by using cell formatting options, styles, and themes.

* [Demo page for the Spreadsheet](https://demos.telerik.com/{{ site.platform }}/spreadsheet/index)

## Initializing the Spreadsheet

The following example demonstrates how to define the Spreadsheet by using the Spreadsheet HtmlHelper.

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

## Basic Configuration

The following example demonstrates the basic configuration for the Spreadsheet HtmlHelper.

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
```

## Functionality and Features

* [Comments]({% slug htmlhelpers_spreadsheet_comments_aspnetcore %})
* [Custom functions]({% slug htmlhelpers_spreadsheet_custom_functions_aspnetcore %})
* [Cell formatting]({% slug htmlhelpers_spreadsheet_formatting_aspnetcore %})
* [Images]({% slug htmlhelpers_spreadsheet_images_aspnetcore %})
* [Import and export of data]({% slug htmlhelpers_spreadsheet_bind_to_datasource_aspnetcore %})
* [End user guide]({% slug htmlhelpers_spreadsheet_user_guide_aspnetcore %})

## Events

You can subscribe to all Spreadsheet [events](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet#events). For a complete example on basic Spreadsheet events, refer to the [demo on using the events of the Spreadsheet](https://demos.telerik.com/{{ site.platform }}/spreadsheet/events).

The following example demonstrates how to subscribe to the `changing` and `change` events.

```Razor
    @(Html.Kendo().Spreadsheet()
        .Name("spreadsheet")
        .Events(events => events
            .Changing("onChanging")
            .Change("onChange")
        )
        .Sheets(sheets =>
        {
            sheets.Add()
                .Name("Sheet1")
                .Columns(columns =>
                {
                    columns.Add().Width(115);
                })
                .Rows(rows =>
                {
                    rows.Add().Height(25).Cells(cells =>
                    {
                        cells.Add()
                            .Value("ID")
                            .TextAlign(SpreadsheetTextAlign.Center);
                    });
                });
        })
    )

    <script>
        function onChanging(e) {
            // Handle the changing event.
        }

        function onChange(e) {
            // Handle the change event.
        }
    </script>
```

## Referencing Existing Instances

To reference an existing Kendo UI Spreadsheet instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Spreadsheet client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet#methods) to control its behavior.

    // Place the following after the Spreadsheet for {{ site.framework }} declaration.
    <script>
        $(document).ready(function() {
            // The Name() of the Spreadsheet is used to get its client-side instance.
            var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        });
    </script>

## See Also

* [Basic Usage of the Spreadsheet HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/spreadsheet/index)
* [Server-Side API](/api/spreadsheet)
