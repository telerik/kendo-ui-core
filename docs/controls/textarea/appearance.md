---
title: Appearance
page_title: jQuery TextArea Documentation - TextArea Appearance
description: "Learn how to apply different styling options to the TextArea widget."
previous_url: /styles-and-layout/styling-components/textarea-styling
slug: textarea_appearance
position: 3
---

# Appearance

In this article, you will find information about the styling options and rendering of the Kendo UI TextArea.

For a live example, visit the [Appearance Demo of the TextArea](https://demos.telerik.com/kendo-ui/textarea/appearance).

## Options

The Kendo UI TextArea supports the following styling options:

- [`size`](#size)—configures the overall size of the component.
- [`rounded`](#rounded)—configures the border radius of the component.
- [`fillMode`](#fillmode)—configures how the color is applied to the component.
- [`overflow`](#overflow)—configures the overflow behavior of the element.
- [`resize`](#resize)—configures how the resizing of the element is applied.

### Size

The `size` option controls how big or small the rendered `textarea` looks. The structure of the class is `k-input-{size}`.

The following values are available for the [`size`](/api/javascript/ui/textarea/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `none`—unset

The following example demonstrates how to configure the `size` of the component through the widget configuration:

```dojo
<textarea id="description"></textarea>
<script>
$("#description").kendoTextArea({
    size: "medium"
});
</script>
```

The default size value is `medium` and it is applied to the wrapping span element through the `k-input-md` class.

```html
<span class="k-textarea k-input k-input-md">
</span>
```

### Rounded

The `rounded` option controls how much border radius is applied to the rendered `textarea`. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rounded`](/api/javascript/ui/textarea/configuration/rounded) option:

- `sm`—small border radius
- `md`—medium border radius
- `lg`—large border radius
- `full`—largest border radius
- `none`—unset

The following example demonstrates how to configure the `rounded` of the component through the widget configuration:

```dojo
<textarea id="description"></textarea>
<script>
$("#description").kendoTextArea({
    rounded: "medium"
});
</script>
```

The default rounded value is `medium` and it is applied to the wrapping span element through the `k-rounded-md` class.

```html
<span class="k-textarea k-input k-rounded-md">
</span>
```

### FillMode

The `fillMode` option controls the way the color is applied to the rendered `textarea`. The structure of the class is `k-input-{fillMode}`.

The following values are available for the [`fillMode`](/api/javascript/ui/textarea/configuration/fillmode) option:

- `solid`
- `flat`
- `outline`
- `none`

The following example demonstrates how to configure the `fillMode` of the component through the widget configuration:

```dojo
<textarea id="description"></textarea>
<script>
$("#description").kendoTextArea({
    fillMode: "solid"
});
</script>
```

The default fillMode value is `solid` and it is applied to the wrapping span element through the `k-input-solid` class.

```html
<span class="k-textarea k-input k-input-solid">
</span>
```

### Overflow

The `overflow` option controls the overflow behavior of the rendered `textarea`. The structure of the class is `k-overflow-{overflow}`.

The following values are available for the [`overflow`](/api/javascript/ui/textarea/configuration/overflow) option:

- `auto`
- `hidden`
- `visible`
- `scroll`
- `clip`
- `none`

The following example demonstrates how to configure the `overflow` of the component through the widget configuration:

```dojo
<textarea id="description"></textarea>
<script>
$("#description").kendoTextArea({
    overflow: "auto"
});
</script>
```

The default overflow value is `auto` and it is applied to the textarea element through the `k-overflow-auto` class.

```html
<textarea class="k-input-inner k-overflow-auto" placeholder="..."></textarea>
```

### Resize

The `resize` option controls the resizing behavior of the rendered `textarea`. The structure of the class is `k-resize-{resize}`.

The following values are available for the [`resize`](/api/javascript/ui/textarea/configuration/resize) option:

- `both`
- `horizontal`
- `vertical`
- `none`

The following example demonstrates how to configure the `resize` of the component through the widget configuration:

```dojo
<textarea id="description"></textarea>
<script>
$("#description").kendoTextArea({
    resize: "none"
});
</script>
```

The default resize value is `none` and it is applied to the wrapping span element through the `k-resize-none` class.

```html
<span class="k-textarea k-input k-resize-none">
</span>
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance Demo of the TextArea](https://demos.telerik.com/kendo-ui/textarea/appearance)
* [JavaScript API Reference of the TextArea](/api/javascript/ui/textarea)