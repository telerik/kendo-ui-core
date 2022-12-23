---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Menu component for {{ site.framework }}."
slug: events_menu
position: 7
---

# Events

The Telerik UI Menu for {{ site.framework }} [exposes a number of events](/api/Kendo.Mvc.UI.Fluent/MenuEventBuilder) that allow you to control and customize the UI component.

For a complete example on basic Menu events, refer to the [demo on using the events of the Menu](https://demos.telerik.com/{{ site.platform }}/menu/events).

## Handling by Handler Names

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
@(Html.Kendo().Menu()
        .Name("menu")
        .Events(e => e
            .Open("menu_open")
            .Close("menu_close")
        )
)
<script>
    function menu_close() {
        // Handle the close event.
    }

    function menu_open() {
        // Handle the open event.
    }
</script>
```

## Handling by Template Delegates

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
@(Html.Kendo().Menu()
    .Name("menu")
    .Events(e => e
        .Open(@<text>
            function() {
                // Handle the open event inline.
            }
        </text>)
        .Close(@<text>
            function() {
                // Handle the close event inline.
            }
        </text>)
    )
)
```

## Handling by HTML Attributes

The following example demonstrates how to subscribe to the `select` event of a single Menu item.

```HtmlHelper
@(Html.Kendo().Menu()
    .Name("menu")
    .Items(items =>
    {
        items.Add().Text("First Item");
        items.Add().Text("Second Item").HtmlAttributes(new { @onclick = "alert('select');" });
    })
)
```

## Next Steps

* [Using the Menu Events (Demo)](https://demos.telerik.com/aspnet-core/menu/events)

## See Also

* [Using the API of the Menu for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/menu/api)
* [Menu Server-Side API](/api/menu)
* [Menu Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/menu)
