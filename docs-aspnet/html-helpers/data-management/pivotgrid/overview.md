---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI PivotGrid component for {{ site.framework }}."
previous_url: /helpers/data-management/pivotgrid/overview
slug: overview_pivotgridhelper_aspnetcore
position: 1
---
{% if site.core %}
    {% assign VSExt = "overview_visualstudio_aspnetcore" %}
    {% assign GettingStarted = "gettingstarted_aspnetmvc6_aspnetmvc" %}
{% else %}
    {% assign VSExt = "overview_visualstudio_aspnetcore" %}
    {% assign GettingStarted = "gettingstarted_aspnetmvc" %}
{% endif %}

# {{ site.framework }} PivotGrid Overview

{% if site.core %}
The Telerik UI PivotGrid TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI PivotGrid widget. To add the component to your ASP.NET Core app, you can use either.
{% else %}
The Telerik UI PivotGrid HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI PivotGrid widget.
{% endif %}

The PivotGrid represents multidimensional data in a cross-tabular format.

* [Demo page for the PivotGrid HtmlHelper](https://demos.telerik.com/{{ site.platform }}/pivotgrid/index)
{% if site.core %}
* [Demo page for the PivotGrid TagHelper](https://demos.telerik.com/aspnet-core/pivotgrid/tag-helper)
{% endif %}

## Basic Configuration

To configure the PivotGrid for Ajax binding to an **Adventure Works** cube that is hosted on `https://demos.telerik.com/olap/msmdpump.dll`:

1. Create a new {{ site.framework }} application. If you have the [{{ site.product }} Visual Studio Extensions]({% slug {{ VSExt }} %}) installed, create a {{ site.product }} application. Name the application `KendoPivotGrid`. If you decide not to use the {{ site.product }} Visual Studio Extensions, follow the steps from the [introductory article]({% slug {{ GettingStarted }} %}) to add {{ site.product }} to the application.
1. Add a PivotGrid to the `Index` view.

{% if site.core %}
```HtmlHelper
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
```TagHelper
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

    <kendo-pivotconfigurator name="configurator" 
                             filterable="true" 
                             height="570" 
                             datasource-id="pivotSource">
    </kendo-pivotconfigurator>

    <kendo-pivotgrid name="pivotgrid"
                     filterable="true" 
                     column-width="200" 
                     height="570"
                     datasource-id="pivotSource">
        <sortable enabled="true" />
    </kendo-pivotgrid>
```
{% else %}
```HtmlHelper
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
{% endif %}

1. Build and run the application.

## Functionality and Features

* [Data binding]({% slug databinding_pivotgridhelper_aspnetcore %})
* [Filtering]({% slug htmlhelpers_pivotgrid_aspnetcore_filtering %})
* [Sorting]({% slug htmlhelpers_pivotgrid_aspnetcore_sorting %})
* [Templates]({% slug htmlhelpers_pivotgrid_aspnetcore_templates %})
* [Excel export]({% slug htmlhelpers_pivotgrid_aspnetcore_excelexport %})
* [PDF export]({% slug htmlhelpers_pivotgrid_aspnetcore_pdfexport %})

## Referencing Existing Instances

To reference an existing PivotGrid instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [PivotGrid client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/pivotconfigurator#methods) to control its behavior.

    var pivotgrid = $("#pivotgrid").data("kendoPivotGrid");

## See Also

* [Basic Usage of the PivotGrid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pivotgrid/index)
{% if site.core %}
* [Basic Usage of the PivotGrid TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/pivotgrid/tag-helper)
{% endif %}
* [Server-Side API](/api/pivotgrid)
