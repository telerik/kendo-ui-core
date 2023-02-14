---
title: Bullet Charts
page_title: Bullet Charts
description: "Learn how to define and configure Telerik UI Bullet Charts."
slug: bulletcharts_aspnetcore_htmlhelper
---

# Bullet Charts

{% if site.core %}
The Telerik UI Bullet TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Bullet Chart widget.
{% else %}
The Telerik UI Bullet HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Bullet widget.
{% endif %}

Bullet Charts represent a variation of the [Bar Chart]({% slug barcharts_aspnetcore_htmlhelper %}).

* [Demo page for the Bullet Chart HtmlHelper](https://demos.telerik.com/{{ site.platform }}/bullet-charts/index)
{% if site.core %}
* [Demo page for the Bullet Chart TagHelper](https://demos.telerik.com/{{ site.platform }}/bullet-charts/tag-helper)
{% endif %}

## Getting Started

You can use the Bullet Chart component to visualize a comparison between an expected (target) and actual (current) value&mdash;for example, company profit, employee performance, weather data, and so on.

To create a Bullet series in the Chart component, use `Bullet` and `VerticalBullet` in the `Series` configuration.

* [Configuring the axes](#configuring-the-axes)
* [Customizing the target value lines](#customizing-the-target-value-lines)

## Configuring the Axes

To configure the axes, use the `CategoryAxis` and `ValueAxis` settings. Multiple value axes are also supported.

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Legend(legend => legend
            .Visible(false)
        )
        .Series(series => {
            series.Bullet(new double[][] { new double[] { 750, 762.5 }});
        })
        .ChartArea(chartArea => chartArea.Margin(0))
        .CategoryAxis(axis => axis
            .MajorGridLines(lines => lines.Visible(false))
            .MajorTicks(lines => lines.Visible(false))
        )
        .ValueAxis(axis => axis
            .Numeric()
            .Min(715)
            .Max(795)
            .MinorTicks(lines => lines.Visible(true))
            .MajorGridLines(lines => lines.Visible(false))
            .PlotBands(bands => {
                bands.Add().From(715).To(752).Color("#ccc").Opacity(0.6);
                bands.Add().From(752).To(772).Color("#ccc").Opacity(0.3);
            })
        )
        .Tooltip(tooltip => tooltip
            .Visible(true)
            .Shared(true)
            .Template("Maximum: #= value.target # <br /> Average: #= value.current #")
        )
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    <kendo-chart name="chart">
        <category-axis>
            <category-axis-item>
                <major-grid-lines visible="false"/>
                <major-ticks visible="false"/>
            </category-axis-item>
        </category-axis>
        <series>
            <series-item type="ChartSeriesType.Bullet" data="new double[][] { new double[] { 750, 762.5 }}">
            </series-item>
        </series>
        <value-axis>
            <value-axis-item max="795" min="715" type="numeric">
                <major-grid-lines visible="false"/>
                <minor-ticks visible="true"/>
                <plot-bands>
                    <chart-value-axis-plot-band from="715" to="752" color="#ccc" opacity="0.6">
                    </chart-value-axis-plot-band>
                    <chart-value-axis-plot-band from="752" to="772" color="#ccc" opacity="0.3">
                    </chart-value-axis-plot-band>
                </plot-bands>
            </value-axis-item>
        </value-axis>
        <chart-area>
            <margin bottom="0" left="0" right="0" top="0"/>
        </chart-area>
        <chart-legend visible="false">
        </chart-legend>
        <tooltip shared="true" template="Maximum: #= value.target # <br /> Average: #= value.current #" visible="true">
        </tooltip>
    </kendo-chart>
```
{% endif %}

The configuration from the previous example results in the following Bullet Chart.

![{{ site.product_short }} A sample Bullet Chart](images/chart-bullet.png)

## Customizing the Target Value Lines

You can customize the line that represents the target value through the `Target` series configuration. `Target` exposes the `Border`, `Color`, and `Line` main settings that control the line appearance.

The following example demonstrates how to use all three options to customize the target line.

```HtmlHelper
    .Series(series =>
    {
        series
        .Bullet(new double[][] { new double[] { 780, 762.5 } })
        .Color("darkblue")
        .Target(target=>target
        .Color("green")
        .Border(b=>b
            .Color("turquoise")
            .Width(2)
        )
        .Line(l=>l.Width(6))
        );
    })
```
{% if site.core %}
```TagHelper
	<series>
	 	<series-item type="ChartSeriesType.Bullet" 
            data="new double[][] { new double[] { 750, 762.5 }}"
			color="darkblue">
			    <target color="green">
				    <border color="turquoise" width="2" />
				    <line width="6"/>
			    </target>
	 	</series-item>
	</series>
```
{% endif %}

![{{ site.product_short }} A Bullet Chart with custom target line](images/chart-bullet-target.png)

## See Also

* [Basic Usage of the Bullet Chart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/bullet-charts/index)
* [Basic Usage of the Bullet Chart TagHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/bullet-charts/tag-helper)
* [Server-Side API](/api/chart)
