---
title: Overview
page_title: How to use the Kendo UI Spreadsheet HtmlHelper extension, server-side ASP.NET MVC wrapper for Kendo UI Spreadsheet widget
description: Learn how to bind Kendo UI Spreadsheet for ASP.NET MVC, handle Kendo UI Spreadsheet Events, access an existing Spreadsheet.
position: 1
---

# Spreadsheet

The Spreadsheet HtmlHelper extension is a server-side wrapper for the [Kendo UI Spreadsheet](/api/web/spreadsheet) widget.
It allows you to configure the Kendo UI Spreadsheet from server-side code.

## Getting started

The following tutorial shows how to configure Kendo UI Spreadsheet for ASP.NET MVC to bind to inline data.

1.  Create a new ASP.NET MVC 5 application using any of the following templates:
    * Telerik UI for ASP.NET MVC application. Available after installing the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/introduction#kendo-ui-for-asp.net-mvc-visual-studio-extensions)).
    * Default Visual Studio template. Follow the steps from the [Introduction](/aspnet-mvc/introduction) help topic in order to setup to the application.

1.  Add a Kendo UI Spreadsheet to the Index view

    - Views/Home/Index.cshtml

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

    - Views/Home/Index.aspx

            <%:Html.Kendo().Spreadsheet()
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
            %>

1. Build and run the application
![Final result](/aspnet-mvc/helpers/spreadsheet/images/spreadsheet-inline.png)

## Getting reference to the Kendo UI Spreadsheet widget

To get a reference to a Spreadsheet instance use the [jQuery.data()](http://api.jquery.com/jQuery.data/) method and the value specified via the `Name()` method.
Then you can use you can use the JavaScript [API](/api/web/spreadsheet#methods) of the Spreadsheet.

### Example - get reference to a Kendo UI Spreadsheet instance

    @(Html.Kendo().Spreadsheet()
        .Name("spreadsheet")
    )
    <script>
    $(function() {
        // Notice that the Name() of the treelist is used to get its client-side instance
        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    });
    </script>


## Handling Kendo UI Spreadsheet events

You can subscribe to all [events](/api/web/spreadsheet#events) exposed by the widget:

### Example - Subscribe to event by handler name (Razor)

    @(Html.Kendo().Spreadsheet()
        .Name("spreadsheet")
        .Events(e => e
            .Render("spreadsheetRender")
        )
    )

    <script>
        function spreadsheetRender() {
            // Handle the render event
        }
    </script>


### Example - Subscribe to event via Razor delegate

    @(Html.Kendo().Spreadsheet()
        .Name("spreadsheet")
        .Events(e => e
            .Render(@<text>
                function() {
                    // Handle the render event inline
                }
            </text>)
        )
    )

### Example - Subscribe to event by handler name (ASPX)

    <%:Html.Kendo().Spreadsheet()
        .Name("spreadsheet")
        .Events(e => e
            .Render("spreadsheetRender")
        )
    %>

    <script>
        function spreadsheetRender() {
            // Handle the render event
        }
    </script>

