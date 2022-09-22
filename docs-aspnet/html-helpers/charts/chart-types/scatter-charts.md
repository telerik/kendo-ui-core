---
title: Scatter Charts
page_title: Scatter Charts
description: "Learn the basics when working with the scatter charts in the {{ site.product }} suite."
slug: htmlhelpers_scattercharts_aspnetcore
position: 3
---

{% if site.core %}
    {% assign Position = "/api/Kendo.Mvc.UI.Fluent/ChartCategoryAxisLabelsSettingsBuilder#positionkendomvcuichartaxislabelsposition" %}
{% else %}
    {% assign Position = "/api/Kendo.Mvc.UI.Fluent/ChartAxisLabelsBuilder#positionkendomvcuichartaxislabelsposition" %}
{% endif %}

# Scatter Charts

Scatter charts display data as points that are defined by the values of their items.

Scatter Charts are useful for displaying the relation between different sets of data (for example, scientific experimental results) and plotting two-dimensional data.

## Setting the Primary Axes

XY Charts, such as the [Scatter](https://demos.telerik.com/{{ site.platform }}/scatter-charts/index) and [Scatter Line](https://demos.telerik.com/{{ site.platform }}/scatter-charts/scatter-line) Charts, use one or more X and Y axes which are configured through the `XAxis` and the `YAxis` properties.

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Series(series => {
            series.Scatter(new double[][] { new[] { 16.4, 5.4 }, new[] { 21.7, 2 }, new[] { 25.4, 3 }, new[] { 19.0, 2.0 } });
        })
        .XAxis(x => x
            .Numeric()
            .Max(35)
        )
        .YAxis(y => y
            .Numeric()
            .Min(-5)
            .Max(25)
        )
    )
```
{% if site.core %}
```TagHelper

    @{ 
        var data = new double[][] { new[] { 16.4, 5.4 }, new[] { 21.7, 2 }, new[] { 25.4, 3 }, new[] { 19.0, 2.0 } };
    }
    <kendo-chart name="chart">
        <series>
            <series-item type="ChartSeriesType.Scatter" data="data">
            </series-item>
        </series>
        <x-axis>
            <x-axis-item type="numeric" max="35">
            </x-axis-item>
        </x-axis>
        <y-axis>
            <y-axis-item type="numeric" min="-5" max="25">
            </y-axis-item>
        </y-axis>
    </kendo-chart>

```
{% endif %}

## Positioning the Label

The X and Y axes provide options for displaying their labels either next to the axis or at the outer edges of the plot area. By default, the labels are positioned next to the axis.

To change the label position, set the [`Position`]({{ Position }}) option of the axis labels which provides the following available options:

* (Default) When `Position` is set to `"ChartAxisLabelsPosition.OnAxis"`, the labels are positioned next to the axis.
* When `Position` is set to `"ChartAxisLabelsPosition.End"`, the labels are placed at the end of the crossing axis. Typically, this configuration positions the labels at the top or right end of the Chart unless the crossing axis was reversed.
* When `Position` is set to `"ChartAxisLabelsPosition.Start"`, the labels are placed at the start of the crossing axis. Typically, this configuration positions the labels at the left or bottom end of the Chart unless the crossing axis was reversed.

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Series(series => {
            series.Scatter(new double[][] { new[] { 16.4, 5.4 }, new[] { 21.7, 2 }, new[] { 25.4, 3 }, new[] { 19.0, 2.0 } });
        })
        .XAxis(x => x
            .Labels(s=>s.Position(ChartAxisLabelsPosition.Start))
        )
    )
```
{% if site.core %}
```TagHelper

    @{ 
        var data = new double[][] { new[] { 16.4, 5.4 }, new[] { 21.7, 2 }, new[] { 25.4, 3 }, new[] { 19.0, 2.0 } };
    }
    <kendo-chart name="chart">
        <series>
            <series-item type="ChartSeriesType.Scatter" data="data">
            </series-item>
        </series>
        <x-axis>
            <x-axis-item type="numeric" max="35">
                <labels position="ChartAxisLabelsPosition.Start"></labels>
            </x-axis-item>
        </x-axis>
    </kendo-chart>

```
{% endif %}


## Setting Multiple Axes

You can define more X and Y axes in addition to the primary axes. The additional axes must have unique names. Series are associated to a X and Y axes by specifying their name.

