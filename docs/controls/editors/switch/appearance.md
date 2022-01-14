---
title: Switch Appearance
page_title: jQuery Switch Documentation | Switch Appearance
description: "Learn how to apply different styling options to the Switch widget."
slug: appearance_kendoui_switch_widget
position: 2
---

# Appearance

> As of Kendo UI R1 2022, the jQuery Switch widget has new rendering and styling options.
In this article, you will find information about the rendering of the Kendo UI Switch.

For additional information regarding the decision behind these changes, visit the [Rendering Components]({% slug components_rendering_overview %}) article.

For a live example, visit the [Appearance Demo of the Switch](https://demos.telerik.com/kendo-ui/switch/appearance).

## Options

The Kendo UI Switch supports the following styling options:

- [`size`](#size)—configures the overall size of the component.
- [`trackRounded`](#trackRounded)—configures the track's border radius.
- [`thumbRounded`](#thumbRounded)—configures the thumb's border radius.

### Size

The `size` option controls how big or small the `switch` looks. The structure of the class is `k-switch-{size}`.

The following values are available for the [`size`](/api/javascript/ui/switch/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size

The default size value is `medium` and it is applied to the wrapping `span` element through the `k-switch-md` class.

The example below shows a basic Switch configuration and how to set the `size` option:

```dojo
    <input id="switch" />
    <script>
        $("#switch").kendoSwitch({
            size:"large"
        })
    </script>
```

The option affects the `span.k-switch` element:

```html
<span class="k-switch k-switch-on k-switch-lg">
</span>
```

### TrackRounded

The `trackRounded` option controls how much border radius is applied to track of the widget. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`trackRounded`](/api/javascript/ui/switch/configuration/trackRounded) option:

- `sm`—small border radius
- `md`—medium border radius
- `lg`—large border radius
- `full`—ellipse-like  border radius

The default value is `full` and it is applied to the wrapping `span` element that contains the On/Off labels through the `k-rounded-full` class.

The example below shows a basic Switch configuration and how to set the `trackRounded` option:

```dojo
    <input id="switch" />
    <script>
        $("#switch").kendoSwitch({
            trackRounded:"large"
        })
    </script>
```

The option affects the `span` element that wraps the On/Off labels:

```html
<span class="k-switch-track k-rounded-lg">
</span>
```

### ThumbRounded

The `thumbRounded` option controls how much border radius is applied to thumb of the widget. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`thumbRounded`](/api/javascript/ui/switch/configuration/thumbRounded) option:

- `sm`—small border radius
- `md`—medium border radius
- `lg`—large border radius
- `full`—ellipse-like  border radius

The default value is `full` and it is applied to the `span` element for the thumb through the `k-rounded-full` class.

The example below shows a basic Switch configuration and how to set the `thumbRounded` option:

```dojo
    <input id="switch" />
    <script>
        $("#switch").kendoSwitch({
            thumbRounded:"large"
        })
    </script>
```

The option affects the `span` element for the Switch handle:

```html
<span class="k-switch-thumb k-rounded-md">
</span>
```

## Old vs New Rendering

The old rendering of the component consisted of a `span` element with classes named `k-switch k-widget k-switch-on`. The `span` element contained the wrapper for the Switch's labels and handle both.

```html
 <span class="k-switch k-widget k-switch-on">
    <span class="k-switch-container">
        <span class="k-switch-label-on">On</span>
        <span class="k-switch-label-off">Off</span>
        <span class="k-switch-handle"></span>
    </span>
</span>
```

The new rendering of the component includes separate wrapping `span` elements for the labels and the handle.

- The labels are placed in a `span` element with classes `k-switch-track k-rounded-full`:

```html
<span class="k-switch-track k-rounded-full">
    <span class="k-switch-label-on">On</span>
    <span class="k-switch-label-off">Off</span>
</span>
```

- The handle is rendered in a `span` element with classes `k-switch-thumb-wrap`:

```html
<span class="k-switch-thumb-wrap">
    <span class="k-switch-thumb k-rounded-full"></span>
</span>

```

The full rendering of the component has the following HTML structure:

```html
<span class="k-switch k-switch-on k-switch-md k-rounded-full">
    <span class="k-switch-track k-rounded-full">
        <span class="k-switch-label-on">On</span>
        <span class="k-switch-label-off">Off</span>
    </span>
    <span class="k-switch-thumb-wrap">
        <span class="k-switch-thumb k-rounded-full"></span>
    </span>
</span>
```

## Visual Backwards Compatibility

In order to achieve the same look and feel as the old rendering, the element references must be updated. Visit the [CSS Classes Migration]({% slug components_rendering_overview %}#css-classes-migration) and [JQuery Selectors Migration]({% slug components_rendering_overview %}#jquery-selectors-migration) sections of the [Styling Overview]({% slug components_rendering_overview %}) article for additional information.

> The new styling and rendering supports only the [default options](#options) you use a LESS theme.

## See Also

* [Rendering Overview Article]({% slug components_rendering_overview %})
* [Styling Demo of the Switch](https://demos.telerik.com/kendo-ui/switch/styling)
* [JavaScript API Reference of the Switch](/api/javascript/ui/switch)