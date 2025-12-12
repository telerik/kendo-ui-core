---
title: Appearance
page_title: Appearance
description: "Learn how to control the appearance of the Telerik UI Chart component for {{ site.framework }}."
components: ["chart"]
previous_url: /helpers/html-helpers/charts/chart/appearance
slug: htmlhelpers_charts_appearance_aspnetcore
position: 3
---

# Appearance

Unlike other {{ site.product }} components which use only CSS for styling, you can mainly control the appearance of the Chart elements by using JavaScript style options.

For more information on the structure of the Chart, refer to the articles on the [Chart building elements]({% slug htmlhelpers_charts_dataseries_aspnetcore %}).

## Predefined Themes

The Charts come with [a set of predefined themes](https://docs.telerik.com/kendo-ui/styles-and-layout/appearance-styling). To select a theme, use the `Theme` option. The theme name is case-insensitive.

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Theme("blueOpal")
        .Title("Site Visitors Stats /thousands/")
        .Legend(legend => legend
            .Position(ChartLegendPosition.Bottom)
        )
        .SeriesDefaults(seriesDefaults => seriesDefaults
            .Column().Stack(true)
        )
        .Series(series =>
        {
            series.Column(new double[] { 56000, 63000, 74000, 91000, 117000, 138000 }).Name("Total Visits");
            series.Column(new double[] { 52000, 34000, 23000, 48000, 67000, 83000 }).Name("Unique visitors");
        })
        .CategoryAxis(axis => axis
            .Categories("Jan", "Feb", "Mar", "Apr", "May", "Jun")
            .MajorGridLines(lines => lines.Visible(false))
        )
        .ValueAxis(axis => axis
            .Numeric()
            .Line(line => line.Visible(false))
        )
        .Tooltip(tooltip => tooltip
            .Visible(true)
            .Format("{0}")
        )
    )
```
{% if site.core %}
```TagHelper

    @addTagHelper *, Kendo.Mvc

    @{
        var total_visits = new double[] { 56000, 63000, 74000, 91000, 117000, 138000 };
        var unique_visitors = new double[] { 52000, 34000, 23000, 48000, 67000, 83000 };
        var categories = new string[] { "Jan", "Feb", "Mar", "Apr", "May", "Jun" };
    }

    <kendo-chart name="chart" theme="blueOpal">
        <chart-title text="Site Visitors Stats /thousands/"></chart-title>
        <chart-legend position="ChartLegendPosition.Bottom"></chart-legend>
        <series-defaults type="ChartSeriesType.Column">
            <stack enabled="true" />
        </series-defaults>
        <series>
            <series-item type="ChartSeriesType.Column" name="Total Visits" data="total_visits">
            </series-item>
            <series-item type="ChartSeriesType.Column" name="Unique visitors" data="unique_visitors">
            </series-item>
        </series>
        <category-axis>
            <category-axis-item categories="categories">
                <major-grid-lines visible="false"/>
            </category-axis-item>
        </category-axis>
        <value-axis>
            <value-axis-item type="numeric">
                <line visible="false"/>
            </value-axis-item>
        </value-axis>
        <tooltip visible="true" format="{0}"></tooltip>
    </kendo-chart>

