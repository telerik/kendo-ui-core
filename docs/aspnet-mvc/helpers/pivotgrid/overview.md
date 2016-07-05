---
title: Overview
page_title: Overview | Kendo UI PivotGrid HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI PivotGrid widget for ASP.NET MVC."
slug: overview_pivotgridhelper_aspnetmvc
position: 1
---

# PivotGrid HtmlHelper Overview

The PivotGrid HtmlHelper extension is a server-side wrapper for the [Kendo UI PivotGrid](/api/web/pivotgrid) widget. It allows you to configure the Kendo UI PivotGrid from server-side code and helps you with data binding.

## Getting Started

### The Basics

The Kendo UI PivotGrid for ASP.NET MVC supports Ajax data-binding to HTTP accessible OLAP cube.

For more information on the OLAP concepts, refer to the articles about:

- [PivotGrid Fundamentals]({% slug fundamentals_pivotgrid_widget %})
- [Setting Up OLAP Cubes]({% slug olap_cube_setup_pivotgrid_widget %})

To use Telerik OLAP service, refer to [http://demos.telerik.com/olap/msmdpump.dll](http://demos.telerik.com/olap/msmdpump.dll).

The Kendo UI PivotGrid for ASP.NET MVC also supports server and Ajax data-binding to a flat data. The widget creates a client-side cube allowing to categorize the flat data.

For more information, refer to the demos on:

- [Local Binding](http://demos.telerik.com/aspnet-mvc/pivotgrid/local-flat-data-binding)
- [Remote Binding](http://demos.telerik.com/aspnet-mvc/pivotgrid/remote-flat-data-binding)

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI PivotGrid for ASP.NET MVC and doing Ajax binding to an **Adventure Works** cube, hosted on [http://demos.telerik.com/olap/msmdpump.dll](http://demos.telerik.com/olap/msmdpump.dll).

**Step 1** Create a new ASP.NET MVC 4 application. If you have the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#kendo-ui-for-asp.net-mvc-visual-studio-extensions) installed, create a Telerik UI for ASP.NET MVC application. Name the application `KendoPivotGrid`. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

**Step 2** Add a Kendo UI PivotGrid to the `Index` view.

###### Example

```tab-ASPX

      <%: Html.Kendo().PivotGrid()
              .Name("pivotgrid")
              .DataSource(dataSource => dataSource.
                  Xmla()
                  .Columns(columns => {
                      columns.Add("[Date].[Calendar]").Expand(true);
                      columns.Add("[Geography].[City]");
                  })
                  .Rows(rows => rows.Add("[Product].[Product]"))
                  .Measures(measures => measures.Values(new string[]{"[Measures].[Internet Sales Amount]"}))
                  .Transport(transport => transport
                      .Connection(connection => connection
                          .Catalog("Adventure Works DW 2008R2")
                          .Cube("Adventure Works"))
                      .Read(read => read
                          .Url("http://demos.telerik.com/olap/msmdpump.dll")
                          .DataType("text")
                          .ContentType("text/xml")
                          .Type(HttpVerbs.Post)
                      )
                  )
              )
      %>
```
```tab-Razor

      @(Html.Kendo().PivotGrid()
            .Name("pivotgrid")
            .DataSource(dataSource => dataSource.
                Xmla()
                .Columns(columns => {
                    columns.Add("[Date].[Calendar]").Expand(true);
                    columns.Add("[Geography].[City]");
                })
                .Rows(rows => rows.Add("[Product].[Product]"))
                .Measures(measures => measures.Values(new string[]{"[Measures].[Internet Sales Amount]"}))
                .Transport(transport => transport
                    .Connection(connection => connection
                        .Catalog("Adventure Works DW 2008R2")
                        .Cube("Adventure Works"))
                    .Read(read => read
                        .Url("http://demos.telerik.com/olap/msmdpump.dll")
                        .DataType("text")
                        .ContentType("text/xml")
                        .Type(HttpVerbs.Post)
                    )
                )
            )
      )
```

**Step 3** Build and run the application.

**Figure 1. The finished application**

![Final result](/aspnet-mvc/helpers/pivotgrid/images/pivotgrid.png)

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the PivotGrid:

* [ASP.NET MVC API Reference: PivotGridBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/PivotGridBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI PivotGrid Widget]({% slug overview_kendoui_pivotgrid_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
