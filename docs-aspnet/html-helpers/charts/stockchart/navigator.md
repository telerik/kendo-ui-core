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


## See Also 

* [Basic Usage of the StockChart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/financial/index)
* [Server-Side API of the StockChart for {{ site.framework }}](/api/stockchart)