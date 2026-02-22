---
title: Appearance
page_title: jQuery TextBox Documentation - TextBox Appearance
description: "Learn how to apply different styling options to the TextBox component."
components: ["textbox"]
previous_url: /styles-and-layout/styling-components/textbox-styling
slug: appearance_kendoui_textbox_widget
position: 2
---

# Appearance

In this article, you will find information about the styling options and rendering of the Kendo UI TextBox.

For a live example, visit the [Appearance Demo of the TextBox](https://demos.telerik.com/kendo-ui/textbox/appearance).

## Options

The Kendo UI TextBox supports the following styling options:

- [`size`](#size)—configures the overall size of the component.
- [`fillMode`](#fillmode)—configures how the color is applied to the component.
- [`rounded`](#rounded)—configures the border radius of the component.

### Size

The `size` option controls how big or small the rendered `textbox` looks. The structure of the class is `k-input-{size}`.

The following values are available for the [`size`](/api/javascript/ui/textbox/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `none`—unset

The default size value is `medium` and it is applied to the wrapping span element through the `k-input-md` class.

```html
<span class="k-textbox k-input k-input-md">
</span>
```

### Rounded

The following values are available for the [`rouned`](/api/javascript/ui/textbox/configuration/rounded) option:

- small(sm)
- medium(md)
- large(lg)
- full(full)
- none

The structure of the class is `k-rounded-{size}`.

The default rounded value is `medium` and it is applied to the wrapping span element through the `k-rounded-md` class.

```html
<span class="k-textbox k-input k-rounded-md">
</span>
```

### FillMode

The `fillMode` option controls the way the color is applied to the rendered `textbox`. The structure of the class is `k-input-{fillMode}`

The following values are available for the [`fillMode`](/api/javascript/ui/textbox/configuration/fillmode) option:

- solid
- flat
- outline
- none

The default fillMode value is `solid` and it is applied to the wrapping span element through the `k-input-solid` class.

```html
<span class="k-textbox k-input k-input-solid">
</span>
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance Demo of the TextBox](https://demos.telerik.com/kendo-ui/textbox/appearance)
* [JavaScript API Reference of the TextBox](/api/javascript/ui/textbox)
