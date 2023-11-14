---
title: Trendlines
page_title: Trendlines
description: "Learn how to configure a trendline in Telerik UI Charts."
slug: htmlhelpers_charts_trendlines
---

# Trendlines

Trendlines (or trend lines) are automatically generated indicators that show the overall trends in the series data. They are defined as a special type of series that are linked to the main series by name.

## Trendline Types

The Chart supports the following types of trendlines - Linear Trendline and Moving Average Trendline.

### Linear Trendline

A linear trendline is usually used to show if a particular quantity is increasing or decreasing in time. To add a linear trendline use the `LinearTrendline()` fluent method.

The following example demonstrates how to create a linear trendline for Categorical series.

```
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
            series.Bar(new double[] { 56000 63000, 74000, 91000, 117000, 138000 }).Name("Total Visits");
            series.LinearTrendline().For("Total Visitors).Name("Visotors Trend (LINEAR)");
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
            .Shared(true))
        )
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    @{
        var categories = new string[] { "Jan", "Feb", "Mar", "Apr", "May", "Jun" };
    }
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
            <series-item type="ChartSeriesType.LinearTrendline"
                        for="Total Visitors"
                        name="Visotors Trend (LINEAR)">
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
        <chart-title text="Site Visitors Stats /thousands/">
        </chart-title>
        <tooltip shared="true" visible="true">
        </tooltip>
    </kendo-chart>
```
{% endif %}

### Moving Average Trendline

The moving average trendline is used to smooth out the variations in the data by averaging all points in a period. By default, the period is set to `2` chart intervals. To add a moving average trendline use the `MovingAverageTrendline()` fluent method.

The following example demonstrates how to create a moving average trendline for Categorical series.

```
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
            series.MovingAverageTrendline().For("Total Visitors).Name("Visotors Trend (LINEAR)")
                .Trendline(trendline=>trendline.Period(4));
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
            .Shared(true))
        )
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    @{
        var categories = new string[] { "Jan", "Feb", "Mar", "Apr", "May", "Jun" };
    }
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
            <series-item type="ChartSeriesType.MovingAverageTrendline"
                        for="Total Visitors"
                        name="Visotors Trend (M.AVG)">
                <trendline period="4"></trendline>
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
        <chart-title text="Site Visitors Stats /thousands/">
        </chart-title>
        <tooltip shared="true" visible="true">
        </tooltip>
    </kendo-chart>
```
{% endif %}

## Data Binding

Trendline series use the data from the main series and do not support binding to a different data set.

### Date Series and Aggregates

If the main series is using `aggregates`, as is most common for [Date Series]({% slug htmlhelpers_charts_dateseries_aspnetcore %}), the trendlines will bind to the aggregated data. For example, if you're using a `"sum"` aggregate, the trendline will plot the trend for the sums in each category.

## Supported Series Types

Trendlines are supported for the following [chart types]({% slug overview_charttypes_charts %}):

* `Area`
* `Bar`
* `BoxPlot`
* `Bubble`
* `Bullet`
* `Candlestick`
* `Column`
* `HorizontalWaterfall`
* `Line`
* `OHLC`
* `PolarArea`
* `PolarLine`
* `PolarScatter`
* `RadarArea`
* `RadarColumn`
* `RadarLine`
* `RangeArea`
* `RangeBar`
* `RangeColumn`
* `Scatter`
* `ScatterLine`
* `VerticalArea`
* `VerticalBoxPlot`
* `VerticalBullet`
* `VerticalLine`
* `VerticalRangeArea`
* `Waterfall`

## See Also

* [Getting Started with the {{ site.platform }} Chart]({% slug htmlhelpers_charts_aspnetcore %})
* [Server-side API Reference of the Chart](/api/chart)
* [Client-side API Reference of the Chart](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart)
