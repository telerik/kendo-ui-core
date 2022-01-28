---
title: Axes Configuration
page_title: Axes Configuration
description: "Learn how to configure the axes in the Telerik UI Sparkline HtmlHelper for {{ site.framework }}."
slug: axesconfig_sparklines_aspnetcore
position: 3
---
{% if site.core %}
    {% assign BaseUnit = "/api/Kendo.Mvc.UI.Fluent/ChartCategoryAxisBuilder#baseunitkendomvcuichartaxisbaseunit" %}
    {% assign ValueAxis = "/api/Kendo.Mvc.UI.Fluent/SparklineBuilder#valueaxissystemactionkendomvcuifluentchartvalueaxisbuildert" %}
{% else %}
    {% assign BaseUnit = "/api/Kendo.Mvc.UI/ChartCategoryAxis#baseunit" %}
    {% assign ValueAxis = "/api/Kendo.Mvc.UI.Fluent/SparklineBuilder#valueaxissystemactionkendomvcuifluentchartvalueaxisfactoryt" %}
{% endif %}

# Axes Configuration

The Sparkline HtmlHelper is a categorical (discrete) chart and has an implicit category and a value axis.

The axis orientation (horizontal or vertical) is inferred from the series type.

## Setting the Category Axis

While category names are not visible by default, they are displayed in tooltips.

The following example demonstrates how to use the `CategoryAxis` object to set the category names.

```
    @(Html.Kendo().Sparkline()
        .Name("World")
        .Data(new double[] { 15.7, 16.7, 20, 23.5, 26.6 })
        .CategoryAxis(c => c
            .Categories(new string[] { "2005", "2006", "2007", "2008", "2009" })
        )
    )
```

You can also bind the category name to a field of the data item.

```
    @(Html.Kendo().Sparkline()
        .Name("Sparkline")
        .Series(s => s.Bar(new object[] { new {
                country =  "United States",
                year = "2005",
                value = 67.96
            }, new {
                country = "United States",
                year = "2006",
                value = 68.93
            }
        }).Field("value"))
        .CategoryAxis(c => c.Field("year"))
    )
```

### Displaying Dates

The category axis provides built-in support for displaying dates. This includes:

* Automatic selection of granularity/base unit (minutes, hours, days, and so on)
* Label formatting matched to the granularity
* Grouping of categories into base units and series aggregates

Specifying categories of type `Date` switches the axis to a date mode. The automatic mode selection can be overridden by specifying `.Type(ChartCategoryAxisType.Date)`.

### Setting Base Units

To set the base units in the Sparkline chart, use any of the following approaches:

* [Default configuration](#default-configuration)
* [Manual configuration](#manual-configuration)
* [Series aggregates](#series-aggregates)

#### Default Configuration

To determine a default base, use the smallest duration between categories.

```
    .CategoryAxis(c => c
        .Categories(new DateTime[] { new DateTime(2005, 1, 1), new DateTime(2006, 1, 1) })
        // baseUnit is set to "years".
    )

    .CategoryAxis(c => c
        .Categories(new DateTime[] { new DateTime(2005, 1, 1), new DateTime(2005, 1, 2) })
        // baseUnit is set to "days".
    )
```

#### Manual Configuration

You can also manually specify the [`BaseUnit`]({{ BaseUnit }}).

The following options are valid:

* Seconds
* Minutes
* Hours
* Days
* Weeks
* Months
* Years
* Fit

#### Series Aggregates

If two or more categories fall within a base unit, its values are aggregated to display a single point.

```
    @(Html.Kendo().Sparkline()
            .Name("Sparkline")
            .Series(s => s.Column(new int[] { 20, 40, 45, 30, 50 }))
            .CategoryAxis(c => c
                .Categories(new DateTime[] {
                    new DateTime(2011,12,30),
                    new DateTime(2011,12,31),
                    new DateTime(2012,01,01),
                    new DateTime(2012,01,02),
                    new DateTime(2012,01,03)
                })
            )
    )
```

The code from the previous example results in the following Sparkline chart. Note that values are displayed as are.

![Sparkline with a date category axis](images/sparkline-category-date-axis.png)

The following example demonstrates the Sparkline with its base unit changed to `"years"`.

```
    .CategoryAxis(c => c
        .BaseUnit(ChartAxisBaseUnit.Years)
        .Categories(new DateTime[] {
            new DateTime(2011,12,30),
            new DateTime(2011,12,31),
            new DateTime(2012,01,01),
            new DateTime(2012,01,02),
            new DateTime(2012,01,03)
        })
    )
```

The following example demonstrates a Sparkline with a grouped date category axis. Note the way the Sparkline displays the maximum value for each year.

![Sparkline with a grouped date category axis](images/sparkline-category-date-axis-grouped.png)

You can also change the aggregate function for each series.

```
    .Series(s => s
        .Column(new int[] { 20, 40, 45, 30, 50 })
        .Aggregate(ChartSeriesAggregate.Avg))
```

The available options are:

* `Min`
* `Max`
* `Count`
* `Sum`
* `Avg`
* `First`
* `SumOrNull`

## Setting the Value Axis

Currently, the Sparkline supports only numeric value axes.

### Getting Started

To access the configuration options, use [`ValueAxis`]({{ ValueAxis }}). The following example configures a numeric axis with a minimum value of `0` and a maximum value of `100`.

```
    @(Html.Kendo().Sparkline()
            .Name("Sparkline")
            .Series(s => s
                .Column(new double[] { 15.7, 16.7, 20, 23.5, 26.6 }))
            .ValueAxis(axis => axis.Numeric().Min(0).Max(100))
            .CategoryAxis(c => c
                .Categories(new string[] { "2005", "2006", "2007", "2008", "2009" })
            )
    )
```

### Setting the Plot Bands

You can configure each axis to display bands with different colors for predefined value ranges. The category index (zero based) is used as a value for the category axis.

```
    @(Html.Kendo().Sparkline()
        .Name("temp-range")
        .Type(SparklineType.Bullet)
        .ValueAxis(axis => axis
            .Numeric()
            .Min(0)
            .Max(30)
            .PlotBands(bands =>
            {
                bands.Add().From(0).To(15).Color("#787878").Opacity(0.15);
                bands.Add().From(15).To(22).Color("#787878").Opacity(0.3);
                bands.Add().From(22).To(30).Color("#787878").Opacity(0.15);
            })
        )
        .Data(ViewBag.TemperatureRange)
    )
```

## See Also

* [Basic Usage of the Sparklines HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/sparklines/index)
* [Server-Side API](/api/sparkline)
