---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI StockChart component for {{ site.framework }}."
slug: stockchart_events
position: 5
---

# Events

The StockChart exposes a variety of [events](api/kendo.mvc.ui.fluent/stockcharteventbuilder) that you can handle and further customize the behavior of the UI component.

For a complete example on basic Chart events, refer to the [demo on using the events of the Chart](https://demos.telerik.com/{{ site.platform }}/chart-api/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().StockChart<StockDataPoint>()
         .Name("stockChart")
         .Events((Action<Kendo.Mvc.UI.Fluent.StockChartEventBuilder>)(e => e.Render("onDataBound")))
    )
```
{% if site.core %}
```TagHelper
    <kendo-stockchart name="stockChart" on-render="onRender">
    </kendo-stockchart>
```
{% endif %}

```JavaScript
    <script>
        function onRender(e) {
            // Handle the "render" event.
        }
    </script>
```

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().StockChart<StockDataPoint>()
         .Name("stockChart")
         .Events((Action<Kendo.Mvc.UI.Fluent.StockChartEventBuilder>)(e => e.Render(@<text>
                function() {
                    // Handle the render event inline.
                }
           </text>))
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-stockchart name="stockChart" 
                      on-render="function() {
                        // Handle the render event inline.
                      }">
    </kendo-stockchart>
```
{% endif %}

## Next Steps

* [Binding the StockChart to Data]({% slug databinding_stockchart_aspnetcore %})
* [Creating a Stock History Dashboard (Demo)](https://demos.telerik.com/{{ site.platform }}/financial/stock-history)

## See Also

* [Client-Side API of the StockChart](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/stock-chart)
* [Server-Side HtmlHelper API of the StockChart](/api/stockchart)
{% if site.core %}
* [Server-Side TagHelper API of the StockChart](/api/taghelpers/stockchart)
{% endif %}
