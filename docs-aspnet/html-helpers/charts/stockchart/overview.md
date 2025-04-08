---
title: Overview
page_title: StockChart Overview
description: "Learn the basics when working with the Telerik UI StockChart component for {{ site.framework }}."
previous_url: /helpers/charts/stockchart/overview
slug: overview_stockcharthelper_aspnetcore
position: 0
---

# {{ site.framework }} StockChart Overview

{% if site.core %}
The Telerik UI StockChart TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI StockChart component.
{% else %}
The Telerik UI StockChart HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI StockChart component.
{% endif %}

The StockChart is a specialized control visualizing the price movement of any financial instrument over a certain period of time. StockCharts include extensive touch support and a navigator pane for easy browsing of extended time periods. Generally, StockCharts extend the Telerik UI Chart and share most of its features.

{% if site.has_cta_panels == true %}
{% include cta-panel-introduction.html %}
{% endif %}

To see the component in action, check the examples:

* [Demo page for the StockChart](https://demos.telerik.com/{{ site.platform }}/financial/index)

All of the following series types that are supported by the StockChart are also accessible from a Telerik UI Chart:

* [Candlestick](https://en.wikipedia.org/wiki/Candlestick_chart)
* [Open-high-low-close (OHLC)](https://en.wikipedia.org/wiki/Open-high-low-close_chart)
* Column
* Line
* Area

## Basic Configuration

When the StockChart is configured for [remote data binding]({% slug databinding_stockchart_aspnetcore %}), it makes AJAX requests to the specified `Read` endpoint.

The following example demonstrates a basic StockChart configuration with a DataSource, which requests the data from the server.

```HtmlHelper
    @(Html.Kendo().StockChart<Kendo.Mvc.Examples.Models.StockDataPoint>()
        .Name("stockChart")
        .DataSource(ds => ds.Read(read => read
            .Action("_StockData", "Home")
        ))
        .DateField("Date")
        .Series(series =>
        {
            series.Candlestick(s => s.Open, s => s.High, s => s.Low, s => s.Close);
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-stockchart name="stockChart" date-field="Date">
        <datasource>
            <transport>
                <read  url="@Url.Action("_StockData", "Home")"/>
            </transport>
            <schema>
                <model>
                    <fields>
                        <field name="Date" type="date"></field>
                        <field name="Close" type="number"></field>
                        <field name="Open" type="number"></field>
                        <field name="High" type="number"></field>
                        <field name="Low" type="number"></field>
                        <field name="Volume" type="number"></field>
                    </fields>
                </model>
            </schema>
        </datasource>
        <series>
            <series-item type="ChartSeriesType.Candlestick" open-field="Open" high-field="High" low-field="Low" close-field="Close"></series-item>
        </series>
    </kendo-stockchart>
```
```C# HomeController
    public IActionResult Index()
    {
        return View(); // The Action that returns the View with the StockChart.
    }

    public IActionResult _StockData()
    {
        using (var db = GetContext())
        {
            // Return the data as JSON.
            return Json(
                (from s in db.Stocks
                where s.Symbol == "BA"
                select new StockDataPoint
                {
                    Date = s.Date,
                    Open = s.Open,
                    High = s.High,
                    Low = s.Low,
                    Close = s.Close,
                    Volume = s.Volume
                }).ToList()
            );
        }
    }
```
{% else %}
```C# HomeController
    public ActionResult Index()
    {
        return View(); // The Action that returns the View with the StockChart.
    }

    public ActionResult _StockData()
    {
        using (var db = GetContext())
        {
            // Return the data as JSON.
            return Json(
                (from s in db.Stocks
                where s.Symbol == "BA"
                select new StockDataPoint
                {
                    Date = s.Date,
                    Open = s.Open,
                    High = s.High,
                    Low = s.Low,
                    Close = s.Close,
                    Volume = s.Volume
                }).ToList(), 
                JsonRequestBehavior.AllowGet
            );
        }
    }
```
{% endif %}
```Model
    public class StockDataPoint
    {
        public DateTime Date { get; set; }

        public decimal Close { get; set; }

        public long Volume { get; set; }

        public decimal Open { get; set; }

        public decimal High { get; set; }

        public decimal Low { get; set; }

        public string Symbol { get; set; }
    }
```

The Navigator of the StockChart represents a pane that renders at the bottom of the chart that changes the date interval in the main pane. You can drag or scroll the Navigator to select the desired date range.

The following example shows how to enable and configure the Navigator of the chart.

```HtmlHelper
    @(Html.Kendo().StockChart<Kendo.Mvc.Examples.Models.StockDataPoint>()
        .Name("stockChart")
        .DataSource(ds => ds.Read(read => read
            .Action("_StockData", "Home")
        ))
        .DateField("Date")
        .Series(series =>
        {
            series.Candlestick(s => s.Open, s => s.High, s => s.Low, s => s.Close);
        })
        .Navigator(nav => nav
            .Series(series =>
            {
                series.Area(s => s.Close); // Specify the field that holds the series data for the Navigator.
            })
            .Select( // Specifies the initially selected date range.
                DateTime.Parse("2009/02/05"),
                DateTime.Parse("2011/10/07")
            )
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-stockchart name="stockChart" date-field="Date">
        <datasource>
            <transport>
                <read  url="@Url.Action("_StockData", "Home")"/>
            </transport>
            <schema>
                <model>
                    <fields>
                        <field name="Date" type="date"></field>
                        <field name="Close" type="number"></field>
                        <field name="Open" type="number"></field>
                        <field name="High" type="number"></field>
                        <field name="Low" type="number"></field>
                        <field name="Volume" type="number"></field>
                    </fields>
                </model>
            </schema>
        </datasource>
        <series>
            <series-item type="ChartSeriesType.Candlestick" open-field="Open" high-field="High" low-field="Low" close-field="Close"></series-item>
        </series>
        <navigator>
            <navigator-series> <!-- Specify the field that holds the series data for the Navigator.-->
                <series-item type="ChartSeriesType.Area" field="Close"></series-item>
            </navigator-series>
            <!-- Specifies the initially selected date range.-->
            <select from="new DateTime(2009,02,05)" to="new DateTime(2011,10,07)"></select>
        </navigator>
    </kendo-stockchart>
```
{% endif %}

## Functionality and Features

* [Data Binding]({% slug databinding_stockchart_aspnetcore %})&mdash;You can bind the StockChart to local or remote data.
* [Multiple Panes]({% slug multiple_panes_stockchart_aspnetcore%})&mdash;Configure the StockChart with multiple panes.
* [PDF Export]({% slug pdf_export_stockchart_aspnetcore%})&mdash;Export the StockChart to PDF.
* [Events]({% slug stockchart_events%})&mdash;Subscribe to the available client events and implement any custom logic.

## Next Steps

* [Getting Started with the StockChart]({% slug stockchart_getting_started %})
* [Basic Usage of the StockChart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/financial)
{% if site.core %}
* [StockChart in Razor Pages]({% slug htmlhelper_chart_razorpages_aspnetcore %})
{% endif %}


## See Also

* [Server-Side HtmlHelper API of the StockChart](/api/stockchart)
{% if site.core %}
* [Server-Side TagHelper API of the StockChart](/api/taghelpers/stockchart)
{% endif %}
* [Knowledge Base Section](/knowledge-base)
