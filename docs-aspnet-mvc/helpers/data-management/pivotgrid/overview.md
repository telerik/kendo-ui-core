---
title: Overview
page_title: PivotGrid Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI PivotGrid HtmlHelper for ASP.NET MVC."
slug: overview_pivotgridhelper_aspnetmvc
position: 1
---

# PivotGrid HtmlHelper Overview

The Telerik UI PivotGrid HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI PivotGrid widget.

The PivotGrid represents multidimensional data in a cross-tabular format.

* [Demo page for the PivotGrid](https://demos.telerik.com/aspnet-mvc/pivotgrid)

## Getting Started

The PivotGrid for ASP.NET MVC supports Ajax data-binding to HTTP accessible OLAP cube. For more information on the OLAP concepts, refer to the Kendo UI for jQuery articles on:
- [PivotGrid fundamentals](https://docs.telerik.com/kendo-ui/controls/data-management/pivotgrid/overview)
- [Setting up OLAP cubes](https://docs.telerik.com/kendo-ui/controls/data-management/pivotgrid/fundamentals)

Kendo UI for jQuery provides an OLAP service dll that can be used for testing and is hosted at `https://demos.telerik.com/olap/msmdpump.dll`. To see the responses, the service needs to be queried and cannot be opened directly in the browser.

The PivotGrid for ASP.NET Core also supports Ajax data-binding to flat data. It creates a client-side cube which allows the categorization of the flat data. For runnable examples, refer to:
* [Local binding of the PivotGrid HtmlHelper for ASP.NET MVC (demo)](https://demos.telerik.com/aspnet-mvc/pivotgrid/local-flat-data-binding)
* [Remote binding of the PivotGrid HtmlHelper for ASP.NET MVC (demo)](https://demos.telerik.com/aspnet-mvc/pivotgrid/remote-flat-data-binding)

## Basic Configuration

The following examples demonstrate how to configure the PivotGrid for ASP.NET Core for Ajax binding to an **Adventure Works** cube that is hosted on `https://demos.telerik.com/olap/msmdpump.dll`.

1. Create a new ASP.NET MVC 4 application. If you have the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#kendo-ui-for-asp.net-mvc-visual-studio-extensions) installed, create a Telerik UI for ASP.NET MVC application. Name the application `KendoPivotGrid`. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.
1. Add a Kendo UI PivotGrid to the `Index` view.

    ```ASPX
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
    ```Razor
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

1. Build and run the application.

  ![The final result](images/pivotgrid.png)

## See Also

* [Basic Usage of the PivotGrid HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/pivotgrid/index)
* [Local Binding by the PivotGrid HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/pivotgrid/local-flat-data-binding)
* [Remote Binding by the PivotGrid HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/pivotgrid/remote-flat-data-binding)
* [Server-Side API](/api/pivotgrid)
