---
title: Crosshairs
page_title: Crosshairs
description: "Learn how to configure the crosshairs in the Telerik UI Chart component for {{ site.framework }}."
slug: htmlhelpers_charts_crosshairs_aspnetcore
---

# Crosshairs

Crosshairs are lines, which are perpendicular to the axes of the Chart and enable the user to see the exact value at the current cursor position.

## Getting Started

By default, the crosshairs of the Telerik UI for {{ site.framework }} Chart are not visible. To enables them, set the `visible` property to `true`.

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .AxisDefaults(defaults => {
            defaults.Crosshair(c => c.Visible(true).Tooltip(t => t.Visible(true)));
        })
        .ChartArea(chartArea => chartArea
            .Background("transparent")
        )
        .Series(series =>
        {
            series.Column(new double[] { 1, 2, 3 });
        })
        .CategoryAxis(axis => axis
            .Name("label-axis")
            .Categories("A", "B", "C")
        )
        .ValueAxis(axis => axis
            .Numeric()
                .AxisCrossingValue(0, int.MinValue)
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-chart name="chart" >
        <axis-defaults>
            <crosshair visible="true">
                <chart-axis-defaults-crosshair-tooltip visible="true"></chart-axis-defaults-crosshair-tooltip>
            </crosshair>
        </axis-defaults>
        <chart-area background="transparent">
        </chart-area>
        <series>
            <series-item type="ChartSeriesType.Column" data="new double[] { 1, 2, 3 }">
            </series-item>
        </series>
        <category-axis>
            <category-axis-item name="label-axis" categories='new string[] {"A", "B", "C"}'></category-axis-item>
        </category-axis>
        <value-axis>
            <value-axis-item type="numeric" axis-crossing-value="new object[] { 0, int.MinValue}"></value-axis-item>
        </value-axis>
    </kendo-chart>
```
{% endif %}

## Customizing the Appearance

The Telerik UI for {{ site.framework }} Chart supports the following properties which enable you to customize the appearance of its crosshairs:

* `Color()`&mdash;Sets the color of the crosshair.
* `DashType()`&mdash;Sets the dash type of the crosshair. 

  The available dash-type options are: 
  
  * `Dash`&mdash;A line consisting of dashes. 
  * `DashDot`&mdash;A line consisting of a repeated dash-dot pattern.
  * `Dot`&mdash;A line consisting of dots.
  * `LongDash`&mdash;A line consisting of a repeated long-dash pattern. 
  * `LongDashDot`&mdash;A line consisting of a repeated long-dash-dot pattern.
  * `LongDashDotDot`&mdash;A line consisting of a repeated long-dash-dot-dot pattern.
  * `Solid`&mdash;A solid line.
  
* `Width()`&mdash;Configures the width of the crosshair in pixels.
* `Opacity()`&mdash;Specifies the opacity of the crosshair.

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Series(series => {
            series.Line(new double[] { 3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855 }).Name("India");
        })
        .CategoryAxis(axis => axis
            .Categories("2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011")
            .Crosshair(c => c.Visible(true).Width(5).DashType(ChartDashType.DashDot).Opacity(0.5).Color("green"))
            .MajorGridLines(lines => lines.Visible(false))
        )
        .ValueAxis(axis => axis
            .Numeric().Labels(labels => labels.Format("{0}%"))
            .Line(line => line.Visible(false))
            .Crosshair(c => c.Visible(true).Width(5).DashType(ChartDashType.Dash).Opacity(1).Color("#00FFFF"))
            .AxisCrossingValue(-10)
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-chart name="chart">
        <series-defaults type="ChartSeriesType.Line"></series-defaults>
        <series>
        <series>
            <series-item name="India" data="new double[] { 3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855 }">
            </series-item>
        </series>
        <category-axis>
            <category-axis-item categories='new string[] { "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010",  "2011", }'>
                <major-grid-lines visible="false" />
                <crosshair visible="true" width="5" dash-type="DashType.DashDot" opacity="0.5" color="green"></crosshair>
            </category-axis-item>
        </category-axis>
        <value-axis>
            <value-axis-item type="numeric" axis-crossing-value="new object[] { -10 }">
                <labels format="{0}%"></labels>
                <crosshair visible="true" width="5" dash-type="DashType.Dash" opacity="1" color="#00FFFF"></crosshair>
                <line visible="false" />
            </value-axis-item>
        </value-axis>
    </kendo-chart>
```
{% endif %}

## Tooltip Integration

To provide better flexibility, the Crosshairs expose the ability to display details about the data point over which the mouse is currently hovering through its integrated Tooltip.

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("heatmap")
        .Series(s=>s.HeatMap("Value", "Column", "Row").Labels(l=>l.Visible(false)))
        .DataSource(dataSource=> dataSource.Read("RemoteData", "HeatMap"))
        .Legend(legend=>legend.Visible(false))
        .XAxis(x =>
        {
            x.Numeric().Crosshair(c => c.Visible(true).Tooltip(t => t.Visible(true).Color("#00FFFF").Template("Value: #= value #")));
        })
        .YAxis(y =>
        {
            y.Numeric().Crosshair(c => c.Visible(true).Tooltip(t => t.Visible(true).Color("green").Template("Value: #= value #")));
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-chart name="heatmap">
        <series>
            <series-item type="ChartSeriesType.HeatMap" field="Value" name="Value, Column, Row" x-field="Column" y-field="Row">
                <labels visible="false">
                </labels>
            </series-item>
        </series>
        <x-axis>
            <x-axis-item type="numeric">
                <crosshair visible="true">
                    <chart-x-axis-crosshair-tooltip visible="true" color="#00FFFF" template="Value: #= value #">
                    </chart-x-axis-crosshair-tooltip>
                </crosshair>
            </x-axis-item>
        </x-axis>
        <y-axis>
            <y-axis-item name="" type="numeric">
                <crosshair visible="true">
                    <chart-y-axis-crosshair-tooltip visible="true" color="green" template="Value: #= value #">
                    </chart-y-axis-crosshair-tooltip>
                </crosshair>
            </y-axis-item>
        </y-axis>
        <datasource>
            <transport>
                <read url="@Url.Action("RemoteData","HeatMap")" cache="true" />
            </transport>
        </datasource>
        <chart-legend visible="false">
        </chart-legend>
    </kendo-chart>
```
{% endif %}

## See Also

* [Using the API of the Chart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chart-api/index)
* [Basic Usage of the Chart HtmlHelper for {{ site.framework }} (Demos)](https://demos.telerik.com/{{ site.platform }}/charts)
* [Server-Side API of the Chart for {{ site.framework }}](/api/chart)
