---
title: Overview
page_title: PivotGrid | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI PivotGrid HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_pivotgridhelper_aspnetcore
position: 1
---

# PivotGrid HtmlHelper Overview

The PivotGrid HtmlHelper extension is a server-side wrapper for the [Kendo UI PivotGrid](https://demos.telerik.com/kendo-ui/pivotgrid/index) widget.

It allows you to configure the Kendo UI PivotGrid from server-side code and helps you with data binding.

## Getting Started

### The Basics

The Kendo UI PivotGrid for ASP.NET Core supports Ajax data-binding to HTTP accessible OLAP cube.

For more information on the OLAP concepts, refer to the articles about:

- [PivotGrid Fundamentals](https://docs.telerik.com/kendo-ui/controls/data-management/pivotgrid/overview)
- [Setting Up OLAP Cubes](https://docs.telerik.com/kendo-ui/controls/data-management/pivotgrid/fundamentals)

The team has set up an OLAP service dll that can be used for testing. It is hosted at `https://demos.telerik.com/olap/msmdpump.dll`, however to see the responses it needs to be queried, it cannot be opened directly in the browser. See the example below which shows how to configure the PivotGridDataSource to consume the service.

The Kendo UI PivotGrid for ASP.NET Core also supports Ajax data-binding to a flat data. The widget creates a client-side cube allowing to categorize the flat data.

For more information, refer to the demos on:

- [Local Binding](https://demos.telerik.com/aspnet-core/pivotgrid/local-flat-data-binding)
- [Remote Binding](https://demos.telerik.com/aspnet-core/pivotgrid/remote-flat-data-binding)

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI PivotGrid for ASP.NET Core and doing Ajax binding to an **Adventure Works** cube, hosted on `https://demos.telerik.com/olap/msmdpump.dll`.

1. Create a new ASP.NET Core application. If you have the [Telerik UI for ASP.NET Core Visual Studio Extensions]({% slug overview_visualstudio_aspnetcore %}) installed, create a Telerik UI for ASP.NET Core application. Name the application `KendoPivotGrid`. If you decide not to use the Telerik UI for ASP.NET Core Visual Studio Extensions, follow the steps from the [introductory article]({% slug gettingstarted_aspnetmvc6_aspnetmvc %}) to add Telerik UI for ASP.NET Core to the application.

1. Add a Kendo UI PivotGrid to the `Index` view.

    ###### Example

    ```
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
                        .Url("https://demos.telerik.com/olap/msmdpump.dll")
                        .DataType("text")
                        .ContentType("text/xml")
                        .Type(HttpVerbs.Post)
                    )
                )
            )
        )
    ```

1. Build and run the application.

## See Also

* [Overview of the Kendo UI PivotGrid Widget](http://docs.telerik.com/kendo-ui/controls/data-management/pivotgrid/overview)
* [Telerik UI for ASP.NET Core PivotGrid official live demos](https://demos.telerik.com/aspnet-core/pivotgrid)
