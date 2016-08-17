---
title: Overview
page_title: Overview | Kendo UI Spreadsheet HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI Spreadsheet widget for ASP.NET MVC."
slug: overview_spreadsheethelper_aspnetmvc
position: 1
---

# Spreadsheet HtmlHelper Overview

The Spreadsheet HtmlHelper extension is a server-side wrapper for the [Kendo UI Spreadsheet](https://demos.telerik.com/kendo-ui/spreadsheet/index) widget. It allows you to configure the Kendo UI Spreadsheet from server-side code.

## Getting started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Spreadsheet for ASP.NET MVC to bind to inline data.

**Step 1** Create a new ASP.NET MVC 5 application using any of the following templates:

* Telerik UI for ASP.NET MVC application. It is available after installing the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}).
* Default Visual Studio template. Follow the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}) to set up to the application.

**Step 2** Add a Kendo UI Spreadsheet to the `Index` view in `Views/Home/Index.cshtml`.

###### Example

```tab-ASPX

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
```
```tab-Razor
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

**Step 3** Build and run the application.

**Figure 1. The final result**

![Final result](/aspnet-mvc/helpers/spreadsheet/images/spreadsheet-inline.png)

## Event Handling

You can subscribe to all Spreadsheet [events](/api/javascript/ui/spreadsheet#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

      <%:Html.Kendo().Spreadsheet()
          .Name("spreadsheet")
          .Events(e => e
              .Render("spreadsheetRender")
          )
      %>

      <script>
          function spreadsheetRender() {
              //Handle the render event.
          }
      </script>
```
```tab-Razor

      @(Html.Kendo().Spreadsheet()
          .Name("spreadsheet")
          .Events(e => e
              .Render("spreadsheetRender")
          )
      )

      <script>
          function spreadsheetRender() {
              //Handle the render event.
          }
      </script>
```

### By Template Delegate

The example below demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

      @(Html.Kendo().Spreadsheet()
          .Name("spreadsheet")
          .Events(e => e
              .Render(@<text>
                  function() {
                      //Handle the render event inline.
                  }
              </text>)
          )
      )
```

## Reference

### Existing Instances

You can reference an existing Kendo UI Spreadsheet instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Spreadsheet API](/api/javascript/ui/spreadsheet#methods) to control its behavior.

###### Example

      @(Html.Kendo().Spreadsheet()
          .Name("spreadsheet")
      )
      <script>
      $(function() {
          //Notice that the Name() of the Spreadsheet is used to get its client-side instance.
          var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
      });
      </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the Spreadsheet:

* [ASP.NET MVC API Reference: SpreadsheetBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/SpreadsheetBuilder)
* [Processing of the Kendo UI Spreadsheet for ASP.NET MVC]({% slug spreadsheet_processing_spreadsheet_mvc %})
* [Overview of the Kendo UI Spreadsheet Widget]({% slug overview_spreadsheet_widget %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
* [Spreadsheet HtmlHelper Troubleshooting]({% slug troubleshoot_spreadsheethelper_aspnetmvc %})
