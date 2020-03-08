---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI PivotGrid TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_pivotgrid_aspnetcore
previous_url: /helpers/tag-helpers/pivotgrid
position: 1
---

# PivotGrid TagHelper Overview

The Telerik UI PivotGrid TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI PivotGrid widget.

The PivotGrid represents multidimensional data in a cross-tabular format.

* [Demo page for the PivotGrid](https://demos.telerik.com/aspnet-core/pivotgrid/tag-helper)

## Initializing the PivotGrid

The following example demonstrates how to define the PivotGrid by using the PivotGrid TagHelper.

        <kendo-pivotconfigurator name="configurator" datasource-id="pivotSource"></kendo-pivotconfigurator>
        <kendo-pivotgrid name="pivotgrid" datasource-id="pivotSource"></kendo-pivotgrid>

## Basic Configuration

The PivotGrid TagHelper configuration options are passed as attributes of the tag.

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

* [Basic Usage of the PivotGrid TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/pivotgrid/tag-helper)
* [Server-Side API](/api/pivotgrid)
