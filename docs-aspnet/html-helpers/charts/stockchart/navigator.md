---
title: Navigator
page_title: Navigator
description: "Get started with the Telerik UI StockChart component for {{ site.framework }} and learn how to configure and use the Navigator pane."
slug: navigator_stockchart_aspnetcore
position: 3
---

# Navigator 

The navigator of the Telerik UI for {{ site.framework }} StockChart represents a pane that is placed at the bottom of the chart and can be used to change the date interval in the main panes.

The following example demonstrates how to define a ButtonGroup in the ToolBar component:

```HtmlHelper
    @(Html.Kendo().StockChart<Kendo.Mvc.Examples.Models.StockDataPoint>()
        .Name("stockChart")
        .DataSource(ds => ds.Read(read => read
            .Action("_BoeingStockData", "Financial")
        ))
        .DateField("Date")
        .CategoryAxis(axis => axis.Pane("volumePane"))
        .ValueAxis(axis => axis.Numeric().Line(line => line.Visible(false)))
        .ValueAxis(axis => axis.Numeric("volumeAxis").Pane("volumePane").Visible(false))
        .Series(series =>
        {
            series.Candlestick(s => s.Open, s => s.High, s => s.Low, s => s.Close);
            series.Column(s => s.Volume).Axis("volumeAxis")
                    .Tooltip(tooltip => tooltip.Format("{0:C0}"));
        })
        .Navigator(nav => nav
            .Series(series =>
            {
                series.Area(s => s.Close);
            })
            .Select(
                DateTime.Parse("2009/02/05"),
                DateTime.Parse("2011/10/07")
            )
        )
    )
```
{% if site.core %}
```TagHelper
        <kendo-stockchart name="stockChart"
                      date-field="Date">
        <chart-title text="The Boeing Company (NYSE:BA)"></chart-title>
        <datasource custom-type="aspnetmvc-ajax"
                    server-paging="true"
                    server-filtering="true"
                    server-grouping="true">
            <transport>
                <read url="@Url.Action("_BoeingStockData", "Financial")" />
            </transport>
             <schema>
                <model>
                    <fields>
                        <field name="Date" type="date"></field>
                        <field name="Close" type="number"></field>
                        <field name="Volume" type="number"></field>
                        <field name="Open" type="number"></field>
                        <field name="High" type="number"></field>
                        <field name="Low" type="number"></field>
                        <field name="Symbol" type="string"></field>
                    </fields>
                </model>
            </schema>
        </datasource>
        <category-axis>
            <category-axis-item pane="volumePane"></category-axis-item>
        </category-axis>
        <value-axis>
            <value-axis-item type="numeric">
                <line visible="false"/>
            </value-axis-item>
            <value-axis-item type="numeric" name="volumeAxis" pane="volumePane" visible="false"></value-axis-item>
        </value-axis>
        <navigator>
            <navigator-series>
                <series-item type="ChartSeriesType.Area" field="Close"></series-item>
            </navigator-series>
            <select from="new DateTime(2009,02,05)" to="new DateTime(2011,10,07)"></select>
        </navigator>
        <series>
            <series-item type="ChartSeriesType.Candlestick" open-field="Open" high-field="High" low-field="Low" close-field="Close"></series-item>
            <series-item type="ChartSeriesType.Column" axis="volumeAxis" field="Volume">
                <tooltip format="{0:C0}"></tooltip>
            </series-item>
        </series>
    </kendo-stockchart>
```
{% endif %}


## See Also 

* [Basic Usage of the StockChart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/financial/index)
* [Server-Side API of the StockChart for {{ site.framework }}](/api/stockchart)