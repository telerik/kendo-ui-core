---
title: Appearance
page_title: "{{ site.framework }} TextBox Documentation - TextBox Appearance"
description: "Learn how to customize the appearance of the Telerik UI TextBox HtmlHelper for {{ site.framework }}."
slug: textbox_appearance
position: 2
---

# TextBox Appearance

> As of the R1 2022 release, the TextBox uses a brand new rendering.

In this article, you will find information about the new appearance of the {{ site.product }} TextBox.

For additional information regarding the decision behind these changes, visit the [Components Rendering](https://docs.telerik.com/{{ site.platform }}/styles-and-layout/components-rendering-overview) article.

For a live example, refer to the [Appearance Demo of the TextBox](https://demos.telerik.com/{{ site.platform }}/textbox/appearance).

## Options

The TextBox HtmlHelper provides the following styling options:

- [`Size()`](#size)—configures the overall size of the component.
- [`FillMode()`](#fillmode)—defines how the color is applied to the component.
- [`Rounded()`](#rounded)—specifies the border radius of the component.

### Size

The `Size()` method controls the size of the rendered TextBox.

The example below demonstrates how to adjust the `Size` of the component:

```HtmlHelper
@(Html.Kendo().TextBox()
    .Name("textbox")
    .Size(ComponentSize.Medium)
)
```
{% if site.core %}
```TagHelper
<kendo-textbox name="textbox"
               size="ComponentSize.Medium">
</kendo-textbox>
```
{% endif %}

The following values are available for the `Size` option:

- `Small`
- `Medium`
- `Large`
- `None`

The default size value is `Medium` and it is applied to the wrapping span element through the `k-input-md` class.

```html
<span class="k-textbox k-input k-input-md">
</span>
```

### Rounded

The border radius of the TextBox can be customized through the `Rounded()` method.

```HtmlHelper
@(Html.Kendo().TextBox()
    .Name("textbox")
    .Rounded(Rounded.Medium)
)
```
{% if site.core %}
```TagHelper
<kendo-textbox name="textbox"
               rounded="Rounded.Medium">
</kendo-textbox>
```
{% endif %}

The following values are available for the `Rounded` option:

- `Small`
- `Medium`
- `Large`
- `Full`
- `None`

The default value is `Medium` and it is added as a class `k-rounded-md` to the wrapping span element.

```html
<span class="k-textbox k-input k-rounded-md">
</span>
```

### FillMode

The `FillMode()` method controls the way the color is applied to the TextBox component.

```HtmlHelper
@(Html.Kendo().TextBox()
    .Name("textbox")
    .FillMode(FillMode.Solid)
)
```
{% if site.core %}
```TagHelper
<kendo-textbox name="textbox"
               fill-mode="FillMode.Solid">
</kendo-textbox>
```
{% endif %}

The following values are available for the `FillMode` option:

- `Solid`
- `Flat`
- `Outline`
- `None`

The default `FillMode` value is `Solid` and it is applied to the wrapping span element through the `k-input-solid` class.

```html
<span class="k-textbox k-input k-input-solid">
</span>
```

## Old vs New Rendering

The old rendering of the TextBox consisted of a span wrapper element with a single class named `k-textbox` that held all the styling information related to the widget. 

```html
 <!-- OLD -->
<input class="k-textbox" />
```

The new rendering of the component consists of a wrapping `span` element that has a child `input` element.

The `span` element controls the overall appearance of the component and has the following class structure:

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

## Visual Backwards Compatibility

> The new styling and rendering supports only the [default options](#options) when a LESS theme is used.

Previously, a reference to the `textbox` element was obtainable through the `k-input` class.

```javascript
$(".k-input") // Returns a reference to the textbox element in the old rendering.
```

With the new rendering, the `textbox` element must be targeted using the `k-input-inner` class.

```javascript
$(".k-input-inner") // Returns a reference to the textbox element in the new rendering.
```

The following example showcases how to apply a background color to the **TextBox** in both the new, and the old rendering:

```
    <style>
      /* Doesn't work AFTER R1 2022 */
      .k-input {
        background-color: #0071bc !important; /* Blue color in versions BEFORE R1 2022 */
      }
      /* Doesn't work BEFORE R1 2022 */
      .k-input-inner {
        background-color: #2e8540 !important; /* Green color in versions AFTER R1 2022 */
      }
    </style>
```

## See Also

* [Appearance of the TextBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/textbox/appearance)
* [Server-Side API](/api/textbox)

