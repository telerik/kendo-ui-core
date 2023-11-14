---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI ContextMenu component for {{ site.framework }}."
slug: events_context_menu
position: 4
---

# Events

The Telerik UI ContextMenu for {{ site.framework }} [exposes a number of events](/api/kendo.mvc.ui.fluent/contextmenueventbuilder) that allow you to control and customize the UI component.


## Handling by Handler Names

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
@(Html.Kendo().ContextMenu()
        .Name("menu")
        .Target("body")
        .Events(e => e
            .Open("menu_open")
            .Close("menu_close")
            .Select("onSelect)
        )
)
```
{% if site.core %}
```TagHelper
    <kendo-contextmenu name="contextmenu" target="body" 
        on-open="menu_open"
        on-close="menu_close"
        on-select="onSelect">
    </kendo-contextmenu>
```
{% endif %}
```JavaScript
    <script>
        function openMenu(){
            // Handle the open event.
        }

        function closeMenu(){
            // Handle the close event.
        }

        function onSelect(){
            // Handle the select event.
        }
    </script>
```

## Handling by Template Delegates

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
@(Html.Kendo().ContextMenu()
    .Name("menu")
    .Target("body")
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

The following example demonstrates how to subscribe to the `select` event of a single Context Menu item.

```HtmlHelper
@(Html.Kendo().ContextMenu()
    .Name("menu")
    .Target("body")
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
* [Knowledge Base Section](/knowledge-base)
