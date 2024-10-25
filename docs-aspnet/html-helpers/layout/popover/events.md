---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI PopOver component for {{ site.framework }}."
slug: events_popover
position: 7
---

# Events

The Telerik UI PopOver component for {{ site.framework }} exposes the [`Hide` and `Show` events](/api/kendo.mvc.ui.fluent/popovereventbuilder). You can handle these events to implement custom functionality.

For a complete example on basic PopOver events, refer to the [demo on using the events of the PopOver](https://demos.telerik.com/{{ site.platform }}/popover/events).

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().PopOver()
        .Name("popover")
        .Events(e => e
            .Show("onShow")
            .Hide("onHide")
        )
    )
    <script>
        function onShow(e) {
            // Handle the show event.
        }

        function onHide(e) {
            // Handle the hide event.
        }
    </script>
```

## Next Steps

* [Using the PopOver Events (Demo)](https://demos.telerik.com/{{ site.platform }}/popover/events)

## See Also

* [Using the API of the PopOver for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/popover/api)
* [PopOver Server-Side API](/api/popover)
* [PopOver Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/popover)
