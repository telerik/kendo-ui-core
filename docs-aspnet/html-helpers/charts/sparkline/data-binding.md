---
title: Data Binding
page_title: Data Binding
description: "Learn how to bind the Telerik UI Sparkline component for {{ site.framework }} to data."
slug: overview_sparklinesdatabinding_aspnetcore
position: 2
---

# Data Binding

The Sparkline charts can visualize series that are bound to both local and remote data.

## Binding to Local Data

Binding to local data can be done by using either of the following approaches:

* Setting the root-level `Data` field to an array with values, or
* Configuring a series and passing the data as an array.

```HtmlHelper
    @(Html.Kendo().Sparkline()
            .Name("temp-log")
            .Type(SparklineType.Column)
            .Series(d=>d.Column(new int[] { 10 ,15, 8 ,2,30}))
    )
```
{% if site.core %}
```TagHelper
    @{
        var series_data = new int[] { 10 ,15, 8 ,2,30};
    }
    <kendo-sparkline name="temp-log"
                     type="SparklineType.Column">
                    <series>
                        <series-item type="column"
                            data="@series_data">
                        </series-item>
                    </series>
    </kendo-sparkline>
```
{% endif %}

```HtmlHelper
    @(Html.Kendo().Sparkline()
            .Name("temp-log")
            .Type(SparklineType.Column)
            .Data(ViewBag.TemperatureData)
    )
```
{% if site.core %}
```TagHelper
    <kendo-sparkline name="temp-log"
                     data="@ViewBag.TemperatureData"
                     type="SparklineType.Column">
    </kendo-sparkline>
```
{% endif %}

## Binding to Remote Data

The following example demonstrates how to bind the Sparkline Chart to remote data. For more information, refer to the article on [binding Telerik UI Charts to a data source]({% slug htmlhelpers_charts_databinding_aspnetcore %}).

```HtmlHelper
    @(Html.Kendo().Sparkline()
        .Name("sparkline-tmax")
        .DataSource(ds => ds.Read(read => read.Url(Url.Action("_Weather", "Sparklines"))))
        .Series(series => series
            .Column("TMax").Color("#ff0000").NegativeColor("#0099ff")
    )
```
{% if site.core %}
```TagHelper
     <kendo-sparkline name="sparkline-tmax">
        <datasource type="DataSourceTagHelperType.Ajax">
            <transport>
                <read url="@Url.Action("_Weather", "Sparklines")"/>
            </transport>
        </datasource>
        <series>
            <series-item type="column"
                name="TMax" color="#ff0000"
                negative-color="#0099ff">
            </series-item>
        </series>
    </kendo-sparkline>
```
{% endif %}

## See Also

* [Local Data Binding by the Sparkline HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/sparklines/local-data-binding)
* [Remote Data Binding by the Sparkline HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/sparklines/remote-data-binding)
* [Server-Side API](/api/sparkline)
