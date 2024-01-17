---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI for {{ site.framework }} Responsive Panel component."
slug: htmlhelpers_events_responsive_panel_aspnetcore
position: 2
---

# Events

The Telerik UI Responsive Panel for {{ site.framework }} exposes [`Open`](/api/kendo.mvc.ui.fluent/responsivepaneleventbuilder#opensystemstring) and [`Close`](/api/kendo.mvc.ui.fluent/responsivepaneleventbuilder#closesystemstring) events that allow you to control the behavior of the UI component.

The following example demonstrates how to subscribe to the component events. 

```HtmlHelper
    @(Html.Kendo().ResponsivePanel()
        .Name("sidebar")
        .Events(e => 
        {
            e.Open("onOpen");
            e.Close("onClose");
        })
        ... // Other configuration.
    )

    <script>
        function onOpen(e) {
            console.log(e); // Review the event data.
            // Custom logic before the componen opens.
        }

        function onClose(e) {
            console.log(e); // Review the event data.
            // Custom logic before the componen closes.
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-responsivepanel name="slidebar" on-open="onOpen" on-close="onClose">
        <!-- Other configuration -->
    </kendo-responsivepanel>

    <script>
        function onOpen(e) {
            console.log(e); // Review the event data.
            // Custom logic when the componen opens.
        }

        function onClose(e) {
            console.log(e); // Review the event data.
            // Custom logic when the componen closes.
        }
    </script>
```
{% endif %}

## See Also

* [Client-Side API of the Responsive Panel](https://docs.telerik.com/kendo-ui/api/javascript/ui/responsivepanel)
* [Server-Side API of the Responsive Panel HtmlHelper](/api/responsivepanel)
{% if site.core %}
* [Server-Side API of the Responsive Panel TagHelper](/api/taghelpers/responsivepanel)
{% endif %}