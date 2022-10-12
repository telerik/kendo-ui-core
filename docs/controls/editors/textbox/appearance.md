---
title: Appearance
page_title: jQuery TextBox Documentation - TextBox Appearance
description: "Learn how to apply different styling options to the TextBox widget."
previous_url: /styles-and-layout/styling-components/textbox-styling
slug: appearance_kendoui_textbox_widget
position: 2
---

# TextBox Appearance

> As of Kendo UI R1 2022, the TextBox widget uses brand new rendering.

In this article, you will find information about the new rendering of the Kendo UI TextBox.

For additional information regarding the decision behind these changes, visit the [Styling Overview]({% slug components_rendering_overview %}) article.

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

## Old vs New Rendering

The old rendering of the TextBox consisted of a span wrapper element with a single class named `k-textbox` that held all the styling information related to the widget. 

```html
 <!-- OLD -->
<span class="k-textbox">
    <input class="k-input" type="text" />
</span>
```

The new rendering of the component consists of a wrapping `span` element that has a child `input` element.

The `span` element controls the overall appearance of the widget and has the following class structure:

```html
<!-- NEW -->
<span class="k-input k-textbox k-input-flat k-input-md k-rounded-md" >
</span>
```

The full rendering of the component has the following HTML structure:

```html
<span class="k-input k-textbox">
    <input id="textbox" data-role="textbox" class="k-input-inner" placeholder="Name">
</span>
```

The following example demonstrates how to configure the appearance of the widget through its configuration:

```dojo
<input id="textbox" />
<script>
$("#textbox").kendoTextBox({
    size: "medium",
    rounded: "medium",
    fillMode: "solid",
});
</script>
```

## Visual Backwards Compatibility

> The new styling and rendering supports only the [default options](#options) when a LESS theme is used.

Previously, a reference to the textbox element was obtainable through the `k-input` class.

```javascript
$(".k-input") // Returns a reference to the textbox element in the old rendering.
```

With the new rendering, the textbox element must be targeted using the `k-input-inner` class.

```javascript
$(".k-input-inner") // Returns a reference to the textbox element in the new rendering.
```

The following example showcases how to apply a background color to the **TextBox** in both the new, and the old rendering:

```dojo
    <!-- Open the example in Dojo and select version prior to 2022 R1 to see the difference in the appearance -->
    <div id="parent">
      <input id="textbox" />
    </div>

    <style>
      /* Doesn't work AFTER R1 2022 */
      #parent .k-input {
        background-color: #0071bc !important; /* Blue color in versions BEFORE R1 2022 */
      }

      /* Doesn't work BEFORE R1 2022 */
      #parent .k-input-inner {
        background-color: #2e8540 !important; /* Green color in versions AFTER R1 2022 */
      }
    </style>

    <script>
      $("#textbox").kendoTextBox();
    </script>
```

## See Also

* [Styling Overview Article]({% slug components_rendering_overview %})
* [Appearance Demo of the TextBox](https://demos.telerik.com/kendo-ui/textbox/аppearance)
* [JavaScript API Reference of the TextBox](/api/javascript/ui/textbox)
