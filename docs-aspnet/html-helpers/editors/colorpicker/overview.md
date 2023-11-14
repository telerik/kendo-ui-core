---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ColorPicker component for {{ site.framework }}."
previous_url: /helpers/editors/colorpicker/overview
slug: overview_colorpickerhelper_aspnetcore
position: 0
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

The following example demonstrates how to configure the tile size, columns, `change` event, and palette colors.

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

* [Views]({% slug htmlhelpers_views_colorpickerhelper_aspnetcore %})&mdash;The ColorPicker enables you to choose between `gradient` or `palette` view types.
* [Appearance]({% slug appearance_colorpicker_aspnetcore%})&mdash;The ColorPicker provides you with the option to customize its appearance based on your requirements.
* [Contrast Tool]({% slug htmlhelpers_contrast_tool_colorpickerhelper_aspnetcore %})&mdash;The ColorPicker enables you to configure the contrast tool.
* [Formats]({% slug htmlhelpers_formats_colorpickerhelper_aspnetcore %})&mdash;The ColorPicker provides support for both HEX and RGB coloring formats.

## Next Steps

* [Getting Started with the ColorPicker ]({% slug aspnetcore_colorpicker_getting_started %})
* [Basic Usage of the ColorPicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/colorpicker/index)
{% if site.core %}
* [Basic Usage of the ColorPicker TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/colorpicker/tag-helper)
* [ColorPicker in Razor Pages]({% slug htmlhelpers_colorpicker_razorpage_aspnetcore %})
{% endif %}

## See Also

* [Using the API of the ColorPicker for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/colorpicker/api)
* [Knowledge Base Section](/knowledge-base)
