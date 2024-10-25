---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI AppBar component for {{ site.framework }}."
slug: events_app_bar
position: 4
---

# Events

The Telerik UI AppBar for {{ site.framework }} exposes the [`Resize` event](/api/kendo.mvc.ui.fluent/appbareventbuilder) that allows you to implement any custom logic during the component resizing.

## Handling by Handler Name

The following example demonstrates how to subscribe to the `Resize` event by a handler name.

```HtmlHelper
    @(Html.Kendo().AppBar()
        .Name("appbar")
        .Events(e => e.Resize("onResize"))
        ... //Additional configuration
    )

    <script>
        function onResize(e){
            // Handle the AppBar Resize event.
        };
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-appbar name="appbar" on-resize="onResize">
        <!-- additional configuration -->
    </kendo-appbar>  

    <script>
        function onResize(e){
            // Handle the AppBar Resize event.
        };
    </script>
```
{% endif %}

## Handling by Template Delegate

The following example demonstrates how to subscribe to the `Resize` event by a template delegate.

```HtmlHelper
    @(Html.Kendo().AppBar()
        .Name("appbar")
        .Events(e => e.Resize(@<text>
            function() {
                // Handle the Resize event inline.
            }
            </text>)
        )
        ... //Additional configuration
    )
```
{% if site.core %}
```TagHelper
    <kendo-appbar name="appbar"
        on-resize="function() {
            // Handle the Resize event inline.
        }">
        <!-- additional configuration -->
    </kendo-appbar>
```
{% endif %}

## See Also

* [Server-Side API of the AppBar HtmlHelper](/api/appbar)
{% if site.core %}
* [Server-Side API of the AppBar TagHelper](/api/taghelpers/appbar)
{% endif %}