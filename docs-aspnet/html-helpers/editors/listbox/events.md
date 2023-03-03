---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI ListBox component for {{ site.framework }}."
slug: events_listbox
position: 6
---

# Events

The Telerik UI ListBox for {{ site.framework }} [exposes a number of events](/api/Kendo.Mvc.UI.Fluent/ListBoxEventBuilder) that allow you to control the behavior of the UI component.

For a complete example on basic ListBox events, refer to the [demo on using the events of the ListBox](https://demos.telerik.com/{{ site.platform }}/listbox/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().ListBox()
        .Name("listbox")
        .Events(e => e.Change("onChange"))
        ... //Additional configuration
    )

    <script>
        function onChange(e){
            // Handle the ListBox Change event that triggers when a specified item has been selected.
        };
    </script>
```

{% if site.core %}
```TagHelper
    <kendo-listbox name="listbox" on-change="onChange">
      <!-- additional configuration -->
    </kendo-listbox>

    <script>
        function onChange(e){
            // Handle the ListBox Change event that triggers when a specified item has been selected.
        };
    </script>
```
{% endif %}

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().ListBox()
        .Name("listbox")
        .Events(e => e.Change(@<text>
                function() {
                    // Handle the ListBox Change event inline.
                }
            </text>)
        )
        ... //Additional configuration
    )
```

{% if site.core %}
```TagHelper
    <kendo-listbox name="listbox" 
        on-change="function() {
            // Handle the ListBox Change event inline.
        }">
    </kendo-listbox>
```
{% endif %}

## Next Steps

* [Using the ListBox Events (Demo)](https://demos.telerik.com/{{ site.platform }}/listbox/events)

## See Also

* [Using the API of the ListBox for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listbox/api)
* [ListBox Server-Side API](/api/listbox)
* [ListBox Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/listbox)