---
title: Palettes
page_title: Palettes
description: "Learn more about the color palettes of the Telerik UI for {{ site.framework }} ColorPicker."
components: ["colorpicker"]
slug: palettes_colorpicker
position: 6
---

# Palettes

The ColorPicker supports color palettes that are displayed in the `Palette` view.

The default palette consists of 20 basic colors. You can specify the desired collection of colors through the `Palette()` option.

The example below demonstrates how to define a color palette that will be displayed in the `Palette` view.

```HtmlHelper
    @(Html.Kendo().ColorPicker()
        .Name("colorPicker")
        .Palette(new string[] { "#ddd1c3", "#d2d2d2", "#746153", "#3a4c8b", "#ffcc33", "#fb455f", "#ac120f" })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    @{
        string[] colors = new string[] { "#ddd1c3", "#d2d2d2", "#746153", "#3a4c8b", "#ffcc33", "#fb455f", "#ac120f" };
    }

    <kendo-colorpicker name="colorPicker" palette-colors="colors">
    </kendo-colorpicker>
```
{% endif %}

## Defining Web-Safe Colors

The ColorPicker provides a color palette of [Web-safe colors](https://en.wikipedia.org/wiki/Web_colors#Web-safe_colors). Use the [`ColorPickerPalette.WebSafe`](https://docs.telerik.com/aspnet-core/api/kendo.mvc.ui/colorpickerpalette) enum to define it.

```HtmlHelper
    @(Html.Kendo().ColorPicker()
        .Name("colorPicker")
        .Palette(ColorPickerPalette.WebSafe)
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-colorpicker name="colorPicker" palette="ColorPickerPalette.WebSafe">
    </kendo-colorpicker>
```
{% endif %}

## Specifying the Number of Columns

To specify the number of columns of the palette, set up the [`Columns()`](/api/kendo.mvc.ui.fluent/colorpickerbuilder#columnssystemdouble) option. The number of columns is automatically configured when using the default or the `WebSafe` palettes.

```HtmlHelper
    @(Html.Kendo().ColorPicker()
        .Name("colorPicker")
        .Columns(3)
        .Palette(new string[] { "#ddd1c3", "#d2d2d2", "#746153", "#3a4c8b", "#ffcc33", "#fb455f", "#ac120f" })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    @{
        string[] colors = new string[] { "#ddd1c3", "#d2d2d2", "#746153", "#3a4c8b", "#ffcc33", "#fb455f", "#ac120f" };
    }

    <kendo-colorpicker name="colorPicker" palette-colors="colors" columns="3">
    </kendo-colorpicker>
```
{% endif %}


## See Also

* [Server-Side API of the ColorPicker HtmlHelper](/api/colorpicker)
{% if site.core %}
* [Server-Side API of the ColorPicker TagHelper](/api/taghelpers/colorpicker)
{% endif %}
* [Client-Side API of the ColorPicker](https://docs.telerik.com/kendo-ui/api/javascript/ui/colorpicker)
