---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI DateInput component for {{ site.framework }}."
slug: events_datepicker
position: 4
---

# Events

The Telerik UI DateInput for {{ site.framework }} exposes an [events](/api/kendo.mvc.ui.fluent/dateinputeventbuilder) configuration that allows you to control and customize the behavior of the component.

For a runnable example of how to handle DateInput events, refer to the [demo on using the events of the DateInput](https://demos.telerik.com/{{ site.platform }}/dateinput/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to the [`Change`](/api/kendo.mvc.ui.fluent/dateinputeventbuilder#changesystemstring) event by a handler name.

```HtmlHelper
    @(Html.Kendo().DateInput()
        .Name("dateinput")
        .Events(e => e
            .Change("onChange")
        )
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-dateinput name="dateinput"
        on-change="onChange">
    </kendo-dateinput>
```
{% endif %}
```JavaScript
    function onChange() {
        // Handle the change event.
    }
```

## Handling by Template Delegate

The following example demonstrates how to subscribe to [`Change`](/api/kendo.mvc.ui.fluent/dateinputeventbuilder#changesystemfunc) event by a template delegate.

```HtmlHelper
    @(Html.Kendo().DateInput()
        .Name("dateinput")
        .Events(e => e
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
    @addTagHelper *, Kendo.Mvc

    <kendo-dateinput name="dateinput"
        on-change="function() {
            // Handle the change event inline.
        }">
    </kendo-dateinput>
```
{% endif %}

## Next Steps

* [Using the DateInput Events (Demo)](https://demos.telerik.com/{{ site.platform }}/dateinput/events)

## See Also

* [Using the API of the DateInput HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dateinput/api)
* [Server-Side API of the DateInput](/api/dateinput)
* [Client-Side API of the DateInput](https://docs.telerik.com/kendo-ui/api/javascript/ui/dateinput)
