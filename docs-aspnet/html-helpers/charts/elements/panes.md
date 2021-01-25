---
title: Panes
page_title: Panes
description: "Learn how to configure the panes of a Telerik UI Chart HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_charts_panes_aspnetcore
---

# Panes

The Chart panes enable you to create vertical sub-divisions in a single categorical Chart.

You have to set an individual value axis to each pane. Multiple panes can share a category axis.

> Only the Categorical Chart series - Area, Bar, Box Plot, Bullet, Line, Radar, Range Area, Range Bar and Waterfall support the configuration of panes.

Panes are declared through the `Panes` configuration. To control the series placement, plot the series on a value axis, which is placed in the desired pane.

## Default Settings

Settings that apply to all panes can be declared through the `PaneDefaults` configuration.

The following example sets the default background color for the panes:

    @(Html.Kendo().Chart()
        .Name("chart")
        .PaneDefaults(p=> p.Background("#00ff00"))
        .Title("Site Visitors Stats \n /thousands/")
        .Legend(legend => legend
            .Visible(false)
        )
        .ChartArea(chartArea => chartArea
            .Background("transparent")
        )
        .Series(series =>
        {
            series.Bar(new double[] { 56000, 63000, 74000, 91000, 117000, 138000 }).Name("Total Visits");
            series.Bar(new double[] { 52000, 34000, 23000, 48000, 67000, 83000 }).Name("Unique visitors");
        })
        .CategoryAxis(axis => axis
            .Categories("Jan", "Feb", "Mar", "Apr", "May", "Jun")
            .MajorGridLines(lines => lines.Visible(false))
        )
        .ValueAxis(axis => axis
            .Numeric()
            .Max(140000)
            .Line(line => line.Visible(false))
            .MajorGridLines(lines => lines.Visible(true))
        )
        .Tooltip(tooltip => tooltip
            .Visible(true)
            .Template("#= series.name #: #= value #")
        )
    )

## Disable Clipping

By default, the pane content cannot extend beyond its border. This prevents charts from overlapping other elements like the legend or title.

Pane clipping may be undesired, for example when plotting series markers at the edge of the pane.
To disable clipping, set the `Panes.Clip` setting to `false`:

    @(Html.Kendo().Chart()
        .Name("chart")
        .Panes(p => p.Add().Clip(false))
        .Title("Site Visitors Stats \n /thousands/")
        .Legend(legend => legend
            .Visible(false)
        )
        .ChartArea(chartArea => chartArea
            .Background("transparent")
        )
        .Series(series =>
        {
            series.Bar(new double[] { 56000, 63000, 74000, 91000, 117000, 138000 }).Name("Total Visits");
            series.Bar(new double[] { 52000, 34000, 23000, 48000, 67000, 83000 }).Name("Unique visitors");
        })
        .CategoryAxis(axis => axis
            .Categories("Jan", "Feb", "Mar", "Apr", "May", "Jun")
            .MajorGridLines(lines => lines.Visible(false))
        )
        .ValueAxis(axis => axis
            .Numeric()
            .Max(140000)
            .Line(line => line.Visible(false))
            .MajorGridLines(lines => lines.Visible(true))
        )
        .Tooltip(tooltip => tooltip
            .Visible(true)
            .Template("#= series.name #: #= value #")
        )
    )

## See Also

* [Using the API of the Chart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chart-api/index)
* [Basic Usage of the Area Chart HtmlHelper for {{ site.framework }} (Demos)](https://demos.telerik.com/{{ site.platform }}/area-charts/index)
* [Server-Side API](/api/chart)
