---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI PivotGrid component for {{ site.framework }}."
previous_url: /helpers/data-management/pivotgrid/overview
slug: overview_pivotgridhelper_aspnetcore
position: 0
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
The Telerik UI PivotGrid TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI PivotGrid widget. To add the component to your ASP.NET Core application, you can use either.
{% else %}
The Telerik UI PivotGrid HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI PivotGrid widget.
{% endif %}

The PivotGrid represents multidimensional data in a cross-tabular format.

* [Demo page for the PivotGrid HtmlHelper](https://demos.telerik.com/{{ site.platform }}/pivotgrid)
{% if site.core %}
* [Demo page for the PivotGrid TagHelper](https://demos.telerik.com/aspnet-core/pivotgrid/tag-helper)
{% endif %}

## Basic Configuration

To configure the PivotGrid for Ajax binding to an [Adventure Works](https://learn.microsoft.com/en-us/analysis-services/multidimensional-tutorial/multidimensional-modeling-adventure-works-tutorial?view=asallproducts-allversions) cube that is hosted on `https://demos.telerik.com/olap/msmdpump.dll`, follow the next steps:

1. Create a new {{ site.framework }} application. If you have the [{{ site.product }} Visual Studio Extensions]({% slug {{ VSExt }} %}) installed, create a {{ site.product }} application. Name the application `KendoPivotGrid`. If you decide not to use the {{ site.product }} Visual Studio Extensions, follow the steps from the [introductory article]({% slug {{ GettingStarted }} %}) to add {{ site.product }} to the application.

1. Add a PivotGrid to the `Index` View.

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
            )
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

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
    {% endif %}

1. Build and run the application.

## Functionality and Features

* [Data binding]({% slug databinding_pivotgridhelper_aspnetcore %})&mdash;You can bind the PivotGrid to [Online Analytical Processing (OLAP)](https://learn.microsoft.com/en-us/previous-versions/sql/sql-server-2005/ms175367(v=sql.90)) cube and or flat data.
* [Filtering]({% slug htmlhelpers_pivotgrid_aspnetcore_filtering %})&mdash;Enable the filtering of the PivotGrid rows and columns.
* [Sorting]({% slug htmlhelpers_pivotgrid_aspnetcore_sorting %})&mdash;The component supports sorting by the caption name of the members. 
* [Templates]({% slug htmlhelpers_pivotgrid_aspnetcore_templates %})&mdash;The available templates allow you to control the rendering of the data cells and headers.
* [Excel export]({% slug htmlhelpers_pivotgrid_aspnetcore_excelexport %})&mdash;The PivotGrid provides an export to Excel feature.
* [PDF export]({% slug htmlhelpers_pivotgrid_aspnetcore_pdfexport %})&mdash;You can export the PivotGrid content to PDF through a single click.

## Next Steps

* [Getting Started with the PivotGrid]({% slug pivotgrid_getting_started %})
* [Basic Usage of the PivotGrid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pivotgrid)
{% if site.core %}
* [Basic Usage of the PivotGrid TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/pivotgrid/tag-helper)
{% endif %}

## See Also

* [Server-Side API of the PivotGrid HtmlHelper](/api/pivotgrid)
{% if site.core %}
* [Server-Side API of the PivotGrid TagHelper](/api/taghelpers/pivotgrid)
{% endif %}
* [Client-Side API of the PivotGrid](https://docs.telerik.com/kendo-ui/api/javascript/ui/pivotgrid)

