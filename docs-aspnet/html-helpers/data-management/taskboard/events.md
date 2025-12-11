---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI TaskBoard component for {{ site.framework }}."
components: ["taskboard"]
slug: taskboard_events
position: 10
---

# Events

You can subscribe to [all TaskBoard events](/api/kendo.mvc.ui.fluent/taskboardeventbuilder) and then use them to further customize the behavior of the TaskBoard.

The example below demonstrates how to subscribe to the [`DataBound`](/api/kendo.mvc.ui.fluent/taskboardeventbuilder#databoundsystemstring) and the [`ColumnDataBound`](/api/kendo.mvc.ui.fluent/taskboardeventbuilder#columnsdataboundsystemstring) events.

```HtmlHelper
    @using Kendo.Mvc.UI

    @(Html.Kendo().TaskBoard()
        .Name("taskBoard")
        // omitted for brevity
        .Events(ev =>
        {
            ev.ColumnsDataBound("onColumnDataBound");
            ev.DataBound("onDataBound");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-taskboard 
        name="taskBoard" 
        on-columns-data-bound="onColumnDataBound" 
        on-data-bound="onDataBound" >
        <!-- full configuration omitted for brevity -->
    </kendo-taskboard>
```
{% endif %}
```JavaScript
    function onColumnDataBound(e) {
        console.log("event: ColumnDataBound", e);
    }

    function onDataBound(e) {
        console.log("event: DataBound", e);
    }
```

## Next Steps

* [API for Configuring the TaskBoard Events](/api/kendo.mvc.ui.fluent/taskboardeventbuilder)
* [Using the TaskBoard Events (Demo)](https://demos.telerik.com/{{ site.platform }}/taskboard/events)

## See Also

* [Using the API of the TaskBoard for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/taskboard/api)
