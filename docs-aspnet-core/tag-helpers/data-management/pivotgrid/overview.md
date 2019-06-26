---
title: Overview
page_title: PivotGrid Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI PivotGrid tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_pivotgrid_aspnetcore
previous_url: /aspnet-core/helpers/tag-helpers/pivotgrid
position: 1
---

# PivotGrid Tag Helper Overview

The Kendo UI PivotGrid represents multidimensional data in a cross-tabular format.

The PivotGrid HtmlHelper extension is a server-side wrapper for the [Kendo UI PivotGrid](https://demos.telerik.com/kendo-ui/pivotgrid/index) widget and enables you to configure the Kendo UI PivotGrid widget in ASP.NET Core applications.

## Initializing the PivotGrid

The following example demonstrates how to define the PivotGrid by using the PivotGrid tag helper.

        <kendo-pivotconfigurator name="configurator" datasource-id="pivotSource"></kendo-pivotconfigurator>
        <kendo-pivotgrid name="pivotgrid" datasource-id="pivotSource"></kendo-pivotgrid>

## Basic Configuration

The PivotGrid tag helper configuration options are passed as attributes of the tag.

```tagHelper
    <kendo-pivotdatasource type=@(PivotDataSourceType.Xmla) name="pivotSource">
        <columns>
            <pivot-datasource-column name="[Date].[Calendar]" expand="true"></pivot-datasource-column>
            <pivot-datasource-column name="[Product].[Category]"></pivot-datasource-column>
        </columns>
        <rows>
            <row name="[Geography].[City]"></row>
        </rows>
        <schema type="xmla"/>
        <measures values=@(new string[] {"[Measures].[Reseller Freight Cost]"} ) ></measures>
        <transport>
            <read url="https://demos.telerik.com/olap/msmdpump.dll" datatype="text" content-type="text/xml" type="POST" />
            <connection catalog="Adventure Works DW 2008R2" cube="Adventure Works"></connection>
        </transport>
    </kendo-pivotdatasource>
    <kendo-pivotconfigurator name="configurator" datasource-id="pivotSource">
    </kendo-pivotconfigurator>
    <kendo-pivotgrid name="pivotgrid" datasource-id="pivotSource">
    </kendo-pivotgrid>
```
```cshtml
    @(Html.Kendo().PivotConfigurator()
        .Name("configurator")
        .Filterable(true)
        .Sortable()
        .Height(570)
    )

    @(Html.Kendo().PivotGrid()
        .Name("pivotgrid")
        .ColumnWidth(200)
        .Height(570)
        .Filterable(true)
        .Sortable()
        .Configurator("#configurator")
        .DataSource(dataSource => dataSource.
            Xmla()
            .Columns(columns => {
                columns.Add("[Date].[Calendar]").Expand(true);
                columns.Add("[Product].[Category]");
            })
            .Rows(rows => rows.Add("[Geography].[City]"))
            .Measures(measures => measures.Values(new string[]{"[Measures].[Reseller Freight Cost]"}))
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
            .Events(e => e.Error("onError"))
        )
    )
```

## See Also

* [Basic Usage of the PivotGrid Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/pivotgrid/tag-helper)
* [JavaScript API Reference of the Kendo UI PivotGrid](https://docs.telerik.com/kendo-ui/api/javascript/ui/pivotgrid)
