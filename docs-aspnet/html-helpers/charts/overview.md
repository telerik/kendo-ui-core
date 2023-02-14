---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Chart component for {{ site.framework }}."
previous_url: /helpers/html-helpers/charts/charts, /helpers/html-helpers/charts, /helpers/html-helpers/charts/chart/overview, /helpers/charts/overview
slug: htmlhelpers_charts_aspnetcore
position: 1
---
{% if site.core %}
    {% assign AxisDefaults = "/api/Kendo.Mvc.UI.Fluent/ChartBuilder#axisdefaultssystemactionkendomvcuifluentchartaxisdefaultssettingsbuildert" %}
{% else %}
    {% assign AxisDefaults = "/api/Kendo.Mvc.UI.Fluent/ChartBuilder#axisdefaultssystemactionkendomvcuifluentchartaxisdefaultsbuildert" %}
{% endif %}

# {{ site.framework }} Chart Overview

{% if site.core %}
The Chart TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Chart widget. To add the component to your ASP.NET Core app, you can use either.
{% else %}
The Telerik UI Chart HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Chart widget.
{% endif %}

The Chart uses modern browser technologies to render high-quality data visualizations. All graphics are rendered on the client by using [Scalable Vector Graphics (SVG)](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) with a fallback to [Canvas](http://www.canvasgfx.com/). The Charts support a [set of series types]({% slug areacharts_aspnetcore_htmlhelper %}) such as Bar, Line, Area, Bullet, Pie, Scatter, Bubble, Polar, and other.

{% if site.has_cta_panels == true %}
{% include cta-panel-introduction.html %}
{% endif %}

The Chart contains the following [building block elements]({% slug htmlhelpers_charts_dataseries_aspnetcore %}):

* Title
* Legend
* Chart Area
* Plot Area
* Axes
* Series

The following image displays the structure of the Chart.

![{{ site.product_short }} Chart Structure](images/chart-structure.png)

To see the component in action, check the examples:

* [Demo page for the Chart HtmlHelper](https://demos.telerik.com/{{ site.platform }}/chart-api/index)
* [Demo page for the Chart TagHelper](https://demos.telerik.com/aspnet-core/area-charts/tag-helper)

## Initializing the Chart

The following example demonstrates how to define the Chart.


```HtmlHelper
   @(Html.Kendo().Chart(Model)
      .Name("internetUsersChart") // The name of the Chart is mandatory. It specifies the "id" attribute of the widget.
      .Title("Internet Users")
      .Series(series => {
          series.Bar(model => model.Value) // Create a Bar Chart series bound to the "Value" property.
                .Name("United States");
      })
      .CategoryAxis(axis => axis
          .Categories(model => model.Year)
      )
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    <kendo-chart name="internetUsersChart">
        <category-axis>
            <category-axis-item field="Year">
            </category-axis-item>
        </category-axis>
        <series>
            <series-item type="ChartSeriesType.Bar" 
                        field="Value" 
                        name="United States">
            </series-item>
        </series>
        <chart-title text="Internet Users">
        </chart-title>
    </kendo-chart>
```
{% endif %}
```Controller
    public ActionResult Index()
    {
        return View(ChartDataRepository.InternetUsers());
    }
```

### Basic Configuration

To configure the Chart, pass the configuration options as attributes:


```HtmlHelper
@(Html.Kendo().Chart()
    .Name("chart")
    .Title("Gross domestic product growth /GDP annual %/")
    .Legend(legend => legend
        .Position(ChartLegendPosition.Top)
    )
    .ChartArea(chartArea => chartArea
        .Background("transparent")
    )
    .Series(series =>
    {
        series.Column(new double[] { 3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855 }).Name("India");
        series.Column(new double[] { 4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3 }).Name("Russian Federation");
        series.Column(new double[] { 0.010, -0.375, 1.161, 0.684, 3.7, 3.269, 1.083, -5.127, 3.690, 2.995 }).Name("Germany");
        series.Column(new double[] { 1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727 }).Name("World");
    })
    .CategoryAxis(axis => axis
        .Name("series-axis")
        .Line(line => line.Visible(false))
    )
    .CategoryAxis(axis => axis
        .Name("label-axis")
        .Categories("2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011")
    )
    .ValueAxis(axis => axis
        .Numeric()
            .Labels(labels => labels.Format("{0}%"))

            // Move the label-axis all the way down the value axis.
            .AxisCrossingValue(0, int.MinValue)
    )
    .Tooltip(tooltip => tooltip
        .Visible(true)
        .Format("{0}%")
        .Template("#= series.name #: #= value #")
    )
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chart name="chart">
    <chart-title text="Gross domestic product growth /GDP annual %/"></chart-title>
    <chart-legend position="ChartLegendPosition.Top"></chart-legend>
    <series-defaults type="ChartSeriesType.Column"></series-defaults>

    <series>
        <series-item name="India" data="new double[] { 3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855 }"></series-item>
        <series-item name="Russian Federation" data="new double[] { 4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3 }"></series-item>
        <series-item name="Germany" data="new double[] { 0.010, -0.375, 1.161, 0.684, 3.7, 3.269, 1.083, -5.127, 3.690, 2.995 }"></series-item>
        <series-item name="World" data="new double[] { 1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727 }"></series-item>
    </series>

    <value-axis>
        <value-axis-item>
            <labels format="{0}%"></labels>
            <line visible="false" />
        </value-axis-item>
    </value-axis>

    <category-axis>
        <category-axis-item categories='new string[] { "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "20010", "2011", }'>
            <labels>
                <chart-category-axis-labels-padding top="135" />
            </labels>
            <line visible="false" />
        </category-axis-item>
    </category-axis>

    <tooltip visible="true" format="{0}%" template="#= series.name #: #= value #"></tooltip>
</kendo-chart>
```
{% endif %}

#### Axis Title

You can also add a title to clearly indicate the role of the axis.

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Title("Average temperature and humidity")
        .Legend(legend => legend
            .Position(ChartLegendPosition.Bottom)
        )
        .Series(series => {
            series.Column(new double[] { 20, 25, 32 }).Name("Temperature").Axis("temperature");
            series.Column(new double[] { 45, 50, 80 }).Name("Humidity").Axis("humidity");
        })
        .CategoryAxis(axis => axis            
            .Categories("Aug", "Sep", "Oct")
            .AxisCrossingValue(0, 3)
        )
        .ValueAxis(axis => axis
            .Numeric()
            .Name("temperature")
            .Title(t=>t.Text("Temperature, Celsius"))
        )
        .ValueAxis(axis => axis
            .Numeric()
            .Name("humidity")
            .Title(t=>t.Text("Relative Humidity"))
        )
    )
```
{% if site.core %}
```TagHelper

    @addTagHelper *, Kendo.Mvc
    @{
        var categories = new string[] { "Aug", "Sep", "Oct" };
    }
    <kendo-chart name="chart">
        <category-axis>
            <category-axis-item categories="categories"
                                axis-crossing-value="new object[] { 0, 3}">
            </category-axis-item>
        </category-axis>
        <series>
            <series-item type="ChartSeriesType.Column"
                        axis="temperature"
                        name="Temperature"
                        data="new double[] { 20, 25, 32 }">
            </series-item>
            <series-item type="ChartSeriesType.Column"
                        axis="humidity"
                        name="Humidity"
                        data="new double[] { 45, 50, 80 }">
            </series-item>
        </series>
        <value-axis>
            <value-axis-item name="temperature" type="numeric">
                <chart-value-axis-item-title text="Temperature, Celsius">
                </chart-value-axis-item-title>
            </value-axis-item>
            <value-axis-item name="humidity" type="numeric">
                <chart-value-axis-item-title text="Relative Humidity">
                </chart-value-axis-item-title>
            </value-axis-item>
        </value-axis>
        <chart-legend position="ChartLegendPosition.Bottom">
        </chart-legend>
        <chart-title text="Average temperature and humidity">
        </chart-title>
    </kendo-chart>

```
{% endif %}

![{{ site.product_short }} Chart with axis titles](images/chart-axis-titles.png)

#### Plot Bands

The Chart enables you to configure each axis to display bands with different colors for predefined value ranges. The category index (zero-based) is used as a value for the category axis.

```HtmlHelper
    .ValueAxis(axis => axis.Numeric()
        .Labels(labels => labels.Format("{0:N0}"))
        .MajorUnit(10000)
        .Max(70000)
        .Line(line => line.Visible(false))
        .PlotBands(bands => {
            bands.Add().From(10000).To(30000).Color("#c00").Opacity(0.3);
            bands.Add().From(30000).To(30500).Color("#c00").Opacity(0.8);
        })
    )
```
{% if site.core %}
```TagHelper
    <value-axis-item type="numeric"
                        major-unit="10000"
                        max="70000">
        <labels format="{0:N0}">
        </labels>
        <line visible="false"/>
        <plot-bands>
            <chart-value-axis-plot-band from="10000"
                                        to="30000"
                                        color="#c00"
                                        opacity="0.3">
            </chart-value-axis-plot-band>
            <chart-value-axis-plot-band from="30000"
                                        to="30500"
                                        color="#c00"
                                        opacity="0.8">
            </chart-value-axis-plot-band>
        </plot-bands>
    </value-axis-item>
```
{% endif %}

![{{ site.product_short }} Chart with axis plot bands](images/chart-plot-bands.png)

#### Global Settings

You may also need to apply global settings that affect all axes. In such cases, use [`AxisDefaults`]({{ AxisDefaults }}).

```HtmlHelper
    .AxisDefaults(a=> a
        .Labels(l=>l.Font("16px Verdana"))
    )
```
{% if site.core %}
```TagHelper
    <axis-defaults>
        <labels font="16px Verdana">
        </labels>
    </axis-defaults>
```
{% endif %}

## Functionality and Features

* [Data binding]({% slug htmlhelpers_charts_databinding_aspnetcore %})
* [Appearance]({% slug htmlhelpers_charts_appearance_aspnetcore %})

## Events

You can subscribe to all Chart [events](/api/chart). For a complete example on basic Chart events, refer to the [demo on using the events of the Chart](https://demos.telerik.com/{{ site.platform }}/chart-api/events).

### Handling by Handler Name

The following examples demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().Chart<Kendo.Mvc.Examples.Models.ElectricityProduction>()
        .Name("chart")
        .Events(events => events
            .SeriesClick("onSeriesClick")
            .DataBound("onDataBound")
        )
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    <kendo-chart name="chart" 
                on-series-click="onSeriesClick" 
                on-data-bound="onDataBound">
    </kendo-chart>
```
{% endif %}
```script.js
    <script>
        function onSeriesClick(e) {
            // Handle the seriesClick event
        }

        function onDataBound(e) {
            // Handle the dataBound event
        }
    </script>
```

### Handling by Template Delegate

```HtmlHelper
    @(Html.Kendo().Chart<Kendo.Mvc.Examples.Models.ElectricityProduction>()
        .Name("chart")
        .Events(events => events
            .SeriesClick(@<text>
                function() {
                    // Handle the seriesClick event
                }
            </text>)
            .DataBound(@<text>
                function() {
                    // Handle the dataBound event
                }
            </text>)
        )
    )
```

## Referencing Existing Instances

To reference an existing Chart instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Chart client-side API](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart#methods) to control its behavior.

```
    // Place the following after the Chart for {{ site.framework }} declaration.
    <script>
        $(function() {
            // The Name() of the Chart is used to get its client-side instance.
            var chart = $("#internetUsersChart").data("kendoChart");
        });
    </script>
```


## See Also

* [Using the API of the Chart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chart-api/index)
* [Basic Usage of the Bar Chart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/bar-charts/index)
* [Basic Usage of the Line Chart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/line-charts/index)
* [Server-Side API](/api/chart)
