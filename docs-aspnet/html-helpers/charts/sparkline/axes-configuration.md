---
title: Axes Configuration
page_title: Axes Configuration
description: "Learn how to configure the axes in the Telerik UI Sparkline component for {{ site.framework }}."
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

The Sparkline is a categorical (discrete) chart and has an implicit category and a value axis.

The axis orientation (horizontal or vertical) is inferred from the series type.

## Setting the Category Axis

While category names are not visible by default, they are displayed in tooltips.

The following example demonstrates how to use the `CategoryAxis` object to set the category names.

```HtmlHelper
    @(Html.Kendo().Sparkline()
        .Name("World")
        .Data(new double[] { 15.7, 16.7, 20, 23.5, 26.6 })
        .CategoryAxis(c => c
            .Categories(new string[] { "2005", "2006", "2007", "2008", "2009" })
        )
    )
```
{% if site.core %}
```TagHelper
    @{
        var data = new double[] { 15.7, 16.7, 20, 23.5, 26.6 };
        var categories = new string[] { "2005", "2006", "2007", "2008", "2009" };
    }
    <kendo-sparkline name="World"
                     data="@data">
                     <category-axis data="@categories">
                     </category-axis>
    </kendo-sparkline>
```
{% endif %}


You can also bind the category name to a field of the data item.

```HtmlHelper
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
{% if site.core %}
```TagHelper
    @{
        var series_data = new object[] { 
            new {
                country =  "United States",
                year = "2005",
                value = 67.96
            }, 
            new {
                country = "United States",
                year = "2006",
                value = 68.93
            }
        };
    }
    <kendo-sparkline name="Sparkline">
                     <series>
                         <series-item type="bar" 
                             data="@series_data"
                             field="value">
                         </series-item>
                     </series>
                     <category-axis>
                        <category-axis-item field="year">
                        </category-axis-item>
                     </category-axis>
    </kendo-sparkline>
```
{% endif %}

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

```HtmlHelper
    .CategoryAxis(c => c
        .Categories(new DateTime[] { new DateTime(2005, 1, 1), new DateTime(2006, 1, 1) })
        // baseUnit is set to "years".
    )

    .CategoryAxis(c => c
        .Categories(new DateTime[] { new DateTime(2005, 1, 1), new DateTime(2005, 1, 2) })
        // baseUnit is set to "days".
    )
```
{% if site.core %}
```TagHelper
    @{
        // baseUnit is set to "years"
        var data1 = new DateTime[] { new DateTime(2005, 1, 1), new DateTime(2006, 1, 1) };
        // baseUnit is set to "days"
        var data2 = new DateTime[] { new DateTime(2005, 1, 1), new DateTime(2005, 1, 2) };
    }

    <category-axis data="@data1">
    </category-axis>

    <category-axis data="@data2">
    </category-axis>

```
{% endif %}

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

```HtmlHelper
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
{% if site.core %}
```TagHelper
    @{
        var series_data = new int[] { 20, 40, 45, 30, 50 };
        var categories_data = new DateTime[] {
                    new DateTime(2011,12,30),
                    new DateTime(2011,12,31),
                    new DateTime(2012,01,01),
                    new DateTime(2012,01,02),
                    new DateTime(2012,01,03)
                };
    }
    <kendo-sparkline name="Sparkline">
                    <series>
                        <series-item data="@series_data">
                        </series-item>
                    </series>
                    <category-axis>
                       <category-axis-item categories="@categories_data">
                       </category-axis-item>
                    </category-axis>
    </kendo-sparkline>
```
{% endif %}

The code from the previous example results in the following Sparkline chart. Note that values are displayed as are.

![{{ site.product_short }} Sparkline Chart with a date category axis](images/sparkline-category-date-axis.png)

The following example demonstrates the Sparkline with its base unit changed to `"years"`.

```HtmlHelper
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
{% if site.core %}
```
    @{
        var categories_data = new DateTime[] {
                    new DateTime(2011,12,30),
                    new DateTime(2011,12,31),
                    new DateTime(2012,01,01),
                    new DateTime(2012,01,02),
                    new DateTime(2012,01,03)
                };
    }
    <category-axis>
        <category-axis-item base-unit="ChartAxisBaseUnit.Years" categories="@categories_data">
        </category-axis-item>
    </category-axis>
```
{% endif %}

The following example demonstrates a Sparkline with a grouped date category axis. Note the way the Sparkline displays the maximum value for each year.

![{{ site.product_short }} Sparkline Chart with a grouped date category axis](images/sparkline-category-date-axis-grouped.png)

You can also change the aggregate function for each series.

```HtmlHelper
    .Series(s => s
        .Column(new int[] { 20, 40, 45, 30, 50 })
        .Aggregate(ChartSeriesAggregate.Avg))
```
{% if site.core %}
```TagHelper
    @{
        var series_column_data = new int[] { 20, 40, 45, 30, 50 };
    }

    <series>
        <series-item data="@series_column_data" aggregate="ChartSeriesAggregate.Avg">
        </series-item>
    </series>

```
{% endif %}

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

```HtmlHelper
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
{% if site.core %}
```TagHelper
    @{
        var series_column_data = new double[] { 15.7, 16.7, 20, 23.5, 26.6 };
        var categories_data = new string[] { "2005", "2006", "2007", "2008", "2009" };
    }
    <kendo-sparkline name="Sparkline">
                    <series>
                        <series-item data="@series_data">
                        </series-item>
                    </series>
                    <value-axis>
                        <value-axis-item type="numeric" min="0" max="100"></value-axis-item>
                    </value-axis>
                    <category-axis>
                       <category-axis-item categories="@categories_data">
                       </category-axis-item>
                    </category-axis>
    </kendo-sparkline>
```
{% endif %}

### Setting the Plot Bands

You can configure each axis to display bands with different colors for predefined value ranges. The category index (zero based) is used as a value for the category axis.

```HtmlHelper
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
{% if site.core %}
```TagHelper
    <kendo-sparkline name="temp-range"
                     type="SparklineType.Bullet">
        <value-axis>
            <value-axis-item type="numeric" min="0" max="30">
                <plot-bands>
                    <chart-value-axis-plot-band from="0" to="15" color="#787878" opacity="0.15">
                    </chart-value-axis-plot-band>
                    <chart-value-axis-plot-band from="15" to="22" color="#787878" opacity="0.3">
                    </chart-value-axis-plot-band>
                    <chart-value-axis-plot-band from="22" to="30" color="#787878" opacity="0.15">
                    </chart-value-axis-plot-band>
                </plot-bands>
            </value-axis-item>
        </value-axis>
    </kendo-sparkline>
```
{% endif %}


## See Also

* [Basic Usage of the Sparklines HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/sparklines/index)
* [Server-Side API](/api/sparkline)
