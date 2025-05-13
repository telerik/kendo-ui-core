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

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Title("Site Visitors Stats")
        .Subtitle("/thousands/")
        .Legend(legend => legend
            .Visible(false)
        )
        .Series(series =>
        {
            series.Bar(new double[] { 56000 63000, 74000, 91000, 117000, 138000 }).Name("Total Visits");
            series.LinearTrendline().For("Total Visitors").Name("Visitors Trend (LINEAR)");
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
                        name="Visitors Trend (LINEAR)">
                        </series-item>
        </series>
        <value-axis>
            <value-axis-item max="140000" name="" type="numeric">
                <line visible="false" />
                <major-grid-lines visible="true" />
            </value-axis-item>
        </value-axis>
        <chart-legend visible="false">
        </chart-legend>
        <chart-title text="Site Visitors Stats /thousands/">
        </chart-title>
        <tooltip shared="true" visible="true">
        </tooltip>
    </kendo-chart>
```
{% endif %}

### Exponential Trendline

Exponential trendlines are most suitable for data sets with accelerating rate of growth or decline. They can be used only for positive values.

The following example demonstrates how to create a exponential trendline for Categorical series.

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Series(series =>
        {
            series.Bar(new double[] { 15.7, 16.7, 20, 23.5, 26.6 }).Name("World");
            series.ExponentialTrendline().For("World").Name("Trend (EXP)");
        })
        .CategoryAxis(axis => axis
            .Categories(2005, 2006, 2007, 2008, 2009)
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
        var categories = new string[] { 2005, 2006, 2007, 2008, 2009 };
    }
    <kendo-chart name="chart">
        <category-axis>
            <category-axis-item categories="categories">
            </category-axis-item>
        </category-axis>
        <series>
            <series-item type="ChartSeriesType.Bar"
                        name="World"
                        data="new double[] { 15.7, 16.7, 20, 23.5, 26.6 }">
            </series-item>
            <series-item type="ChartSeriesType.ExponentialTrendline"
                        for="World"
                        name="Trend (EXP)">
            </series-item>
        </series>
        <tooltip shared="true" visible="true">
        </tooltip>
    </kendo-chart>
```
{% endif %}

### Logarithmic Trendline

Logarithmic trendlines are best suited for data sets that grow quickly at the beginning and then taper off. They can only be use with both positive and negative values.

The following example demonstrates how to create a logarithmic trendline for Categorical series.

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Series(series =>
        {
            series.Bar(new double[] { 15.7, 16.7, 20, 23.5, 26.6 }).Name("World");
            series.LogarithmicTrendline().For("World").Name("Trend (LOG)");
        })
        .CategoryAxis(axis => axis
            .Categories(2005, 2006, 2007, 2008, 2009)
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
        var categories = new string[] { 2005, 2006, 2007, 2008, 2009 };
    }
    <kendo-chart name="chart">
        <category-axis>
            <category-axis-item categories="categories">
            </category-axis-item>
        </category-axis>
        <series>
            <series-item type="ChartSeriesType.Bar"
                        name="World"
                        data="new double[] { 15.7, 16.7, 20, 23.5, 26.6 }">
            </series-item>
            <series-item type="ChartSeriesType.LogarithmicTrendline"
                        for="World"
                        name="Trend (LOG)">
            </series-item>
        </series>
        <tooltip shared="true" visible="true">
        </tooltip>
    </kendo-chart>
```
{% endif %}

### Power Trendline

Power trendlines are suitable for data that has a steady increase or decrease in the rate of growth or decline. They can be used only with positive values.

The following example demonstrates how to create a power trendline for Categorical series.

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Series(series =>
        {
            series.Bar(new double[] { 15.7, 16.7, 20, 23.5, 26.6 }).Name("World");
            series.PowerTrendline().For("World").Name("Trend (POWER)");
        })
        .CategoryAxis(axis => axis
            .Categories(2005, 2006, 2007, 2008, 2009)
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
        var categories = new string[] { 2005, 2006, 2007, 2008, 2009 };
    }
    <kendo-chart name="chart">
        <category-axis>
            <category-axis-item categories="categories">
            </category-axis-item>
        </category-axis>
        <series>
            <series-item type="ChartSeriesType.Bar"
                        name="World"
                        data="new double[] { 15.7, 16.7, 20, 23.5, 26.6 }">
            </series-item>
            <series-item type="ChartSeriesType.PowerTrendline"
                        for="World"
                        name="Trend (POWER)">
                        </series-item>
        </series>
        <tooltip shared="true" visible="true">
        </tooltip>
    </kendo-chart>
```
{% endif %}


### Polynomial Trendline

Polynomial trendlines are best suited for data series that alternates between growth and decline.

This type of trendlines accepts a [`series.trendline.order`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.trendline.order) parameter that specifies the degree of the polynomial.
The default order is 2. Accepted values are from 2 to 6:
* 2: a Quadratic polynomial with a single extreme point (minimum or maximum) point.
* 3: a Cubic polynomial with up to 2 extreme points.
* 4: a polynomial of 4th degree with up to 3 extreme points.
* 5: a polynomial of 5th degree with up to 4 extreme points.
* 6: a polynomial of 6th degree with up to 5 extreme points.

The following example demonstrates how to create a polynomial trendline for Categorical series.

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Series(series =>
        {
            series.Bar(new double[] { 15.7, 16.7, 20, 23.5, 26.6 }).Name("World");
            series.PolynomialTrendline().For("World").Name("Trend (POLY)")
                .Trendline(trendline => trendline.Order(3));
        })
        .CategoryAxis(axis => axis
            .Categories(2005, 2006, 2007, 2008, 2009)
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
        var categories = new string[] { 2005, 2006, 2007, 2008, 2009 };
    }
    <kendo-chart name="chart">
        <category-axis>
            <category-axis-item categories="categories">
            </category-axis-item>
        </category-axis>
        <series>
            <series-item type="ChartSeriesType.Bar"
                        name="World"
                        data="new double[] { 15.7, 16.7, 20, 23.5, 26.6 }">
            </series-item>
            <series-item type="ChartSeriesType.PolynomialTrendline"
                        for="World"
                        name="Trend (POLY)">
                <trendline order="3"></trendline>
            </series-item>
        </series>
        <tooltip shared="true" visible="true">
        </tooltip>
    </kendo-chart>
```
{% endif %}

### Moving Average Trendline

The moving average trendline is used to smooth out the variations in the data by averaging all points in a period. By default, the period is set to `2` chart intervals. To add a moving average trendline use the `MovingAverageTrendline()` fluent method.

The following example demonstrates how to create a moving average trendline for Categorical series.

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
            series.MovingAverageTrendline().For("Total Visitors").Name("Moving Average")
                .Trendline(trendline => trendline.Period(4));
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
                        name="Moving Average">
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

## Forecasts

To create a forecast, extend the trendline by specifying the number of intervals using the [`series.trendline.after`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.trendline.forecast.after) setting. It's also possible to extend the forecast in reverse direction using the [`series.trendline.before`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.trendline.forecast.before) setting. By default, the trendline does not display a forecast.

> The `forecast` option is supported for **linear**, **exponential**, **logarithmic** and **power** trendlines. The parent series must be either a [Date Series]({% slug htmlhelpers_charts_dateseries_aspnetcore %}), "scatter" or "scatterLine".

The following example demonstrates how to create a forecast.

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Title("Site Visitors Stats")
        .Subtitle("/thousands/")
        .Legend(legend => legend
            .Visible(false)
        )
        .Series(series =>
        {
            series.Bar(new double[] { 56000 63000, 74000, 91000, 117000, 138000 }).Name("Total Visits");
            series.LinearTrendline().For("Total Visitors").Name("Visitors Trend (LINEAR)")
                .Trendline(trendline => trendline.Forecast(forecast => forecast.Before(3).After(5)));
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
                        name="Visitors Trend (LINEAR)">
                <trendline>
                    <forecast before="3" after="5" />
                </trendline>
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
