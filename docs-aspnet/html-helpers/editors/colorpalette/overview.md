---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ColorPalette component for {{ site.framework }}."
previous_url: /helpers/editors/colorpalette/overview
slug: overview_colorpalettehelper_aspnetcore
position: 1
---

# ColorPalette Overview

{% if site.core %}
The Telerik UI ColorPalette TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI ColorPalette widget.
{% else %}
The Telerik UI ColorPalette HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI ColorPalette widget.
{% endif %}

* [Demo page for the ColorPalette](https://demos.telerik.com/{{ site.platform }}/colorpalette)

## Initializing the ColorPalette

The following example demonstrates how to define the ColorPalette.

```HtmlHelper
    @(Html.Kendo().ColorPalette()
          .Name("colorpalette") // The name of the ColorPalette is mandatory. It specifies the "id" attribute of the widget.
          .Value("#ff0000") // Set the value of the ColorPalette.
    )
```
{% if site.core %}
```TagHelper
<kendo-colorpalette name = "colorpalette"
                    value="#ff0000">
</kendo-colorpalette>
```
{% endif %}

## Events

You can subscribe to all ColorPalette [events](https://docs.telerik.com/kendo-ui/api/javascript/ui/colorpalette#events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

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
<kendo-colorpalette name = "colorpalette"
                    on-change="colorpalette_change">
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

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().ColorPalette()
          .Name("colorpalette")
          .Events(e => e
              .Change(@<text>
                function(e) {
                    // Handle the change event inline.
                    console.log(e.sender.value());
                }
                </text>)
          )
    )
```

## Referencing Existing Instances

To reference an existing Telerik UI ColorPalette instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [ColorPalette client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/colorpalette#methods) to control its behavior.

        // Place the following after your Telerik UI ColorPalette for {{ site.framework }} declaration.
        <script>
            $(function() {
                // The Name() of the ColorPalette is used to get its client-side instance.
                var colorpalette = $("#colorpalette").data("kendoColorPalette");
            });
        </script>

## See Also

* [Basic Usage of the ColorPalette HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/colorpalette/palette)
* [Using the Palette Presets in the ColorPalette HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/colorpalette/palette-presets)
* [Server-Side API](/api/colorpalette)
