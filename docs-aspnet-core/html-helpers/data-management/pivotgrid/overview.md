---
title: Overview
page_title: PivotGrid Overview | Telerik UI for ASP.NET Core HTML Helpers
description: "Learn the basics when working with the Telerik UI PivotGrid HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_pivotgridhelper_aspnetcore
position: 1
---

# PivotGrid HtmlHelper Overview

The Telerik UI PivotGrid HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI PivotGrid widget.

The PivotGrid represents multidimensional data in a cross-tabular format.

* [Demo page for the PivotGrid](https://demos.telerik.com/aspnet-core/pivotgrid/index)

## Basic Configuration

To configure the PivotGrid for Ajax binding to an **Adventure Works** cube that is hosted on `https://demos.telerik.com/olap/msmdpump.dll`:

1. Create a new ASP.NET Core application. If you have the [Telerik UI for ASP.NET Core Visual Studio Extensions]({% slug overview_visualstudio_aspnetcore %}) installed, create a Telerik UI for ASP.NET Core application. Name the application `KendoPivotGrid`. If you decide not to use the Telerik UI for ASP.NET Core Visual Studio Extensions, follow the steps from the [introductory article]({% slug gettingstarted_aspnetmvc6_aspnetmvc %}) to add Telerik UI for ASP.NET Core to the application.
1. Add a PivotGrid to the `Index` view.

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

## Functionality and Features

* [Data binding]({% slug databinding_pivotgridhelper_aspnetcore %})
* [Filtering]({% slug htmlhelpers_pivotgrid_aspnetcore_filtering %})
* [Sorting]({% slug htmlhelpers_pivotgrid_aspnetcore_sorting %})
* [Templates]({% slug htmlhelpers_pivotgrid_aspnetcore_templates %})
* [Excel export]({% slug htmlhelpers_pivotgrid_aspnetcore_excelexport %})
* [PDF export]({% slug htmlhelpers_pivotgrid_aspnetcore_pdfexport %})

## Referencing Existing Instances

To reference an existing PivotGrid instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [PivotGrid client-side API](/api/web/pivotgrid) to control its behavior.

    var pivotgrid = $("#pivotgrid").data("kendoPivotGrid");


## See Also

* [Basic Usage of the PivotGrid HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/pivotgrid/index)
* [Server-Side API](/api/pivotgrid)
