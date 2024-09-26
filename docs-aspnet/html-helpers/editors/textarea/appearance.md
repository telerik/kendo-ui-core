---
title: Appearance
page_title: Appearance
description: "Learn how to customize the appearance of the Telerik UI TextArea HtmlHelper for {{ site.framework }}."
slug: textarea_appearance
position: 2
---

# Appearance

In this article, you will find information about the styling options and rendering of the {{ site.product }} TextArea.

For a live example, visit the [Appearance Demo of the TextArea](https://demos.telerik.com/{{ site.platform }}/textarea/appearance).

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

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance of the TextArea HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/textarea/appearance)
* [Server-Side API](/api/textarea)
