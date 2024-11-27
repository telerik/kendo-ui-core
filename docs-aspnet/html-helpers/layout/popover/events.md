---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI PopOver component for {{ site.framework }}."
slug: events_popover
position: 7
---

# Events

The Telerik UI PopOver component for {{ site.framework }} exposes the [`Hide`](/api/kendo.mvc.ui.fluent/popovereventbuilder#hidesystemfunc) and [`Show`](/api/kendo.mvc.ui.fluent/popovereventbuilder#showsystemstring) events. You can handle these events to implement custom functionality.

For a complete example on basic PopOver events, refer to the [demo on using the events of the PopOver](https://demos.telerik.com/{{ site.platform }}/popover/events).

{% if site.core %}
## Handling by Handler Name

The following example demonstrates how to subscribe to an event by a handler name.

```HtmlHelper
    @(Html.Kendo().PopOver()
        .For("targetElementSelector")
        .Events(e => e.Show("onShow"))
        ... //Additional configuration
    )

    <script>
        function onShow(e){
            // Handle the Show event that triggers when the PopOver shows.
        }
    </script>
```
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-popover for="targetElementSelector" on-show="onShow">
        <!-- additional configuration -->
    </kendo-popover>

    <script>
        function onShow(e){
            // Handle the Show event that triggers when the PopOver shows.
        }
    </script>
```

## Handling by Template Delegate

The following example demonstrates how to subscribe to an event by a template delegate.

```HtmlHelper
    @(Html.Kendo().PopOver()
        .For("targetElementSelector")
        .Events(e => e.Show(@<text>
            function() {
                // Handle the Show event inline.
            }
            </text>)
        )
        ... //Additional configuration
    )
```
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-popover for="targetElementSelector" 
        on-show="function() {
            // Handle the Show event inline.
        }">
        <!-- additional configuration -->
    </kendo-popover>
```
{% else %}
The following example demonstrates how to subscribe to the PopOver events.

```HtmlHelper
    @(Html.Kendo().PopOver()
        .For("targetElementSelector")
        .Events(e => e
            .Show("onShow")
            .Hide("onHide")
        )
    )
    <script>
        function onShow(e) {
            // Handle the Show event that triggers when the PopOver shows.
        }

        function onHide(e) {
            // Handle the Hide event that triggers when the PopOver hides.
        }
    </script>
```
{% endif %}

## Next Steps

* [Using the PopOver Events (Demo)](https://demos.telerik.com/{{ site.platform }}/popover/events)

## See Also

* [Using the API of the PopOver for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/popover/api)
* [PopOver Server-Side HtmlHelper API](/api/popover)
{% if site.core %}
* [PopOver Server-Side TagHelper API](/api/taghelpers/popover)
{% endif %}
* [PopOver Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/popover)
