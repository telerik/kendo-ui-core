---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI DateRangePicker component for {{ site.framework }}."
components: ["daterangepicker"]
slug: events_daterangepicker_aspnetcore
position: 11
---

# Events

You can subscribe to the `Open`, `Close`, and `Change` [DateRangePicker events](/api/kendo.mvc.ui.fluent/daterangepickereventbuilder) and further customize the functionality of the component.

For a complete example on basic DateRangePicker events, refer to the [demo on using the events of the DateRangePicker](https://demos.telerik.com/{{ site.platform }}/daterangepicker/events).

## Handling Events by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().DateRangePicker()
      .Name("daterangepicker")
      .Events(e => e
            .Open("daterangepicker_open")
            .Close("daterangepicker_close")
            .Change("daterangepicker_change")
      )
    )

    <script>
    function daterangepicker_open() {
        // Handle the open event.
    }

    function daterangepicker_close() {
        // Handle the close event.
    }

    function daterangepicker_change() {
        // Handle the change event.
    }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-daterangepicker name="daterangepicker"
                           on-open="daterangepicker_open"
                           on-close="daterangepicker_close"
                           on-change="daterangepicker_change">
    </kendo-daterangepicker>

    <script>
    function daterangepicker_open() {
        // Handle the open event.
    }

    function daterangepicker_close() {
        // Handle the close event.
    }

    function daterangepicker_change() {
        // Handle the change event.
    }
    </script>
```
{% endif %}

{% if site.core %}
## Handling Events by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().DateRangePicker()
      .Name("daterangepicker")
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
```TagHelper
    <kendo-daterangepicker name="daterangepicker"
                           on-open="
                           function(){
                                // Handle the open event inline.
                           }"
                           on-change="
                           function() {
                               // Handle the change event inline.
                           }">
    </kendo-daterangepicker>
```
{% endif %}

## Next Steps

* [Using the DateRangePicker Events (Demo)](https://demos.telerik.com/aspnet-core/daterangepicker/events)

## See Also

* [Using the API of the DateRangePicker for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/daterangepicker/api)
* [DateRangePicker Server-Side API](/api/daterangepicker)
* [DateRangePicker Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/daterangepicker)
