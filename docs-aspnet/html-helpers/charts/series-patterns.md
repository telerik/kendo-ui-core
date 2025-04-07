---
title: Chart Patterns
page_title: Chart Patterns
description: "Learn how to use Series Patterns of the Telerik UI Chart component for {{ site.framework }}."
slug: htmlhelpers_charts_patterns
position: 7
---

# Chart Patterns

The Telerik UI Chart component for {{ site.framework }} offers customization options for presenting data visually, including support for using patterns in chart series. Patterns are providing unique and visually differentiate between them. This article demonstrates how to apply various patterns to the series in a Bar Chart and a Pie Chart.

## Pattern Types

The Telerik UI Chart component for {{ site.framework }} offers several pattern types to enhance the visual presentation of chart series:

* `Crosshatch`
* `DiagonalStripes`
* `Dots`
* `Grid`
* `VerticalStripes`

## Pattern Settings

The chart series patterns can be customized by adjusting the following settings:

* `Background` - The Background color of the pattern
* `Color` - The color of the pattern. Defaults to the series color
* `Gap` - The gap between the elements of the pattern
* `Radius` - The radius of the dots(applicable only for the "Dots" pattern)
* `Size` - The size of the squares in the Grid(applicable only for the "Grid" pattern)
* `Type` - Specifies the type of the pattern
* `Width` - The width of the lines(applicable for the "Crosshatch", "DiagonalStripes", and "VerticalStripes" patterns)

## Example with Bar Chart

The following example showcases a bar chart where each series uses a different pattern, allowing viewers to easily differentiate between them.

```HtmlHelper
@(Html.Kendo().Chart()
    .Name("chart")
    .Title("Bar Chart with Patterns")
    .Legend(legend => legend
        .Position(ChartLegendPosition.Bottom)
        .Orientation(ChartLegendOrientation.Horizontal)
    )
    .SeriesDefaults(s => s.Column().Overlay(o => o.Gradient(ChartSeriesGradient.None)).Border(b => b.Width(0)))
    .ChartArea(chartArea => chartArea
        .Background("transparent")
    )
    .Series(series =>
    {
        series.Column(new double[] { 33 })
            .Name("Series A")
            .Color("rgb(148, 236, 255)")
            .Pattern(p => p.Type(ChartSeriesPattern.VerticalStripes)
                          .Background("rgb(75, 96, 250)")
                          .Width(1.2)
                          .Gap(12));
        series.Column(new double[] { 19 })
            .Name("Series B")
            .Color("rgb(250, 201, 187)")
            .Pattern(p => p.Type(ChartSeriesPattern.Crosshatch)
                          .Background("rgb(172, 88, 255)")
                          .Width(1.2)
                          .Gap(12));
        series.Column(new double[] { 28 })
            .Name("Series C")
            .Color("rgb(255, 208, 223)")
            .Pattern(p => p.Type(ChartSeriesPattern.DiagonalStripes)
                          .Background("rgb(255, 146, 184)")
                          .Width(1.2)
                          .Gap(12));
        series.Column(new double[] { 13 })
            .Name("Series D")
            .Color("rgb(255, 99, 88)")
            .Pattern(p => p.Type(ChartSeriesPattern.Grid)
                          .Background("rgb(255, 148, 109)")
                          .Size(12)
                          .Gap(1.2));
        series.Column(new double[] { 26 })
            .Name("Series E")
            .Color("rgb(177, 193, 61)")
            .Pattern(p => p.Type(ChartSeriesPattern.Dots)
                          .Background("rgba(255, 255, 99, 0.5)")
                          .Radius(7.2)
                          .Gap(3.6));
    })
)
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    <kendo-chart name="chart">
        <chart-title text="Bar Chart with Patterns" position="ChartTitlePosition.Top"></chart-title>
        <chart-legend position="ChartLegendPosition.Bottom" orientation="ChartLegendOrientation.Horizontal"></chart-legend>
        <series-defaults type="ChartSeriesType.Column">
            <overlay gradient="none"></overlay>
            <border width="0"></border>
        </series-defaults>
        <chart-area background="transparent"></chart-area>
        <series>
            <series-item name="Series A" color="rgb(148, 236, 255)" type="ChartSeriesType.Column" data="new double[] { 33 }">
                <pattern type="ChartSeriesPattern.VerticalStripes" background="rgb(75, 96, 250)" width="1.2" gap="12"></pattern>
            </series-item>
            <series-item name="Series B" color="rgb(250, 201, 187)" type="ChartSeriesType.Column" data="new double[] { 19 }">
                <pattern type="ChartSeriesPattern.Crosshatch" background="rgb(172, 88, 255)" width="1.2" gap="12"></pattern>
            </series-item>
            <series-item name="Series C" color="rgb(255, 208, 223)" type="ChartSeriesType.Column" data="new double[] { 28 }">
                <pattern type="ChartSeriesPattern.DiagonalStripes" background="rgb(255, 146, 184)" width="1.2" gap="12"></pattern>
            </series-item>
            <series-item name="Series D" color="rgb(255, 99, 88)" type="ChartSeriesType.Column" data="new double[] { 13 }">
                <pattern type="ChartSeriesPattern.Grid" background="rgb(255, 148, 109)" size="12" gap="1.2"></pattern>
            </series-item>
            <series-item name="Series E" color="rgb(177, 193, 61)" type="ChartSeriesType.Column" data="new double[] { 26 }">
                <pattern type="ChartSeriesPattern.Dots" background="rgba(255, 255, 99, 0.5)" radius="7.2" gap="3.6"></pattern>
            </series-item>
        </series>
    </kendo-chart>
```
{% endif %}

