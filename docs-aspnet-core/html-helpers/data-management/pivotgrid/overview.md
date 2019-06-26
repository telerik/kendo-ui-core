---
title: Overview
page_title: PivotGrid Overview | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI PivotGrid HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_pivotgridhelper_aspnetcore
position: 1
---

# PivotGrid HtmlHelper Overview

The Kendo UI PivotGrid represents multidimensional data in a cross-tabular format.

The PivotGrid HtmlHelper extension is a server-side wrapper for the [Kendo UI PivotGrid](https://demos.telerik.com/kendo-ui/pivotgrid/index) widget. For more information on the PivotGrid HtmlHelper for ASP.NET MVC, refer to the [UI for ASP.NET MVC documentation](https://docs.telerik.com/aspnet-mvc/helpers/pivotgrid/overview).

## Ajax Binding

The Kendo UI PivotGrid for ASP.NET Core supports Ajax data-binding to HTTP accessible OLAP cube.

For more information on the OLAP concepts, refer to the articles on:
- [PivotGrid fundamentals](https://docs.telerik.com/kendo-ui/controls/data-management/pivotgrid/overview)
- [Setting up OLAP cubes](https://docs.telerik.com/kendo-ui/controls/data-management/pivotgrid/fundamentals)

Kendo UI provides an OLAP service dll that can be used for testing and is hosted at `https://demos.telerik.com/olap/msmdpump.dll`. However, to see the responses, the service needs to be queried and cannot be opened directly in the browser.

The Kendo UI PivotGrid for ASP.NET Core also supports Ajax data-binding to flat data. The widget creates a client-side cube which allows the categorization of the flat data.

For runnable examples, refer to:
* [Local binding of the PivotGrid (demo)](https://demos.telerik.com/aspnet-core/pivotgrid/local-flat-data-binding)
* [Remote binding of the PivotGrid (demo)](https://demos.telerik.com/aspnet-core/pivotgrid/remote-flat-data-binding)

The following examples demonstrate how to configure the PivotGrid for ASP.NET Core for Ajax binding to an **Adventure Works** cube that is hosted on `https://demos.telerik.com/olap/msmdpump.dll`.

1. Create a new ASP.NET Core application. If you have the [Telerik UI for ASP.NET Core Visual Studio Extensions]({% slug overview_visualstudio_aspnetcore %}) installed, create a Telerik UI for ASP.NET Core application. Name the application `KendoPivotGrid`. If you decide not to use the Telerik UI for ASP.NET Core Visual Studio Extensions, follow the steps from the [introductory article]({% slug gettingstarted_aspnetmvc6_aspnetmvc %}) to add Telerik UI for ASP.NET Core to the application.
1. Add a Kendo UI PivotGrid to the `Index` view.

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

* [Basic Usage of the PivotGrid HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/pivotgrid/index)
* [Basic Usage of the Kendo UI PivotGrid Widget (Demo)](https://demos.telerik.com/kendo-ui/pivotgrid/index)
* [Local Binding by the PivotGrid HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/pivotgrid/local-flat-data-binding)
* [Remote Binding by the PivotGrid HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/pivotgrid/remote-flat-data-binding)
* [JavaScript API Reference of the Kendo UI PivotGrid](https://docs.telerik.com/kendo-ui/api/javascript/ui/pivotgrid)
