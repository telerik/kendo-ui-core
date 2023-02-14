---
title: Appearance
page_title: "{{ site.framework }} TextArea Documentation - TextArea Appearance"
description: "Learn how to customize the appearance of the Telerik UI TextArea HtmlHelper for {{ site.framework }}."
slug: textarea_appearance
position: 2
---

# TextArea Appearance

As of the R1 2022 release, the TextArea component uses a new rendering. To learn more about why we decided to create a new rendering for our components, see the [Components Rendering](https://docs.telerik.com/{{ site.platform }}/styles-and-layout/components-rendering-overview) article.

For a live example of the styling options of the TextArea, visit the [Appearance Demo of the TextArea](https://demos.telerik.com/{{ site.platform }}/textarea/appearance).

## Options

The TextArea HtmlHelper supports the following styling methods:

- [`Size()`](#size)—configures the overall size of the component.
- [`Rounded()`](#rounded)—configures the border radius of the component.
- [`FillMode()`](#fillmode)—configures how the color is applied to the component.
- [`Overflow()`](#overflow)—configures the overflow behavior of the element.
- [`Resize()`](#resize)—configures how the resizing of the element is applied.

### Size

The `Size()` method allows you to adjust the size of the TextArea. The default size is `Medium`.

```HtmlHelper
@(Html.Kendo().TextArea()
    .Name("description")
    .Size(ComponentSize.Medium)
)
```
{% if site.core %}
```TagHelper
<kendo-textarea name="description"
                size="ComponentSize.Medium">
</kendo-textarea>
```
{% endif %}
The option adds a class `k-input-md` to the wrapping span element `span.k-textarea`:

```html
<span class="k-textarea k-input k-input-md">
</span>
```

The following values are available for the `Size` option:

- `Small`
- `Medium`
- `Large`
- `None`


### Rounded

You can control how much border radius is applied to the component by using the `Rounded()` method. The default value is `Medium`.

```HtmlHelper
@(Html.Kendo().TextArea()
    .Name("description")
    .Rounded(Rounded.Medium)
)
```
{% if site.core %}
```TagHelper
<kendo-textarea name="description"
                rounded="Rounded.Medium">
</kendo-textarea>
```
{% endif %}
The value `Medium` is applied to the wrapping span element through the `k-rounded-md` class. 

```html
<span class="k-textarea k-input k-rounded-md">
</span>
```

The `Rounded()` method supports the following values:

- `Small`
- `Medium`
- `Large`
- `Full`
- `None`


### FillMode

The `FillMode` option controls the way the color is applied to the component. The default value is `Solid`.

```HtmlHelper
@(Html.Kendo().TextArea()
    .Name("description")
    .FillMode(FillMode.Solid)
)
```
{% if site.core %}
```TagHelper
<kendo-textarea name="description"
                fill-mode="FillMode.Solid">
</kendo-textarea>
```
{% endif %}


The option adds a class `k-input-solid` to the wrapping span element of the TextArea:

```html
<span class="k-textarea k-input k-input-solid">
</span>
```

The following values are available for the `FillMode` option:

- `Solid`
- `Flat`
- `Outline`
- `None`


### Overflow

The `Overflow()` method allows you to handle the content overflow of the TextArea. By default, it is set to `Auto`.

```HtmlHelper
@(Html.Kendo().TextArea()
    .Name("description")
    .Overflow(TextAreaOverflow.Auto)
)
```
{% if site.core %}
```TagHelper
<kendo-textarea name="description"
                overflow="TextAreaOverflow.Auto">
</kendo-textarea>
```
{% endif %}

The option is applied to the TextArea element through the `k-overflow-auto` class.

```html
<textarea class="k-input-inner k-overflow-auto" placeholder="..."></textarea>
```

The following values are available for the `Overflow` option:

- `Auto`
- `Hidden`
- `Visible`
- `Scroll`
- `Clip`


### Resize

The `Resize()` method defines how the component should be resized. The default `Resize` value is `None`.

```HtmlHelper
@(Html.Kendo().TextArea()
    .Name("description")
    .Resize(TextAreaResize.None)
)
```
{% if site.core %}
```TagHelper
<kendo-textarea name="description"
                resize="TextAreaResize.None">
</kendo-textarea>
```
{% endif %}

The option is applied to the wrapping span element through the `k-resize-none` class.

```html
<span class="k-textarea k-input k-resize-none">
</span>
```

The following values are available for the `Resize` option:

- `Both`
- `Horizontal`
- `Vertical`
- `None`


## Old vs New Rendering

The old rendering of the component consisted of a wrapping `span` element with the `k-textarea` class and a child `textarea` element with the `k-textbox` class.

```html
<span class="k-textarea">
    <textarea class='k-textbox'></textarea>
</span>
```

The new rendering of the component also consists of a wrapping `span` element that has a child `textarea` element:

- The `span` element controls the overall appearance of the component and has the following class structure:

  ```html
  <span class="k-textarea k-input k-input-md k-rounded-md k-input-solid">
  </span>
  ```

- The `textarea` element controls the appearance of the `textarea` itself and has the following class structure:

  ```html
  <textarea class="k-input-inner k-overflow-hidden k-resize-both" placeholder="..."></textarea>
  ```

The full rendering of the component has the following HTML structure:

```html
<span class="k-textarea k-input k-input-md k-rounded-md k-input-solid">
    <textarea class="k-input-inner k-overflow-hidden k-resize-both" placeholder="...">...</textarea>
</span>
```

## Visual Backwards Compatibility

To achieve the same look and feel as the old rendering, the element references must be updated. Visit the [CSS Classes Migration](https://docs.telerik.com/{{ site.platform }}/styles-and-layout/components-rendering-overview#css-classes-migration) and [JQuery Selectors Migration](https://docs.telerik.com/{{ site.platform }}/styles-and-layout/components-rendering-overview#jquery-selectors-migration) sections of the [Components Rendering](https://docs.telerik.com/{{ site.platform }}/styles-and-layout/components-rendering-overview) article for additional information.

> The new styling and rendering supports only the [default options](#options) when you use a LESS theme.

Previously, a reference to the `textarea` element was obtainable through the `k-input` class.

```javascript
$(".k-input") // Returns a reference to the textarea element in the old rendering.
```

With the new rendering, the `textarea` element must be targeted by using the `k-input-inner` class.

```javascript
$(".k-input-inner") // Returns a reference to the textarea element in the new rendering.
```

The following example showcases how to apply a background color to the **TextArea** in both the new, and the old rendering:

```
    <style>
      /* Works BEFORE R1 2022 */
      .k-input {
        background-color: #0071bc !important; /* Blue color in versions BEFORE R1 2022 */
      }
      /* Works AFTER R1 2022 */
      .k-input-inner {
        background-color: #2e8540 !important; /* Green color in versions AFTER R1 2022 */
      }
    </style>
```

## See Also

* [Appearance of the TextArea HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/textarea/appearance)
* [Server-Side API](/api/textarea)
