---
title: Overview
page_title: Bar Chart Overview
description: "Discover the Telerik UI Bar Chart component for {{ site.framework }}, and learn about its features like"
components: ["chart"]
slug: overview_barcharthelper_aspnetcore
position: 0
---

# {{ site.framework }} Bar Chart Overview

{% if site.core %}
The Telerik UI Bar Chart TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Bar Chart widget.
{% else %}
The Telerik UI Bar Chart HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Bar Chart widget.
{% endif %}

Bar Charts display data by using horizontal or vertical bars whose length varies according to their values. Bar Charts are suitable for displaying a comparison between several sets of data, for example, for showing a summary of unique and total site visitors over a period of time. The series are placed next to each other with predefined spacing between them.

{% if site.has_cta_panels == true %}
{% include cta-panel-introduction.html %}
{% endif %}

* [Demo page for the Bar Chart](https://demos.telerik.com/aspnet-mvc/bar-charts)

## Basic Configuration

To create the Bar Chart, provide it with a `Name`. Optionally, set the width and height of the desired chart by using CSS.

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Title("Site Visitors Stats")
        .Subtitle("/thousands/")
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
```
{% if site.core %}
```TagHelper
    <kendo-chart name="chart">
        <category-axis>
            <category-axis-item categories="categories">
                <major-grid-lines visible="false" />
            </category-axis-item>
        </category-axis>
        <series>
            <series-item type="ChartSeriesType.Bar"
                         name="Total Visits"
                         data="new double[] { 56000, 63000, 74000, 91000, 117000, 138000 }">
            </series-item>
            <series-item type="ChartSeriesType.Bar"
                         name="Unique visitors"
                         data="new double[] { 52000, 34000, 23000, 48000, 67000, 83000 }">
            </series-item>
        </series>
        <value-axis>
            <value-axis-item max="140000" name="" type="numeric">
                <line visible="false" />
                <major-grid-lines visible="true" />
            </value-axis-item>
        </value-axis>
        <chart-area background="transparent">
        </chart-area>
        <chart-legend visible="false">
        </chart-legend>
        <chart-title text="Site Visitors Stats
 /thousands/">
        </chart-title>
        <tooltip template="#= series.name #: #= value #" visible="true">
        </tooltip>
    </kendo-chart>
```
{% endif %}

## Functionality and Features

| Features | Description |
|---------|-------------|
| [Date axis]({% slug barcharts_date_axis %}) | Scale the date axis of your Bar Chart to get a better visualization of the seasonal data in your app. |
| [Gap and spacing]({% slug barcharts_gap_and_spacing %}) | The Bar Chart component allows you to control the distance between its categories as well as between series points within a category. This can be done through the `series.gap` and `series.spacing` client-side settings of the Chart.|
| [Logarithmic axis]({% slug barcharts_logarithmic_axis%}) | A logarithmic axis is a special numeric axis that transforms the actual values by using a logarithmic function with a particular base.|
| [Multiple axes]({% slug barcharts_multi_axis %})| The Bar chart supports multiple axes. This helps you leverage the best charting performance and visualize data on any number axes to provide solid business reports for your users.|
| [Plotbands]({% slug barcharts_plotbands%}) | Plot Bands are colored ranges, which are used to highlight certain areas in the Chart.|
|[100% Stacked and Grouped Bars]({% slug barcharts_aspnetcore_htmlhelper_stacked100_and_grouped_bars%})| The Bar Chart supports 100% stacking that could be grouped in the same time.|

## Next Steps

* [Getting Started with the Bar Chart]({% slug datasource_aspnetcore_get_started %})
* [Basic Usage of the Bar Chart for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/bar-charts)

## See Also

* [Binding the Bar Chart to Remote Data (Demo)](https://demos.telerik.com/aspnet-core/bar-charts/remote-data-binding)
* [Bar Chart Types (Demo)](https://demos.telerik.com/aspnet-core/bar-charts/column)
* [Knowledge Base Section](/knowledge-base)
