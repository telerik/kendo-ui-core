---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI TimePicker component for {{ site.framework }}."
slug: events_timepicker_aspnetcore
position: 9
---

# Events

You can subscribe to the `Open`, `Close`, and `Change` [TimePicker events](/api/kendo.mvc.ui.fluent/timepickereventbuilder) and further customize the functionality of the component.

For a complete example on basic TimePicker events, refer to the [demo on using the events of the DateRangePicker](https://demos.telerik.com/{{ site.platform }}/timepicker/events).

## Handling Events by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().TimePicker()
      .Name("timepicker")
      .Events(e => e
            .Open("timepicker_open")
            .Close("timepicker_close")
            .Change("timepicker_change")
      )
    )
```
{% if site.core %}
```TagHelper
    <kendo-timepicker name="timepicker"
        on-open="timepicker_open"
        on-close="timepicker_close"
        on-change="timepicker_open"/>
```
{% endif %}
```JavaScript
    function timepicker_open() {
        // Handle the open event.
    }

    function timepicker_close() {
        // Handle the close event.
    }

    function timepicker_change() {
        // Handle the change event.
    }

```

### Handling Events by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().TimePicker()
        .Name("timepicker")
        .Events(e => e
            .Open(@<text>
                function() {
                    // Handle the open event inline.
                }
            </text>)
            .Change(@<text>
                function() {
                    // Handle the change event inline.
                }
            </text>)
            .Close(@<text>
                function() {
                    // Handle the close event inline.
                }
            </text>)
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-timepicker name="timepicker"
        on-open='function(e)
        {
            // Handle the open event inline.
        }'
        on-change='function(e)
        {
            / Handle the change event inline.
        }'/>
        on-close='function(e)
        {
            / Handle the close event inline.
        }'/>
```
{% endif %}

## Next Steps

* [Using the TimePicker Events (Demo)](https://demos.telerik.com/aspnet-core/timepicker/events)

## See Also

* [Using the API of the TimePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/timepicker/api)
* [TimePicker Server-Side API](/api/timepicker)
* [TimePicker Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/timepicker)
