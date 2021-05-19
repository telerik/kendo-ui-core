---
title: Data Binding
page_title: Data Binding
description: "Learn how to bind the Telerik UI Sparkline HtmlHelper for {{ site.framework }} to data."
slug: overview_sparklinesdatabinding_aspnetcore
position: 2
---

# Data Binding

The Sparkline charts can visualize series that are bound to both local and remote data.

## Binding to Local Data

Binding to local data can be done by using either of the following approaches:

* Setting the root-level `Data` field to an array with values, or
* Configuring a series and passing the data as an array.

```
    @(Html.Kendo().Sparkline()
            .Name("temp-log")
            .Type(SparklineType.Column)
            .Series(d=>d.Column(new int[] { 10 ,15, 8 ,2,30}))
    )
```

```
    @(Html.Kendo().Sparkline()
            .Name("temp-log")
            .Type(SparklineType.Column)
            .Data(ViewBag.TemperatureData)
    )
```

## Binding to Remote Data

The following example demonstrates how to bind the Sparkline Chart to remote data. For more information, refer to the article on [binding Telerik UI Charts to a data source]({% slug htmlhelpers_charts_databinding_aspnetcore %}).

```
@(Html.Kendo().Sparkline()
    .Name("sparkline-tmax")
    .DataSource(ds => ds.Read(read => read.Url(Url.Action("_Weather", "Sparklines"))))
    .Series(series => series
        .Column("TMax").Color("#ff0000").NegativeColor("#0099ff")
)
```

## See Also

* [Local Data Binding by the Sparkline HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/sparklines/local-data-binding)
* [Remote Data Binding by the Sparkline HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/sparklines/remote-data-binding)
* [Server-Side API](/api/sparkline)
