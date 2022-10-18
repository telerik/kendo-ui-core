---
title: Appearance
page_title: "{{ site.framework }} NumericTextBox Documentation - NumericTextBox Appearance"
description: "Learn how to customize the appearance of the Telerik UI NumericTextBox HtmlHelper for {{ site.framework }}."
slug: numerictextbox_appearance
position: 2
---

# NumericTextBox Appearance

As of the R1 2022 release, the NumericTextBox component uses a new rendering. To learn more about why we decided to create a new rendering for our components, see the [Components Rendering](https://docs.telerik.com/{{ site.platform }}/styles-and-layout/components-rendering-overview) article.

For a live example of the styling options of the NumericTextBox, visit the [Appearance Demo of the NumericTextBox](https://demos.telerik.com/{{ site.platform }}/numerictextbox/appearance).

## Options

The NumericTextBox HtmlHelper supports the following styling options:

- [`Size()`](#size)—configures the overall size of the component.
- [`FillMode()`](#fillmode)—configures how the color is applied to the component.
- [`Rounded()`](#rounded)—configures the border radius of the component.

### Size

The `Size()` method allows you to adjust the size of the NumericTextBox. The default size is `Medium`.

```HtmlHelper
@(Html.Kendo().NumericTextBox()
    .Name("numeric")
    .Size(ComponentSize.Medium)
)
```
{% if site.core %}
```TagHelper
<kendo-numerictextbox name="numeric"
                      size="ComponentSize.Medium">
</kendo-numerictextbox>
```
{% endif %}

The option is applied to the wrapping span element through the `k-input-md` class.

```html
<span class="k-numerictextbox k-input k-input-md">
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
@(Html.Kendo().NumericTextBox()
    .Name("numeric")
    .Rounded(Rounded.Medium)
)
```
{% if site.core %}
```TagHelper
<kendo-numerictextbox name="numeric"
                      rounded="Rounded.Medium">
</kendo-numerictextbox>
```
{% endif %}

The option is applied to the wrapping span element through the `k-rounded-md` class.

```html
<span class="k-numerictextbox k-input k-rounded-md">
```

Тhe `Rounded` option supports the following values:

- `Small`
- `Medium`
- `Large`
- `Full`
- `None`


### FillMode

The `FillMode` option controls the way the color is applied to the NumericTextBox. The default value is `Solid`.

```HtmlHelper
@(Html.Kendo().NumericTextBox()
    .Name("numeric")
    .FillMode(FillMode.Solid)
)
```
{% if site.core %}
```TagHelper
<kendo-numerictextbox name="numeric"
                      fill-mode="FillMode.Solid">
</kendo-numerictextbox>
```
{% endif %}

The option is applied to the wrapping span element through the `k-input-solid` class.

```html
<span class="k-numerictextbox k-input k-input-solid">
```

The following values are available for the `FillMode` option:

- `Solid`
- `Flat`
- `Outline`
- `None`


## Old vs New Rendering

The old rendering of the NumericTextBox consisted of two span wrapper elements:
- a span wrapper element with the `k-numerictextbox` class
- a nested span wrapper element with the `k-numeric-wrap` class that held all the styling information related to the widget 

```html
 <!-- OLD -->
<span class="k-widget k-numerictextbox" style="width: 100%;">
    <span class="k-numeric-wrap k-state-default">
     <input type="text" class="k-input" >
    </span>
</span>
```

The new rendering of the component consists of a wrapping `span` element that has a child `input` element.

The `span` element controls the overall appearance of the widget and has the following class structure:

```html
<!-- NEW -->
<span class="k-numerictextbox k-input k-input-md k-rounded-md k-input-solid">
    <input type="text" class="k-input-inner" value="..." placeholder="..." />
</span>
```

## Visual Backwards Compatibility

> The new styling and rendering supports only the [default options](#options) when you use a LESS theme.

Previously, you had to obtain a reference to the numerictextbox element through the `k-input` class

```javascript
$(".k-input") // Returns a reference to the NumericTextBox element in the old rendering.
```

With the new rendering, you must target the numerictextbox element by using the `k-input-inner` class.

```javascript
$(".k-input-inner") // Returns a reference to the NumericTextBox element in the new rendering.
```

The following example showcases how to apply a background color to the **NumericTextBox** in both the new, and the old rendering:

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

* [Appearance of the NumericTextBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/numerictextbox/appearance)
* [Server-Side API](/api/numerictextbox)