---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Rating component for {{ site.framework }}."
slug: rating_events
position: 3
---

# Events

You can subscribe to [all Rating events](/api/kendo.mvc.ui.fluent/ratingeventbuilder) and then use them to further customize the behavior of the component.

For a complete example on basic Rating events, refer to the [demo on using the events of the Rating](https://demos.telerik.com/{{ site.platform }}/rating/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().Rating()
            .Name("rating")
            .Events(e => {
                    e.Change("onChange");
                    e.Select("onSelect");
            })
    )
```
{% if site.core %}
```TagHelper
    <kendo-rating name="rating" on-change="onChange" on-select="onSelect"/>
```
{% endif %}
```JavaScript
    <script>
        function onChange(e) {
            // Handle the change event.
        }

        function onSelect(e) {
            // Handle the complete event.
        }
    </script>
```

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().Rating()
        .Name("rating")
        .Events(e => e.Change(@<text>
                function() {
                    // Handle the change event.
                }
            </text>)
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-rating name="rating" 
        on-change="function() {
                    // Handle the change event.
                }"/>
```
{% endif %}

## Next Steps

* [Using the Rating Events (Demo)](https://demos.telerik.com/{{ site.platform }}/rating/events)

## See Also

* [Using the API of the Rating for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/rating/api)
* [Server-Side API of the Rating](/api/rating)
* [Client-Side API of the Rating](https://docs.telerik.com/kendo-ui/api/javascript/ui/rating)
