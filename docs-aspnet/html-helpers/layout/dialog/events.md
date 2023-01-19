---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Dialog component for {{ site.framework }}."
slug: events_dialog
position: 7
---

# Events

The Telerik UI Dialog component for {{ site.framework }} exposes the [`Close`, `Hide`, `InitOpen`, `Open`, and `Show` events](/api/Kendo.Mvc.UI.Fluent/DialogEventBuilder). You can handle these events to implement custom functionality.

For a complete example on basic Dialog events, refer to the [demo on using the events of the Dialog](https://demos.telerik.com/{{ site.platform }}/dialog/events).

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().Dialog()
        .Name("dialog")
        .Events(e => e
            .InitOpen("onInitOpen")
            .Open("dialog_open")
            .Close("dialog_close")
            .Show("onShow")
            .Hide("onHide")
        )
    )
    <script>
        function onInitOpen(e) {
            // Handle the InitOpen event.
        }

        function onOpen(e) {
            // Handle the open event.
        }

        function onClose(e) {
            // Handle the close event.
        }

        function onShow(e) {
            // Handle the show event.
        }

        function onHide(e) {
            // Handle the hide event.
        }
    </script>
```

## Next Steps

* [Using the Dialog Events (Demo)](https://demos.telerik.com/aspnet-core/dialog/events)

## See Also

* [Using the API of the Dialog for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dialog/api)
* [Button Server-Side API](/api/dialog)
* [Button Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/dialog)
