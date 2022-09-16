---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI PivotGridV2 HtmlHelper for {{ site.framework }}."
slug: overview_pivotgridhelperv2_aspnetcore
position: 1
---
{% if site.core %}
    {% assign VSExt = "overview_visualstudio_aspnetcore" %}
    {% assign GettingStarted = "gettingstarted_aspnetmvc6_aspnetmvc" %}
{% else %}
    {% assign VSExt = "overview_visualstudio_aspnetcore" %}
    {% assign GettingStarted = "gettingstarted_aspnetmvc" %}
{% endif %}

# PivotGridV2 HtmlHelper Overview

The Telerik UI PivotGridV2 HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI PivotGridV2 widget.

The PivotGridV2 represents multidimensional data in a cross-tabular format.

* [Demo page for the PivotGridV2](https://demos.telerik.com/{{ site.platform }}/pivotgridv2/index)

Compared to the legacy PivotGrid, the new PivotGridV2 offers a brand new design, and its future-proof architecture allows the implementation of many upcoming features. We recommended using the PivotGridV2 in your new projects, because, at some point in the future, the PivotGridV2 will replace the legacy PivotGrid. For more details about the differences between the PivotGrid and PivotGridV2, refer to the [Comparison]({% slug htmlhelpers_pivotgridv2_aspnetcore_comparison %}) article.

## Basic Configuration

To configure the PivotGridV2 for Ajax binding to an **Adventure Works** cube that is hosted on `https://demos.telerik.com/olap/msmdpump.dll`:

1. Create a new {{ site.framework }} application. If you have the [{{ site.product }} Visual Studio Extensions]({% slug {{ VSExt }} %}) installed, create a {{ site.product }} application. Name the application `KendoPivotGridV2`. If you decide not to use the {{ site.product }} Visual Studio Extensions, follow the steps from the [getting started article]({% slug {{ GettingStarted }} %}) to add {{ site.product }} to the application.
1. Add a PivotGridV2 to the `Index` view.

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

The following image demonstrates the output from the previous example.

![PivotGridV2](images/pivotgridv2.png)

## Functionality and Features

* [Comparison with the PivotGrid]({% slug htmlhelpers_pivotgridv2_aspnetcore_comparison %})
* [Data binding]({% slug databinding_pivotgridv2helper_aspnetcore %})
* [Templates]({% slug htmlhelpers_pivotgridv2_aspnetcore_templates %})
* [PDF export]({% slug htmlhelpers_pivotgridv2_aspnetcore_pdfexport %})

## Referencing Existing Instances

To reference an existing PivotGrid instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [PivotGridV2 client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/pivotgridv2#methods) to control its behavior.

    var pivotgridv2 = $("#pivotgridv2").data("kendoPivotGridV2");

## See Also

* [Basic Usage of the PivotGridV2 HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pivotgridv2/index)
* [Server-Side API](/api/pivotgridv2)
* [PivotGridV2 JavaScript API Reference](/api/javascript/ui/pivotgridv2)
