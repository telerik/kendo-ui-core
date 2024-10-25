---
title: Appearance
page_title: jQuery MaskedTextBox Documentation - MaskedTextBox Appearance
description: "Learn how to apply different styling options to the MaskedTextBox widget."
slug: maskedtextbox_appearance
position: 3
---

# Appearance

In this article, you will find information about the styling options and rendering of the Kendo UI MaskedTextBox.

For a live example, visit the [Appearance Demo of the MaskedTextBox](https://demos.telerik.com/kendo-ui/maskedtextbox/styling).

## Options

The Kendo UI MaskedTextBox supports the following styling options:

- [`size`](#size)—configures the overall size of the component.
- [`rounded`](#rounded)—configures the border radius of the component.
- [`fillMode`](#fillmode)—configures how the color is applied to the component.

### Size

The `size` option controls how big or small the rendered MaskedTextBox looks. The structure of the class is `k-input-{size}`.

The following values are available for the [`size`](/api/javascript/ui/maskedtextbox/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `none`—unset

The following example demonstrates how to configure the `size` of the component through the widget configuration:

```dojo
<input id="maskedtextbox" />
<script>
$("#maskedtextbox").kendoMaskedTextBox({
    mask: "000000",
    size: "medium"
});
</script>
```

The default size value is `medium` and it is applied to the wrapping span element through the `k-input-md` class.

```html
<span class="k-maskedtextbox k-input k-input-md">
</span>
```

### Rounded

The `rounded` option controls how much border radius is applied to the rendered MaskedTextBox. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rounded`](/api/javascript/ui/maskedtextbox/configuration/rounded) option:

- `sm`—small border radius
- `md`—medium border radius
- `lg`—large border radius
- `full`—largest border radius
- `none`—unset

The following example demonstrates how to configure the `rounded` of the component through the widget configuration:

```dojo
<input id="maskedtextbox" />
<script>
$("#maskedtextbox").kendoMaskedTextBox({
    mask: "000000",
    rounded: "medium"
});
</script>
```

The default rounded value is `medium` and it is applied to the wrapping span element through the `k-rounded-md` class.

```html
<span class="k-maskedtextbox k-input k-rounded-md">
</span>
```

### FillMode

The `fillMode` option controls the way the color is applied to the rendered MaskedTextBox. The structure of the class is `k-input-{fillMode}`.

The following values are available for the [`fillMode`](/api/javascript/ui/maskedtextbox/configuration/fillmode) option:

- `solid`
- `flat`
- `outline`
- `none`

The following example demonstrates how to configure the `size` of the component through the widget configuration:

```dojo
<input id="maskedtextbox" />
<script>
$("#maskedtextbox").kendoMaskedTextBox({
    mask: "000000",
    fillMode: "solid"
});
</script>
```

The default fillMode value is `solid` and it is applied to the wrapping span element through the `k-input-solid` class.

```html
<span class="k-maskedtextbox k-input k-input-solid">
</span>
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance Demo of the MaskedTextBox](https://demos.telerik.com/kendo-ui/maskedtextbox/appearance)
* [JavaScript API Reference of the MaskedTextBox](/api/javascript/ui/maskedtextbox)