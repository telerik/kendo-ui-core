---
title: Plotbands
page_title: Plotbands
description: "Learn how to set Plotbands of Telerik UI Bar Charts component for {{ site.framework }}."
slug: barcharts_plotbands
---

# Plotbands

Plot Bands are colored ranges, which are used to highlight certain areas in the ASP.NET Core Chart. You can create them by setting:

ValueAxis -> PlotBands -> bands.Add().From(10000).To(30000).Color("#c00").Opacity(0.3);

Each Plot Band could be configured independently by specifying the following properties:

* From — the start position of the plot band.
* To — the end position of the plot band.
* Opacity — the opacity of the plot band.
* Color — the color of the plot band.

The following implementation demonstrates the code needed for setting Plotbands for Bar Chart:

```HtmlHelper
 @(Html.Kendo().Chart<Kendo.Mvc.Examples.Models.ElectricityProduction>()
        .Name("chart")
        .Title("Spain electricity production (GWh)")
        .Legend(legend => legend
            .Position(ChartLegendPosition.Right)
        )
        .DataSource(ds => ds
            .Read(read => read.Action("_SpainElectricityProduction", "Bar_Charts"))
            .Sort(sort => sort.Add("Year").Ascending())
        )
        .Series(series =>
        {
            series.Column(model => model.Nuclear).Name("Nuclear").CategoryField("Year");
            series.Column(model => model.Hydro).Name("Hydro").CategoryField("Year");
            series.Column(model => model.Wind).Name("Wind").CategoryField("Year");
        })
        .CategoryAxis(axis => axis
            .MajorGridLines(lines => lines.Visible(false))
        )
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
        .Tooltip(tooltip => tooltip
            .Visible(true)
            .Format("{0:N0}")
        )
    ) 
```
{% if site.core %}
```TagHelper
    @addTagHelper *,Kendo.Mvc
        <kendo-chart name="chart">
            <category-axis>
                <category-axis-item>
                    <major-grid-lines visible="false" />
                </category-axis-item>
            </category-axis>
            <series>
                <series-item type="ChartSeriesType.Column" category-field="Year" field="Nuclear" name="Nuclear">
                </series-item>
                <series-item type="ChartSeriesType.Column" category-field="Year" field="Hydro" name="Hydro">
                </series-item>
                <series-item type="ChartSeriesType.Column" category-field="Year" field="Wind" name="Wind">
                </series-item>
            </series>
            <value-axis>
                <value-axis-item major-unit="10000"
                                max="70000"
                                type="numeric">
                    <labels format="{0:N0}">
                    </labels>
                    <line visible="false" />
                    <plot-bands>
                        <chart-value-axis-plot-band from="10000"
                                                    to="30000"
                                                    color="#c00"
                                                    opacity="0.3">
                        </chart-value-axis-plot-band>
                        <chart-value-axis-plot-band from="30000"
                                                    to="30500"
                                                    color="#c00"
                                                    opacity="0.6">
                        </chart-value-axis-plot-band>
                    </plot-bands>
                </value-axis-item>
            </value-axis>
            <datasource>
                <transport parameter-map="">
                    <read type="post" url="@Url.Action("_SpainElectricityProduction", "Bar_Charts")" />
                </transport>
                <sorts>
                    <sort field="Year" direction="asc" />
                </sorts>
            </datasource>
            <chart-legend position="ChartLegendPosition.Right">
            </chart-legend>
            <chart-title text="Spain electricity production (GWh)">
            </chart-title>
            <tooltip format="{0:N0}" visible="true">
            </tooltip>
        </kendo-chart>
```
{% endif %}

Overview of Plotbands implementation for Bar Chart:

![{{ site.product_short }} Plotbands](images/plotbands.png)

* [Demo page of the Plotbands for Bar Chart](https://demos.telerik.com/{{ site.platform }}/bar-charts/plotbands)

## See Also
* [Basic Usage of Bar Charts for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/bar-charts)
* [Stacked and Grouped Charts for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/bar-charts/grouped-stacked-bar)
