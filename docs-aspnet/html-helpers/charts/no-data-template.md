---
title: No Data Template
page_title: No Data Template
description: "Learn how to use the No Data Template of the Telerik UI Chart component for {{ site.framework }}."
slug: htmlhelpers_charts_no_data_template
position: 6
---

# No Data Template

The Telerik UI Chart component for {{ site.framework }} allows to display a message when there is no data to show. This feature is particularly useful when loading data asynchronously, as it reassures users that data may appear after a delay. Customizing the No Data Template is simple, enabling to add styling or interactive elements like buttons to improve usability. The No Data Template can be used for all [chart types]({% slug overview_charttypes_charts%}). Here’s how to set up a custom message for scenarios where the chart data is unavailable.

## Example with Bar Chart

```HtmlHelper
    @(Html.Kendo().Chart<Kendo.Mvc.Examples.Models.ElectricityProduction>()
        .Name("chart")
        .Title("Spain electricity production (GWh)")
        .NoData(n => n.Template("<div class=\"empty-template\">\r\n<p>There is no data to display.</p>\r\n<button id=\"button\" type=\"button\">Load Data</button>\r\n</div>"))
        .Legend(legend => legend
            .Position(ChartLegendPosition.Top)
        )
        .Series(series => {
            series.Column(model => model.Nuclear).Name("Nuclear").CategoryField("Year");
            series.Column(model => model.Hydro).Name("Hydro").CategoryField("Year");
            series.Column(model => model.Wind).Name("Wind").CategoryField("Year");
        })
        .CategoryAxis(axis => axis
            .Labels(labels => labels.Rotation(-90))
            .MajorGridLines(lines => lines.Visible(false))
        )
        .ValueAxis(axis => axis.Numeric()
            .Labels(labels => labels.Format("{0:N0}"))
            .MajorUnit(10000)
            .Line(line => line.Visible(false))
        )
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *,Kendo.Mvc
    <div class="demo-section wide">
        <kendo-chart name="chart">
            <no-data template="<div class='empty-template'>\r\n<p>There is no data to display.</p>\r\n<button id='button' type='button'>Load Data</    button>\r\n</div>"></no-data>
            <category-axis>
                <category-axis-item>
                    <labels>
                        <chart-category-axis-labels-rotation angle="-90" />
                    </labels>
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
                                 type="numeric">
                    <labels format="{0:N0}">
                    </labels>
                    <line visible="false" />
                </value-axis-item>
            </value-axis>
            <chart-legend position="ChartLegendPosition.Top">
            </chart-legend>
            <chart-title text="Spain electricity production (GWh)">
            </chart-title>
            <tooltip format="{0:N0}" visible="true">
            </tooltip>
        </kendo-chart>
    </div>
```
{% endif %}

```JavaScript
    <script>
        var dataSource;

        $(document).on("kendoReady", function () {
            $.ajax({
                type: "POST",
                url: "/bar_charts/_spainelectricityproduction",
                cache: false,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (json) {
                    dataSource = new kendo.data.DataSource({
                        data: json,
                        sort: {
                            field: "year",
                            dir: "asc"
                        }
                    })
                }
            })

            $("#button").kendoButton({
                icon: "arrow-rotate-cw",
                click: function () {
                    let chart = $("#chart").data("kendoChart");

                    chart.setDataSource(dataSource);
                }
            })
        })
    </script>
```

## Example with Pie Chart.

