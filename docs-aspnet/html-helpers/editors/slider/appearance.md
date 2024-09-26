---
title: Appearance
page_title: Appearance
description: "Learn how to customize the appearance of the Telerik UI Slider HtmlHelper for {{ site.framework }}."
slug: slider_appearance
position: 2
---

# Appearance

In this article, you will find information about the appearance options and rendering of the {{ site.product }} Slider.

## Options

The Slider component provides the following appearance options:

- [`Orientation()`](#orientation)&mdash;Configures the orientation of the component.
- [`ShowButtons()`](#showbuttons)&mdash;Toggles the visibility of the increase and decrease buttons of a Slider.
- [`TickPlacement()`](#tickplacement)&mdash;Defines the location of the tick marks.

### Orientation

To display the Slider vertically, set the `Orientation()` option to `Vertical`. By default, the Slider is displayed horizontally.

```HtmlHelper
    @(Html.Kendo().Slider()
        .Name("slider")
        .Orientation(SliderOrientation.Vertical)
        .Value(5)
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-slider name="slider"
        value="5"
        orientation="SliderOrientation.Vertical">
    </kendo-slider>
```
{% endif %}

### ShowButtons

Disable the `ShowButtons()` option to hide the increase and decrease buttons of the Slider. The buttons are visible by default.

```HtmlHelper
    @(Html.Kendo().Slider()
        .Name("slider")
        .Value(5)
        .ShowButtons(false)
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-slider name="slider" show-buttons="false" value="5">
    </kendo-slider>
```
{% endif %}

### TickPlacement

To specify the location of the tick marks on the Slider, use the `TickPlacement()` option with any of the following values:

- `None`&mdash;The tick marks are not visible.
- `TopLeft`&mdash;The tick marks are located on the top of the horizontal Slider and on the left of the vertical Slider.
- `BottomRight`&mdash;The tick marks are located on the bottom of the horizontal Slider and on the right side of the vertical Slider.
- `Both`&mdash;The tick marks are located on both sides of the Slider (default option).


```HtmlHelper
    @(Html.Kendo().Slider()
        .Name("slider")
        .Value(5)
        .TickPlacement(SliderTickPlacement.TopLeft)
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-slider name="slider" tick-placement="SliderTickPlacement.TopLeft" value="5">
    </kendo-slider>
```
{% endif %}

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Appearance of the Button HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/button/appearance)
* [Server-Side API](/api/slider)
{% if site.core %}
* [Server-Side TagHelper API](/api/taghelpers/slider)
{% endif %}
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/slider)


