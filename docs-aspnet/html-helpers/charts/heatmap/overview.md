---
title: Overview
page_title: HeatMap Overview
description: "Learn how to initialize the Telerik UI HeatMap component for {{ site.framework }} and use its events."
slug: overview_heatmaphelper_aspnetcore
position: 1
---

# HeatMap Overview

{% if site.core %}
The Telerik UI HeatMap TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI HeatMap widget.
{% else %}
The Telerik UI HeatMap HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI HeatMap widget.
{% endif %}

The HeatMap uses colors to indicate the relative value of data points in two dimensions. HeatMap charts are suitable for visualizing the magnitude of a value over two dimensions.

{% if site.has_cta_panels == true %}
{% include cta-panel-introduction.html %}
{% endif %}

To see the component in action, check the examples:

* [Demo page for the HeatMap HtmlHelper](https://demos.telerik.com/{{ site.platform }}/heatmap/index)
{% if site.core %}
* [Demo page for the HeatMap TagHelper](https://demos.telerik.com/{{ site.platform }}/heatmap/tag-helper)
{% endif %}

## Basic configuration

The following example demonstrates how to define a HeatMap.

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("heatmap")
        .Title("Source control contributions for the last 12 weeks")
        .Series(series =>
        {
            series.HeatMap(new object[] {
                                new {Week = 1, Day = "Mon", Value = 8},  new {Week = 1, Day = "Tue", Value = 4},  new {Week = 1, Day = "Wed", Value = 7},  new {Week = 1, Day = "Thu", Value = 14}, new {Week = 1, Day = "Fri", Value = 10}, new {Week = 1, Day = "Sat", Value = 0}, new {Week = 1, Day = "Sun", Value = 0},
            new {Week = 2, Day = "Mon", Value = 6},  new {Week = 2, Day = "Tue", Value = 6},  new {Week = 2, Day = "Wed", Value = 9},  new {Week = 2, Day = "Thu", Value = 12}, new {Week = 2, Day = "Fri", Value = 12}, new {Week = 2, Day = "Sat", Value = 3}, new {Week = 2, Day = "Sun", Value = 0},
            new {Week = 3, Day = "Mon", Value = 5},  new {Week = 3, Day = "Tue", Value = 5},  new {Week = 3, Day = "Wed", Value = 8},  new {Week = 3, Day = "Thu", Value = 11}, new {Week = 3, Day = "Fri", Value = 0}, new {Week = 3, Day = "Sat", Value = 1}, new {Week = 3, Day = "Sun", Value = 0},
            new {Week = 4, Day = "Mon", Value = 0},  new {Week = 4, Day = "Tue", Value = 0},  new {Week = 4, Day = "Wed", Value = 0},  new {Week = 4, Day = "Thu", Value = 0}, new {Week = 4, Day = "Fri", Value = 0}, new {Week = 4, Day = "Sat", Value = 0}, new {Week = 4, Day = "Sun", Value = 0},
            new {Week = 5, Day = "Mon", Value = 9},  new {Week = 5, Day = "Tue", Value = 0},  new {Week = 5, Day = "Wed", Value = 0},  new {Week = 5, Day = "Thu", Value = 0}, new {Week = 5, Day = "Fri", Value = 0}, new {Week = 5, Day = "Sat", Value = 0}, new {Week = 5, Day = "Sun", Value = 0},
            new {Week = 6, Day = "Mon", Value = 6},  new {Week = 6, Day = "Tue", Value = 4},  new {Week = 6, Day = "Wed", Value = 7},  new {Week = 6, Day = "Thu", Value = 14}, new {Week = 6, Day = "Fri", Value = 10}, new {Week = 6, Day = "Sat", Value = 2}, new {Week = 6, Day = "Sun", Value = 0},
            new {Week = 7, Day = "Mon", Value = 4},  new {Week = 7, Day = "Tue", Value = 6},  new {Week = 7, Day = "Wed", Value = 9},  new {Week = 7, Day = "Thu", Value = 2}, new {Week = 7, Day = "Fri", Value = 4}, new {Week = 7, Day = "Sat", Value = 0}, new {Week = 7, Day = "Sun", Value = 0},
            new {Week = 8, Day = "Mon", Value = 11},  new {Week = 8, Day = "Tue", Value = 4},  new {Week = 8, Day = "Wed", Value = 7},  new {Week = 8, Day = "Thu", Value = 14}, new {Week = 8, Day = "Fri", Value = 10}, new {Week = 8, Day = "Sat", Value = 0}, new {Week = 8, Day = "Sun", Value = 0},
            new {Week = 9, Day = "Mon", Value = 5},  new {Week = 9, Day = "Tue", Value = 4},  new {Week = 9, Day = "Wed", Value = 7},  new {Week = 9, Day = "Thu", Value = 4}, new {Week = 9, Day = "Fri", Value = 1}, new {Week = 9, Day = "Sat", Value = 0}, new {Week = 9, Day = "Sun", Value = 0},
            new {Week = 10, Day = "Mon", Value = 3}, new {Week = 10, Day = "Tue", Value = 6}, new {Week = 10, Day = "Wed", Value = 9}, new {Week = 10, Day = "Thu", Value = 12}, new {Week = 10, Day = "Fri", Value = 12}, new {Week = 10, Day = "Sat", Value = 4}, new {Week = 10, Day = "Sun", Value = 0},
            new {Week = 11, Day = "Mon", Value = 1}, new {Week = 11, Day = "Tue", Value = 4}, new {Week = 11, Day = "Wed", Value = 7}, new {Week = 11, Day = "Thu", Value = 10}, new {Week = 11, Day = "Fri", Value = 10}, new {Week = 11, Day = "Sat", Value = 0}, new {Week = 11, Day = "Sun", Value = 0},
            new {Week = 12, Day = "Mon", Value = 0}, new {Week = 12, Day = "Tue", Value = 4}, new {Week = 12, Day = "Wed", Value = 7}, new {Week = 12, Day = "Thu", Value = 8}, new {Week = 12, Day = "Fri", Value = 10}, new {Week = 12, Day = "Sat", Value = 0}, new {Week = 12, Day = "Sun", Value = 0}
                    }).xField("Week").yField("Day").Field("Value");
        })
        .Tooltip(t => t.Visible(true).Template("#:value.value# contributions on #:value.y#, week #:value.x#"))
        .XAxis(x=>x
            .Numeric()
            .Labels(l=>l.Template("Week #:value#").Rotation(45))
        )
        .YAxis(y=>y
            .Categories(new[] { "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"})
        )
    )
```
{% if site.core %}
```TagHelper
 @addTagHelper *, Kendo.Mvc
    @{
    var categories = new string[] { "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" };

    var data = new object[] {
        new {Week = 1, Day = "Mon", Value = 8},  new {Week = 1, Day = "Tue", Value = 4},  new {Week = 1, Day = "Wed", Value = 7},  new {Week = 1, Day = "Thu", Value = 14}, new {Week = 1, Day = "Fri", Value = 10}, new {Week = 1, Day = "Sat", Value = 0}, new {Week = 1, Day = "Sun", Value = 0},
        new {Week = 2, Day = "Mon", Value = 6},  new {Week = 2, Day = "Tue", Value = 6},  new {Week = 2, Day = "Wed", Value = 9},  new {Week = 2, Day = "Thu", Value = 12}, new {Week = 2, Day = "Fri", Value = 12}, new {Week = 2, Day = "Sat", Value = 3}, new {Week = 2, Day = "Sun", Value = 0},
        new {Week = 3, Day = "Mon", Value = 5},  new {Week = 3, Day = "Tue", Value = 5},  new {Week = 3, Day = "Wed", Value = 8},  new {Week = 3, Day = "Thu", Value = 11}, new {Week = 3, Day = "Fri", Value = 0}, new {Week = 3, Day = "Sat", Value = 1}, new {Week = 3, Day = "Sun", Value = 0},
        new {Week = 4, Day = "Mon", Value = 0},  new {Week = 4, Day = "Tue", Value = 0},  new {Week = 4, Day = "Wed", Value = 0},  new {Week = 4, Day = "Thu", Value = 0}, new {Week = 4, Day = "Fri", Value = 0}, new {Week = 4, Day = "Sat", Value = 0}, new {Week = 4, Day = "Sun", Value = 0},
        new {Week = 5, Day = "Mon", Value = 9},  new {Week = 5, Day = "Tue", Value = 0},  new {Week = 5, Day = "Wed", Value = 0},  new {Week = 5, Day = "Thu", Value = 0}, new {Week = 5, Day = "Fri", Value = 0}, new {Week = 5, Day = "Sat", Value = 0}, new {Week = 5, Day = "Sun", Value = 0},
        new {Week = 6, Day = "Mon", Value = 6},  new {Week = 6, Day = "Tue", Value = 4},  new {Week = 6, Day = "Wed", Value = 7},  new {Week = 6, Day = "Thu", Value = 14}, new {Week = 6, Day = "Fri", Value = 10}, new {Week = 6, Day = "Sat", Value = 2}, new {Week = 6, Day = "Sun", Value = 0},
        new {Week = 7, Day = "Mon", Value = 4},  new {Week = 7, Day = "Tue", Value = 6},  new {Week = 7, Day = "Wed", Value = 9},  new {Week = 7, Day = "Thu", Value = 2}, new {Week = 7, Day = "Fri", Value = 4}, new {Week = 7, Day = "Sat", Value = 0}, new {Week = 7, Day = "Sun", Value = 0},
        new {Week = 8, Day = "Mon", Value = 11},  new {Week = 8, Day = "Tue", Value = 4},  new {Week = 8, Day = "Wed", Value = 7},  new {Week = 8, Day = "Thu", Value = 14}, new {Week = 8, Day = "Fri", Value = 10}, new {Week = 8, Day = "Sat", Value = 0}, new {Week = 8, Day = "Sun", Value = 0},
        new {Week = 9, Day = "Mon", Value = 5},  new {Week = 9, Day = "Tue", Value = 4},  new {Week = 9, Day = "Wed", Value = 7},  new {Week = 9, Day = "Thu", Value = 4}, new {Week = 9, Day = "Fri", Value = 1}, new {Week = 9, Day = "Sat", Value = 0}, new {Week = 9, Day = "Sun", Value = 0},
        new {Week = 10, Day = "Mon", Value = 3}, new {Week = 10, Day = "Tue", Value = 6}, new {Week = 10, Day = "Wed", Value = 9}, new {Week = 10, Day = "Thu", Value = 12}, new {Week = 10, Day = "Fri", Value = 12}, new {Week = 10, Day = "Sat", Value = 4}, new {Week = 10, Day = "Sun", Value = 0},
        new {Week = 11, Day = "Mon", Value = 1}, new {Week = 11, Day = "Tue", Value = 4}, new {Week = 11, Day = "Wed", Value = 7}, new {Week = 11, Day = "Thu", Value = 10}, new {Week = 11, Day = "Fri", Value = 10}, new {Week = 11, Day = "Sat", Value = 0}, new {Week = 11, Day = "Sun", Value = 0},
        new {Week = 12, Day = "Mon", Value = 0}, new {Week = 12, Day = "Tue", Value = 4}, new {Week = 12, Day = "Wed", Value = 7}, new {Week = 12, Day = "Thu", Value = 8}, new {Week = 12, Day = "Fri", Value = 10}, new {Week = 12, Day = "Sat", Value = 0}, new {Week = 12, Day = "Sun", Value = 0}
    };
}
    <kendo-chart name="heatmap">
        <series>
            <series-item type="ChartSeriesType.HeatMap"
                         field="Value"
                         x-field="Week"
                         y-field="Day"
                         data="data">
            </series-item>
        </series>
        <x-axis>
            <x-axis-item type="numeric">
                <labels template="Week #:value#">
                    <chart-x-axis-labels-rotation angle="45" />
                </labels>
            </x-axis-item>
        </x-axis>
        <y-axis>
            <y-axis-item categories="categories">
            </y-axis-item>
        </y-axis>
        <chart-title text="Source control contributions for the last 12 weeks">
        </chart-title>
        <tooltip template="#:value.value# contributions on #:value.y#, week #:value.x#" visible="true">
        </tooltip>
    </kendo-chart>
```
{% endif %}

## Events

You can subscribe to all HeatMap [events](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/treemap#events).

### Handling Events by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().Chart()
            .Name("heatmap")
            // other configuration
            .Events(events => events
                .DataBound("onDataBound")
            )
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    <kendo-chart name="heatmap" 
                on-data-bound="onDataBound">
    </kendo-chart>
```
{% endif %}
```script.js
    <script>
    function onDataBound(e) {
        // Handle the dataBound event.
    }
    </script>
```

{% if site.core %}
### Handling Events by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().Chart()
            .Name("heatmap")
            .Events(e => e
                .DataBound(@<text>
                function(e) {
                    // Handle the dataBound event.
                }
                </text>)
            )
    )
```

{% endif %}

## Referencing Existing Instances

To reference an existing Kendo UI HeatMap instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Client-side API](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart) to control its behavior.

    // Place the following after the declaration of the TreeMap for {{ site.framework }}.
    <script>
        $(function() {
            // The Name() of the TreeMap is used to get its client-side instance.
            var heatMap = $("#heatmap").data("kendoChart");
        });
    </script>

## See Also

* [Demo of the HeatMap HtmlHelper for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/heatmap/index)
* [Demo of the HeatMap TagHelper for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/heatmap/tag-helper)
* [Server-Side API](/api/chart)