```
{% endif %}

## Sass Themes

As of the R2 2017 SP1 release, the Chart provides styling options through [Sass-based themes](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes). When the theme is set to `sass`, the Chart reads colors and fonts from the theme variables.

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Theme("sass")
        .Title("Site Visitors Stats /thousands/")
        .Legend(legend => legend
            .Position(ChartLegendPosition.Bottom)
        )
        .SeriesDefaults(seriesDefaults => seriesDefaults
            .Column().Stack(true)
        )
        .Series(series =>
        {
            series.Column(new double[] { 56000, 63000, 74000, 91000, 117000, 138000 }).Name("Total Visits");
            series.Column(new double[] { 52000, 34000, 23000, 48000, 67000, 83000 }).Name("Unique visitors");
        })
        .CategoryAxis(axis => axis
            .Categories("Jan", "Feb", "Mar", "Apr", "May", "Jun")
            .MajorGridLines(lines => lines.Visible(false))
        )
        .ValueAxis(axis => axis
            .Numeric()
            .Line(line => line.Visible(false))
        )
        .Tooltip(tooltip => tooltip
            .Visible(true)
            .Format("{0}")
        )
    )
```
{% if site.core %}
```TagHelper

    @addTagHelper *, Kendo.Mvc

    @{
        var total_visits = new double[] { 56000, 63000, 74000, 91000, 117000, 138000 };
        var unique_visitors = new double[] { 52000, 34000, 23000, 48000, 67000, 83000 };
        var categories = new string[] { "Jan", "Feb", "Mar", "Apr", "May", "Jun" };
    }

    <kendo-chart name="chart" theme="sass">
        <chart-title text="Site Visitors Stats /thousands/"></chart-title>
        <chart-legend position="ChartLegendPosition.Bottom"></chart-legend>
        <series-defaults type="ChartSeriesType.Column">
            <stack enabled="true" />
        </series-defaults>
        <series>
            <series-item type="ChartSeriesType.Column" name="Total Visits" data="total_visits">
            </series-item>
            <series-item type="ChartSeriesType.Column" name="Unique visitors" data="unique_visitors">
            </series-item>
        </series>
        <category-axis>
            <category-axis-item categories="categories">
                <major-grid-lines visible="false"/>
            </category-axis-item>
        </category-axis>
        <value-axis>
            <value-axis-item type="numeric">
                <line visible="false"/>
            </value-axis-item>
        </value-axis>
        <tooltip visible="true" format="{0}"></tooltip>
    </kendo-chart>

```
{% endif %}

## Using Pattern Fills

In addition to solid colors, the Chart series can also be filled with repeating patterns by using the `Pattern` configuration setting of the series.

> The pattern inherits the series color as main color and accepts an optional `background` color.

The following customizable pattern fills are available:
* Crosshatch
* Diagonal Stripes
* Dots
* Grid
* Vertical Stripes

Below is an example of using pattern fills for series:

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Series(series =>
        {
            series.Bar(new double[] {  117000, 138000 }).Name("Total Visits")
                .Pattern(pattern=>pattern.Color("red").Background("blue").Type(ChartSeriesPattern.Dots).Radius(50));
            series.Bar(new double[] {  67000, 83000 }).Name("Unique visitors")
                .Pattern(pattern=>pattern.Type(ChartSeriesPattern.Crosshatch).Width(25));
        })
    )
```
{% if site.core %}
```TagHelper

    @addTagHelper *, Kendo.Mvc

    <kendo-chart name="chart">
        <series>
            <series-item type="ChartSeriesType.Bar"
                        name="Total Visits"
                        data="new double[] { 117000, 138000 }">
                <pattern color="red" background="blue" type="ChartSeriesPattern.Dots" radius=50/>
            </series-item>
            <series-item type="ChartSeriesType.Bar"
                        name="Unique visitors"
                        data="new double[] { 67000, 83000 }">
                <pattern type="ChartSeriesPattern.Crosshatch" width=25 />
            </series-item>
        </series>
    </kendo-chart>

```
{% endif %}

## Animated Transitions

{{ site.product }} Charts use animated transitions to display new and updated data. To disable these transitions, use the `transitions` option.

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Transitions(false)
        // Other options.
    )
```
{% if site.core %}
```TagHelper

    @addTagHelper *, Kendo.Mvc

    <kendo-chart name="chart" transitions="false">
        <!-- Other options.-->
    </kendo-chart>

```
{% endif %}


## See Also

* [Using the API of the Chart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chart-api/index)
* [Basic Usage of the Area Chart for {{ site.framework }} (Demos)](https://demos.telerik.com/{{ site.platform }}/area-charts/index)
* [Server-Side API](/api/chart)
