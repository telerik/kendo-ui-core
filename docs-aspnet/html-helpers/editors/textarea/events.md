---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI TextArea component for {{ site.framework }}."
slug: events_textarea
position: 6
---

# Events

The TextArea for {{ site.framework }} exposes the [`Change()` event](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/TextAreaEventBuilder) that you can use for capturing the TextArea's value during user interaction. 

For a complete example on TextArea events, refer to the [demo on using the events of the TextArea](https://demos.telerik.com/{{ site.platform }}/textarea/events).


## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().TextArea()
        .Name("description")
        .Events(e => e.Change("onChange"))
    )

    <script>
        function onChange(e){
            // Handle the TextArea change event.
        };
    </script>
```

{% if site.core %}
```TagHelper
    <kendo-textarea name="description" on-change="onChange">
    </kendo-textarea>

    <script>
        function onChange(e){
            // Handle the TextArea change event.
        };
    </script>
```
{% endif %}

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().TextArea()
        .Name("description")
        .Events(e => e.Change(@<text>
                function() {
                    // Handle the TextArea change event inline.
                }
            </text>)
        )
    )
```

{% if site.core %}
```TagHelper
    <kendo-textarea name="description" on-change="function() {
                        // Handle the TextArea change event inline.
                  }">
    </kendo-textarea>
```
{% endif %}

## Next Steps

* [Using the TextArea Events (Demo)](https://demos.telerik.com/{{ site.platform }}/textarea/events)

## See Also

* [Using the API of the TextArea for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/textarea/api)
* [TextArea Server-Side API for {{ site.framework}}](/api/textarea)
* [TextArea Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/textarea)