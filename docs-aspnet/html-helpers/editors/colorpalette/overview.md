---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ColorPalette component for {{ site.framework }}."
previous_url: /helpers/editors/colorpalette/overview
slug: overview_colorpalettehelper_aspnetcore
position: 0
---

# ColorPalette Overview

{% if site.core %}
The Telerik UI ColorPalette TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI ColorPalette widget.
{% else %}
The Telerik UI ColorPalette HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI ColorPalette widget.
{% endif %}

The ColorPalette component provides collections of predefined colors that you can select and apply in various UI components, texts, backgrounds, and other visual elements.

* [Demo page for the ColorPalette](https://demos.telerik.com/{{ site.platform }}/colorpalette)

## Initializing the ColorPalette

The following example demonstrates how to define a ColorPalette.

```HtmlHelper
    @(Html.Kendo().ColorPalette()
        .Name("colorpalette") // The name of the ColorPalette is mandatory. It specifies the "id" attribute of the component.
        .Value("#ff0000") // Set the value of the ColorPalette.
    )
```
{% if site.core %}
```TagHelper
    <kendo-colorpalette name="colorpalette" value="#ff0000">
    </kendo-colorpalette>
```
{% endif %}

## Basic Configuration

The following example showcases a basic configuration of the ColorPalette with four columns, specified width and height of the color cells, and a predefined color palette.

```HtmlHelper
    @(Html.Kendo().ColorPalette()
        .Name("color-chooser")
        .Palette(new string[] { "#ddd1c3", "#d2d2d2", "#746153", "#3a4c8b", "#ffcc33", "#fb455f", "#ac120f" })
        .TileSize(ts => ts.Width(50).Height(50))
        .Columns(4)
        .Value("#ffcc33")
    )
```
{% if site.core %}
```TagHelper
    @{
        string[] colors = new string[] { "#ddd1c3", "#d2d2d2", "#746153", "#3a4c8b", "#ffcc33", "#fb455f", "#ac120f" };
    }

    <kendo-colorpalette name="color-chooser" columns="4"
        palette-colors="colors"
        value="#ffcc33">
         <tile-size width="50" height="50"/>
    </kendo-colorpalette>
```
{% endif %}

## Functionality and Features

* [Color Presets]({% slug presets_kendoui_colorpalette_widget %})&mdash;Use predefined color palettes or configure a custom set of palettes.
* [Events]({% slug color_palette_events %})&mdash;Subscribe to the ColorPalette `Change` event and implement the desired custom logic.
* [Accessibility]({% slug accessibility_aspnet_colorpalette_widget %})&mdash;The ColorPalette is accessible for screen readers, supports WAI-ARIA attributes, and delivers [keyboard shortcuts]({% slug keynav_aspnetcore_wizard %}) for faster navigation.

## Next Steps

* [Getting Started with the ColorPalette]({% slug color_palette_getting_started %})
* [Basic Usage of the ColorPalette HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/colorpalette/index)
{% if site.core %}
* [Basic Usage of the ColorPalette TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/colorpalette/index)
{% endif %}

## See Also

* [Using the API of the ColorPalette for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/colorpalette/api)
* [Knowledge Base Section](/knowledge-base)
