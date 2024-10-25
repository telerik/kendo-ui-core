---
title: Date Axis
page_title: Date Axis
description: "Learn how to set the Date Axis of Telerik UI Bar Charts component for {{ site.framework }}."
slug: barcharts_date_axis
---

# Date Axis

You can scale the date axis of your ASP.NET Core Bar Chart to get a better visualization of the seasonal data in your app. This can be done by modifying:

* The base date unit of the x-axis through the CategoryAxis.BaseUnit method, which takes seconds, minutes, hours, days, week, months and years.
* The default aggregates of the series through the Series.Aggregate property, which takes max, min, sum, avg and count.

This implementation provides the opportunity to represent the data for the Bar Chart in by different categories and aggregates. Choose the best visualization for the needs of your application, set the category and/or aggregations and observe the result.

The following implementation demonstrates the code needed for setting the Date Axis for Bar Chart:

```HtmlHelper
 @model IEnumerable<Kendo.Mvc.Examples.Models.DatePoint>

<div class="configurator">
    <div class="header">Configurator</div>
    <div class="box-col">
        <h4>Base date unit</h4>
        <ul class="options">
            <li>
                <input id="baseUnitAuto" name="baseUnit"
                       type="radio" value="" autocomplete="off" />
                <label for="baseUnitAuto">Automatic (default)</label>
            </li>
            <li>
                <input id="baseUnitYears" name="baseUnit"
                       type="radio" value="years" autocomplete="off" />
                <label for="baseUnitYears">Years</label>
            </li>
            <li>
                <input id="baseUnitMonths" name="baseUnit"
                       type="radio" value="months" autocomplete="off" />
                <label for="baseUnitMonths">Months</label>
            </li>
            <li>
                <input id="baseUnitWeeks" name="baseUnit"
                       type="radio" value="weeks" checked="checked" autocomplete="off" />
                <label for="baseUnitWeeks">Weeks</label>
            </li>
            <li>
                <input id="baseUnitDays" name="baseUnit"
                       type="radio" value="days" autocomplete="off" />
                <label for="baseUnitDays">Days</label>
            </li>
        </ul>
    </div>
    <div class="box-col">
        <h4>Aggregate function</h4>
        <ul class="options">
            <li>
                <input id="aggregateMax" name="aggregate"
                       type="radio" value="max" autocomplete="off" />
                <label for="aggregateMax">Max (default)</label>
            </li>
            <li>
                <input id="aggregateMin" name="aggregate"
                       type="radio" value="min" autocomplete="off" />
                <label for="aggregateMin">Min</label>
            </li>
            <li>
                <input id="aggregateSum" name="aggregate"
                       type="radio" value="sum" autocomplete="off" />
                <label for="aggregateSum">Sum</label>
            </li>
            <li>
                <input id="aggregateAvg" name="aggregate"
                       type="radio" value="avg" checked="checked" autocomplete="off" />
                <label for="aggregateAvg">Avg</label>
            </li>
            <li>
                <input id="aggregateCount" name="aggregate"
                       type="radio" value="count" autocomplete="off" />
                <label for="aggregateCount">Count</label>
            </li>
        </ul>
    </div>
</div>

<div class="demo-section k-content wide">
    @(Html.Kendo().Chart(Model)
        .Name("chart")
        .Series(series =>
            {
                series
                    .Column(model => model.Value, categoryExpression: model => model.Date)
                .Aggregate(ChartSeriesAggregate.Avg);
        })
        .CategoryAxis(axis => axis
            .Date()
            .BaseUnit(ChartAxisBaseUnit.Weeks)
            .MajorGridLines(lines => lines.Visible(false))
        )
        .ValueAxis(axis => axis
            .Numeric()
            .Line(line => line.Visible(false))
        )
    )
</div>

<script>
        $(document).ready( function () {
            $(".configurator").bind("change", refresh);
        });

        function refresh() {
            var chart = $("#chart").data("kendoChart"),
                series = chart.options.series,
                categoryAxis = chart.options.categoryAxis,
                baseUnitInputs = $("input:radio[name=baseUnit]"),
                aggregateInputs = $("input:radio[name=aggregate]");

            for (var i = 0, length = series.length; i < length; i++) {
                series[i].aggregate = aggregateInputs.filter(":checked").val();
            }

            categoryAxis.baseUnit = baseUnitInputs.filter(":checked").val();

            chart.refresh();
        }
    </script>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    @model IEnumerable<Kendo.Mvc.Examples.Models.DatePoint>
    @{
        var data = Model.ToArray();
    }
    <div class="configurator">
        <div class="header">Configurator</div>
        <div class="box-col">
            <h4>Base date unit</h4>
            <ul class="options">
                <li>
                    <input id="baseUnitAuto" name="baseUnit"
                            type="radio" value="" autocomplete="off" />
                    <label for="baseUnitAuto">Automatic (default)</label>
                </li>
                <li>
                    <input id="baseUnitYears" name="baseUnit"
                            type="radio" value="years" autocomplete="off" />
                    <label for="baseUnitYears">Years</label>
                </li>
                <li>
                    <input id="baseUnitMonths" name="baseUnit"
                            type="radio" value="months" autocomplete="off" />
                    <label for="baseUnitMonths">Months</label>
                </li>
                <li>
                    <input id="baseUnitWeeks" name="baseUnit"
                            type="radio" value="weeks" checked="checked" autocomplete="off" />
                    <label for="baseUnitWeeks">Weeks</label>
                </li>
                <li>
                    <input id="baseUnitDays" name="baseUnit"
                            type="radio" value="days" autocomplete="off" />
                    <label for="baseUnitDays">Days</label>
                </li>
            </ul>
        </div>
        <div class="box-col">
            <h4>Aggregate function</h4>
            <ul class="options">
                <li>
                    <input id="aggregateMax" name="aggregate"
                            type="radio" value="max" autocomplete="off" />
                    <label for="aggregateMax">Max (default)</label>
                </li>
                <li>
                    <input id="aggregateMin" name="aggregate"
                            type="radio" value="min" autocomplete="off" />
                    <label for="aggregateMin">Min</label>
                </li>
                <li>
                    <input id="aggregateSum" name="aggregate"
                            type="radio" value="sum" autocomplete="off" />
                    <label for="aggregateSum">Sum</label>
                </li>
                <li>
                    <input id="aggregateAvg" name="aggregate"
                            type="radio" value="avg" checked="checked" autocomplete="off" />
                    <label for="aggregateAvg">Avg</label>
                </li>
                <li>
                    <input id="aggregateCount" name="aggregate"
                            type="radio" value="count" autocomplete="off" />
                    <label for="aggregateCount">Count</label>
                </li>
            </ul>
        </div>
    </div>

    <div class="demo-section wide">
        <kendo-chart name="chart">
            <category-axis>
                <category-axis-item base-unit="ChartAxisBaseUnit.Weeks" type="ChartCategoryAxisType.Date">
                    <major-grid-lines visible="false"/>
                </category-axis-item>
            </category-axis>
            <series>
                <series-item type="ChartSeriesType.Column" category-field="Date" field="Value" aggregate="ChartSeriesAggregate.Avg" data="data">
                </series-item>
            </series>
            <value-axis>
                <value-axis-item name="" type="numeric">
                    <line visible="false"/>
                </value-axis-item>
            </value-axis>
        </kendo-chart>
    </div>


    <script>
        $(document).on("kendoReady", function () {
            $(".configurator").bind("change", refresh);
        });
        function refresh() {
            var chart = $("#chart").data("kendoChart"),
                series = chart.options.series,
                categoryAxis = chart.options.categoryAxis,
                baseUnitInputs = $("input:radio[name=baseUnit]"),
                aggregateInputs = $("input:radio[name=aggregate]");
            for (var i = 0, length = series.length; i < length; i++) {
                series[i].aggregate = aggregateInputs.filter(":checked").val();
            }
            categoryAxis.baseUnit = baseUnitInputs.filter(":checked").val();
            chart.refresh();
        }
    </script>

```
{% endif %}

* [Demo page of the Date Axis for Bar Chart](https://demos.telerik.com/{{ site.platform }}/bar-charts/date-axis)

## See Also
* [Basic Usage of Bar Charts for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/bar-charts)
* [Stacked and Grouped Charts for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/bar-charts/grouped-stacked-bar)
