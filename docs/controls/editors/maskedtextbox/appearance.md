---
title: Appearance
page_title: jQuery MaskedTextBox Documentation - MaskedTextBox Appearance
description: "Learn how to apply different styling options to the MaskedTextBox widget."
slug: maskedtextbox_appearance
position: 3
---

# MaskedTextBox Appearance

> As of Kendo UI R1 2022, the MaskedTextBox widget uses brand new rendering.

In this article, you will find information about the new rendering of the Kendo UI MaskedTextBox.

For additional information regarding the decision behind these changes, visit the [Styling Overview]({% slug components_rendering_overview %}) article.

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

## Old vs New Rendering

The old rendering of the component consisted of a wrapping `span` element with a child `input` element.

```html
<span class="k-maskedtextbox">
    <input class="k-textbox" />
</span>
```

The new rendering of the component also consists of a wrapping `span` element with a child `input` element. The major change are the CSS classes that are applied to the two elements:

- The `span` element controls the overall appearance of the widget and has the following class structure:

  ```html
  <span class="k-maskedtextbox k-input k-input-md k-rounded-md k-input-solid">
  </span>
  ```

- The `input` element controls the appearance of the MaskedTextBox itself and has the following class structure:

  ```html
  <input type="text" class="k-input-inner" value="..." placeholder="..." />
  ```

The following example demonstrates how to configure the appearance of the component through the widget configuration:

```dojo
<input id="maskedtextbox" />
<script>
$("#maskedtextbox").kendoMaskedTextBox({
    mask: "000000",
    size: "medium",
    rounded: "medium",
    fillMode: "solid"
});
</script>
```

The full rendering of the component has the following HTML structure:

```html
<span class="k-maskedtextbox k-input k-input-md k-rounded-md k-input-solid">
  <input type="text" class="k-input-inner" value="..." placeholder="..." />
</span>
```

## Visual Backwards Compatibility

To achieve the same look and feel as the old rendering, you must update the element references.

> When you use a LESS theme, the new styling and rendering supports only the [default options](#options).

Previously, a reference to the MaskedTextBox element was obtainable through the `k-textbox` class.

```javascript
$(".k-textbox") // Returns a reference to the input element in the old rendering.
```

With the new rendering, you must target the MaskedTextBox element by using the `k-input-inner` class.

```javascript
$(".k-input-inner") // Returns a reference to the input element in the new rendering.
```

The following example showcases how to apply a background color to the **MaskedTextBox** in both the new, and the old rendering:

```dojo
    <!-- Open the example in Dojo and select version prior to 2022 R1 to see the difference in the appearance -->
    <div id="parent">
      <input id="maskedtextbox" />
    </div>

    <style>
      /* Doesn't work AFTER R1 2022 */
      #parent .k-textbox {
        background-color: #0071bc !important; /* Blue color in versions BEFORE R1 2022 */
      }

      /* Doesn't work BEFORE R1 2022 */
      #parent .k-input-inner {
        background-color: #2e8540 !important; /* Green color in versions AFTER R1 2022 */
      }
    </style>

    <script>
      $("#maskedtextbox").kendoMaskedTextBox();
    </script>
```

## See Also

* [Styling Overview Article]({% slug components_rendering_overview %})
* [Appearance Demo of the MaskedTextBox](https://demos.telerik.com/kendo-ui/maskedtextbox/appearance)
* [JavaScript API Reference of the MaskedTextBox](/api/javascript/ui/maskedtextbox)