## Example with Pie Chart

The following example demonstrates how to create a pie chart where each segment is represented using a distinct pattern.

```HtmlHelper
    @{
        var data = new dynamic[] {
            new {
                category = "Series A",
                value = 33,
                color = "rgb(148, 236, 255)",
                pattern = new { type = "verticalStripes", background = "rgb(75, 96, 250)", width = 1.2, gap = 12 }
            },
            new {
                category = "Series B",
                value = 22,
                color = "rgb(250, 201, 187)",
                pattern = new { type = "crosshatch", background = "rgb(172, 88, 255)", width = 1.2, gap = 12 }
            },
            new {
                category = "Series C",
                value = 20,
                color = "rgb(255, 208, 223)",
                pattern = new { type = "diagonalStripes", background = "rgb(255, 146, 184)", width = 1.2, gap = 12 }
            },
            new {
                category = "Series D",
                value = 15,
                color = "rgb(255, 99, 88)",
                pattern = new { type = "grid", background = "rgb(255, 148, 109)", size = 12, gap = 1.2 }
            },
            new {
                category = "Series E",
                value = 10,
                color = "rgb(177, 193, 61)",
                pattern = new { type = "dots", background = "rgba(255, 255, 99, 0.5)", radius = 7.2, gap = 3.6 }
            }
        };
    }

    @(Html.Kendo().Chart()
        .Name("chart")
        .Title(title => title
            .Text("Pie Chart with Patterns")
            .Position(ChartTitlePosition.Top)
        )
        .Legend(legend => legend.Visible(false)
        )
        .ChartArea(chart => chart
            .Background("transparent")
        )
        .Series(series => {
            series.Pie(@data)
                .Name("category")
                .ColorField("color")
                .PatternField("pattern")
                .StartAngle(150);
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    
    @{
        var data = new dynamic[] {
            new {
                category = "Series A",
                value = 33,
                color = "rgb(148, 236, 255)",
                pattern = new { type = "verticalStripes", background = "rgb(75, 96, 250)", width = 1.2, gap = 12 }
            },
            new {
                category = "Series B",
                value = 22,
                color = "rgb(250, 201, 187)",
                pattern = new { type = "crosshatch", background = "rgb(172, 88, 255)", width = 1.2, gap = 12 }
            },
            new {
                category = "Series C",
                value = 20,
                color = "rgb(255, 208, 223)",
                pattern = new { type = "diagonalStripes", background = "rgb(255, 146, 184)", width = 1.2, gap = 12 }
            },
            new {
                category = "Series D",
                value = 15,
                color = "rgb(255, 99, 88)",
                pattern = new { type = "grid", background = "rgb(255, 148, 109)", size = 12, gap = 1.2 }
            },
            new {
                category = "Series E",
                value = 10,
                color = "rgb(177, 193, 61)",
                pattern = new { type = "dots", background = "rgba(255, 255, 99, 0.5)", radius = 7.2, gap = 3.6 }
            }
        };
    }

    <kendo-chart name="chart">
        <chart-title text="Pie Chart with Patterns" position="ChartTitlePosition.Top"></chart-title>
        <chart-legend visible="false"></chart-legend>
        <series-defaults type="ChartSeriesType.Pie"></series-defaults>
        <chart-area background="transparent"></chart-area>
        <series>
            <series-item start-angle="150" data='@data' pattern-field="pattern">
            </series-item>
        </series>
    </kendo-chart>
```
{% endif %}

## See Also

* [Using the API of the Chart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chart-api/index)
* [Basic Usage of the Area Chart for {{ site.framework }} (Demos)](https://demos.telerik.com/{{ site.platform }}/area-charts/index)
* [Server-Side API](/api/chart)
