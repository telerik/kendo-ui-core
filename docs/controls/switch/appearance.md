---
title: Appearance
page_title: jQuery Switch Documentation - Switch Appearance
description: "Learn how to apply different styling options to the Switch widget."
slug: appearance_kendoui_switch_widget
position: 3
---

# Appearance

In this article, you will find information about the styling options and rendering of the Kendo UI Switch.

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
- `none`—unset

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
- `none`—unset

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
- `none`—unset

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

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance Demo of the Switch](https://demos.telerik.com/kendo-ui/switch/appearance)
* [JavaScript API Reference of the Switch](/api/javascript/ui/switch)