```HtmlHelper
    @(Html.Kendo().Chart(Model)
        .Name("chart")
        .Title("Break-up of Spain Electricity Production for 2008")
        .NoData(n => n.Template("<div class=\"empty-template\">\r\n<p>There is no data to display.</p>\r\n<button id=\"button\" type=\"button\">Load Data</button>\r\n</div>"))
        .Legend(legend => legend
            .Position(ChartLegendPosition.Bottom)
        )
        .SeriesColors(new string[] { "#03a9f4", "#ff9800", "#fad84a", "#4caf50" })
        .Series(series =>
        {
            series.Pie(model => model.Percentage, model => model.Source)
                .ExplodeField("Explode");
        })
        .Tooltip(tooltip => tooltip.
            Template("${ category } - ${ value }%").Visible(true)
        )
    )
```
{% if site.core %}
```TagHelper
@addTagHelper *,Kendo.Mvc
@model IEnumerable<Kendo.Mvc.Examples.Models.ElectricitySource>

@{
    var seriesColors = new string[] { "#03a9f4", "#ff9800", "#fad84a", "#4caf50" };
}

<div class="demo-section wide">
    <kendo-chart name="chart" series-colors="seriesColors">
        <chart-title text="Break-up of Spain Electricity Production for 2008"></chart-title>
        <no-data template="<div class='empty-template'>\r\n<p>There is no data to display.</p>\r\n<button id='button' type='button'>Load Data</button>\r\n</div>"></no-data>
        <chart-legend position="ChartLegendPosition.Bottom"></chart-legend>
        <series-defaults type="ChartSeriesType.Pie"></series-defaults>
        <series>
            <series-item category-field="Source"
                         field="Percentage"
                         explode-field="Explode"
                         data="@Model.ToArray()">
            </series-item>
        </series>
        <tooltip visible="true" template="${ category } - ${ value }%"></tooltip>
    </kendo-chart>
</div>
```
{% endif %}

```JavaScript
    <script>
        var dataSource;

        $(document).on("kendoReady", function () {
            $.ajax({
                type: "POST",
                url: "/pie_charts/get_local_data",
                cache: false,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (json) {
                    dataSource = new kendo.data.DataSource({
                        data: json,
                        sort: {
                            field: "year",
                            dir: "asc"
                        }
                    })
                }
            })

            $("#button").kendoButton({
                icon: "arrow-rotate-cw",
                click: function () {
                    let chart = $("#chart").data("kendoChart");

                    chart.setDataSource(dataSource);
                }
            })
        })
    </script>
```

## Intergation with Template Component

The Telerik Template component can be integrated to further enhance the No Data Template. For example, the Html.Kendo().Template() approach can be used to add more complex UI elements, such as buttons or forms, directly within the template. Here is an example:

```HtmlHelper
    @(Html.Kendo().Chart<Kendo.Mvc.Examples.Models.ElectricityProduction>()
        .Name("chart")
        .DataSource(ds => ds.Read(read => read.Action("_SpainElectricityProduction", "Bar_Charts")))
        .Series(series =>
        {
            series.Column(model => model.Nuclear).Name("Nuclear").CategoryField("Year");
            series.Column(model => model.Wind).Name("Wind").CategoryField("Year");
        })
        .NoData(nd => nd.Template(Html.Kendo().Template().AddHtml(@<text>No Data To display</text>).AddComponent(c => c.Button().Name("btn").Content("Reload").Events(ev => ev.Click("implementReloadFunctionality")))))
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *,Kendo.Mvc
     <kendo-chart name="chart">
        <no-data>
            <no-data-template>
                <div class='empty-template'>
                    <p>There is no data to display.</p>
                    <button id='button' type='button'>Load Data</button>
                </div>
            </no-data-template>
        </no-data>
        <category-axis>
            <category-axis-item>
                <labels>
                    <chart-category-axis-labels-rotation angle="-90" />
                </labels>
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
                                type="numeric">
                <labels format="{0:N0}">
                </labels>
                <line visible="false" />
            </value-axis-item>
        </value-axis>
        <chart-legend position="ChartLegendPosition.Top">
        </chart-legend>
        <chart-title text="Spain electricity production (GWh)">
        </chart-title>
        <tooltip format="{0:N0}" visible="true">
        </tooltip>
    </kendo-chart>
```
{% endif %}

## See Also

* [Using the API of the Chart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chart-api/index)
* [Basic Usage of the Area Chart HtmlHelper for {{ site.framework }} (Demos)](https://demos.telerik.com/{{ site.platform }}/area-charts/index)
* [Basic Usage of the Kendo UI Area Charts Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/area-charts/tag-helper)
* [Server-Side API](/api/chart)
