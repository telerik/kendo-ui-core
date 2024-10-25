---
title: Panes
page_title: Panes
description: "Learn how to configure the panes of a Telerik UI Chart component for {{ site.framework }}."
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

```HtmlHelper
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
```
{% if site.core %}
```TagHelper

    @addTagHelper *, Kendo.Mvc

    @{
        var total_visits = new double[] { 56000, 63000, 74000, 91000, 117000, 138000 };
        var unique_visitors = new double[] { 52000, 34000, 23000, 48000, 67000, 83000 };
        var categories = new string[] { "Jan", "Feb", "Mar", "Apr", "May", "Jun" };
    }

    <kendo-chart name="chart">
        <panes>
            <pane background="#00ff00"/>
        </panes>
        <chart-title text="Site Visitors Stats \n /thousands/"></chart-title>
        <chart-legend visible="false"></chart-legend>
        <chart-area background="transparent"></chart-area>
        <series>
            <series-item type="ChartSeriesType.Bar" name="Total Visits" data="total_visits">
            </series-item>
            <series-item type="ChartSeriesType.Bar" name="Unique visitors" data="unique_visitors">
            </series-item>
        </series>
        <category-axis>
            <category-axis-item categories="categories">
                <major-grid-lines visible="false"/>
            </category-axis-item>
        </category-axis>
        <value-axis>
            <value-axis-item type="numeric" max="140000">
                <line visible="false"/>
                <major-grid-lines visible="true"/>
            </value-axis-item>
        </value-axis>
        <tooltip visible="true" template="#= series.name #: #= value #"></tooltip>
    </kendo-chart>

```
{% endif %}

## Disable Clipping

By default, the pane content cannot extend beyond its border. This prevents charts from overlapping other elements like the legend or title.

Pane clipping may be undesired, for example when plotting series markers at the edge of the pane.
To disable clipping, set the `Panes.Clip` setting to `false`:

```HtmlHelper
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
```
{% if site.core %}
```TagHelper

    @addTagHelper *, Kendo.Mvc

    @{
        var total_visits = new double[] { 56000, 63000, 74000, 91000, 117000, 138000 };
        var unique_visitors = new double[] { 52000, 34000, 23000, 48000, 67000, 83000 };
        var categories = new string[] { "Jan", "Feb", "Mar", "Apr", "May", "Jun" };
    }

    <kendo-chart name="chart">
        <panes>
            <pane clip="false"/>
        </panes>
        <chart-title text="Site Visitors Stats \n /thousands/"></chart-title>
        <chart-legend visible="false"></chart-legend>
        <chart-area background="transparent"></chart-area>
        <series>
            <series-item type="ChartSeriesType.Bar" name="Total Visits" data="total_visits">
            </series-item>
            <series-item type="ChartSeriesType.Bar" name="Unique visitors" data="unique_visitors">
            </series-item>
        </series>
        <category-axis>
            <category-axis-item categories="categories">
                <major-grid-lines visible="false"/>
            </category-axis-item>
        </category-axis>
        <value-axis>
            <value-axis-item type="numeric" max="140000">
                <line visible="false"/>
                <major-grid-lines visible="true"/>
            </value-axis-item>
        </value-axis>
        <tooltip visible="true" template="#= series.name #: #= value #"></tooltip>
    </kendo-chart>

```
{% endif %}


## See Also

* [Using the API of the Chart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chart-api/index)
* [Basic Usage of the Area Chart HtmlHelper for {{ site.framework }} (Demos)](https://demos.telerik.com/{{ site.platform }}/area-charts/index)
* [Basic Usage of the Area Chart TagHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/area-charts/tag-helper)
* [Server-Side API of the Chart for {{ site.framework }}](/api/chart)