> Do not specify a name for the primary X and Y axes.

```HtmlHelper
    @(Html.Kendo().Chart(Model)
        .Name("chart")
        .Series(series => {
            series.ScatterLine(model => model.RPM, model => model.Power)
                .Name("Power")
                .Tooltip(tooltip => tooltip.Format("{1} bhp @ {0:N0} rpm"));

            series.ScatterLine(model => model.RPM, model => model.Torque)
                .Name("Torque")
                .YAxis("torque")
                .Tooltip(tooltip => tooltip.Format("{1} lb-ft @ {0:N0} rpm"));
        })
        .XAxis(x => x
            .Numeric()
            .Title(title => title.Text("Engine rpm"))

            // Align torque axis to the right by specifying
            // a crossing value greater than or equal to the axis maximum.
            .AxisCrossingValue(0, 10000)
            .Labels(labels => labels.Format("{0:N0}"))
        )
        .YAxis(y => y
            .Numeric()
            .Title(title => title.Text("Power (bhp)"))
        )
        .YAxis(y => y
            .Numeric("torque")
            .Title(title => title.Text("Torque (lb-ft)"))
        )
    )
```
{% if site.core %}
```TagHelper
    @{ 
        var axisCrossing = new object[]{ "0","10000" };
    }
    <kendo-chart name="chart">
        <series>
            <series-item width="2" type="ChartSeriesType.ScatterLine" name="Power" x-field="RPM" y-field="Power" data="Model.Power">
                <tooltip format="{1} bhp @@ {0:N0} rpm">
                </tooltip>
            </series-item>
            <series-item width="2" type="ChartSeriesType.ScatterLine" name="Torque" x-field="RPM" y-axis="torque" y-field="Torque" data="Model.Torque">
                <tooltip format="{1} lb-ft @@ {0:N0} rpm">
                </tooltip>
            </series-item>
        </series>
        <x-axis>
            @* Align torque axis to the right by specifying
            a crossing value greater than or equal to the axis maximum. *@
            <x-axis-item type="numeric" axis-crossing-value="axisCrossing">
                <labels format="{0:N0}">
                </labels>
                <chart-x-axis-item-title text="Engine rpm">
                </chart-x-axis-item-title>
            </x-axis-item>
        </x-axis>
        <y-axis>
            <y-axis-item type="numeric">
                <chart-y-axis-item-title text="Power (bhp)">
                </chart-y-axis-item-title>
            </y-axis-item>
            <y-axis-item name="torque" type="numeric">
                <chart-y-axis-item-title text="Torque (lb-ft)">
                </chart-y-axis-item-title>
            </y-axis-item>
        </y-axis>
        <tooltip visible="true">
        </tooltip>
    </kendo-chart>

```
{% endif %}


Because no axis is specified, the first series is associated with the default Y axis. The `torque` series are plotted on the `torque` Y axis.

![{{ site.product_short }} A Scatter Chart with multiple axes](../images/chart-scatter-line-multiple-axes.png)

## Arranging the Axes

You can also control the arrangement of the X and Y axes by specifying the values at which they cross the primary axes.

```HtmlHelper
    .XAxis(x => x
        .Numeric()
        .AxisCrossingValue(0, 2500)
    )
```
{% if site.core %}
```TagHelper
    @{ 
        var axisCrossing = new object[]{ "0","2500" };
    }
        <x-axis>
            <x-axis-item type="numeric" axis-crossing-value="axisCrossing">
            </x-axis-item>
        </x-axis>

```
{% endif %}

The primary Y axis crosses the X axis at point 0 (leftmost). The second, `torque` Y axis crosses the X axis at the 2500 mark or at its right end, whichever comes first.

![{{ site.product_short }} A Scatter Line Chart with customized axis crossing value](../images/chart-scatter-line-axis-crossing-value.png)

## See Also

* [Using the API of the Chart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chart-api/index)
* [Basic Usage of the Bar Chart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/bar-charts/index)
* [Basic Usage of the Bar Chart TagHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/bar-charts/tag-helper)
* [Basic Usage of the Line Chart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/line-charts/index)
* [Basic Usage of the Line Chart TagHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/line-charts/tag-helper)
* [Server-Side API](/api/chart)
