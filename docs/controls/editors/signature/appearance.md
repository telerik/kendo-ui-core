---
title: Appearance
page_title: jQuery Signature Documentation - Signature Appearance
description: "Learn how to modify the appearance of the Kendo UI for jQuery Signature widget."
slug: appearance_kendoui_signature_widget
position: 2
---

# Signature Appearance

The Kendo UI for jQuery Signature enables you to change various appearance aspects about the widget.

The following example demonstrates a Signature widget with custom appearance settings.

```dojo
    <div id="signature"></div>
    <script>
      $(document).ready(function () {
        $("#signature").kendoSignature({
          backgroundColor: "#fad980",
          color: "#212121",
          width: 500,
          height: 200,
          strokeWidth: 4
        });
      });
    </script>
```

## Background Color

To modify the background color of the Signature container, use its [`backgroundColor`](/api/javascript/ui/signature/configuration/backgroundcolor) property.

```html
$("#signature").kendoSignature({
    backgroundColor: "#fad980"
});
```

## Stroke Color

You can also change the stroke color of the Signature by using its [`color`](/api/javascript/ui/signature/configuration/color) property.

```html
$("#signature").kendoSignature({
    color: "#212121"
});
```

## Stroke Width

To update the stroke width of the Signature, utilize its [`strokeWidth`](/api/javascript/ui/signature/configuration/strokewidth) property.

```html
$("#signature").kendoSignature({
    strokeWidth: 4
});
```

## Options

The Kendo UI Signature supports the following styling options:

- [`size`](#size)—configures the overall size of the component.
- [`rounded`](#rounded)—configures the border radius of the component.
- [`fillMode`](#fillmode)—configures how the color is applied to the component.

### Size

The `size` option controls how big or small the rendered Signature looks.

The following values are available for the [`size`](/api/javascript/ui/signature/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `none`—unset

The following example demonstrates how to configure the `size` of the component through the widget configuration:

```dojo
<div id="signature"></div>
<script>
$("#signature").kendoSignature({
    size: "medium"
});
</script>
```

### Rounded

The `rounded` option controls how much border radius is applied to the rendered Signature.

The following values are available for the [`rounded`](/api/javascript/ui/signature/configuration/rounded) option:

- `sm`—small border radius
- `md`—medium border radius
- `lg`—large border radius
- `full`—largest border radius
- `none`—unset

The following example demonstrates how to configure the `rounded` of the component through the widget configuration:

```dojo
<div id="signature"></div>
<script>
$("#signature").kendoSignature({
    rounded: "medium"
});
</script>
```

### FillMode

The `fillMode` option controls the way the color is applied to the rendered Signature.

The following values are available for the [`fillMode`](/api/javascript/ui/signature/configuration/fillmode) option:

- `solid`
- `flat`
- `outline`
- `none`

The following example demonstrates how to configure the `fillMode` of the component through the widget configuration:

```dojo
<div id="signature"></div>
<script>
$("#signature").kendoSignature({
    fillMode: "solid"
});
</script>
```

## See Also

* [Demo Page for the Signature](https://demos.telerik.com/kendo-ui/signature/index)
* [Signature Appearance(Demo)](https://demos.telerik.com/kendo-ui/signature/index)
* [JavaScript API Reference of the Signature](/api/javascript/ui/signature)
* [Knowledge Base Section](/knowledge-base)