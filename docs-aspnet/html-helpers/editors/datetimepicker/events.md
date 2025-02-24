---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI DateTimePicker component for {{ site.framework }}."
slug: events_datetimepicker_aspnetcore
position: 16
---

# Events

You can subscribe to the `Open`, `Close`, and `Change` [DateTimePicker events](/api/kendo.mvc.ui.fluent/datetimepickereventbuilder) and further customize the functionality of the component.

For a complete example on basic DateTimePicker events, refer to the [demo on using the events of the DateRangePicker](https://demos.telerik.com/{{ site.platform }}/datetimepicker/events).

## Handling Events by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().DateTimePicker()
      .Name("datetimepicker")
      .Events(e => e
            .Open("datetimepicker_open")
            .Close("datetimepicker_close")
            .Change("datetimepicker_change")
      )
    )
```
{% if site.core %}
```TagHelper
    <kendo-datetimepicker name="datetimepicker"
        on-open="datetimepicker_open"
        on-close="datetimepicker_close"
        on-change="datetimepicker_open"/>
```
{% endif %}
```JavaScript
    function datetimepicker_open() {
        // Handle the open event.
    }

    function datetimepicker_close() {
        // Handle the close event.
    }

    function datetimepicker_change() {
        // Handle the change event.
    }

```

### Handling Events by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().DateTimePicker()
        .Name("datetimepicker")
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
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-datetimepicker name="datetimepicker"
        on-open='function(e)
        {
            // Handle the open event inline.
        }'
        on-change='function(e)
        {
            / Handle the change event inline.
        }'/>
```
{% endif %}

## Next Steps

* [Using the DateTimePicker Events (Demo)](https://demos.telerik.com/aspnet-core/datetimepicker/events)

## See Also

* [Using the API of the DateTimePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/datetimepicker/api)
* [DateTimePicker Server-Side API](/api/datetimepicker)
* [DateTimePicker Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/datetimepicker)
