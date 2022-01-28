---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI PivotGridV2 TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_pivotgridv2_aspnetcore
previous_url: /helpers/tag-helpers/pivotgridv2
position: 1
---

# PivotGridV2 TagHelper Overview

The Telerik UI PivotGridV2 TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI PivotGridV2 widget.

The PivotGridV2 represents multidimensional data in a cross-tabular format.

* [Demo page for the PivotGridV2](https://demos.telerik.com/aspnet-core/pivotgridv2/tag-helper)

## Initializing the PivotGridV2

The following example demonstrates how to define the PivotGridV2 by using the PivotGridV2 TagHelper.

        <kendo-pivotconfiguratorv2 name="configurator" datasource-id="pivotSource"></kendo-pivotconfiguratorv2>
        <kendo-pivotgridv2 name="pivotgridv2" datasource-id="pivotSource"></kendo-pivotgridv2>

## Basic Configuration

The PivotGrid TagHelper configuration options are passed as attributes of the tag.

```tagHelper
    <kendo-pivotdatasourcev2 type=@(PivotDataSourceType.Xmla) name="pivotSource">
        <columns>
            <pivot-datasourcev2-column name="[Date].[Calendar]" expand="true"></pivot-datasourcev2-column>
            <pivot-datasourcev2-column name="[Product].[Category]"></pivot-datasourcev2-column>
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
    </kendo-pivotdatasourcev2>
    <kendo-pivotconfiguratorv2 name="configurator" datasource-id="pivotSource">
    </kendo-pivotconfiguratorv2>
    <kendo-pivotgridv2 name="pivotgridv2" datasource-id="pivotSource">
    </kendo-pivotgridv2>
```
```cshtml
    @(Html.Kendo().PivotConfiguratorV2()
        .Name("configurator")
        .Filterable(true)
        .Sortable()
        .Height(570)
    )

    @(Html.Kendo().PivotGridV2()
        .Name("pivotgridv2")
        .ColumnWidth(200)
        .Height(570)
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
        )
    )
```

## See Also

* [Basic Usage of the PivotGridV2 TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/pivotgridv2/tag-helper)
* [Server-Side API](/api/pivotgridv2)
