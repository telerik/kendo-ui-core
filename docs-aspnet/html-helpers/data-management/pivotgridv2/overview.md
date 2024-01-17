---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI PivotGridV2 HtmlHelper for {{ site.framework }}."
slug: overview_pivotgridhelperv2_aspnetcore
position: 0
---
{% if site.core %}
    {% assign VSExt = "overview_visualstudio_aspnetcore" %}
    {% assign GettingStarted = "gettingstarted_aspnetmvc6_aspnetmvc" %}
{% else %}
    {% assign VSExt = "overview_visualstudio_aspnetcore" %}
    {% assign GettingStarted = "gettingstarted_aspnetmvc" %}
{% endif %}

# {{ site.framework }} PivotGridV2 Overview

{% if site.core %}
The Telerik UI PivotGridV2 HtmlHelper and TagHelper for {{ site.framework }} are server-side wrappers for the Kendo UI PivotGridV2 widget. To add the component to your ASP.NET Core application, you can use either.
{% else %}
The Telerik UI PivotGridV2 HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI PivotGridV2 widget.
{% endif %}

The PivotGridV2 represents multidimensional data in a cross-tabular format. Compared to the legacy [PivotGrid]({% slug overview_pivotgridhelper_aspnetcore %}), PivotGridV2 offers a brand new design, and its future-proof architecture allows the implementation of many upcoming features. We recommended using the PivotGridV2 in your new projects, because, at some point in the future, the PivotGridV2 will replace the legacy PivotGrid. For more details about the differences between the PivotGrid and PivotGridV2, refer to the [Comparison]({% slug htmlhelpers_pivotgridv2_aspnetcore_comparison %}) article.

* [Demo page for the PivotGridV2 HtmlHelper](https://demos.telerik.com/{{ site.platform }}/pivotgridv2)
{% if site.core %}
* [Demo page for the PivotGridV2 TagHelper](https://demos.telerik.com/aspnet-core/pivotgridv2/tag-helper)
{% endif %}

## Basic Configuration

To configure the PivotGridV2 for Ajax binding to an [Adventure Works](https://learn.microsoft.com/en-us/analysis-services/multidimensional-tutorial/multidimensional-modeling-adventure-works-tutorial?view=asallproducts-allversions) cube that is hosted on `https://demos.telerik.com/olap/msmdpump.dll`, follow the next steps:

1. Create a new {{ site.framework }} application. If you have the [{{ site.product }} Visual Studio Extensions]({% slug {{ VSExt }} %}) installed, create a {{ site.product }} application. Name the application `KendoPivotGridV2`. If you decide not to use the {{ site.product }} Visual Studio Extensions, follow the steps from the [getting started article]({% slug {{ GettingStarted }} %}) to add {{ site.product }} to the application.
1. Add a PivotGridV2 to the `Index` View.

    ```HtmlHelper
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
    {% if site.core %}
    ```TagHelper
        <kendo-pivotconfiguratorv2 name="configurator" sortable="true" filterable="true" height="570">
        </kendo-pivotconfiguratorv2>

        <kendo-pivotgridv2 name="pivotgrid" column-width="200" height="570" configurator="#configurator">
            <pivot-datasource type="PivotDataSourceType.Xmla">
                <columns>
                    <pivot-datasource-column name="[Date].[Calendar]" expand="true"></pivot-datasource-column>
                    <pivot-datasource-column name="[Product].[Category]"></pivot-datasource-column>
                </columns>
                <rows>
                    <row name="[Geography].[City]"></row>
                </rows>
                <measures values=@(new string[] {"[Measures].[Reseller Freight Cost]"} )></measures>
                <transport read-url="https://demos.telerik.com/olap/msmdpump.dll" datatype="text" content-type="text/xml" type="POST">
                    <connection catalog="Adventure Works DW 2008R2" cube="Adventure Works"></connection>
                </transport>
            </pivot-datasource>
        </kendo-pivotgridv2>
    ````
    {% endif %}

1. Build and run the application.

The following image demonstrates the output from the example.

![{{ site.product_short }} PivotGridV2 bound to data](images/pivotgridv2-data-bound.png)

## Functionality and Features

* [Comparison with the PivotGrid]({% slug htmlhelpers_pivotgridv2_aspnetcore_comparison %})&mdash;Learn more about the major differences between the PivotGrid and PivotGridV2 components.
* [Data binding]({% slug databinding_pivotgridv2helper_aspnetcore %})&mdash;You can bind the PivotGridV2 to [Online Analytical Processing (OLAP)](https://learn.microsoft.com/en-us/previous-versions/sql/sql-server-2005/ms175367(v=sql.90)) cube and or flat data.
* [Templates]({% slug htmlhelpers_pivotgridv2_aspnetcore_templates %})&mdash;The available templates allow you to control the rendering of the data cells and headers.
* [PDF export]({% slug htmlhelpers_pivotgridv2_aspnetcore_pdfexport %})&mdash;You can export the component data to PDF through a single click.
* [Accessibility]({% slug htmlhelpers_accessibility_actionsheet_aspnetcore %})&mdash;The PivotGridV2 is accessible for screen readers, supports WAI-ARIA, Section 508, WCAG 2.2, and delivers [keyboard shortcuts]({% slug keynav_aspnetcore_pivotgridv2 %}) for faster navigation.

## Next Steps

* [Getting Started with the PivotGridV2]({% slug pivotgridv2_getting_started %})
* [Basic Usage of the PivotGridV2 HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pivotgridv2)
{% if site.core %}
* [Basic Usage of the PivotGridV2 TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/pivotgridv2/tag-helper)
{% endif %}

## See Also

* [Server-Side API of the PivotGridV2 HtmlHelper](/api/pivotgridv2)
{% if site.core %}
* [Server-Side API of the PivotGridV2 TagHelper](/api/taghelpers/pivotgridv2)
{% endif %}
* [Client-Side API of the PivotGridV2](https://docs.telerik.com/kendo-ui/api/javascript/ui/pivotgridv2)
