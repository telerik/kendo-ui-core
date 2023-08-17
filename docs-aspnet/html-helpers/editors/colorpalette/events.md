---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI ColorPalette component for {{ site.framework }}."
slug: color_palette_events
position: 3
---

# Events

The Telerik UI ColorPalette for {{ site.framework }} exposes a [`Change`](/api/kendo.mvc.ui.fluent/colorpaletteeventbuilder) event that allows you to control the behavior of the UI component.

For a runnable example on the component `Change` event, refer to the [demo on using the events of the ColorPalette](https://demos.telerik.com/{{ site.platform }}/colorpalette/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to the `Change` event by a handler name.

```HtmlHelper
    @(Html.Kendo().ColorPalette()
        .Name("colorpalette")
        .Events(e => e
            .Change("colorpalette_change")
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-colorpalette name="colorpalette" on-change="colorpalette_change">
    </kendo-colorpalette>
```
{% endif %}
```script
    <script>
        function colorpalette_change(e) {
            // Handle the change event.
            var colorpalette = this;
            console.log(colorpalette.value());
        }
    </script>
```

## Handling by Template Delegate

The following example demonstrates how to handle the `Change` event by a template delegate.

```HtmlHelper
    @(Html.Kendo().ColorPalette()
          .Name("colorpalette")
          .Events(ev => ev
              .Change(@<text>
                function(e) {
                    // Handle the change event inline.
                    console.log(e.sender.value());
                }
                </text>)
          )
    )
```
{% if site.core %}
```TagHelper
    <kendo-colorpalette name="colorpalette" 
        on-change="function(e) {
            // Handle the change event inline.
            console.log(e.sender.value());
        }">
    </kendo-colorpalette>
```
{% endif %}

## Next Steps

* [Using the ColorPalette Events (Demo)](https://demos.telerik.com/{{ site.platform }}/colorpalette/events)

## See Also

* [ColorPalette Server-Side API for {{ site.framework}}](/api/colorpalette)
* [ColorPalette Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/colorpalette)