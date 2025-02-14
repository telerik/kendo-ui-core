---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Chart component for {{ site.framework }}."
slug: events_chart_aspnetcore
position: 6
---

# Events

You can subscribe to all Chart [events](/api/kendo.mvc.ui.fluent/charteventbuilder).

## Handling by Handler Name

The following examples demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().Chart<Kendo.Mvc.Examples.Models.ElectricityProduction>()
        .Name("chart")
        .Events(events => events
            .SeriesClick("onSeriesClick")
            .DataBound("onDataBound")
        )
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    <kendo-chart name="chart" 
                on-series-click="onSeriesClick" 
                on-data-bound="onDataBound">
    </kendo-chart>
```
{% endif %}
```script.js
    <script>
        function onSeriesClick(e) {
            // Handle the seriesClick event
        }

        function onDataBound(e) {
            // Handle the dataBound event
        }
    </script>
```

## Handling by Template Delegate

```HtmlHelper
    @(Html.Kendo().Chart<Kendo.Mvc.Examples.Models.ElectricityProduction>()
        .Name("chart")
        .Events(events => events
            .SeriesClick(@<text>
                function() {
                    // Handle the seriesClick event
                }
            </text>)
            .DataBound(@<text>
                function() {
                    // Handle the dataBound event
                }
            </text>)
        )
    )
```

## Next Steps

* [Getting Started with the Bar Chart]({% slug bar_chart_getting_started %})
* [Basic Usage of the Charts for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/charts)

## See Also

* [Client-Side API of the Chart](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart)
* [Server-Side API of the Chart](/api/chart)
* [Knowledge Base Section](/knowledge-base)
