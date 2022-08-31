---
title: Appearance
page_title: Appearance
description: "Learn about the rendering and appearance options of the Telerik UI DateInput for {{ site.framework }}."
slug: appearance_dateinput
position: 2
---

# DateInput Appearance

As of the R1 2022 release, the DateInput component uses a new rendering. To learn more about why we decided to create a new rendering for our components, see the [Components Rendering Overview]({% slug components_rendering_overview %}) article.

For a live example of the styling options of the DateInput, visit the [Appearance Demo of the DateInput](https://demos.telerik.com/{{ site.platform }}/dateinput/appearance).

## Options

The DateInput supports the following styling options:

- [`Size`](#size)—configures the overall size of the component.
- [`Rounded`](#rounded)—configures the border radius of the component.
- [`FillMode`](#fillmode)—configures how the color is applied to the component.

### Size

The `Size` option controls the size of the `input` of the DateInput. The `k-input-{size}` class, which is applied to the wrapping span element of the DateInput, reflects the value of the `Size` option.

The following values are available for the `Size` option:

- `Small`—small size (applies the `k-input-sm` class to the wrapping span element)
- `Medium`—medium size (applies the `k-input-md` class to the wrapping span element)
- `Large`—large size (applies the `k-input-lg` class to the wrapping span element)
- `None`—unset.

The default size value is `Medium`.

```HtmlHelper
    @(Html.Kendo().DateInput()
        .Name("dateinput")
        .Size(ComponentSize.Medium)
    )
```
{% if site.core %}
```TagHelper
    <kendo-dateinput name="dateinput" size="ComponentSize.Medium">
    </kendo-dateinput>
```
{% endif %}

### Rounded

The `Rounded` option controls the border radius of the rendered `input`. The class that corresponds to the `Rounded` option is `k-rounded-{rounded}`.

The following values are available for the `Rounded` option:

- `Small`—small border radius (applies the `k-rounded-sm` class to the wrapping span element)
- `Medium`—medium border radius (applies the `k-rounded-md` class to the wrapping span element)
- `Large`—large border radius (applies the `k-rounded-lg` class to the wrapping span element)
- `Full`—largest border radius (applies the `k-rounded-full` class to the wrapping span element)
- `None`—unset.

The default rounded value is `Medium`.

```HtmlHelper
    @(Html.Kendo().DateInput()
        .Name("dateinput")
        .Rounded(Rounded.Medium)
    )
```
{% if site.core %}
```TagHelper
    <kendo-dateinput name="dateinput" rounded="Rounded.Medium">
    </kendo-dateinput>
```
{% endif %}

### FillMode

The `fillMode` option controls the way the color is applied to the rendered `input`. The `k-input-{fillMode}` class, which is applied to the wrapping span element of the DateInput, reflects the value of the `FillMode` option.

The following values are available for the `FillMode` option:

- `Solid`—applies the `k-input-solid` class to the wrapping span element
- `Flat`—applies the `k-input-flat` class to the wrapping span element
- `Outline`—applies the `k-input-outline` class to the wrapping span element
- `None`—unset.

The default fillMode value is `Solid`.

```HtmlHelper
    @(Html.Kendo().DateInput()
        .Name("dateinput")
        .FillMode(FillMode.Solid)
    )
```
{% if site.core %}
```TagHelper
    <kendo-dateinput name="dateinput" fill-mode="FillMode.Solid">
    </kendo-dateinput>
```
{% endif %}

## Old vs New Rendering

The old rendering of the DateInput consisted of an input with a single class named `k-textbox` wrapped in a span element with the `k-dateinput` class. The `k-dateinput` class was used to apply styling to the component. 

```html
 <!-- OLD -->
<span class="k-widget k-dateinput k-state-default" style="width: 100%;">
    <input class="k-textbox" >
    <span class="k-icon k-i-warning k-hidden"></span>
</span>
```

The new rendering of the component consists of an `input` element nested in a wrapping `span` element. The `span` element controls the overall appearance of the DateInput through the different classes applied based on the values of the [styling options](#options). 

```html
<!-- NEW -->
<span class="k-dateinput k-input k-input-md k-rounded-md k-input-solid">
        <input type="text" class="k-input-inner" value="..." placeholder="..." />  
</span>
```

The following example demonstrates how to configure the appearance of the component through the styling options:

```HtmlHelper
    @(Html.Kendo().DateInput()
      .Name("dateinput")
      .Size(ComponentSize.Large)
      .Rounded(Rounded.Small)
      .FillMode(FillMode.Outline)
    )
```
{% if site.core %}
```TagHelper
    <kendo-dateinput name="dateinput" 
      size="ComponentSize.Large"
      rounded="Rounded.Small"
      fill-mode="FillMode.Outline">
    </kendo-dateinput>
```
{% endif %}

## Visual Backwards Compatibility

In order to achieve the same look and feel as the old rendering, make sure to use the classes available in the new rendering. Visit the [CSS Classes Migration]({% slug components_rendering_overview %}#css-classes-migration) and [JQuery Selectors Migration]({% slug components_rendering_overview %}#jquery-selectors-migration) sections of the [Appearance Overview]({% slug components_rendering_overview %}) article for additional information.

> If you use a LESS theme, the new rendering will support only the [default options](#options).

Previously, you had to obtain a reference to the dateinput element through the `k-textbox` class.

```javascript
$(".k-textbox") // Returns a reference to the DateInput element in the old rendering.
```

With the new rendering, you must target the DateInput element by using the `k-input-inner` class.

```javascript
$(".k-input-inner") // Returns a reference to the DateInput element in the new rendering.
```

The following example showcases how to apply a background color to the **DateInput** in both the new, and the old rendering:

```
    <style>
      /* Doesn't work AFTER R1 2022 */
      .k-textbox {
        background-color: #0071bc !important; /* Blue color in versions BEFORE R1 2022 */
      }
      /* Doesn't work BEFORE R1 2022 */
      .k-input-inner {
        background-color: #2e8540 !important; /* Green color in versions AFTER R1 2022 */
      }
    </style>
```

## See Also

* [Appearance Overview Article]({% slug components_rendering_overview %})
* [Appearance Demo of the DateInput](https://demos.telerik.com/{{ site.platform }}/dateinput/appearance)
