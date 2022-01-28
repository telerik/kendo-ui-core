---
title: Data Series
page_title: Data Series
description: "Learn how to plot one or more specified data series in the Telerik UI Chart HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_charts_dataseries_aspnetcore
---

# Data Series

You can plot one or more data series of a specified type in the Telerik UI Chart for {{ site.framework }}.

## Getting Started

To define the data series, add them to the `series` array.

The following example demonstrates how to define two Bar series that are bound to inline data.

```
    @(Html.Kendo().Chart()
        .Name("chart")
        .Series(series =>
        {
            series.Bar(new double[] { 56000, 63000, 74000, 91000, 117000, 138000 }).Name("Total Visits");
            series.Bar(new double[] { 52000, 34000, 23000, 48000, 67000, 83000 }).Name("Unique visitors");
        })
    )
```

## Applying Default Options

To specify the options that will be applied to all series, use `seriesDefaults`. You can define default options for all series of a specified type.

> Options for individual series take precedence over the options that are specified in `seriesDefaults`.

```
    @(Html.Kendo().Chart()
        .Name("chart")
        .SeriesDefaults(seriesDefaults => seriesDefaults.Bar().Border(b=>b.Color("purple")))
        .Series(series =>
        {
            series.Bar(new double[] { 56000, 63000, 74000, 91000, 117000, 138000 }).Name("Total Visits");
            series.Bar(new double[] { 52000, 34000, 23000, 48000, 67000, 83000 }).Name("Unique visitors");
        })
    )
```

## Combining Data Series

You can display series of different types in a single chart.

```
    @(Html.Kendo().Chart()
        .Name("chart")
        .Series(series =>
        {
            series.Column(new int[] { 20, 40, 45, 30, 50 });
            series.Line(new double[] { 30, 38, 40, 32, 42 });
        })
    )
```

## Known Limitations

* The Telerik UI Chart for {{ site.framework }} can contain either Bar or Column series but not both of them.
* A Pie series cannot be used with other series including other Pie series.
* Scatter and Scatter Line series cannot be used together with other series.

## See Also

* [Using the API of the Chart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chart-api/index)
* [Server-Side API](/api/chart)
