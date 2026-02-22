---
title: Multiple Panes
page_title: Multiple Panes
description: "Learn how to configure the Telerik UI StockChart component for {{ site.framework }} with multiple panes."
components: ["stockchart"]
slug: multiple_panes_stockchart_aspnetcore
position: 3
---

# Multiple Panes

The StockChart allows you to create multiple panes with a shared category axis.

Each pane represents a vertical sub-division with an individual value axis. To define multiple panes, apply the following options:

1. Add the desired panes within the `Panes` configuration of the chart:

    ```HtmlHelper
        .Panes(panes =>
        {
            panes.Add().Title("Value").Background("#ebedeb"); // The main chart pane.
            panes.Add("volume").Title("Volume").Height(150); // An additional pane.
        })
    ```
    {% if site.core %}
    ```TagHelper
        <panes>
            <pane> <!-- The main chart pane.-->
                <chart-pane-title text="Value" background="#ebedeb"></chart-pane-title>
            </pane>
            <pane name="volume" height="150"> <!-- An additional pane.-->
                <chart-pane-title text="Volume"></chart-pane-title>
            </pane>
        </panes>
    ```
    {% endif %}

1. Specify a value axis for each pane. By using the `Pane` option, set the pane name where the respective axis must be rendered.

    ```HtmlHelper
        .ValueAxis(axis => axis.Numeric("valueAxis")) // The value axis that renders in the main pane.
        .ValueAxis(axis => axis.Numeric("volumeAxis").Pane("volume")) // The value axis that renders in the "volume" pane.
    ```
    {% if site.core %}
    ```TagHelper
        <value-axis>
            <value-axis-item type="numeric" name="valueAxis"></value-axis-item> <!-- The value axis that renders in the main pane. -->
            <value-axis-item type="numeric" name="volumeAxis" pane="volume"></value-axis-item> <!-- The value axis that renders in the "volume" pane.-->
        </value-axis>
    ```
    {% endif %}

1. Assign the series on a value axis, which is placed in the desired pane.

    ```HtmlHelper
        .Series(series =>
        {
            series.Candlestick(s => s.Open, s => s.High, s => s.Low, s => s.Close).Axis("valueAxis");
            series.Column(s => s.Volume).Axis("volumeAxis");
        })
    ```
    {% if site.core %}
    ```TagHelper
        <series>
            <series-item type="ChartSeriesType.Candlestick" axis="valueAxis" open-field="Open" high-field="High" low-field="Low" close-field="Close"></series-item>
            <series-item type="ChartSeriesType.Column" axis="volumeAxis" field="Volume">
            </series-item>
        </series>
    ```
    {% endif %}

1. Position the category axis in the desired pane by setting the name of the pane through the `Pane` option.

    ```HtmlHelper
        .CategoryAxis(axis => axis.Pane("volume"))
    ```
    {% if site.core %}
    ```TagHelper
        <category-axis>
            <category-axis-item pane="volume"></category-axis-item>
        </category-axis>
    ```
    {% endif %} 

The following example shows a complete configuration of a StockChart with **Value** and **Volume** panes. The category axis is displayed within the **Volume** pane.

```HtmlHelper
    @(Html.Kendo().StockChart<StockDataPoint>()
        .Name("stockChart")
        .Title("The Boeing Company (NYSE:BA)")
        .DataSource(ds => ds.Read(read => read
            .Action("_StockData", "Home")
        ))
        .DateField("Date")
        .Panes(panes =>
        {
            panes.Add().Title("Value").Background("#ebedeb");
            panes.Add("volume").Title("Volume").Height(150);
        })
        .CategoryAxis(axis => axis.Pane("volume"))
        .ValueAxis(axis => axis.Numeric("valueAxis"))
        .ValueAxis(axis => axis.Numeric("volumeAxis").Pane("volume"))
        .Series(series =>
        {
            series.Candlestick(s => s.Open, s => s.High, s => s.Low, s => s.Close).Axis("valueAxis");
            series.Column(s => s.Volume).Axis("volumeAxis");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-stockchart name="stockChart" date-field="Date">
        <chart-title text="The Boeing Company (NYSE:BA)"></chart-title>
        <datasource>
            <transport>
                <read url="@Url.Action("_StockData", "Home")" />
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
        <panes>
            <pane background="#ebedeb"> 
                <chart-pane-title text="Value" ></chart-pane-title>
            </pane>
            <pane name="volume" height="150">
                <chart-pane-title text="Volume"></chart-pane-title>
            </pane>
        </panes>
        <category-axis>
            <category-axis-item pane="volume"></category-axis-item>
        </category-axis>
        <value-axis>
            <value-axis-item type="numeric" name="valueAxis"></value-axis-item>
            <value-axis-item type="numeric" name="volumeAxis" pane="volume"></value-axis-item>
        </value-axis>
        <series>
            <series-item type="ChartSeriesType.Candlestick" aixs="valueAxis" open-field="Open" high-field="High" low-field="Low" close-field="Close"></series-item>
            <series-item type="ChartSeriesType.Column" axis="volumeAxis" field="Volume">
            </series-item>
        </series>
    </kendo-stockchart>
```
```C# HomeController
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

## See Also

* [Configuring Multiple Panes of the StockChart for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/financial/panes)
* [Client-Side API of the StockChart](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/stock-chart)
* [Server-Side API of the StockChart](/api/stockchart)