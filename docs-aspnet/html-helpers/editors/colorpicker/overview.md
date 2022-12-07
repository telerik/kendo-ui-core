---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ColorPicker component for {{ site.framework }}."
previous_url: /helpers/editors/colorpicker/overview
slug: overview_colorpickerhelper_aspnetcore
position: 1
---

# {{ site.framework }} ColorPicker Overview

{% if site.core %}
The Telerik UI ColorPicker TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI ColorPicker widget.
{% else %}
The Telerik UI ColorPicker HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI ColorPicker widget.
{% endif %}

The ColorPicker is a drop-down list for selecting colors.

* [Demo page for the ColorPicker HtmlHelper](https://demos.telerik.com/{{ site.platform }}/colorpicker/index)
{% if site.core %}
* [Demo page for the ColorPicker TagHelper](https://demos.telerik.com/aspnet-core/colorpicker/tag-helper)
{% endif %}

## Initializing the ColorPicker

The following example demonstrates how to define the ColorPicker.

```HtmlHelper
    @(Html.Kendo().ColorPicker()
          .Name("colorpicker") // The name of the ColorPicker is mandatory. It specifies the "id" attribute of the widget.
          .Value("#ff0000") // Set the value of the ColorPicker.
    )
```
{% if site.core %}
```TagHelper
        <kendo-colorpicker name="colorpicker" value="#ff0000">
			<messages apply="Change" cancel="Close" />
		</kendo-colorpicker>
```
{% endif %}

{% if site.core %}
## Basic Configuration

The following example demonstrates how to configure the TileSize, columns, change event, and palette colors.

```HtmlHelper

        @(Html.Kendo().ColorPalette()
			.Name("palette")
			.Columns(4)
			.TileSize(s => s.Width(34).Height(19))
			.Palette(new string[] {
				"#f0d0c9", "#e2a293", "#d4735e", "#65281a",
				"#eddfda", "#dcc0b6", "#cba092", "#7b4b3a",
				"#fcecd5", "#f9d9ab", "#f6c781", "#c87d0e",
				"#e1dca5", "#d0c974", "#a29a36", "#514d1b",
				"#c6d9f0", "#8db3e2", "#548dd4", "#17365d"
			})
			.Events(events => events.Change("preview"))
		)
```
```TagHelper

		@{
			string[] colorPickerPalette = new string[] {
                                        "#f0d0c9", "#e2a293", "#d4735e", "#65281a",
                                        "#eddfda", "#dcc0b6", "#cba092", "#7b4b3a",
                                        "#fcecd5", "#f9d9ab", "#f6c781", "#c87d0e",
                                        "#e1dca5", "#d0c974", "#a29a36", "#514d1b",
                                        "#c6d9f0", "#8db3e2", "#548dd4", "#17365d"
                                    };
		}
        <kendo-colorpalette name="palette" columns="4" on-change="preview" palette-colors="colorPickerPalette">
			<tile-size height="19" width="34" />
		</kendo-colorpalette>
```
{% endif %}

## Functionality and Features

* [Views]({% slug htmlhelpers_views_colorpickerhelper_aspnetcore %})
* [Contrast Tool]({% slug htmlhelpers_contrast_tool_colorpickerhelper_aspnetcore %})
* [Formats]({% slug htmlhelpers_formats_colorpickerhelper_aspnetcore %})

## Events

You can subscribe to all ColorPicker [events](https://docs.telerik.com/kendo-ui/api/javascript/ui/colorpicker#events). For a complete example on basic ColorPicker events, refer to the [demo on using the events of the ColorPicker](https://demos.telerik.com/{{ site.platform }}/colorpicker/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().ColorPicker()
        .Name("colorpicker")
        .Events(e => e
            .Open("colorpicker_open")
            .Close("colorpicker_close")
            .Select("colorpicker_select")
            .Change("colorpicker_change")
        )
    )
    <script>
        // The ColorPicker instance is available as an e.sender or this.
        function colorpicker_open(e) {
            // Handle the open event.
        }

        function colorpicker_close(e) {
            // Handle the close event.
        }

        function colorpicker_select(e) {
            // Handle the select event.
        }

        function colorpicker_change(e) {
            // Handle the change event.
        }
    </script>
```
{% if site.core %}
```TagHelper
        <kendo-colorpicker name="colorpicker" on-select="colorpicker_select" on-change="colorpicker_change" on-open="colorpicker_open" on-close="colorpicker_close">
		</kendo-colorpicker>

            <script>
        // The ColorPicker instance is available as an e.sender or this.
        function colorpicker_open(e) {
            // Handle the open event.
        }

        function colorpicker_close(e) {
            // Handle the close event.
        }

        function colorpicker_select(e) {
            // Handle the select event.
        }

        function colorpicker_change(e) {
            // Handle the change event.
        }
    </script>
```
{% endif %}

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().ColorPicker()
          .Name("colorpicker")
          .Events(e => e
              .Open(@<text>
                function(e) {
                    //Handle the open event inline.
                }
              </text>)
              .Close(@<text>
                function(e) {
                    //Handle the close event inline.
                }
                </text>)
              .Select(@<text>
                function(e) {
                    //Handle the select event inline.
                }
                </text>)
              .Change(@<text>
                function(e) {
                    //Handle the change event inline.
                }
                </text>)
          )
    )
```

## Referencing Existing Instances

To reference an existing Kendo UI ColorPicker instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [ColorPicker client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/colorpicker#methods) to control its behavior.

        // Place the following after the ColorPicker for {{ site.framework }} declaration.
        <script>
        $(function() {
            // The Name() of the ColorPicker is used to get its client-side instance.
            var colorpicker = $("#colorpicker").data("kendoColorPicker");
        });
        </script>

## See Also

* [Basic Usage of the ColorPicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/colorpicker/index)
{% if site.core %}
* [Basic Usage of the ColorPicker TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/colorpicker/tag-helper)
{% endif %}
* [Server-Side API](/api/colorpicker)
